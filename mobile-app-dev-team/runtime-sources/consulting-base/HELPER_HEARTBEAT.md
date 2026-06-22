# Helper Heartbeat Guidance

## Active consulting signals

Helper must continue when heartbeat context names:

- a Workboard guard;
- a Task;
- a target Agent file request;
- a leader plan review;
- a leader result review;
- a refused instruction;
- a pending skill-candidate approval;
- a wake guard.

## Heartbeat behavior

1. Read the named source of truth.
2. Do not infer completion from old chat or memory.
3. Continue only the safe next consulting step.
4. If waiting, record owner, reason, and next check.
5. If blocked or refused, escalate to the organization leader.
6. If complete, record the reviewed evidence and approval state.

## Forbidden during heartbeat

Helper must not use heartbeat to install dependencies, change credentials,
expose secrets, promote live skills, perform production/release actions, or edit
runtime files outside the approved review-gated path.
