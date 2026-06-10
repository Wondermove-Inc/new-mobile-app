# WM Mobile Template Runtime Goal Plan

**Status**: draft for user approval
**Created**: 2026-06-10
**Owner**: Product/Planning with Mobile Architect, QA/Release, and Gatekeeper boundaries
**Execution mode**: `$wm` SoT-grounded planning, goal-tracked execution, reviewer evidence required before implementation

**CRITICAL INSTRUCTIONS**: After completing each phase:
1. Check off completed task checkboxes.
2. Run the phase quality gate commands recorded in that phase.
3. Verify every required quality gate item passes, or record the source-backed blocker.
4. Update `Last Updated`.
5. Record evidence paths and reviewer output.
6. Do not proceed to the next phase while a required gate is failing or skipped without an explicit source-backed blocker.

## Goal

Build the repo into an executable mobile app template runtime for WonderMove/ClawPod mobile agents, not a single customer app. The plan must make customer-specific Expo React Native apps reproducible through repo-owned runtime, gate, evidence, role, and handoff artifacts.

This plan is designed to satisfy these nine outcomes:

1. Increase template runtime reusability.
2. Create an executable standard for agents.
3. Make customer requirement intake and handoff durable.
4. Fix role responsibility boundaries.
5. Automate Expo/RN template quality criteria.
6. Keep RN Web evidence and native evidence separate.
7. Improve ClawPod/OpenClaw execution readiness.
8. Control external platform work behind human/ops gates.
9. Reduce SoT drift and evidence hygiene decay.

## SoT Basis

This plan is subordinate to the following sources:

- `AGENTS.md`: defines this repo as the mobile app template runtime for WonderMove mobile agents; requires TDD, no hardcoded customer identifiers/secrets, no direct push to `main`, no external platform/runtime repo edits, and branch/PR gates.
- `PROJECT_ENVIRONMENT.md`: current runtime facts for pnpm, Expo SDK, RN Web boundary, EAS/Maestro, Codex runtime, MCP pins, CI gates, and non-scope.
- `REPO_OPERATIONS.md`: policy ownership model, evidence gate expectations, package script composition, validator responsibility, and limits of local validation.
- `team-doc/mobile-app-dev-team/00-sot-and-principles.md`: team-level principles for template runtime, roles, contracts, and evidence.
- `team-doc/mobile-app-dev-team/06-gates-and-evidence.md`: required gates, deterministic Gatekeeper, durable evidence, RN Web/Railway/native boundaries, and human-gate categories.
- `team-doc/mobile-app-dev-team/10-github-artifact-workflow.md`: pod-isolated role handoff through GitHub branch/commit/PR and `docs/plans/work-units/<work-unit-id>/`.
- `team-doc/mobile-app-dev-team/13-pod-organization-e2e-improvement-plan.md`: improvement plan input, but not policy SoT.
- `.evidence/mobile-qa-env-requirements/orbstack-boram-linux-sot-check.md`: direct boram pod evidence, including pnpm 10.33.3 vs repo `pnpm@9.15.9` mismatch and missing local native E2E tooling.
- Existing xhigh evidence under `.evidence/reviews/`, especially the latest NO_GO finding that the 13번 plan still contains an obsolete direct line-number citation into `scripts/validate-team-doc.mjs` in PR7.

## Current Decision

Proceeding is directionally correct only if the work is framed as runtime infrastructure for reusable customer-app generation and takeover. It is not correct if interpreted as building a bigger customer-facing app screen or claiming live pod/native readiness from local documentation.

The applicable execution envelope is:

- Immediate: repo-internal, offline, deterministic planning and validator work after the phase gates below.
- Conditional: live EAS, pod rollout, webhook routing, Secret/token provisioning, branch protection, bot accounts, and platform image work only after recorded human/ops approval.
- Forbidden: store release automation, release human gate weakening, Gatekeeper as LLM/pod/SOUL owner, RN Web/Railway/local evidence as native/external proof, secrets or customer identifiers in repo, direct external platform/runtime repo mutation from this repo.

## Outcome Coverage Matrix

