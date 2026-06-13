# Review Request: Stage 2 RED Tests For Project Bootstrap User Guidance

You are `wm-implementation-reviewer` running xhigh review.

Review the tests/evals added before behavior edits. Do not approve behavior
implementation unless the tests are correctly RED and cover the approved Stage 1
plan.

Target changed test/eval files:
- `evals/skills/project-bootstrap-agent-setup-smoke.sh`
- `scripts/validate-team-doc.mjs`

Goal and plan:
- `docs/plans/active/20260613-project-bootstrap-user-request-guidance-goal.md`
- `.evidence/wm/project-bootstrap/20260613-user-guidance-implementation-plan.md`

Stage 1 reviewer evidence:
- `.evidence/wm/project-bootstrap/20260613-user-guidance-implementation-plan-xhigh-rerun.md`
- `.evidence/wm/project-bootstrap/20260613-user-guidance-implementation-plan-scope-xhigh.md`

RED evidence:
- `.evidence/wm/project-bootstrap/20260613-user-guidance-stage2-red.md`

Relevant SoT:
- `AGENTS.md`
- `PROJECT_ENVIRONMENT.md`
- `REPO_OPERATIONS.md`
- `mobile-app-dev-team/16-pod-environment-bootstrap.md`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/SKILL.md`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/report-template.md`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh`

Questions:
1. Do the changed tests/evals fail before behavior edits for the intended
   missing user-facing guidance?
2. Do they cover the Stage 1 required cases: GitHub auth, Git identity,
   `codex-config-missing`/missing `.codex/config.toml`, pod runtime/toolchain/
   Codex CLI/MCP, secure credential source, public config, human-gate, and
   agent-owned do-not-ask?
3. Are the tests narrow enough and SoT-backed?
4. Is it okay to proceed to Stage 3 implementation if there are no
   Critical/High/Medium findings?

Return findings first, then exactly one fenced JSON envelope with verdict,
reviewer, mode, scope, findings, checks_reviewed, residual_risks, and
next_action.
