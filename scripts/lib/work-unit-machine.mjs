const schema = 'wu-status/v1';

const stageOwners = new Map([
  ['00-product-planning', 'Product/Planning'],
  ['01-design', 'Design'],
  ['02-architecture', 'Mobile Architect'],
  ['03-contract-api', 'Backend/API Integrator'],
  ['04-mobile-app', 'Mobile App Dev'],
  ['05-qa-release', 'QA/Release'],
  ['06-gatekeeper', 'Release Gatekeeper (System)'],
  ['07-pr', 'Product/Planning'],
]);

const states = new Set([
  'planned',
  'in-progress',
  'blocked-human',
  'blocked-gate',
  'review-needed',
  'done',
  'not-applicable',
  'deferred',
]);

const reviewerStatuses = new Set(['pending', 'passed', 'failed', 'not-applicable']);

const verdictReviewers = new Set([
  'wm-implementation-reviewer',
  'wm-contract-reviewer',
  'po-planning-reviewer',
  'po-scope-gate-reviewer',
  'design-reviewer',
]);

const roles = new Set([
  ...stageOwners.values(),
  'Backend/API',
]);

const ignoredEvidenceMatchers = [
  /^\.evidence\/local(?:\/|$)/,
  /^\.evidence\/tmp(?:\/|$)/,
  /^\.evidence\/.*\.log$/,
  /^\.evidence\/.*\/raw(?:\/|$)/,
];

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function normalizeIdentity(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function fail(errors, source, message) {
  errors.push(`${source}: ${message}`);
}

function validateString(errors, source, label, value) {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(errors, source, `${label} must be a non-empty string`);
    return false;
  }
  return true;
}

function validateEvidencePath(errors, source, evidencePath, label) {
  if (!validateString(errors, source, label, evidencePath)) return;
  if (pathHasBacktracking(evidencePath)) {
    fail(errors, source, `${label} must not contain path traversal`);
  }
  for (const matcher of ignoredEvidenceMatchers) {
    if (matcher.test(evidencePath)) {
      fail(errors, source, `${label} must not point at ignored local evidence path: ${evidencePath}`);
      return;
    }
  }
}

function pathHasBacktracking(value) {
  return value.split('/').some((segment) => segment === '..');
}

function validateReviewer(errors, source, status) {
  if (!isPlainObject(status.reviewer)) {
    fail(errors, source, 'reviewer must be an object with the repo reviewer envelope fields');
    return;
  }

  const { reviewer } = status;
  if (typeof reviewer.required !== 'boolean') {
    fail(errors, source, 'reviewer.required must be boolean');
  }
  if (!reviewerStatuses.has(reviewer.status)) {
    fail(errors, source, `reviewer.status must be one of: ${Array.from(reviewerStatuses).join(', ')}`);
  }

  if (status.stage === '06-gatekeeper') {
    if (reviewer.required !== false || reviewer.status !== 'not-applicable') {
      fail(errors, source, 'Release Gatekeeper status must not require an LLM/custom-agent reviewer');
    }
    if (reviewer.agent !== null) {
      fail(errors, source, 'Release Gatekeeper status reviewer.agent must be null');
    }
    return;
  }

  if (reviewer.required === true) {
    if (!validateString(errors, source, 'reviewer.agent', reviewer.agent)) return;
    if (!verdictReviewers.has(reviewer.agent)) {
      fail(errors, source, `reviewer.agent must be a verdict-producing read-only reviewer: ${reviewer.agent}`);
    }
    if (normalizeIdentity(reviewer.agent) === normalizeIdentity(status.owner_role)) {
      fail(errors, source, 'owner_role must not self-approve as reviewer.agent');
    }
    if (roles.has(reviewer.agent)) {
      fail(errors, source, 'reviewer.agent must be an agent name, not an owning role');
    }
  } else if (reviewer.required === false && reviewer.agent !== null) {
    fail(errors, source, 'reviewer.agent must be null when reviewer.required is false');
  }

  if (reviewer.evidence !== null) {
    validateEvidencePath(errors, source, reviewer.evidence, 'reviewer.evidence');
  }
}

