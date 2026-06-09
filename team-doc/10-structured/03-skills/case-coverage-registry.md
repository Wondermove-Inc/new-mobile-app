---
docType: "reference"
sourcePageId: "1373667362"
sourceTitle: "01-4. Skills"
sourceVersion: "4"
sourceHeading: "Case A-H skill coverage registry"
---

# Case A-H skill coverage registry

Maps each workflow case (A-H plus cross-cutting concerns) to the current generated repo-local skill, deterministic gate, or human/operator owner. New skill slugs are added only when the current `.agents/skills` set cannot close a recurring process gap and the repo SoT is updated first.

## Case-to-owner coverage

| Case | Coverage decision | Skill / mode | Target role(s) | Rationale |
| --- | --- | --- | --- | --- |
| A. New project bootstrap | Human/operator plus planning coordination | `po-work-unit-planning-and-agent-sprint` as planning support when scoped work must be shaped | Product/Planning, Mobile Architect, QA/Release, Mobile App Dev, operator (human) | No generated repo-local bootstrap skill exists in the current configuration; repo creation and external service registration remain human/operator responsibilities. |
| B. PRD intake and Epic/Task breakdown | Current Product/Planning adapters | `po-requirement-office-hours`, `po-work-unit-planning-and-agent-sprint`, `po-prd-to-execution`, `po-planning-completeness-review` | Product/Planning (owner); Design, Mobile Architect, Backend/API Integrator, QA/Release review | Planning uses `po-*` repo adapters; execution starts only after readiness and evidence are complete. |
| C. UI-only feature | Current Design + Mobile App Dev + QA evidence path | `design-mobile-design-handoff`, `design-stitch-mcp-operating-rules`, `mobile-app-dev-workflow`, `e2e-test` | Design, Mobile Architect, Mobile App Dev, QA/Release | Design produces Stitch-backed handoff; Mobile App Dev implements; QA evidence is planned and recorded through `$e2e-test` when invoked. |
| D. API-backed feature | Current Design + API Integrator + Mobile App Dev path | `design-mobile-design-handoff`, `mobile-backend-api-integrator-workflow`, `mobile-app-dev-workflow`, `e2e-test` | Design, Mobile Architect, Backend/API Integrator, Mobile App Dev, QA/Release | Shared API/domain schemas stay in `packages/contracts`; backend/API integrator owns mobile-facing contract and fixture changes. |
| E. Backend/API-centric change | Current backend/API integrator wrapper | `mobile-backend-api-integrator-workflow`, `e2e-test` | Backend/API Integrator, Mobile Architect, Mobile App Dev, QA/Release | Contract, mock, fixture, auth/session, and error mapping changes are owned by Backend/API Integrator before mobile consumes them. |
| F. QA failure or gate failure | Evidence triage plus owner rework | `e2e-test`; read-only gate triage may use `wm-gate-fix-advisor` | QA/Release, failed-task owner, Mobile Architect, Product/Planning/human owner | Evidence workflow records objective failures; failed gates are not reinterpreted by LLM judgment. |
| G. Preview/internal release | QA/release evidence and human-visible release readiness | `e2e-test`; `$wm` may coordinate repo-scoped gate readiness | QA/Release, Product/Planning, Mobile Architect | Preview readiness depends on EAS/Maestro/mobile-mcp evidence where available and recorded residual risk where not. |
| H. Production submit | Human-gated release action | `e2e-test`; `$wm` may coordinate repo evidence, but production approval is human | QA/Release, Product/Planning (human approval), Mobile Architect | Production submit never auto-runs before recorded human approval. |
| Cross-cutting | Keep deterministic required checks | Deterministic gate/check, not a generated skill | Gatekeeper concept (non-LLM), all LLM roles comply | No workflow skill replaces deterministic pass/fail. |
| Cross-cutting | Preserve role responsibility | Mobile Architect ADR/risk checklist | Mobile Architect | App-wide ADR/risk records stay in Case A template-deviation, Case D/E contract co-sign, and Case G/H EAS strategy checklists. |

## Governing rules

- The current `.agents/skills` set is the generated repo skill source of truth.
- Case A-H coverage is defined against the recurring workflows in 01-3; no per-role SOUL.md wrapper is created by default.
- If an existing MVP skill already owns a case, extend it via a mode/checklist instead of adding a new skill.
- New skills are added only for recurring process gaps that existing MVP skills cannot close.
- Deterministic gates remain hard gates; LLM skills, hooks, and reviewers do not override or reinterpret pass/fail.
- Production submit does not auto-run before human approval.

## Source

- Page ID: 1373667362
- Source heading: Case A-H skill coverage registry
- Source version: 4
