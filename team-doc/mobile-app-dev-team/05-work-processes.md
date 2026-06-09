# Work Processes

## 1. Intake And Planning

1. Product/Planning receives the request.
2. If unclear, run `po-requirement-office-hours`.
3. If broad, run `po-work-unit-planning-and-agent-sprint`.
4. If ready, run `po-prd-to-execution`.
5. Before execution, run `po-planning-completeness-review`.
6. Route human gates before any execution work.

## 2. Design Readiness

1. Design receives an approved requirement or task.
2. Confirm `DESIGN.md` decision.
3. Prepare P0 scope/evidence approval packet.
4. Stop until Product/Planning records P0 approval.
5. Generate exactly two Stitch options.
6. Prepare P1 scope/evidence approval packet.
7. Stop until Product/Planning records P1 approval.
8. Extract/publish HTML and image artifacts.
9. Request `design-reviewer` before Mobile App Dev implementation begins.

## 3. API Readiness

1. Backend/API Integrator receives API-backed task or contract uncertainty.
2. Update or confirm `packages/contracts`.
3. Align mocks, fixtures, auth/session, and error mapping.
4. Ask Mobile Architect to co-review contract impact when integration starts.
5. Hand off stable contract to Mobile App Dev and QA/Release.

## 4. Implementation

1. `$wm` establishes scope, owner, affected paths, tests, evidence path, gate impact, and SoT sources.
2. Add or update the narrowest failing test/eval/validator/fixture first.
3. Mobile App Dev or Backend/API Integrator implements the smallest scoped change.
4. Run applicable local checks.
5. Request read-only reviewer evidence.
6. Prepare PR-ready diff and evidence summary.

## 5. QA And Release Evidence

1. QA/Release creates an E2E/evidence plan.
2. Reset the tested instance.
3. Run planned RN Web, Maestro, mobile-mcp, Railway, or manual HUMAN-GATE evidence.
4. Record commands, logs, screenshots, issues, and summary.
5. Classify failures and route to owner.
6. Production submit requires recorded human approval.

## 6. Failure Loop

1. Failed check remains failed.
2. `wm-gate-fix-advisor` may classify failure read-only.
3. Owning implementation workflow fixes the issue.
4. QA/Release reruns or records the relevant evidence.
5. Rework cap or risk acceptance goes to Product/Planning/human owner.

