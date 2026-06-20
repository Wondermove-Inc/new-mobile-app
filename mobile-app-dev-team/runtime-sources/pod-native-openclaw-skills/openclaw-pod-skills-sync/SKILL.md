---
name: openclaw-pod-skills-sync
description: Copy-sync repo-authored pod-native OpenClaw skills into the runtime /workspace/skills snapshot, apply workspace AGENTS and ORGANIZATIONS guidance artifacts, and verify the setup rule before project-bootstrap runs.
---

# OpenClaw Pod Skills Sync

Use this pod-native OpenClaw skill after `git clone` or `git pull` for
WonderMove `new-mobile-app`, before running `project-bootstrap`.

Runtime shape:

```text
/workspace/skills/openclaw-pod-skills-sync/SKILL.md
```

Primary sync script:

```text
/workspace/skills/openclaw-pod-skills-sync/scripts/sync-pod-skills.sh
```

## Responsibility

This skill has one responsibility: copy sync the repo SoT
`mobile-app-dev-team/runtime-sources/pod-native-openclaw-skills` into the runtime snapshot
`/workspace/skills`, then apply the required workspace guidance artifacts:
`/workspace/AGENTS.md` and `/workspace/ORGANIZATIONS.md`.

The repo SoT remains authoritative. `/workspace/skills` is a runtime snapshot,
not the source of truth. The default mode is copy sync, not symlink.

`/workspace/ORGANIZATIONS.md` is guidance only. It describes organization,
reporting, routing, approval boundaries, and escalation expectations. It is not
a SOUL.md role contract, an approval-enforcement mechanism, or a deterministic
gate.

## Default Paths

- Repo path: `/workspace/projects/Wondermove-Inc/new-mobile-app`
- Source root:
  `/workspace/projects/Wondermove-Inc/new-mobile-app/mobile-app-dev-team/runtime-sources/pod-native-openclaw-skills`
- Runtime root: `/workspace/skills`
- Workspace instructions: `/workspace/AGENTS.md`
- Organizations source:
  `/workspace/projects/Wondermove-Inc/new-mobile-app/mobile-app-dev-team/runtime-sources/organizations/ORGANIZATIONS.md`
- Workspace organizations guidance: `/workspace/ORGANIZATIONS.md`
- Report: `/workspace/state/openclaw-pod-skills-sync-report.json`

## Usage

```bash
bash /workspace/skills/openclaw-pod-skills-sync/scripts/sync-pod-skills.sh
```

The script accepts non-secret path overrides for local smoke tests and pod
variants:

- `OPENCLAW_POD_SKILLS_REPO_PATH`
- `OPENCLAW_POD_SKILLS_SOURCE_ROOT`
- `OPENCLAW_POD_SKILLS_ROOT`
- `OPENCLAW_WORKSPACE_AGENTS_PATH`
- `OPENCLAW_ORGANIZATIONS_SOURCE_PATH`
- `OPENCLAW_WORKSPACE_ORGANIZATIONS_PATH`
- `OPENCLAW_POD_SKILLS_SYNC_REPORT_PATH`

## Status-Only Output

The script writes a status only JSON report. It never reads credential files and
never prints auth token values. Do not print auth token values. Missing skill
runtime inputs are reported as blockers such as `missing source root` or `missing SKILL.md: <slug>`.
`workspace_organizations.status` is report-only guidance status with
`guidance_only: true`; values such as `missing`, `unreadable`, or `copy_failed`
must not block skill sync by themselves.

After this skill completes, run `project-bootstrap`.
