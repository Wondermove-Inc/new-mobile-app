# Stitch ADC Setup Report Template

Use this template for `/workspace/state/stitch-adc-setup-report.json` or for a
human-readable summary derived from it.

```json
{
  "schema": "stitch-adc-setup/v1",
  "status": "ready_for_design_gate | blocked",
  "checks": {
    "gcloud_cli": "available | missing",
    "google_adc": "available | missing | skipped",
    "google_cloud_project": "configured | missing",
    "codex_cli": "available | missing",
    "stitch_mcp": "configured | missing | skipped"
  },
  "tool_readiness": {
    "gcloud": {
      "required": true,
      "owner": "agent_with_approved_installer_then_human_auth",
      "command_status": "available | missing",
      "install_decision": "already_available | install_unavailable_needs_platform_source | install_blocked_needs_approval | install_attempted | install_failed",
      "installer_status": "not_needed | missing | not_executable | approval_required | executed | failed",
      "version_status": "checked | failed | not_checked",
      "auth_status": "available | missing | skipped",
      "login_flow": "not_needed | needs_human_present | gcloud_auth_login_started | gcloud_auth_login_failed | skipped",
      "adc_status": "available | missing | skipped",
      "adc_login_flow": "not_needed | needs_human_present | gcloud_adc_login_started | gcloud_adc_login_failed | skipped",
      "project_status": "configured | missing",
      "project_command": "gcloud config get-value project",
      "project_set_flow": "not_needed | needs_project_id | attempted | failed | skipped",
      "tool_bin_dir": "/workspace/state/stitch-adc-tools/bin",
      "stitch_api": {
        "service_name": "stitch.googleapis.com",
        "service_status": "enabled | missing | blocked | skipped",
        "service_enable_flow": "not_needed | needs_explicit_enable_approval | stitch_api_enable_started | stitch_api_enable_failed | skipped",
        "enable_command": "gcloud services enable stitch.googleapis.com"
      }
    },
    "codex_cli": {
      "command_status": "available | missing"
    },
    "stitch_mcp": {
      "status": "configured | missing | skipped",
      "mcp_source": ".codex/config.toml"
    }
  },
  "install_plan": [
    {
      "tool": "gcloud",
      "package": "google-cloud-cli",
      "command": "approved Google Cloud CLI installer",
      "approval_required": true
    }
  ],
  "installed_exact": [
    {
      "tool": "gcloud",
      "package": "google-cloud-cli",
      "command": "approved Google Cloud CLI installer"
    }
  ],
  "live_use": {
    "requires": "Design workflow gates and human-gate/v1 when applicable",
    "mcp_source": ".codex/config.toml"
  },
  "minimum_user_action": [
    "Provide a local executable Google Cloud CLI installer from an approved official source.",
    "Complete Google browser login surfaces locally; do not send credential material in chat.",
    "Set STITCH_ADC_ENABLE_STITCH_API=true only when the logged-in account may enable stitch.googleapis.com."
  ],
  "reporting": "status only; no auth token values"
}
```

`install_plan` and `installed_exact` are arrays and may be empty. `installed_exact`
must list gcloud only after the approved installer ran and `gcloud --version`
was checked successfully.

`ready_for_design_gate` requires all of the following: gcloud command available,
gcloud auth available, ADC available, project configured,
`stitch.googleapis.com` enabled, and Stitch MCP configured.

Do not include auth token values, API keys, OAuth tokens, refresh tokens,
passwords, Google ADC JSON, private keys, full auth JSON, or full
secret-bearing config contents.
