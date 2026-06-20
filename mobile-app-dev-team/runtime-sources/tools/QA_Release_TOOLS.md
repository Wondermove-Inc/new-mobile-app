# QA/Release TOOLS.md Addendum

This repo-tracked addendum captures Sarah / QA-Release Room delivery and
reporting checks.

## Room Delivery Checklist

- Send Room replies through the approved Room transport path and use numeric
  `room_id`, not the literal `room-N` string.
- Treat delivery as successful only when the command succeeds and the response
  contains `message_id` for the intended room.
- A successful Room send proves transport only. It does not complete QA work,
  close a Workboard card, satisfy a wake-guard, replace a Task, PR, evidence
  record, release-risk summary, or source of truth update.
- If the agreed report destination is a Chatroom, Workboard comments, Task
  comments, PR comments, evidence notes, local files, and final `NO_REPLY` are
  not enough for a material QA status, blocker, decision, evidence result,
  rerun need, release-risk summary, or completion update.
- Avoid noisy duplicate Chatroom reports for confirmed self-echo or no-change
  events.
- After a progress report, continue the next safe foreground step unless work is
  complete, blocked with owner/reason/next action recorded, waiting with a
  wake/follow-up condition, or delegated to a tracked worker.
