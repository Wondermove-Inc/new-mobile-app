# Gates And Evidence

## Required Gates

| Scope | Required Evidence |
| --- | --- |
| Workspace code | `pnpm turbo run lint test` |
| Codex runtime artifact | `pnpm run test:runtime` |
| Runtime path/local harness | `pnpm run test:local-harness` |
| Mobile environment/runtime | `expo install --check`, mobile lint/test/doctor, `codex mcp list` |
| Mobile UI/runtime with available device | Serial `mobile-mcp` visual QA/device automation |
| RN Web E2E | Playwright command output and `.evidence/e2e-test/...` artifacts |
| Native E2E | Maestro/mobile-mcp evidence when simulator/device is available |
| Production submit | Human approval record plus release evidence |

## Evidence Rules

- Done requires linked artifacts, not status-only claims.
- Evidence should live under `.evidence/` or `evals/*/results/` when the workflow requires persisted proof.
- E2E evidence uses `.evidence/e2e-test/<YYYYMMDD-HHMMSS>-<slug>/`.
- Command output must include exit status.
- Screenshots/logs are required for visual or runtime failures when available.
- Secrets, tokens, private `.env` values, bearer credentials, signing keys, and private endpoints must not be printed or persisted.

## Railway Boundary

`qa-railway-workflow` can prove Railway CLI setup, service/database/domain/deploy status, health endpoints, and RN Web E2E against a deployed API URL.

It does not prove:

- Native module behavior.
- OS permissions.
- mobile-mcp visual QA.
- Maestro native automation.
- Store submission readiness.
- Full production release approval.

## Human Gates

Stop for recorded human decision when work involves:

- Production submit.
- Payment or money movement.
- PII/privacy-sensitive behavior.
- External messaging, email, SMS, push notification.
- Legal, terms, contract, or compliance decision.
- Business/budget owner decision.
- Irreversible scope tradeoff.
- Accepting risk after a failed gate.

