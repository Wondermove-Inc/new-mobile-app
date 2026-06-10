# Repo Operations

This document is the canonical root-owned operating policy for this repository.
It explains where repo-wide operating rules live and how validators enforce
them. It does not replace `AGENTS.md` as the mandatory agent instruction
entrypoint, and it does not replace `PROJECT_ENVIRONMENT.md` as the current
runtime facts document.

## Policy Ownership Map

| Path | Owner Role |
| --- | --- |
| `AGENTS.md` | Mandatory agent execution rules, constraints, runtime paths, and required gates. |
| `PROJECT_ENVIRONMENT.md` | Current runtime and environment facts. |
| `REPO_OPERATIONS.md` | Canonical repo-wide operating policy and policy ownership model. |
| `team-doc/mobile-app-dev-team/` | Team, role, process, reference, and migration documentation. |
| `team-doc/00-source/` | Immutable Confluence source/export evidence. |
| `team-doc/10-structured/` | Generated or structured reference layer, not current policy owner. |
| `scripts/` | Executable validation and test tooling, not policy owner. |

When these documents conflict, use the narrowest authoritative owner:
`AGENTS.md` for agent instructions, `PROJECT_ENVIRONMENT.md` for runtime facts,
this file for repo-wide operating policy, and role/team docs for role-specific
process detail.

## Document Strata

- Root policy and runtime files are the current canonical layer for repo-wide
  operations.
- Team docs describe how roles, processes, evidence, and migrations work within
  the mobile app development team.
- `team-doc/00-source/` preserves source/export evidence and should not be
  rewritten as current operating policy.
- `team-doc/10-structured/` remains a generated/reference layer until a
  separately approved migration or archive plan changes that status.

Do not delete, rewrite, or migrate `team-doc/00-source/` or
`team-doc/10-structured/` only because scripts or documents reference them.
Classify each reference first as current invariant, source/export integrity,
generated/reference traceability, migration evidence, or accidental coupling.

## Source And Archive Rules

`team-doc/00-source/` is immutable source/export evidence by default. If it is
ever moved or archived, the change must preserve `pageId`, source version,
`fetchedAt`, `sourceUrl`, and an explicit archive/sourcePath strategy before
the original path is removed.

`team-doc/10-structured/` is generated/reference material by default. It may be
used as migration input, historical examples, or generated integrity evidence,
but it is not the canonical owner of current repo-wide policy. A migration plan
must classify each structured reference before moving, rewriting, archiving, or
dropping it.

## OpenClaw And Codex Operational Boundaries

Pod-native OpenClaw skills use `/workspace/skills/<slug>/SKILL.md` at runtime
and are authored under `team-doc/mobile-app-dev-team/09-pod-native-openclaw-skills/`.
Repo-local Codex skills and agents use `.agents/skills/<skill-name>/SKILL.md`
and `.codex/agents/<agent-name>.toml`.

### Codex-only Repo Work Policy

For OpenClaw pods operating on a Codex-managed repository, repository work must
be routed through Codex CLI. The pod-local AGENTS.md policy should stay
agent-neutral and describe `this agent`, `assistant`, or `the agent`, not a
specific personal name. Codex-managed paths are listed in
`/workspace/CODEX_MANAGED_PATHS.md`, and the repository checkout path for this
project is `/workspace/new-mobile-app/`. The default Codex hook wrapper is
`/workspace/codex-hooks/codex-run` when available.

Do not print or commit auth tokens, API keys, OAuth tokens, refresh tokens,
passwords, or full secret-bearing config contents. Reports must use redacted
status, presence, file mode, and key-name summaries only.

## Evidence Gates

Done requires linked evidence, not status-only prose. For runtime and docs
changes, run the applicable gates from `AGENTS.md` and keep command output with
exit status in evidence.

## Package Script Composition

Target runtime composition after the repo-operations validator is added:

```text
pnpm run validate
pnpm run validate:repo-operations
pnpm run validate:team-doc
pnpm run test:hooks
```

`pnpm run test:runtime` must compose those checks so adding root policy
validation does not weaken existing runtime or team-doc validation. Until
`scripts/validate-repo-operations.mjs` and `validate:repo-operations` exist,
the existing `validate`, `validate:team-doc`, and `test:hooks` composition
remains the executable runtime gate. Runtime path or harness changes must also
run `pnpm run test:local-harness` unless a source-backed blocker is reported.

Local validation and local harness evidence prove repo-local rules only. They do
not prove actual OrbStack/OpenClaw pod execution, Jira or Confluence behavior,
GitHub branch protection, EAS production submit, or external platform state.

## Validator Responsibility Model

Validators enforce documented policy; they are not the policy owner.

- `scripts/validate-repo-operations.mjs` validates root policy ownership,
  `AGENTS.md` linkage, package script composition, and selected cross-document
  operating-policy invariants.
- `scripts/validate-team-doc.mjs` validates team-doc structure, source/export
  integrity, generated/reference integrity, role/process documents, and current
  migration checks until those responsibilities are split by a later approved
  plan.
- Package scripts compose subvalidators explicitly. Do not rely on hidden
  coupling in a monolithic validator to preserve gate strength.

Future validator splitting must keep required gates explicit in `package.json`
and must include reviewer evidence before removing an existing check.