| Outcome | Plan mechanism | Done evidence |
| --- | --- | --- |
| 1. Template runtime reusability | Preserve env-injected app identity/API config; add runtime validators and work-unit standards instead of customer-app hardcoding | No customer name, bundle ID, prod API URL, token, or credential committed; env policy remains aligned with `PROJECT_ENVIRONMENT.md` |
| 2. Agent executable standard | PR1 status machine + PR2 human gate envelope + PR3 next-action resolver / `wm-orchestrate` | `status.json` and resolver fixtures compute next role/action without chat history or local machine state |
| 3. Durable handoff | Keep `docs/plans/work-units/<id>/` as canonical branch/commit/PR artifact root | Sample work-unit contains machine-readable state, role artifacts, reviewer envelopes, evidence links, and PR handoff refs |
| 4. Role boundaries | Encode stage owners, reviewer mappings, Gatekeeper non-LLM rules, and forbidden self-approval | Validators reject cross-role ownership, reviewer/self-approval misuse, and LLM Gatekeeper modeling |
| 5. Expo/RN quality automation | Wire new validators into `test:runtime`; preserve `turbo lint test`, local harness triggers, mobile env commands, RN Web and native gates | Commands and evidence paths are recorded per PR slice; required checks remain explicit |
| 6. RN Web/native evidence separation | PR5 evidence ladder: L0 Jest, L1 RN Web, L2 EAS/Maestro, L3 human-device/mobile-mcp | QA cannot mark native readiness with only RN Web/Railway/local evidence |
| 7. ClawPod/OpenClaw readiness | PR4 pod bootstrap/preflight with pnpm pin enforcement, role identity, GitHub auth status, and capability reporting | `--pod` preflight fails fast on pnpm mismatch and reports capabilities without printing secrets |
| 8. External platform control | Part D remains ops annex; live platform actions require human/ops approval record | No image push, pod creation, webhook, Secret/token, branch protection, or live EAS command is run from repo-only phase |
| 9. SoT drift/evidence hygiene | PR6 project/environment drift checks; PR7 evidence hygiene and secret scan; fix known stale citation first | Validators detect pin/MCP/CI/evidence/secret drift; stale line refs removed or converted to behavior-based references |

## Phase 0: Rebaseline And Plan Hygiene

**Goal**: Remove known plan-level blockers before any implementation PR starts.

**Dependencies**:

- User maintains instruction to skip full `pnpm run test:runtime` while another session is modifying runtime validation areas.
- No implementation PR starts before this phase is complete.

**Tasks**:

- [ ] Fix the remaining stale citation in `team-doc/mobile-app-dev-team/13-pod-organization-e2e-improvement-plan.md` PR7 section: replace the obsolete direct line-number citation into `scripts/validate-team-doc.mjs` with a behavior-based reference to the shared secret-pattern implementation.
- [ ] Search the 13번 plan and adjacent evidence for direct script line-number citations that point into actively edited validator files; replace with stable behavior/path references where possible.
- [ ] Run narrow documentation validation: `node scripts/validate-team-doc.mjs`.
- [ ] After concurrent session stabilizes, run and record full runtime rebaseline: `pnpm run test:runtime`.
- [ ] Record the result under `.evidence/reviews/` or a phase-specific evidence path.

**Quality gate**:

- [ ] `node scripts/validate-team-doc.mjs` exits 0.
- [ ] `pnpm run test:runtime` exits 0 before PR1 implementation begins, unless the user explicitly renews the skip and the plan remains blocked for PR1+ implementation.

**Rollback**:

- Revert only the Phase 0 documentation edits made by this plan, preserving unrelated concurrent-session changes.

**Outcomes served**: 5, 8, 9.

## Phase 1: Runtime Reusability Guardrails

**Goal**: Ensure the work improves the reusable template runtime and does not drift into one customer app.

**Tasks**:

- [ ] Audit `apps/mobile/app.config.ts`, `apps/mobile/env.ts`, `PROJECT_ENVIRONMENT.md`, and `AGENTS.md` against the no-hardcoded-customer rule.
- [ ] Add or update tests only if a gap is found in env validation or template fallback behavior.
- [ ] Document the template-runtime interpretation in the affected plan/evidence: app identity, bundle IDs, API URL, and secrets are injected through env/ops, never committed as customer constants.
- [ ] Verify no proposed PR slice depends on a customer-specific app name, bundle ID, private API URL, or token.

