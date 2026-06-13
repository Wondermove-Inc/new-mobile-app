# Reviewer Request: Quality Gate Auto Merge Plan

Please review the implementation plan at:

- `docs/plans/active/20260613-quality-gate-auto-merge-plan.md`

User request:

- Modify workflow so PRs auto-merge after CI Quality gate passes.
- First create a plan, get reviewer(xhigh) review, then proceed.

Verified SoT:

- `AGENTS.md`
  - TDD required.
  - Branch + PR required.
  - Quality gate must pass before merge.
  - No direct push to `main`.
  - No secrets.
- `REPO_OPERATIONS.md`
  - Local validation does not prove GitHub branch protection or external platform state.
  - Future gate changes must include reviewer evidence before removing or demoting checks.
- `PROJECT_ENVIRONMENT.md`
  - GitHub quality gate is `.github/workflows/quality-gate.yml`.
  - `$git-workflow` forbids self-approval and merge/delete during completion.
  - Live GitHub state remains external platform proof.
- `.github/workflows/quality-gate.yml`
  - Current PR workflow is `Quality gate`.
  - Job `check` runs `pnpm run test:runtime`, `pnpm turbo run lint test`, and conditional `pnpm run test:local-harness`.
- GitHub Docs, "Automatically merging a pull request"
  - Native auto-merge merges only when all merge requirements are met.
  - Repository auto-merge must be enabled first.
- GitHub CLI manual, `gh pr merge`
  - `--auto` automatically merges only after necessary requirements are met.
  - `--squash`/`--merge`/`--rebase` provide non-interactive merge strategy.

Proposed implementation:

- Add `.github/workflows/auto-merge.yml`.
- Trigger on `workflow_run` completion for `Quality gate`.
- Guard on:
  - source event is `pull_request`
  - conclusion is `success`
  - one associated PR exists
  - base branch is `main`
  - PR is open and not draft
  - PR head SHA matches the successful workflow run head SHA
- Use `GITHUB_TOKEN`, no PAT/secret.
- Use:

```sh
gh pr merge "$PR_URL" --auto --squash --delete-branch --match-head-commit "$HEAD_SHA"
```

Important non-goals:

- No `--admin`.
- No branch protection bypass.
- No auto-approval.
- No demotion/removal of existing Quality gate checks.
- No GitHub branch protection/ruleset mutation from repo files.
- No self-merge of this implementation PR.

Review questions:

1. Is this design safe and aligned with repo SoT if it relies on GitHub native auto-merge rather than direct forced merge?
2. Is `workflow_run` after `Quality gate` a better design than adding merge steps inside `quality-gate.yml`?
3. Does this require a human-gate before local implementation, or only before external GitHub repository settings are changed/enabled?
4. Is the planned validator-first coverage sufficient?
5. Return GO only if implementation can proceed. Return NEEDS_HUMAN/BLOCKED/NO_GO with concrete findings otherwise.
