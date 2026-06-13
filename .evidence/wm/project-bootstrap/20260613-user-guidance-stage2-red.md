# Stage 2 RED Evidence: Project Bootstrap User Guidance

Date: 2026-06-13
Baseline: b144d53879b2f0cc8c98d509a41d5f6074a76fea
Stage: tests/evals first

## Command: `bash evals/skills/project-bootstrap-agent-setup-smoke.sh`

Exit status: 1

Expected RED output:

```text
assertion failed: expected /var/folders/q9/m8qpcc0n2zd5w9t5tg9r9f8w0000gn/T/tmp.MLCndpFIt5/state/project-bootstrap-blockers.md to contain ## Action needed
```

Interpretation: the existing generated blocker Markdown still uses the previous
shape and does not satisfy the new plain-language `## Action needed` contract.

## Command: `node scripts/validate-team-doc.mjs`

Exit status: 1

Expected RED output:

```text
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: Public App Config Blockers
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: API/Railway Secret Blockers
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: public non-secret app config values
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: Secret, secure store, tool auth, mounted file, or human-present login
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: app display name
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: app slug
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: app scheme
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: iOS bundle ID
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: Android package
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: public API URL
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: Railway tokens
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: platform owner refresh
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: approved Codex CLI artifact
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: report directories
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: role identity writing
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: canonical managed-path repair
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: pinned credential-free MCP registration
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: pnpm pin alignment
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/report-template.md missing required role-boundary term: Action needed
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/report-template.md missing required role-boundary term: What you need to do
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/report-template.md missing required role-boundary term: What I will do after that
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/report-template.md missing required role-boundary term: Do not send in chat
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: Action needed
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: What you need to do
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: What I will do after that
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: Do not send in chat
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: GitHub login screen
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: approved secure GitHub auth source
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: passwords, tokens, 2FA codes
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: platform owner refresh
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: approved Codex CLI artifact
```

Interpretation: validator coverage now fails until the blocker guide, report
template, and preflight script encode the new user-facing guidance contract.

## Stage 2 Reviewer NO_GO Fix

The first Stage 2 reviewer run identified two medium findings:

- missing direct coverage for missing Codex CLI / runtime-toolchain guidance;
- incomplete public config, Railway token, and agent-owned do-not-ask coverage.

The tests/evals were expanded before behavior edits:

- `evals/skills/project-bootstrap-agent-setup-smoke.sh` now includes
  `case_project_preflight_guides_missing_codex_cli`;
- validator terms now require `platform owner refresh`,
  `approved Codex CLI artifact`, public config specifics, Railway token safety,
  and agent-owned do-not-ask phrases.

## Stage 2 Reviewer NO_GO Rerun Fix

The Stage 2 reviewer rerun identified that bare `slug` coverage could be
satisfied by existing role-identity wording such as OpenClaw skill slug text.
The tests/evals were tightened before behavior edits:

- public config smoke assertions now require `app slug`, `app scheme`, and
  `iOS bundle ID`;
- validator terms now require the same app-specific labels, avoiding false
  positives from unrelated skill or role slug documentation.

Rerun RED commands after this fix:

```text
$ bash evals/skills/project-bootstrap-agent-setup-smoke.sh
assertion failed: expected /var/folders/q9/m8qpcc0n2zd5w9t5tg9r9f8w0000gn/T/tmp.gxWtEdRJ0M/state/project-bootstrap-blockers.md to contain ## Action needed

$ node scripts/validate-team-doc.mjs
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: Public App Config Blockers
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: API/Railway Secret Blockers
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: public non-secret app config values
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: Secret, secure store, tool auth, mounted file, or human-present login
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: app display name
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: app slug
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: app scheme
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: iOS bundle ID
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: Android package
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: public API URL
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: Railway tokens
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: platform owner refresh
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: approved Codex CLI artifact
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: report directories
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: role identity writing
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: canonical managed-path repair
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: pinned credential-free MCP registration
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md missing required role-boundary term: pnpm pin alignment
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/report-template.md missing required role-boundary term: Action needed
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/report-template.md missing required role-boundary term: What you need to do
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/report-template.md missing required role-boundary term: What I will do after that
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/report-template.md missing required role-boundary term: Do not send in chat
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: Action needed
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: What you need to do
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: What I will do after that
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: Do not send in chat
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: GitHub login screen
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: approved secure GitHub auth source
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: passwords, tokens, 2FA codes
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: platform owner refresh
- mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh missing required role-boundary term: approved Codex CLI artifact
```
