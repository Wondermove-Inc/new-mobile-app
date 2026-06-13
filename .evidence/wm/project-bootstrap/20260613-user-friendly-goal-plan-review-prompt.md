# xhigh Scope Review Request: user-friendly project-bootstrap goal document plan

Operate read-only as `po-scope-gate-reviewer`.

## Objective

Review the plan before writing a goal document for updating
`project-bootstrap` user-facing blocker guidance. The document must be easy for
non-IT users to understand and must define how future implementation work will
proceed without guessing beyond SoT.

## Planned Document Path

`docs/plans/active/20260613-project-bootstrap-user-request-guidance-goal.md`

## Planned Content

- Goal: make `project-bootstrap` and nested `pod-role-bootstrap` blocker output
  ask users only for information or action that agents cannot safely complete.
- Include the previously reviewed SoT-backed user-request cases:
  GitHub auth, Git identity, role-source handoff, repo checkout/source artifact,
  repo SoT artifact including `codex-config-missing`, pod-native skill artifact,
  wrong managed path, pod runtime/toolchain/Codex CLI/MCP after agent repair,
  credential/status-only external capability, Design Stitch, QA/EAS,
  public Expo/customer config, API/Railway secrets, live external action
  requiring `human-gate/v1`, and pod ConfigMap/Secret/template refresh.
- Include a "do not ask user" section for agent-owned deterministic setup:
  role identity from source, `/workspace/state` and reports, status checks,
  canonical managed path repair, pinned credential-free MCP registration,
  `pnpm-pin-mismatch` alignment, and `pod-role-bootstrap` report creation.
- Include user-facing plain-language message categories and data-safety rules:
  never ask for tokens/passwords/2FA/ADC JSON/database URLs/bearer tokens in
  chat; request human-present login or mounted/managed Secret/tool auth instead.
- Include the user's required operating instructions:
  0. maximize read-only sub-agent usage;
  1. reviewer after each stage before next stage;
  2. Confluence sync pages when updates require Confluence sync;
  3. SoT-only, no guessing;
  4. reviewer(xhigh) for decisions before proceeding;
  5. complete only after tests and verification, with progress tracked in plan.
- Clarify that live Confluence update is external/human-gated; if sync is needed,
  the plan must require target page IDs/current versions/proposed body/reviewer
  evidence/user approval before live publish.
- Clarify that the current task writes the goal document only; future skill
  implementation must add/update tests/evals before editing skill behavior.

## SoT / Evidence To Check

- `AGENTS.md`
- `PROJECT_ENVIRONMENT.md`
- `REPO_OPERATIONS.md`
- `docs/plans/active/20260611-pr4-pod-bootstrap-preimplementation-plan.md`
- `docs/plans/active/20260610-confluence-dependency-decoupling-plan.md`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/SKILL.md`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/references/blocker-resolution-guide.md`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-agent-setup.sh`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/project-bootstrap/scripts/project-bootstrap-preflight.sh`
- `mobile-app-dev-team/09-pod-native-openclaw-skills/pod-role-bootstrap/SKILL.md`
- `mobile-app-dev-team/16-pod-environment-bootstrap.md`
- `scripts/codex-preflight.mjs`
- `.evidence/wm/project-bootstrap/20260613-user-request-cases-report.md`
- `.evidence/wm/project-bootstrap/20260613-user-request-cases-xhigh-final.md`

## Review Questions

- Is this scoped correctly as a goal/planning document, not implementation?
- Does it avoid asking non-IT users for agent-owned setup?
- Does it preserve secret safety, Confluence human-gate, and SoT-only rules?
- Are the planned reviewer/sub-agent and stage gates sufficient?
- Is any human-gate or decision point missing before future implementation?

Return findings first and the required reviewer JSON envelope.
For JSON `finding.owner`, use only one of the supported owner values exactly:
`Product/Planning`, `Design`, `Mobile Architect`, `Mobile App Dev`,
`Backend/API Integrator`, `QA/Release`, or `human`.
