# Report: project-bootstrap user-request cases

## Scope

Identify SoT-backed cases where `project-bootstrap`/pod agents must ask the
user or platform owner for input because the agent cannot safely complete the
item alone. GitHub login is one example, not the whole set.

## SoT Inputs

- `project-bootstrap/SKILL.md` requires agents to perform non-secret local setup
  before asking the user, and forbids asking users for agent-owned setup.
- `blocker-resolution-guide.md` defines agent-owned setup, human-owned blockers,
  and current blocker handling.
- `16-pod-environment-bootstrap.md` defines configuration channels, missing or
  blocked criteria, and ready definition.
- `pod-role-bootstrap/SKILL.md` defines nested pod-readiness blockers and the
  minimum request guidance for Git identity, GitHub auth, and Codex CLI validity.
- `project-bootstrap/scripts/project-bootstrap-agent-setup.sh` defines which
  deterministic setup steps are attempted before blockers remain.
- `project-bootstrap/scripts/project-bootstrap-preflight.sh` defines the
  top-level bootstrap blockers, nested report handling, and user-understandable
  report wording.
- `scripts/codex-preflight.mjs` defines repo-local pod preflight blockers such
  as `missing-role-identity`, `git-identity-missing`,
  `github-auth-unavailable`, `codex-config-missing`,
  `codex-mcp-unavailable`, and `stitch-preflight-missing`.

## Do Not Ask The User For These

These are agent-owned when source evidence exists:

- Choosing/writing `WM_ROLE`, `WM_EXPECTED_ROLE`, or `/workspace/IDENTITY` when
  SOUL, pod selector, or role handoff already identifies the role.
- Creating `/workspace/state` or report directories.
- Running status checks such as `gh auth status`, `codex mcp list`, `git config`
  reads, version checks, or file existence checks.
- Repairing `/workspace/CODEX_MANAGED_PATHS.md` when `REPO_PATH` is the canonical
  WonderMove repo path and no conflicting ownership exists.
- Registering missing required MCPs from pinned credential-free repo SoT.
- Aligning the package manager pin for `pnpm-pin-mismatch`; `pod-role-bootstrap`
  activates the repo-pinned pnpm version and must not ask the user to choose or
  install an arbitrary pnpm version.
- Running role-specific status-only setup reports when the skill exists and the
  action is not a live external operation.
- Creating `/workspace/state/pod-role-bootstrap-report.json`; that is written by
  `pod-role-bootstrap`.

## User-Request Cases To Add As First-Class Messages

