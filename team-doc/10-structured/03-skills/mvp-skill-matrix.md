---
docType: "reference"
sourcePageId: "1373667362"
sourceTitle: "01-4. Skills"
sourceVersion: "4"
sourceHeading: "MVP skill matrix"
---

# Current repo skill matrix

This matrix records the repo-local Codex skills currently generated under `new-mobile-app/.agents/skills`. These are the active skill slugs for this repository. Historical source-skill names from Confluence are not treated as generated repo skills unless a matching `.agents/skills/<slug>/SKILL.md` directory exists.

## Deployment matrix

| Skill | Location | Target SOUL.md role(s) | Default case coverage |
| --- | --- | --- | --- |
| `wm` | `.agents/skills` | WonderMove repo workflow entrypoint | Scoped planning, TDD implementation routing, reviewer evidence, and branch/PR readiness |
| `mobile-app-dev-workflow` | `.agents/skills` | Mobile App Dev | Repo-scoped Expo React Native implementation after design/API readiness |
| `mobile-backend-api-integrator-workflow` | `.agents/skills` | Backend/API Integrator | Mobile-facing API contracts, schemas, mocks, fixtures, auth/session, and error mapping |
| `po-requirement-office-hours` | `.agents/skills` | Product/Planning | Ambiguous requirement clarification before PRD decomposition |
| `po-work-unit-planning-and-agent-sprint` | `.agents/skills` | Product/Planning | Bounded MVP slice, story, task, sprint, or triage shaping |
| `po-prd-to-execution` | `.agents/skills` | Product/Planning | PRD/work-unit conversion into role-scoped execution tasks |
| `po-planning-completeness-review` | `.agents/skills` | Product/Planning | Completed planning package review before execution starts |
| `design-mobile-design-handoff` | `.agents/skills` | Design | Stitch-backed mobile design handoff after Product/Planning readiness |
| `design-stitch-mcp-operating-rules` | `.agents/skills` | Design | Stitch MCP execution rules, DESIGN.md handling, P0/P1 approvals, and handoff publication |
| `e2e-test` | `.agents/skills` | QA evidence workflow | Planned RN Web Playwright, Maestro, mobile-mcp, or manual HUMAN-GATE evidence capture |
| `qa-railway-workflow` | `.agents/skills` | QA/Release | Railway CLI install/login/project/service/database/variables/domain/deploy/status/logs/health evidence, RN Web API URL handoff, and PROJECT_ENVIRONMENT.md synchronization |

No additional generated repo skill is missing from the current `.agents/skills` directory. Case A bootstrap remains a human/operator and Product/Planning coordination flow rather than a generated repo-local skill in the current configuration. The deterministic gatekeeper remains a required-check concept, not a generated LLM skill.

## Source

- Page ID: 1373667362
- Source heading: MVP skill matrix
- Source version: 4
