# OpenClaw Pod Skills Sync Report Template

Default path:

```text
/workspace/state/openclaw-pod-skills-sync-report.json
```

Schema:

```json
{
  "schema": "openclaw-pod-skills-sync/v2",
  "status": "completed | blocked",
  "mode": "copy",
  "source_authority": "repo_sot",
  "runtime_target": "runtime_snapshot",
  "role": {
    "slug": "product-planning",
    "expected_slug": "product-planning",
    "display": "Product/Planning",
    "file_prefix": "Product_Planning",
    "status": "resolved | role_mismatch | not_checked"
  },
  "blockers": [],
  "paths": {
    "source_root": "/workspace/projects/Wondermove-Inc/new-mobile-app/mobile-app-dev-team/runtime-sources/skills",
    "candidate_root": "/workspace/projects/Wondermove-Inc/new-mobile-app/mobile-app-dev-team/runtime-sources/skills-candidate",
    "legacy_source_root": "/workspace/projects/Wondermove-Inc/new-mobile-app/mobile-app-dev-team/runtime-sources/pod-native-openclaw-skills",
    "runtime_root": "/workspace/skills",
    "workspace_agents": "/workspace/AGENTS.md",
    "workspace_workflow": "/workspace/WORKFLOW.md",
    "workspace_heartbeat": "/workspace/HEARTBEAT.md",
    "workspace_tools": "/workspace/TOOLS.md",
    "organizations_source": "/workspace/projects/Wondermove-Inc/new-mobile-app/mobile-app-dev-team/runtime-sources/organizations/ORGANIZATIONS.md",
    "workspace_organizations": "/workspace/ORGANIZATIONS.md"
  },
  "categories": {
    "applied": [],
    "skipped": [],
    "missing": [],
    "blocked": [],
    "role_mismatch": []
  },
  "skills": {
    "project-bootstrap": {
      "status": "applied",
      "source_path": "/workspace/projects/Wondermove-Inc/new-mobile-app/mobile-app-dev-team/runtime-sources/skills/project-bootstrap",
      "target_path": "/workspace/skills/project-bootstrap",
      "sha256": "<skill-md-sha256>",
      "cmp": true
    }
  },
  "workspace_operating_files": {
    "workspace_agents": {
      "status": "applied",
      "role_slug": "product-planning",
      "role_display": "Product/Planning",
      "file_prefix": "Product_Planning",
      "source_path": "/workspace/projects/Wondermove-Inc/new-mobile-app/mobile-app-dev-team/runtime-sources/agents/Product_Planning_AGENTS.md",
      "target_path": "/workspace/AGENTS.md",
      "sha256": "<sha256>",
      "cmp": true,
      "positive_role_identifier_scan": true,
      "negative_known_other_role_residue_scan": true
    }
  },
  "workspace_organizations": {
    "status": "applied | missing | unreadable",
    "guidance_only": true,
    "source_path": "/workspace/projects/Wondermove-Inc/new-mobile-app/mobile-app-dev-team/runtime-sources/organizations/ORGANIZATIONS.md",
    "target_path": "/workspace/ORGANIZATIONS.md",
    "sha256": "<sha256>",
    "cmp": true
  }
}
```

This report is status only. It must not contain auth token values, credential
contents, API keys, OAuth tokens, database URLs, or secret-bearing clone URLs.
`workspace_organizations` is common guidance only and must not block skill sync
by itself when missing or unreadable. Role-specific operating file failures must
fail closed instead of silently applying the wrong role files.
