# Product Planning Enhancement Proof

This document records how the Product/Planning operating guardrails improve Spring's behavior after the 2026-06-20 process failures and follow-up patch.

## Evidence source

- PR #77 added the Product/Planning operating guardrails and candidate skill path.
- This follow-up reorganizes those guardrails under `mobile-app-dev-team/runtime-sources/**` so future role pods can consume them from one runtime-source tree.
- The behavior was exercised immediately in the PR #77 wake-guard flow: Spring checked the named Workboard card and PR, verified the Quality gate, confirmed the merge state, fast-forwarded local `main`, completed the Workboard card, and reported the material completion to room-612.

## Enhanced behavior criteria

| Prior failure mode | New guardrail | Observable proof |
| --- | --- | --- |
| Treating `NO_REPLY` or Room send as work completion | Room transport is explicitly transport-only; foreground work must continue or be recorded as complete/blocked/delegated/waiting | PR #77 wake-guard did not stop after a message; Spring checked PR state, pulled `main`, completed Workboard, then reported |
| Recording only in Workboard/local notes while user expected Chatroom status | Chatroom reports are required for material status, blocker, decision, or completion when a user or room is waiting | Completion was reported to room-612 with PR state, merge commit, local HEAD, Workboard status, and forbidden-action statement |
| Leaving `blocked` as an endpoint | Blocked work must record owner, reason, next action, and follow-up/wake condition; Product/Planning routes by decide/consult/delegate/ask | Backend/API earlier unblocked through QA-guided narrower validation and reviewer re-review, then PR #76 was merged and Workboard closed |
| Confusing docs-only PR merge with release/live action | Product/Planning may merge role-reviewed, quality-success, forbidden-action-clean, non-production docs-only PRs only; human gates remain for release/live/risk/secret/access/payment/legal | PR #77 was docs/runtime-source only, Quality gate success, no live/auth/external/secret/destructive/release/production/dependency install action |
| Treating system continuity or heartbeat with empty Active Items as no-op | Named Workboard/Task/PR/wake-guard continuity is current work and requires source-of-truth re-check | PR #77 wake-guard named the card and PR; Spring read Workboard, checked PR, and resolved instead of replying `HEARTBEAT_OK` |
| Skill/playbook creation without review boundary | The skill remains in `skills-candidate/` as candidate/proposed-only until separate review and approval | Candidate skill exists only under `mobile-app-dev-team/runtime-sources/skills-candidate/` |

## Minimum proof checklist for future regressions

Spring should be considered patched for this failure class only when a future similar event shows all of the following:

1. The named source of truth is re-checked before reporting.
2. Workboard/Task/local comments are not treated as a substitute for an expected Chatroom report.
3. `blocked` includes owner, reason, next action, and follow-up/wake condition, or is actively routed.
4. Docs-only merge decisions are separated from production/release/live/human-gated decisions.
5. Candidate skills remain candidate-only until separately approved.
6. The final user-visible report states what was checked, what changed, what remains, and what forbidden actions were not performed.
