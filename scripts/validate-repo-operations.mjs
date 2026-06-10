#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

function fail(message) {
  errors.push(message);
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function requireFile(relativePath) {
  if (!exists(relativePath)) {
    fail(`missing required repo operations file: ${relativePath}`);
    return '';
  }
  return read(relativePath);
}

function requireTerms(relativePath, terms) {
  const body = requireFile(relativePath);
  if (!body) return;
  for (const term of terms) {
    if (!body.includes(term)) fail(`${relativePath} missing required repo operations term: ${term}`);
  }
}

function forbidTerms(relativePath, terms) {
  const body = requireFile(relativePath);
  if (!body) return;
  for (const term of terms) {
    if (body.includes(term)) fail(`${relativePath} includes forbidden duplicated repo policy term: ${term}`);
  }
}

requireTerms('AGENTS.md', [
  'REPO_OPERATIONS.md',
]);

requireTerms('REPO_OPERATIONS.md', [
  '# Repo Operations',
  '## Policy Ownership Map',
  'AGENTS.md',
  'PROJECT_ENVIRONMENT.md',
  'REPO_OPERATIONS.md',
  'team-doc/mobile-app-dev-team/',
  'team-doc/00-source/',
  'team-doc/10-structured/',
  'scripts/',
  'not policy owner',
  '## Document Strata',
  '## Source And Archive Rules',
  '## Validator Responsibility Model',
  '## OpenClaw And Codex Operational Boundaries',
  '## Evidence Gates',
  '## Package Script Composition',
  'Codex-only Repo Work Policy',
  '/workspace/CODEX_MANAGED_PATHS.md',
  '/workspace/new-mobile-app/',
  '/workspace/codex-hooks/codex-run',
]);

requireTerms('team-doc/mobile-app-dev-team/09-pod-native-openclaw-skills/codex-cli-auth-setup/SKILL.md', [
  'REPO_OPERATIONS.md',
  '/workspace/CODEX_MANAGED_PATHS.md',
  '/workspace/new-mobile-app/',
  '/workspace/codex-hooks/codex-run',
]);

forbidTerms('team-doc/mobile-app-dev-team/09-pod-native-openclaw-skills/codex-cli-auth-setup/SKILL.md', [
  'Recommended AGENTS.md policy wording:',
  'Allowed direct actions by this agent:',
  'This agent MUST NOT directly use read/edit/write for Codex-managed repo/path content',
]);

requireTerms('team-doc/mobile-app-dev-team/README.md', [
  'REPO_OPERATIONS.md',
  'team/role/process/reference',
]);

requireTerms('team-doc/mobile-app-dev-team/99-source-map.md', [
  'REPO_OPERATIONS.md',
  'repo-wide operating policy',
]);

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log('Validated repo operations policy ownership.');
