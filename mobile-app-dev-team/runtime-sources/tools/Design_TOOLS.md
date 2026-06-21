# Design TOOLS.md Addendum

This repo-tracked addendum captures Design-specific Room delivery and reporting
checks.

## Room Delivery Checklist

Before writing a final response for any inbound message, bind the visible
report destination. When inbound text or a fixture contains the literal Room
envelope pattern `[Room: room-N] [From ...]`, treat it as a supporting
preflight signal named `literal_room_envelope` and run the Room routing
preflight. Extract numeric `N` from `[Room: room-N]` and use numeric
`room_id: N` in the Room transport payload. Never send the literal string
`room-N` as the payload `room_id`. If the literal envelope cannot be parsed,
block and record the routing ambiguity instead of guessing.

Routing preflight requirements:

1. Bind the visible report destination before composing the report. Use the
   latest explicit `visible_report_destination` when one exists; otherwise use
   the inbound instruction Room or parsed `literal_room_envelope` Room.
2. If a specific 1:1 Room is named as the only destination, send only to that
   Room unless Product/Planning gives a newer explicit destination.
3. If a Room report is required, send the user-visible text through the
   approved Room transport path before final output. A webchat-final-only
   answer is a failure for required Room reports.
4. Heartbeat or continuity context does not cancel a required Room report.
5. Task comments, Workboard comments, PR comments, local notes, heartbeat-only
   replies, and final `NO_REPLY` do not substitute for a required Room report.
6. Final webchat output may be exactly `NO_REPLY` only after successful Room
   delivery or recorded transport failure, and only when remaining work is
   complete, blocked with owner/reason/next action recorded, waiting with
   wake/follow-up recorded, or delegated to a tracked worker.
7. Do not claim physical runtime final-output blocking unless a separate
   runtime guard exists and is proven. This checklist defines required Design
   behavior, preflight/validator expectations, and failure classification.
8. Do not overclaim proof. Routing decision proof is not delivery proof;
   delivery proof is not Design work completion, release/production approval,
   human approval, Product/Planning final acceptance, Design review approval,
   or completion of the underlying Task.

- Send Room replies through the approved Room transport path and use numeric
  `room_id`, not the literal `room-N` string.
- Treat delivery as successful only when the command succeeds and the response
  contains `message_id` for the intended room.
- A successful Room send proves transport only. It does not complete Design
  work, close a Workboard card, satisfy a wake-guard, or replace a Task, PR, or
  source of truth update.
- If Product/Planning or an agreed Chatroom is waiting for a material Design
  status, blocker, decision, or completion update, Workboard comments, Task
  comments, PR comments, local notes, and final `NO_REPLY` are not enough.
- Avoid noisy duplicate Chatroom reports for confirmed self-echo or no-change
  events.
- After a progress report, continue the next safe foreground step unless work is
  complete, blocked with owner/reason/next action recorded, waiting with a
  wake/follow-up condition, or delegated to a tracked worker.
- Material Design reports should name the changed Design source of truth, P0/P1
  state when relevant, `DESIGN.md` decision state, Stitch readiness or blocker,
  state/accessibility coverage, `design-reviewer` evidence, publication package
  or `01-design/handoff-index.md` state, Mobile App Dev handoff state, forbidden
  actions not performed, and the next responsible owner.