**Quality gate**:

- [ ] Any env/runtime code change follows TDD first.
- [ ] `pnpm --filter mobile test` and relevant mobile lint/check commands are required if app config/env code changes.
- [ ] If only docs are changed, cite the exact docs changed and why code tests were not applicable.

**Rollback**:

- Revert this phase's env/test/doc updates; no external state is touched.

**Outcomes served**: 1, 5, 8.

## Phase 2: Work-Unit State Machine (PR1)

**Goal**: Make repo state calculate where a work unit is and what can happen next.

**TDD strategy**:

- RED: Add invalid and valid fixtures for `docs/plans/work-units/<id>/status.json`.
- GREEN: Implement minimal schema/transition validator.
- REFACTOR: Extract shared state-machine constants and improve failure messages.

**Tasks**:

- [ ] Define `wu-status/v1` schema with stages, role owner, state, attempts, reviewer envelope, handoff refs, human gates, evidence ladder, and append-only events.
- [ ] Implement `scripts/lib/work-unit-machine.mjs`.
- [ ] Implement `scripts/validate-work-units.mjs`.
- [ ] Add fixtures for valid state, illegal transition, missing reviewer envelope, Gatekeeper reviewer misuse, and append-only event violations.
- [ ] Add `docs/plans/work-units/sample-role-handoff/status.json`.
- [ ] Wire validator explicitly into `package.json`, `pnpm run test:runtime`, CI script detection, and `PROJECT_ENVIRONMENT.md` if the gate set changes.

**Quality gate**:

- [ ] Validator self-test exits 0.
- [ ] Invalid fixtures fail for named deterministic reasons.
- [ ] `pnpm run test:runtime` exits 0 after rebaseline.
- [ ] `pnpm run test:local-harness` is required because `docs/plans/**`, scripts, or runtime gate behavior changes.

**Rollback**:

- Remove the validator, fixtures, package/CI/doc wiring, and sample `status.json` from this PR slice only.

**Outcomes served**: 2, 3, 4, 5, 9.

## Phase 3: Human-Gate Envelope (PR2)

**Goal**: Make `NEEDS_HUMAN` states resumable and auditable without weakening human authority.

**TDD strategy**:

- RED: Add fixtures for approved, rejected, deferred, agent/self-approval, unknown category, failed-gate-risk without failed check reference, and missing decision anchor.
- GREEN: Validate `human-gate/v1` and connect it to `blocked-human` transitions.
- REFACTOR: Share category enums with gate/evidence docs where practical.

**Tasks**:

- [ ] Define `human-gate/v1` JSON envelope with `gate_id`, `category`, `decision`, `scope`, `decided_by`, `decision_reference`, `decided_at`, `residual_risk`, and `evidence_links`.
- [ ] Require GitHub comment/review or approved equivalent as `decision_reference`.
- [ ] Reject role/agent names as human approvers.
- [ ] Require failed check reference for `failed-gate-risk`.
- [ ] Update `06-gates-and-evidence.md` with the machine-readable envelope rule.
- [ ] Ensure `blocked-human -> in-progress` is allowed only with approved envelope.

**Quality gate**:

- [ ] PR2 fixtures prove both allowed and rejected cases.
- [ ] `pnpm run test:runtime` exits 0.
- [ ] Local harness runs if runtime paths or `docs/plans/**` are touched.

**Rollback**:

- Remove envelope schema integration and docs; existing human-gate prose remains valid but non-machine-readable.

**Outcomes served**: 2, 3, 4, 8.

## Phase 4: Next-Action Resolver And Orchestration Skill (PR3)

**Goal**: Turn work-unit state into deterministic next actions, with LLM roles executing only the action assigned to their role.

**TDD strategy**:

- RED: Add resolver fixtures for happy path, 02/03 parallelism, reviewer needed, gate failure retry, retry exhaustion, human-gate block, human-gate resume, and Gatekeeper deterministic checks.
- GREEN: Implement resolver output and transition application.
- REFACTOR: Keep resolver as a pure function over committed repo files.

