# PR1 Work-Unit Status Machine Preimplementation Plan

Status: pending xhigh review
Created: 2026-06-10
Baseline HEAD: `85984dd41c776ddbed3b4784ba9b921ba60a93fb` (`docs: plan mobile app team doc root migration`)
Owner: Product/Planning for planning; implementation owner remains repo-scoped `$wm` runtime work after reviewer GO

## Purpose

PR1 must make a work unit's state calculable from committed repo artifacts. The outcome is not a customer app feature. It is runtime infrastructure for WonderMove/ClawPod mobile agents so downstream pods can resume from GitHub branch/commit/PR artifacts instead of chat history or local machine state.

This plan is only the preimplementation checkpoint. It does not authorize PR1 implementation until xhigh returns GO.

## SoT Basis

- `AGENTS.md`: repo is the mobile app template runtime; TDD, branch/PR gates, no external platform/runtime repo mutation, no hardcoded customer identifiers or secrets.
- `PROJECT_ENVIRONMENT.md`: `$wm` plans must be SoT-grounded, route material planning decisions to read-only agents when practical, forbid write-capable executor delegation, and require plan/final reviewer evidence.
- `REPO_OPERATIONS.md`: runtime changes require explicit gates; local validation does not prove OrbStack/OpenClaw, branch protection, EAS submit, Jira/Confluence, or external state.
- `team-doc/mobile-app-dev-team/05-work-processes.md`: `$wm` establishes scope, owner, affected paths, tests, evidence path, gate impact, SoT sources, and read-only review before Done.
- `team-doc/mobile-app-dev-team/06-gates-and-evidence.md`: evidence requires artifacts, command exit status, secret hygiene, human-gate stops, durable evidence boundaries, and non-LLM Gatekeeper.
- `team-doc/mobile-app-dev-team/10-github-artifact-workflow.md`: durable work units live under `docs/plans/work-units/<work-unit-id>/`, include role artifacts, and hand off through GitHub branch/commit/PR.
- `docs/plans/active/20260610-wm-mobile-template-runtime-goal-plan.md`: PR1 is Phase 2, Work-Unit State Machine; it defines `wu-status/v1`, validator, fixtures, sample status, `test:runtime`, and `test:local-harness`.

## Material Planning Routing

- Agent: `wm-implementation-reviewer`
- Question: Is this PR1 preimplementation plan scoped correctly for a repo-local work-unit status machine, with no PR1 implementation started and no external/live/native platform work authorized?
- Evidence path: `.evidence/reviews/pr1-work-unit-status-machine-preimplementation-xhigh-20260610.md`
- Reflection/impact: PR1 may proceed only after reviewer GO; a NO_GO/BLOCKED/NEEDS_HUMAN verdict stops implementation.

No separate Product/Planning sub-agent is routed in this checkpoint because the source request already asks for xhigh review and the plan is bounded to the PR1 runtime slice already accepted in the goal plan. If xhigh finds scope, owner, or human-gate uncertainty, route to `po-planning-reviewer` or `po-scope-gate-reviewer` before implementation.

## PR1 Scope

Allowed PR1 implementation after reviewer GO:

- Define `wu-status/v1` as a deterministic JSON status contract.
- Add validator and fixtures that prove status validity, illegal transitions, missing reviewer envelope, Gatekeeper misuse, and append-only event behavior.
- Add a sample `docs/plans/work-units/sample-role-handoff/status.json`.
- Wire the validator into `test:runtime` only if the validator is implemented and documented in the same PR slice.
- Update `PROJECT_ENVIRONMENT.md` or gate docs only if the gate set or runtime facts change.

Not allowed in PR1:

- Implement PR2 human-gate envelope beyond references needed by `wu-status/v1`.
- Implement PR3 next-action resolver or `wm-orchestrate`.
- Implement PR5 evidence ladder ingestion or live EAS/Maestro proof.
- Run live EAS, pod rollout, webhook, Secret/token, branch protection, bot account, platform image, or multi-pod drill work.
- Treat RN Web, local harness, or source review as native/pod/external platform proof.
- Create customer-specific app names, bundle IDs, API URLs, tokens, or credentials.

## Proposed Contract Shape

`docs/plans/work-units/<work-unit-id>/status.json` should use:

```json
{
  "schema": "wu-status/v1",
  "work_unit_id": "sample-role-handoff",
  "stage": "00-product-planning",
  "state": "planned",
  "owner_role": "Product/Planning",
  "attempt": 1,
  "reviewer": {
    "required": true,
    "status": "pending",
    "reviewer": "po-planning-reviewer",
    "evidence": null
  },
  "human_gates": [],
  "evidence": {
    "required": [],
    "links": []
  },
  "handoff": {
    "branch": null,
    "pr": null,
    "next_role": "Design"
  },
  "events": []
}
```