function validateEvidence(errors, source, status) {
  if (!Array.isArray(status.evidence)) {
    fail(errors, source, 'evidence must be an array');
    return;
  }

  for (const [index, item] of status.evidence.entries()) {
    if (!isPlainObject(item)) {
      fail(errors, source, `evidence[${index}] must be an object`);
      continue;
    }
    validateEvidencePath(errors, source, item.path, `evidence[${index}].path`);
    validateString(errors, source, `evidence[${index}].kind`, item.kind);
  }
}

function validateHandoff(errors, source, status) {
  if (!isPlainObject(status.handoff)) {
    fail(errors, source, 'handoff must be an object');
    return;
  }
  validateString(errors, source, 'handoff.next_role', status.handoff.next_role);
  validateString(errors, source, 'handoff.next_artifact', status.handoff.next_artifact);
  if (typeof status.handoff.next_artifact === 'string' && pathHasBacktracking(status.handoff.next_artifact)) {
    fail(errors, source, 'handoff.next_artifact must not contain path traversal');
  }
}

function validateEvents(errors, source, status) {
  if (!Array.isArray(status.events) || status.events.length === 0) {
    fail(errors, source, 'events must be a non-empty append-only array');
    return;
  }

  for (const [index, event] of status.events.entries()) {
    if (!isPlainObject(event)) {
      fail(errors, source, `events[${index}] must be an object`);
      continue;
    }
    const expectedSeq = index + 1;
    if (event.seq !== expectedSeq) {
      fail(errors, source, `events[${index}].seq must be ${expectedSeq}`);
    }
    validateString(errors, source, `events[${index}].actor`, event.actor);
    validateString(errors, source, `events[${index}].action`, event.action);
    if (!validateString(errors, source, `events[${index}].at`, event.at)) continue;
    if (Number.isNaN(Date.parse(event.at))) {
      fail(errors, source, `events[${index}].at must be an ISO-8601 timestamp`);
    }
    if (index > 0 && Date.parse(event.at) < Date.parse(status.events[index - 1].at)) {
      fail(errors, source, `events[${index}].at must not go backwards`);
    }
  }
}

export function validateWorkUnitStatus(status, options = {}) {
  const source = options.source || '<status>';
  const errors = [];

  if (!isPlainObject(status)) {
    fail(errors, source, 'status must be a JSON object');
    return errors;
  }

  if (status.schema !== schema) {
    fail(errors, source, `schema must be ${schema}`);
  }

  validateString(errors, source, 'work_unit_id', status.work_unit_id);
  if (options.expectedWorkUnitId && status.work_unit_id !== options.expectedWorkUnitId) {
    fail(errors, source, `work_unit_id must match containing folder: ${options.expectedWorkUnitId}`);
  }

  if (!stageOwners.has(status.stage)) {
    fail(errors, source, `stage must be one of: ${Array.from(stageOwners.keys()).join(', ')}`);
  }
  if (!states.has(status.state)) {
    fail(errors, source, `state must be one of: ${Array.from(states).join(', ')}`);
  }

  if (!validateString(errors, source, 'owner_role', status.owner_role)) {
    return errors;
  }
  const expectedOwner = stageOwners.get(status.stage);
  if (expectedOwner && status.owner_role !== expectedOwner) {
    fail(errors, source, `owner_role for ${status.stage} must be ${expectedOwner}`);
  }

  if (!Number.isInteger(status.attempt) || status.attempt < 1) {
    fail(errors, source, 'attempt must be an integer greater than or equal to 1');
  }

  if (!Array.isArray(status.human_gates)) {
    fail(errors, source, 'human_gates must be an array');
  }

  validateReviewer(errors, source, status);
  validateEvidence(errors, source, status);
  validateHandoff(errors, source, status);
  validateEvents(errors, source, status);

  return errors;
}

export const workUnitStatusSchema = schema;
