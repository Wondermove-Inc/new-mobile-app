# Project Bootstrap User Guidance Implementation Plan

Date: 2026-06-13
Baseline: b144d53879b2f0cc8c98d509a41d5f6074a76fea
Goal document: docs/plans/active/20260613-project-bootstrap-user-request-guidance-goal.md
Status: reviewer NO_GO fixed; pending rerun

## Scope

Implement the Stage 1-5 continuation from the goal document by making the
generated `project-bootstrap` blocker Markdown easier for a non-IT user to
understand while preserving the existing SoT boundaries.

The implementation is limited to:

- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/report-template.md`
- `evals/skills/project-bootstrap-agent-setup-smoke.sh`
- `scripts/validate-team-doc.mjs` only if the validator must enforce the new contract
- this evidence file and the active goal document progress log

`pod-role-bootstrap` is not planned for direct behavior changes in this stage.
The SoT already says it writes `/workspace/state/pod-role-bootstrap-report.json`
and emits nested blockers; `project-bootstrap` consumes that report and is the
right place to build the user-facing guide.

## SoT Inputs

- `AGENTS.md`: TDD required; no secrets; runtime changes require applicable gates.
- `PROJECT_ENVIRONMENT.md`: `$wm` must use SoT-grounded planning, reviewers, and
  human-gated Confluence publication.
- `REPO_OPERATIONS.md`: reports are status-only/redacted; external platform state
  is not proven by local checks; live Confluence requires explicit approval.
- `docs/plans/active/20260613-project-bootstrap-user-request-guidance-goal.md`:
  required user-facing cases, do-not-ask list, test gates, reviewer sequence.
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/SKILL.md`:
  `project-bootstrap` must run deterministic agent-owned setup before asking the
  user and must hand the generated blocker Markdown to the user.
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md`:
  current blocker classification and human-owned blocker rules.
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh`:
  current generated Markdown builder.
- `evals/skills/project-bootstrap-agent-setup-smoke.sh`: current smoke coverage
  for nested `pod-role-bootstrap` blockers.
- `scripts/validate-team-doc.mjs`: runtime doc validator that enforces required
  project-bootstrap terms.

## Planned Behavior

The generated blocker Markdown should begin with the simpler goal-document
shape:

1. `## Action needed`
2. `### What you need to do`
3. `### What I will do after that`
4. `### Do not send in chat`

The content must:

- explain `git-identity-missing` as a request for one approved non-secret
  name/email source only;
- explain `github-auth-unavailable` as a human-present login or approved secure
  auth source, never a request to paste tokens;
- explain generic blockers as missing source artifact, non-secret value, secure
  credential availability, platform-owner refresh, or human-gate decision;
- explicitly say that passwords, tokens, 2FA codes, recovery codes, private
  keys, database URLs, bearer tokens, Google ADC JSON, service account JSON, and
  full secret-bearing config must not be sent in chat;
- keep technical blocker names available after the plain-language section for
  agents and reviewers.

## Test Plan

Stage 2 will update `evals/skills/project-bootstrap-agent-setup-smoke.sh` first
and `scripts/validate-team-doc.mjs` if needed before behavior edits. The RED
coverage must prove the goal-document cases, not only the Git/GitHub nested
blocker path.

Minimum RED assertions for nested `pod-role-bootstrap` blockers:

- `## Action needed`
- `The pod agent cannot continue because`
- `### What you need to do`
- `GitHub login screen`
- `approved secure GitHub auth source`
- `one approved non-secret Git identity`
- `### What I will do after that`
- `verify GitHub status`
- `### Do not send in chat`
- `passwords, tokens, 2FA codes`
- no request for the user to create `/workspace/state/pod-role-bootstrap-report.json`

Additional RED coverage required before behavior edits:

- `codex-config-missing` / missing `.codex/config.toml`: generated guidance asks
  for the correct checkout or approved project artifact, not a pasted config
  containing secrets.
- Pod runtime/toolchain/Codex CLI/MCP: generated guidance asks for platform
  owner refresh, an approved Codex CLI artifact, or approved MCP/tool-auth
  config, and does not ask a non-IT user to install arbitrary tools or use
  `@latest`.
- Secure credential source: role-specific missing Stitch/EAS/API/Railway
  readiness guidance asks for Secret, secure store, tool auth, mounted file, or
  human-present login; it must forbid ADC JSON, service account JSON,
  `DATABASE_URL`, bearer tokens, and Railway tokens in chat.
- Public config: `blocker-resolution-guide.md` and validator coverage must
  include a user template for app display name, slug, scheme, bundle ID, Android
  package, and public API URL as public non-secret config values only.
- Human gate: `blocker-resolution-guide.md` and validator coverage must include
  a template for linked `human-gate/v1` decisions before live external or
  risk-bearing action.
- Agent-owned do-not-ask: smoke/validator coverage must ensure generated or
  reference guidance does not ask the user to create report directories/report
  files, run status checks, choose/write role identity when source evidence
  exists, repair canonical managed paths, register pinned credential-free MCPs,
  or align the repo-pinned pnpm version.

After implementation, run:

- `git diff --check`
- `bash evals/skills/project-bootstrap-agent-setup-smoke.sh`
- `node scripts/validate-team-doc.mjs`
- `pnpm run test:runtime`
- `pnpm run test:local-harness`
- `pnpm turbo run lint test`

`pnpm run test:local-harness` currently composes `pnpm turbo run lint test`,
but the workspace lint/test gate is listed explicitly for PR readiness and must
be reported explicitly.

## Confluence

No live Confluence update is required for this implementation unless a reviewer
finds that the generated user-facing blocker guide changes a mirrored SoT page.
If that happens, stop before publish and gather page IDs, current versions,
proposed body changes, reviewer evidence, and explicit human approval.

## Stage 1 Reviewer Routing

- `wm-implementation-reviewer`: required for implementation scope, test plan,
  evidence path, and gate impact. Initial run returned NO_GO; this plan fixes
  the high/medium findings before rerun.
- `po-scope-gate-reviewer`: required before Stage 2 because this plan defines
  user-facing requests, non-goals, Confluence sync, and human-gate boundaries.

No behavior edit may start until both required Stage 1 reviewer routes have no
Critical/High/Medium finding.

## Reviewer Questions

1. Is this scope sufficient and narrow enough for the goal document?
2. Is it correct to keep `pod-role-bootstrap` behavior unchanged and update only
   `project-bootstrap` generated guidance plus tests/docs?
3. Are the planned tests and gates sufficient before implementation?
4. Is Confluence correctly treated as not required unless a mirrored SoT page is
   identified?

## Reviewer Finding Fixes

- Fixed HIGH: expanded Stage 2 coverage beyond Git/GitHub to include
  `codex-config-missing`, pod runtime/toolchain/Codex CLI/MCP, secure credential
  source, public config, human-gate, and agent-owned do-not-ask cases.
- Fixed MEDIUM: listed `pnpm turbo run lint test` explicitly for PR readiness
  instead of treating it as not applicable.
- Fixed LOW: added the required Stage 1 `po-scope-gate-reviewer` route.
