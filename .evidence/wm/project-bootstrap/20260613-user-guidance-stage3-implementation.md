# Stage 3 Implementation Evidence: Project Bootstrap User Guidance

Date: 2026-06-13
Baseline: b144d53879b2f0cc8c98d509a41d5f6074a76fea
Stage: skill guidance implementation

## Changed Files

- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/report-template.md`
- `evals/skills/project-bootstrap-agent-setup-smoke.sh`
- `scripts/validate-team-doc.mjs`

## Implementation Summary

- Updated generated blocker Markdown from the old `User-understandable result`
  shape to `## Action needed`, `### What you need to do`,
  `### What I will do after that`, and `### Do not send in chat`.
- Added case-aware user requests for Git identity, GitHub login, missing repo SoT
  files, missing pod skills, Codex CLI/runtime, MCP/tool-auth, secure credential
  sources, and human-gate decisions.
- Added reference-guide sections for user-facing message rules, Codex/runtime
  blockers, public app config blockers, and API/Railway secret blockers.
- Updated report-template guidance to match the generated user-facing shape.
- Preserved status-only reporting and no-secret handling; no live external action
  was run.

## Targeted Checks

```text
$ git diff --check
exit 0

$ bash evals/skills/project-bootstrap-agent-setup-smoke.sh
project-bootstrap-agent-setup smoke passed
exit 0

$ node scripts/validate-team-doc.mjs
Validated current mobile-app-dev-team managed docs.
exit 0
```

## Stage 3 Reviewer NO_GO Fix

Initial Stage 3 reviewer result:

- `wm-implementation-reviewer`: NO_GO
- Finding: generated guidance asked for a linked `human-gate/v1` decision whenever
  `HUMAN_GATE_V1_PATH` was absent, even when the actual blocker was not live
  external or risk-bearing work.

Fix:

- `project-bootstrap-preflight.sh` now adds the linked `human-gate/v1` request
  only when the blocker text itself names human-gate, live external, or
  risk-bearing work.
- `project-bootstrap-agent-setup-smoke.sh` now asserts that a non-live missing
  repo SoT/MCP blocker does not include linked `human-gate/v1` in the
  `### What you need to do` section.

Rerun checks:

```text
$ git diff --check
exit 0

$ bash evals/skills/project-bootstrap-agent-setup-smoke.sh
project-bootstrap-agent-setup smoke passed
exit 0

$ node scripts/validate-team-doc.mjs
Validated current mobile-app-dev-team managed docs.
exit 0
```

## Confluence

No live Confluence update was performed. Stage 1 identified no required
Confluence sync unless a reviewer finds that a mirrored SoT page must be updated.