**Tasks**:

- [ ] Implement `scripts/work-unit-next.mjs`.
- [ ] Add `--apply-transition` that uses the shared state-machine module and refuses illegal transitions before writing.
- [ ] Add `.agents/skills/wm-orchestrate/SKILL.md`.
- [ ] Define `WM_ROLE` filtering and hard-stop behavior when resolver returns only blocked actions.
- [ ] Define reviewer routing using allowed repo reviewers, without allowing agents to edit their own reviewer envelopes.
- [ ] Record that Gatekeeper remains CI/deterministic, not a custom agent or pod.

**Quality gate**:

- [ ] Resolver fixtures cover every stage and escalation path.
- [ ] `pnpm run test:runtime` exits 0.
- [ ] `pnpm run test:local-harness` exits 0 because `.agents/` and runtime scripts change.
- [ ] xhigh reviewer confirms no role can self-approve or execute another role's task.

**Rollback**:

- Remove `wm-orchestrate`, resolver script, fixtures, and wiring; PR1/PR2 state files remain usable as passive records.

**Outcomes served**: 2, 3, 4, 5.

## Phase 5: Pod Bootstrap And Preflight (PR4)

**Goal**: Make ClawPod/OpenClaw pods fail fast when they cannot execute the repo runtime contract.

**TDD strategy**:

- RED: Add Linux/pod preflight fixtures for pnpm mismatch, missing role identity, missing GitHub auth, missing Chromium, and macOS local skip behavior.
- GREEN: Implement `--pod` preflight mode and pod-role bootstrap docs/scripts.
- REFACTOR: Separate status-only capability reporting from secret-bearing configuration.

**Tasks**:

- [ ] Extend `scripts/codex-preflight.mjs` with `--pod`.
- [ ] Detect codex binary through `CODEX_BIN`, `which codex`, and existing local paths.
- [ ] Prefer `uname -m` for Linux/pod architecture while preserving macOS support.
- [ ] Enforce repo pnpm pin `9.15.9` through corepack; fail on boram-style `10.33.3` mismatch unless corrected before install.
- [ ] Report capabilities: RN Web E2E possible, local native E2E false in boram-like pods, EAS cloud status by token presence only.
- [ ] Add pod-native `pod-role-bootstrap` source under `team-doc/mobile-app-dev-team/09-pod-native-openclaw-skills/`.
- [ ] Update pod-skill validation without printing secrets.

**Quality gate**:

- [ ] Preflight self-tests pass.
- [ ] `node scripts/validate-team-doc.mjs` exits 0.
- [ ] `pnpm run test:runtime` exits 0 after rebaseline.
- [ ] No token, auth JSON, API key, or full secret-bearing config appears in output or evidence.

**Rollback**:

- Remove `--pod` extensions and pod-role skill docs/scripts; local Codex preflight remains as before.

**Outcomes served**: 2, 5, 7, 8, 9.

## Phase 6: Native Evidence Ladder And Offline EAS Evidence Ingestion (PR5 Offline)

**Goal**: Make evidence claims honest and stratified before any live native/EAS execution.

**TDD strategy**:

- RED: Add recorded EAS JSON fixture, redaction fixture with URL token, RN Web-only work-unit fixture attempting to claim native completion, and native-required work-unit missing L2/L3 evidence.
- GREEN: Implement offline ingestion and ladder validation.
- REFACTOR: Keep network/live EAS commands outside default tests.

**Tasks**:

- [ ] Create `team-doc/mobile-app-dev-team/14-native-e2e-strategy.md`.
- [ ] Define L0 Jest, L1 RN Web, L2 EAS/Maestro, L3 human-device/mobile-mcp evidence levels.
- [ ] Require Product/Planning to set `status.json.evidence_ladder.required_level`.
- [ ] Make QA completion require achieved evidence level or explicit failed-gate-risk waiver.
- [ ] Document `.maestro/home.yml` `appId: {{ANDROID_PACKAGE}}` as generation-time placeholder and require appId parameterization before live EAS/Maestro execution.
- [ ] Implement `scripts/ingest-eas-evidence.mjs` using recorded fixtures only.
- [ ] Update `$e2e-test` skill docs to distinguish RN Web, EAS/Maestro, and human-device/mobile-mcp.

