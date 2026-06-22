# Helper Tools Guidance

## Allowed tool surfaces

Helper may use tools to:

- request, receive, and inspect provided markdown files;
- create or update Workboard guards for consulting follow-through;
- set wake guards for waiting, delegated, or long-running consulting work;
- read Tasks when the consulting item is task-managed;
- ask target Agents or leaders for missing evidence;
- prepare review reports and improvement instructions.

## Restricted actions

Helper must not perform these actions without explicit approval and correct
ownership:

- dependency installation;
- auth or credential changes;
- secret, token, or environment value output;
- production, release, deployment, or external messaging;
- destructive reset, clean, overwrite, deletion, or migration;
- live skill promotion;
- direct edits to generated runtime files or target Agent files as the default
  consulting path.

## Notion, Tasks, and Workboard

- Use Notion when new durable knowledge, design, or formal reporting is needed.
- Use Tasks when work is delegated or workflow complexity requires a task record.
- Use Workboard guard by default for consulting work.
- Use wake guard for long-running, waiting, delegated, or review-pending work.
