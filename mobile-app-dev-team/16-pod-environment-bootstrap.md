# Pod Environment Bootstrap

This document is the zero-to-ready sequence for a fresh OpenClaw role pod that
will work on this Codex-managed mobile app template repository.

It is source guidance only. It does not modify a live pod, GitHub setting,
Secret, ConfigMap, EAS project, or Stitch project, and it does not prove actual OrbStack/OpenClaw pod execution.

## Source Of Truth

- `AGENTS.md` defines repo rules, runtime paths, and required gates.
- `REPO_OPERATIONS.md` defines the Codex-only repo work policy for pods.
- `PROJECT_ENVIRONMENT.md` defines current Codex MCP pins and runtime facts.
- `.codex/config.toml` is the pinned MCP configuration source.
- `09-pod-native-openclaw-skills/README.md` is the pod-native skill matrix.

## Zero-To-Ready Sequence

1. Pod ConfigMap and Secret material must exist before bootstrap starts.
   Secret values are never printed; reports use status only.
2. Run `codex-cli-auth-setup` from `/workspace/skills/codex-cli-auth-setup/SKILL.md`
   to verify Codex CLI and auth readiness without printing secrets.
3. Resolve role identity from `WM_ROLE` or `/workspace/IDENTITY`.
4. Ensure the repo checkout exists at `/workspace/new-mobile-app`.
   If it is missing, `REPO_CLONE_URL` must be provided by explicit pod config.
5. Ensure `/workspace/CODEX_MANAGED_PATHS.md` contains the
   `/workspace/new-mobile-app/` managed path entry. A pod is not ready for
   Codex-managed repo work until that entry exists.
6. Run `pod-role-bootstrap` from `/workspace/skills/pod-role-bootstrap/SKILL.md`.
   It aligns `pnpm@9.15.9`, runs `pnpm install --frozen-lockfile`, runs
   `node scripts/codex-preflight.mjs --pod --json`, and writes status only
   evidence under `/workspace/state/`.
7. Verify Codex MCP status from the checked-out repo using `.codex/config.toml`
   as the pin source. Do not duplicate MCP versions in pod-local claims.
8. Run role-specific checks when needed:
   - Design: `stitch-adc-setup` verifies Google ADC and Stitch MCP readiness.
   - QA/Release: `eas-robot-auth-setup` verifies EAS CLI and Expo robot auth
     readiness before any human-gated EAS/Maestro run.

## Ready Definition

A role pod is ready for repo work only when:

- role identity is resolved;
- `/workspace/new-mobile-app` exists;
- `/workspace/CODEX_MANAGED_PATHS.md` contains `/workspace/new-mobile-app/`;
- `pod-role-bootstrap` exits 0;
- required role-specific pod-native checks either pass or are documented as
  not applicable;
- any live external action is covered by the required `human-gate/v1` decision.

## Non-Claims

This bootstrap does not prove:

- live OrbStack/OpenClaw pod behavior outside the observed pod;
- GitHub branch protection, push, PR, or review behavior;
- EAS build, submit, update, Maestro cloud, or native device behavior;
- Stitch generation/export behavior;
- Jira, Confluence, Railway, or other external platform behavior.

Those claims require separate human-approved live evidence.
