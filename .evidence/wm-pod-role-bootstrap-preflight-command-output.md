# Pod Role Bootstrap Preflight Command Output

Date: 2026-06-13
Scope: `pod-role-bootstrap` / `scripts/codex-preflight.mjs` fix for Codex
Node.js script or symlink wrappers such as `/workspace/.npm-global/bin/codex`.

## Fail-First Check

After adding `pod.valid-codex-node-wrapper.json` to the static self-test list
and before changing candidate validation logic:

```text
command=node scripts/codex-preflight.mjs --self-test
exit=1

codex-preflight self-test failed
- pod.valid-codex-node-wrapper.json: expected status available, got blocked
- pod.valid-codex-node-wrapper.json: expected acceptedPath /workspace/.npm-global/bin/codex, got null
```

## Focused Preflight Self-Test

After implementation and after adding the x86_64 wrapper fixture:

```text
command=node scripts/codex-preflight.mjs --self-test
exit=0

codex-preflight self-test passed
```

## Runtime Gate

```text
command=pnpm run test:runtime
exit=0

Validated 13 skills, 13 agents, and 4 hook events.
Codex headless review helper self-test passed.
Validated repo operations policy ownership.
Validated current mobile-app-dev-team managed docs.
Validated work-unit status fixtures.
Validated work-unit status artifacts.
Validated work-unit next-action resolver fixtures.
Validated EAS evidence ingest fixtures.
Validated project environment fixtures.
Validated project environment drift checks.
Validated evidence hygiene fixtures.
Validated evidence hygiene artifacts.
Passed 44 hook fixture tests.
```

## Workspace Lint And Tests

```text
command=pnpm turbo run lint test
exit=0

Packages in scope: @template/api, @template/contracts, mobile
Tasks: 7 successful, 7 total
@template/contracts test: 1 passed
@template/api test: 1 file passed, 2 tests passed
mobile test: 2 suites passed, 5 tests passed
```

## Local Harness Gate

```text
command=pnpm run test:local-harness
exit=0

clean-tree-guard self-test passed
codex-preflight self-test passed
codex-preflight accepted /opt/homebrew/bin/codex (codex-cli 0.137.0)
test:runtime exited 0
pnpm turbo run lint test exited 0
self-test all passed
local harness all passed
```

## Reviewer Focused Reruns

The read-only final reviewer also reran the following focused checks:

```text
command=git diff --check -- scripts/codex-preflight.mjs mobile-app-dev-team/09-pod-native-openclaw-skills/pod-role-bootstrap/SKILL.md
exit=0

command=node scripts/codex-preflight.mjs --self-test
exit=0
codex-preflight self-test passed
```

## Residual External-State Limits

These gates are repo-local. They do not prove actual OpenClaw/OrbStack pod
execution, live GitHub auth, native device behavior, GitHub branch protection,
or other external platform state.
