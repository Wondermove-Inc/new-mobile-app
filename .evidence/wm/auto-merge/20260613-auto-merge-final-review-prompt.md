# Final Reviewer Request: Quality Gate Auto Merge

Please perform final xhigh review for the implemented quality-gate auto-merge change.

User request:

- Create a plan, get reviewer(xhigh), proceed after approval.
- Complete the workflow change.
- Verify whether the currently open PR can auto-merge.

Plan:

- `docs/plans/active/20260613-quality-gate-auto-merge-plan.md`

Plan review evidence:

- Initial NO_GO: `.evidence/wm/auto-merge/20260613-quality-gate-auto-merge-plan-xhigh.md`
- Rerun GO: `.evidence/wm/auto-merge/20260613-quality-gate-auto-merge-plan-xhigh-rerun.md`

Implementation evidence:

- `.evidence/wm/auto-merge/20260613-auto-merge-implementation.md`

Changed paths:

- `.github/workflows/auto-merge.yml`
- `.github/workflows/quality-gate.yml`
- `PROJECT_ENVIRONMENT.md`
- `scripts/validate-project-environment.mjs`
- `evals/local-harness/project-environment/fixtures/invalid-auto-merge-checkout.json`
- `evals/local-harness/project-environment/fixtures/invalid-auto-merge-missing-head-guard.json`
- `evals/local-harness/project-environment/fixtures/invalid-auto-merge-uses-admin.json`
- `evals/local-harness/project-environment/fixtures/invalid-quality-gate-missing-workflow-yml-detection.json`
- `.evidence/wm/auto-merge/*`

Important implementation details:

- Uses separate `.github/workflows/auto-merge.yml`.
- Trigger: `workflow_run` completion for `Quality gate`.
- Requires source event `pull_request`, conclusion `success`, exactly one associated PR, and base branch `main`.
- Does not use `actions/checkout`.
- Does not execute PR head code.
- Uses `GH_TOKEN: ${{ github.token }}` only.
- Checks PR state with `gh pr view`.
- Skips non-open or draft PRs.
- Refuses if PR head SHA does not match `github.event.workflow_run.head_sha`.
- Uses `gh pr merge "$PR_URL" --auto --squash --match-head-commit "$HEAD_SHA"`.
- Does not use `--admin`, PATs, or secrets.
- Updates `quality-gate.yml` detector so `.github/workflows/*.yml` changes trigger conditional `pnpm run test:local-harness`.

Verification passed:

- `git diff --check`
- `node scripts/validate-project-environment.mjs --self-test`
- `node scripts/validate-project-environment.mjs`
- `pnpm run test:runtime`
- `pnpm run test:local-harness`
- `pnpm turbo run lint test`
- `pnpm run validate:evidence-hygiene`

Please review:

1. Does the implementation satisfy the approved plan?
2. Does it avoid bypassing branch protection, required reviews, required checks, or merge queue?
3. Is privileged `workflow_run` usage safe because it avoids PR checkout/code execution?
4. Are tests/fixtures sufficient?
5. Is it acceptable to proceed to commit/push and then check current PR auto-merge behavior through GitHub?

Return GO only if no Critical/High/Medium findings remain.
