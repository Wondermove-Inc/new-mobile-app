---
docType: "reference"
sourcePageId: "1374289964"
sourceTitle: "Role-specific Codex Runtime"
sourceVersion: "3"
sourceHeading: "이 페이지의 역할"
---

# Codex Runtime Boundary

This page defines role-specific Codex runtime boundaries for the generated repo-local Codex assets. The active repo skill source is `.agents/skills`; historical Confluence source-skill names are mapping inputs only when a current repo adapter exists.

Its scope is to separate four runtime concerns into distinct paths:

- Role-specific thin wrapper skills.
- Read-only / advisory custom agents.
- Local advisory hooks.
- External/generated-agent runtime packages outside this repository.

Each of these is given its own install location and authority, so that native Codex CLI repo skills are not confused with external runtime packages, and so advisory guardrails are not mistaken for hard deterministic checks.

## Current repo-local runtime assets

- Repo skills live in `.agents/skills/<skill-name>/SKILL.md`.
- Custom read-only agents live in `.codex/agents/<agent-name>.toml`.
- Hooks live in `.codex/hooks.json` and `.codex/hooks/*.mjs`.
- MCP registration lives in `.codex/config.toml`.
- Runtime evals and evidence live under `evals/` and `.evidence/`.

The current generated repo skill set is: `wm`, `mobile-app-dev-workflow`, `mobile-backend-api-integrator-workflow`, `po-requirement-office-hours`, `po-work-unit-planning-and-agent-sprint`, `po-prd-to-execution`, `po-planning-completeness-review`, `design-mobile-design-handoff`, `design-stitch-mcp-operating-rules`, and `e2e-test`.

## Source

- Page ID: 1374289964
- Source heading: 이 페이지의 역할
- Source version: 3