**Quality gate**:

- [ ] Offline ingest self-test exits 0 with no network.
- [ ] Redaction tests prove token-bearing URLs are sanitized.
- [ ] `pnpm run test:runtime` exits 0 after rebaseline.
- [ ] No `eas whoami`, live EAS job, Maestro cloud job, or token-dependent live command is run in this phase.

**Rollback**:

- Remove strategy doc, ingest script, fixtures, and skill doc updates; existing RN Web/native boundary remains documented in `PROJECT_ENVIRONMENT.md`.

**Outcomes served**: 5, 6, 8, 9.

## Phase 7: SoT Drift Detection (PR6)

**Goal**: Detect when the repo's declared runtime facts no longer match executable files.

**TDD strategy**:

- RED: Add mutated fixtures where `packageManager`, mobile package versions, MCP pins, and CI trigger paths disagree with `PROJECT_ENVIRONMENT.md`.
- GREEN: Implement offline drift checks.
- REFACTOR: Keep online Railway/API checks out of required PR gates.

**Tasks**:

- [ ] Replace placeholder SoT refresh script with deterministic offline `scripts/sot-snapshot-check.mjs` or equivalent.
- [ ] Implement `scripts/validate-project-environment.mjs`.
- [ ] Check package manager pin, Expo/RN/NativeWind/Tailwind/Playwright versions, lightningcss override, MCP pins, and CI trigger paths.
- [ ] Add optional non-PR `--online` mode for Railway health checks, explicitly non-blocking for PR gate.
- [ ] Update `PROJECT_ENVIRONMENT.md` and CI wiring only when executable gate composition changes.

**Quality gate**:

- [ ] Offline drift fixtures fail with exact mismatch messages.
- [ ] Required gates remain network-independent.
- [ ] `pnpm run test:runtime` exits 0.
- [ ] `pnpm run test:local-harness` exits 0 if runtime scripts or docs/plans paths trigger it.

**Rollback**:

- Restore prior placeholder only if this PR is reverted as a whole; do not silently demote an existing check without reviewer evidence.

**Outcomes served**: 1, 5, 9.

## Phase 8: Evidence Hygiene And Preflight Hardening (PR7)

**Goal**: Prevent stale evidence, unsafe evidence paths, unredacted secrets, and design/runtime preflight surprises.

**TDD strategy**:

- RED: Add fixtures for invalid evidence directory names, forbidden `.evidence/local`, `.evidence/tmp`, `.evidence/**/*.log`, `.evidence/**/raw`, planted secrets, mobile-mcp pin drift, and Stitch preflight missing ADC/project.
- GREEN: Implement evidence hygiene validation and role-specific preflight status checks.
- REFACTOR: Extract shared secret-pattern module from existing validator logic without preserving stale line references.

**Tasks**:

- [ ] Fix all stale line citations before extracting secret-pattern logic.
- [ ] Implement `scripts/validate-evidence-hygiene.mjs`.
- [ ] Scan `.evidence/` and `docs/plans/work-units/` for secret patterns.
- [ ] Enforce durable evidence path rules from `06-gates-and-evidence.md`.
- [ ] Check mobile-mcp pin alignment between `.codex/config.toml` and `PROJECT_ENVIRONMENT.md` without adding mobile-mcp to CI execution.
- [ ] Add design-role-only Stitch preflight status checks; print only presence/status, never credential values.

**Quality gate**:

- [ ] Evidence hygiene self-test exits 0.
- [ ] Planted-secret fixture fails with file and line.
- [ ] Non-design role skips Stitch checks.
- [ ] `pnpm run test:runtime` exits 0.
- [ ] `pnpm run test:local-harness` exits 0 if runtime paths change.

**Rollback**:

- Remove new hygiene validator and preflight additions; retain Phase 0 stale citation cleanup unless reverting the plan correction itself.

**Outcomes served**: 5, 7, 8, 9.