Exact field names may be refined during TDD, but PR1 must preserve these invariants:

- `schema` must equal `wu-status/v1`.
- `work_unit_id` must match the durable directory name.
- `stage`, `state`, and `owner_role` must be from closed enums.
- Reviewer identity must be a read-only reviewer where a reviewer is required.
- Reviewer identity must not equal the implementing or owning role for that stage; owner/reviewer self-approval must fail validation.
- Release Gatekeeper must not be modeled as a custom agent, SOUL owner, human approver, or LLM reviewer.
- Human gates may be referenced as blocking state, but PR1 must not claim PR2 envelope completion.
- Events must be append-only in the validator fixture model.
- Evidence links must not point to ignored local-only paths such as `.evidence/local/`, `.evidence/tmp/`, `.evidence/**/*.log`, or `.evidence/**/raw/`.

## Planned Files For PR1 Implementation

Implementation candidates after reviewer GO:

- `scripts/lib/work-unit-machine.mjs`
- `scripts/validate-work-units.mjs`
- `evals/work-units/fixtures/*.json`
- `docs/plans/work-units/sample-role-handoff/status.json`
- `package.json`
- `PROJECT_ENVIRONMENT.md` if and only if gate composition/runtime facts change
- `.github/workflows/quality-gate.yml` if and only if CI path detection changes

No PR1 preimplementation file creation should occur outside this plan and its review evidence.

## TDD Plan

RED first:

- Add valid fixture for a minimal planned work unit.
- Add invalid fixture for unknown schema.
- Add invalid fixture for directory/work_unit_id mismatch.
- Add invalid fixture for illegal stage/state/owner combination.
- Add invalid fixture for missing required reviewer envelope.
- Add invalid fixture for owner/reviewer self-approval.
- Add invalid fixture for Gatekeeper as reviewer/LLM/human owner.
- Add invalid fixture for non-append-only event mutation.
- Add invalid fixture for ignored local evidence path.

GREEN:

- Implement a pure validation library in `scripts/lib/work-unit-machine.mjs`.
- Implement CLI wrapper `scripts/validate-work-units.mjs`.
- Emit deterministic, file-specific failure messages.
- Keep validation offline and side-effect free.
- Wire `scripts/validate-work-units.mjs` into `pnpm run test:runtime`, `.github/workflows/quality-gate.yml` runtime-change path detection, and `PROJECT_ENVIRONMENT.md` CI/runtime script documentation in the same PR slice.

REFACTOR:

- Extract closed enums and transition helpers only if duplication appears in fixtures/CLI.
- Keep PR1 separate from PR2 human-gate envelope and PR3 resolver logic.

## Acceptance Criteria

- `node scripts/validate-work-units.mjs --self-test` exits 0.
- Valid fixture passes.
- Each invalid fixture fails for a named deterministic reason.
- `pnpm run test:runtime` exits 0 after the new validator is wired.
- `.github/workflows/quality-gate.yml` detects `scripts/validate-work-units.mjs` changes for conditional local harness.
- `PROJECT_ENVIRONMENT.md` lists the new work-unit validator and any changed gate behavior.
- `pnpm run test:local-harness` exits 0 because `docs/plans/**`, runtime scripts, or gate behavior will change.
- `pnpm turbo run lint test` exits 0 before PR packaging.
- xhigh final actual-work review returns GO after implementation and gates.

## Human/Ops Gates

No human/ops approval is required for this preimplementation plan or for repo-local PR1 validator work.

Human/ops approval is required before any live EAS command, external pod rollout, webhook routing, Secret/token provisioning, branch protection change, bot account work, platform image work, production submit, or failed-gate risk acceptance.

## Risks

- Schema overreach: PR1 could accidentally absorb PR2/PR3. Mitigation: keep PR1 validator passive; no next-action resolver or human-gate envelope implementation.
- Gatekeeper drift: Gatekeeper could be modeled as an LLM/reviewer. Mitigation: explicit invalid fixture and validator failure.
- Handoff overclaim: local evidence could be treated as pod proof. Mitigation: docs and validator distinguish durable GitHub artifacts from external runtime proof.
- Dirty worktree packaging: current workspace has concurrent root-migration evidence and earlier checkpoint evidence. Mitigation: PR packaging must re-run status and intentionally include or separate files.

## Next Step

Run xhigh review on this plan. If GO, proceed to PR1 implementation in tests-first order. If NO_GO, BLOCKED, or NEEDS_HUMAN, do not implement PR1 until the finding is resolved.
