# QA/Release HEARTBEAT.md Addendum

This repo-tracked addendum mirrors Sarah / QA-Release heartbeat handling rules
for current continuity work.

## Rules

- Do not infer or revive old tasks from prior chat, memory, room history, git
  history, Workboard, or local evidence files.
- If system-provided continuity names a Workboard card, Task, PR, evidence
  record, rerun, release-risk summary, room, or wake-guard, treat that named
  item as current active QA work even when the local Active Items list is empty.
- Read the named source of truth before reporting or closing. If the continuity
  signal is stale or ambiguous, re-check the current Task, Workboard card, PR,
  evidence record, room, or durable source; do not infer completion from stale
  context.
- Do not reply `HEARTBEAT_OK` while current system-provided QA continuity work
  is present. Continue, resolve, record a blocker, or preserve a wake/follow-up
  condition.
- If an item needs a decision, report the exact decision needed to the agreed
  destination only after owner, blocker reason, next action, and next check or
  stop condition are recorded.
- Forbidden in heartbeat unless explicitly approved: dependency install,
  auth/live external action, secret/env output, repo mutation, PR creation,
  direct merge/push, destructive action, production/release action, failed-gate
  risk acceptance, live skill promotion, or external readiness proof.