## Phase 9: Human/Ops Annex And Controlled Live Readiness

**Goal**: Define what becomes possible after repo-offline work, without executing external platform changes from this repo.

**Tasks**:

- [ ] Keep image build/push, webhook rules, pod creation, Secret/token provisioning, branch protection, release environment protection, bot accounts, and multi-pod rollout in an ops annex.
- [ ] Require recorded human/ops approval before live EAS commands, `eas whoami`, pod creation, webhook routing, branch protection changes, or token injection.
- [ ] Define a two-pod smoke after approval: `wm-po` + `wm-mobile-dev` clone/pnpm/preflight/push/PR.
- [ ] Define full six-pod drill only after two-pod smoke passes.
- [ ] Preserve release block until human approval record exists.

**Quality gate**:

- [ ] Repo-only PRs do not mutate external platform state.
- [ ] Live evidence is labeled as live and includes approval record.
- [ ] Local harness or source review is not described as proving OrbStack/OpenClaw, branch protection, webhook, store submission, or release behavior.

**Rollback**:

- Revert only repo annex docs. External ops rollback must be owned by ops and separately approved.

**Outcomes served**: 7, 8.

## Reviewer Gates

Before implementation begins:

- [ ] xhigh review this plan against the SoT list and nine outcomes.
- [ ] xhigh must answer whether the plan can achieve the nine outcomes if executed in order.
- [ ] Any High or Critical finding blocks execution.

For each non-trivial implementation PR:

- [ ] Plan-level reviewer evidence before code changes.
- [ ] Final actual-work reviewer evidence after changes and gates.
- [ ] User report includes material `git diff` change details and skipped/blocked gates.

## Global Quality Gates

Use the narrowest applicable gate during each phase, but do not claim PR readiness until all required gates pass:

```text
node scripts/validate-team-doc.mjs
pnpm run test:runtime
pnpm turbo run lint test
pnpm run test:local-harness
pnpm --filter mobile exec expo install --check
pnpm --filter mobile lint
pnpm --filter mobile test
pnpm --filter mobile run doctor
codex mcp list
pnpm --filter mobile e2e:web
pnpm --filter mobile e2e
```

`test:runtime` is currently not run in this planning pass because the user explicitly instructed skipping it while another session is modifying that area. This means implementation beyond Phase 0 remains gated on later rebaseline.

## Risks

| Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- |
| Concurrent session changes runtime validators while this plan is executed | High | High | Phase 0 requires rebaseline before PR1+ implementation |
| Plan drift from template-runtime purpose into customer app work | Medium | High | Phase 1 guardrails and no-hardcode checks |
| Work-unit state conflicts in parallel stages | Medium | Medium | Append-only events, legal transitions, explicit parallel group |
| Human-gate envelope mistaken for cryptographic proof | Medium | High | Treat decision anchor as policy-level GitHub identity proof only |
| RN Web evidence overclaimed as native readiness | Medium | High | Evidence ladder and validator checks |
| Pod environment differs from boram evidence | Medium | Medium | Preflight capability report and fail-fast pin checks |
| Live EAS/ops work accidentally run before approval | Low | High | Phase 9 approval gate and forbidden command list |
| Secret leakage in evidence | Medium | High | Shared secret-pattern scanning and redaction tests |

## Final Acceptance

The full plan is accepted only when:

- Phase 0 is complete and full runtime gate rebaseline is recorded.
- PR1 through PR7 are merged through branch/PR with required checks.
- Offline repo gates pass and reviewer evidence is persisted.
- Any live EAS/pod/webhook/Secret/branch-protection work has explicit human/ops approval before execution.
- A final drill can take a synthetic customer request to the pre-release human gate using GitHub work-unit artifacts, deterministic checks, role handoff records, RN Web evidence, native evidence at the required ladder level, and release blocked until human approval.

## Notes

- This plan does not authorize implementation by itself; it is the execution plan that must receive xhigh review and user approval.
- This plan intentionally keeps customer-app feature expansion out of scope.
- The next mechanical action after approval is Phase 0, not PR1 implementation.

**Last Updated**: 2026-06-10