| Case | Trigger / blocker | Minimum user request | What the agent does after |
| --- | --- | --- | --- |
| GitHub login or GitHub auth material | `github-auth-unavailable`; GitHub operation needed and `gh auth status` fails; nested `pod-role-bootstrap` report includes `github-auth-unavailable` | Ask for either an approved mounted/managed GitHub auth source or user's presence for `gh auth login` / browser-device login. Never ask for token/password/2FA code in chat. | Open the auth flow if human is present, run `gh auth status`, run `gh auth setup-git` only after auth exists, verify repo access, then rerun bootstrap/preflight. |
| Git commit author identity | `git-identity-missing` and no complete approved local source exists | Ask for one approved non-secret Git identity pair or an approved local handoff path. Do not invent values or combine partial sources. | Set `git config --global user.name/user.email`, then rerun `pod-role-bootstrap`/preflight. |
| Missing role source evidence | `missing role identity`, `missing-role-identity`, role mismatch, or non-canonical role when there is no SOUL/selector/handoff | Ask for pod artifact refresh or role-source handoff. Do not ask the user to choose a role manually. | Derive canonical slug from the refreshed source, write all role surfaces, rerun preflight. |
| Missing repo checkout and no safe clone source | repo path missing and `REPO_CLONE_URL` missing or token-bearing | Ask for a non-secret clone URL, repo artifact, or approved GitHub auth for private repo access. Do not accept token-bearing URL in chat/logs. | Clone/acquire repo only from non-secret URL plus approved auth, then rerun managed-path and SoT checks. |
| Missing required repo SoT artifact | `missing repo SoT file <path>` or `codex-config-missing` | Ask for the missing repo artifact or correct checkout. For `codex-config-missing`, request the repo's approved `.codex/config.toml` artifact or correct checkout; do not infer MCP settings from memory. | Recheck required files and rerun project preflight and repo-local pod preflight. |
| Missing required pod-native skill artifact | `missing /workspace/skills/<slug>` | Ask for skill installation or pod artifact refresh for that exact skill. | Recheck `/workspace/skills`, then rerun project-bootstrap setup/preflight. |
| Wrong/non-canonical managed repo path | `blocked_wrong_repo_path`, unknown/conflicting repo path, or unsafe managed path ownership | Ask for owner-approved repo path/managed-path policy or pod artifact refresh. | Repair managed path only after path is canonical or owner-approved; otherwise remain blocked. |
| Pod runtime, toolchain, or Codex CLI availability | `node-major-mismatch`, `no-valid-codex-binary`, terminal missing Codex CLI after local Codex precheck, or `codex-mcp-unavailable` after pinned credential-free MCP repair has been attempted | Ask the platform/runtime owner to refresh the pod image/runtime, provide an approved Codex CLI/toolchain artifact, or provide the approved MCP/tool-auth configuration. Do not ask the user to install arbitrary tools manually or use `@latest`. | Rerun `node --version`, `codex --version`, `codex exec --help`, `codex mcp list`, `project-bootstrap`, and `pod-role-bootstrap` preflight, recording status only. |
| Credential/status-only external capability | Missing credential status for GitHub, Codex auth, Expo/EAS, Railway, Google ADC/Stitch, API secrets, ASC, Google service account, or database/API auth when in scope | Ask for Secret/secure-store/tool-auth/mounted-file availability or human-present login, never plaintext secret values. | Run redacted status checks and role-specific setup reports, then continue. |
| Design Stitch readiness | Design role and `stitch-preflight-missing` / missing `stitch-adc-setup report` because ADC/project is absent | Ask for Google ADC/Stitch credential/project setup through approved mounted/tool auth or human-present login. | Run `stitch-adc-setup`, record status only, rerun preflight. |
| QA/Release EAS readiness | QA/Release role and missing `eas-robot-auth-setup report` / EAS auth material when EAS/Maestro evidence is in scope | Ask for Expo/EAS robot auth Secret/status source or human-owned EAS account/project setup. | Run `eas-robot-auth-setup`, record status only, continue QA flow. |
| Public Expo/customer app config | Preview/release/EAS job requires app display name, slug, scheme, iOS bundle id, Android package, or public API URL | Ask for the missing public, non-secret config values. Explicitly warn not to include bearer tokens/private endpoints. | Apply through approved non-secret config channel and rerun config/preflight checks. |
| API/backend secrets when API work is in scope | `DATABASE_URL`, `API_BEARER_TOKEN`, Railway auth, or other backend credential status missing for API work | Ask for secretRef/secure-store/mounted credential availability, not values in chat. | Run redacted API/Railway status or health checks only after approved secret source exists. |
| Live external or risk-bearing action | Missing `human-gate/v1`; production, store submit, paid account setup, branch protection mutation, deploy, failed-gate risk acceptance, privacy/legal/payment risk | Ask for a linked `human-gate/v1` decision naming exact action and evidence path. | Execute only the approved action, record evidence, and never accept risk on behalf of owner. |
| Missing pod environment artifact/update | ConfigMap/Secret/pod-template value is absent or stale; source skill/report says artifact refresh is required | Ask platform owner to patch the exact artifact/channel and restart/re-source according to delivery channel. | Wait for readiness/re-source, then rerun pod-internal redacted preflight. |

## Current Gap

The current guide has a human-readable table only for
`git-identity-missing`, `github-auth-unavailable`, and nested
`pod-role-bootstrap blocked`. The SoT already defines additional user-owned
classes, but they are not yet mapped to dedicated user-facing Markdown messages
like the GitHub example. A follow-up skill update should add reusable
`User-facing message` sections/templates for the cases above, grouped by request
type:

1. human-present login/auth;
2. approved non-secret value;
3. missing source/pod artifact;
4. approved Secret/mounted credential source;
5. linked `human-gate/v1`;
6. public non-secret customer config;
7. pod runtime/toolchain repair.

## Recommended Priority

P0:

- GitHub auth login/material.
- Git identity approved pair.
- Missing role source handoff.
- Missing repo/SoT/skill artifacts.
- Pod runtime/toolchain or Codex CLI availability after agent-owned repair fails.
- Credential/secret source missing.
- Human-gate/v1 required.

P1:

- Role-specific Design Stitch auth/project.
- QA/Release EAS robot auth/project.
- Public Expo/customer app config.
- API/Railway secret/status source.
- Pod config/restart/re-source artifact refresh.
