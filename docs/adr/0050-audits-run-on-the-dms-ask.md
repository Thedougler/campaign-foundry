# Audits run on the DM's ask

Supersedes the post-Ingest audit in [ADR 0003](0003-ask-about-intent-never-bookkeeping.md) and the audit and Lint steps of the "lock it in" filing chain in [ADR 0046](0046-collab-is-a-one-to-one-workshop.md). ADR 0003's Canon precedence and its rule that an audit fixes without asking still stand.

ADR 0003 ran the health audit over every page an Ingest touched. Each Ingest returned an audit request, and its orchestrator dispatched the audit to a fresh subagent and waited for it. `collab-with-me` went further: after each lock-in it chained Ingest, the audit and then a `lint` subagent over the pages both reports touched. On 2026-10-14 the DM ended the routine audit: "in the future dont need to audit ingested pages, thats redundant". Ingest already brings every touched page to `ok: 0 findings` on its own page gate, and each run fixes the wrong or contradictory Canon it finds (root `AGENTS.md` **Fix on sight**).

Decision:

- **Audit on ask.** An audit (`skill://audit`) runs in a fresh subagent only when the DM asks for one. His ask sets its scope to a set of pages or one claim, and to the whole Wiki only when he asks for that. Root `AGENTS.md` **Audit on ask** states the rule.
- **Ingest closes on its page gate.** Ingest ends once its touched list passes the page gate at `ok: 0 findings`, its file is archived and logged, and `hot.md` is current. A PC pull is an Ingest too, so `new-campaign` closes its pull on the same gate.
- **Collab files through Ingest alone.** A locked idea goes to one Ingest dispatch. The trailing `lint` dispatch repeated Ingest's own page gate over the same pages, so it goes too. Collab dispatches `lint` only when a report leaves a finding on its pages.

Consequences:

- Root `AGENTS.md` **Independent audit** becomes **Audit on ask**.
- The `ingest` `SKILL.md` Queue and steps 13 and 14, and `references/transcript.md` C8, no longer request, dispatch or wait on an audit.
- The `audit` description and its "An Ingest's pages" scope name the DM's ask as the only trigger.
- `collab-with-me` steps 5 and 6, `new-campaign` step 6 and [`docs/creative-process.md`](../creative-process.md) drop the audit from their chains.
