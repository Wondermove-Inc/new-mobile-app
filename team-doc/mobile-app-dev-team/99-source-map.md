# Source Map

## Current Repo Sources

| Source | Use |
| --- | --- |
| `AGENTS.md` | Required repo rules, runtime paths, gate expectations, constraints |
| `PROJECT_ENVIRONMENT.md` | Current Expo/RN/API/Codex runtime facts |
| `.agents/skills/<slug>/SKILL.md` | Active repo-local skill contracts |
| `.codex/agents/<agent>.toml` | Active custom agent contracts |
| `team-doc/10-structured/03-skills/mvp-skill-matrix.md` | Current skill matrix reference |
| `team-doc/10-structured/03-skills/case-coverage-registry.md` | Case A-H process reference |
| `team-doc/00-source/.../01-2-조직-구성과-역할-1373765682.md` | Original 6 LLM + Gatekeeper role source |
| `team-doc/00-source/.../01-5-soul-md-템플릿-1373700138/` | Historical SOUL.md source pages |

## active-vs-historical skill crosswalk

| Historical Source Name | Current Status | Current Handling |
| --- | --- | --- |
| `mobile-prd-to-execution` | historical source name | Current repo adapter is `po-prd-to-execution`. |
| `mobile-requirement-office-hours` | historical source name | Current repo adapter is `po-requirement-office-hours`. |
| `mobile-work-unit-planning-and-agent-sprint` | historical source name | Current repo adapter is `po-work-unit-planning-and-agent-sprint`. |
| `mobile-planning-completeness-review` | historical source name | Current repo adapter is `po-planning-completeness-review`. |
| `mobile-design-handoff` | historical source name | Current repo adapter is `design-mobile-design-handoff`. |
| `mobile-api-contract` | historical source name | Do not list as active unless `.agents/skills/mobile-api-contract/SKILL.md` exists. Current active path is `mobile-backend-api-integrator-workflow` plus `packages/contracts`. |
| `mobile-qa-release` | historical source name | Do not list as active unless `.agents/skills/mobile-qa-release/SKILL.md` exists. Current active QA skills are `e2e-test` and `qa-railway-workflow`. |
| `mobile-gatekeeper` | historical deterministic concept | Not an LLM skill in the current managed docs. Treat as deterministic required-check concept. |
| `mobile-project-bootstrap-workflow` | historical/planned source name | No active repo-local skill in current `.agents/skills`. Case A remains human/operator plus Product/Planning coordination. |

## Stale Or Lower-Priority Sources

`team-doc/10-structured/06-codex-runtime/runtime-boundary.md` may omit newer active skills such as `qa-railway-workflow`. When it conflicts with `PROJECT_ENVIRONMENT.md`, `.agents/skills`, or the current skill matrix, use current repo files as the stronger source.

## Reviewer Notes Incorporated

- Design owns design quality. Product/Planning P0/P1 records scope/evidence approval only.
- Railway/RN Web evidence does not replace native Maestro/mobile-mcp or production release readiness.
- `$wm routing` should distinguish current `wm-*`, `po-*`, `design-*` agents from legacy mobile-* agents.

