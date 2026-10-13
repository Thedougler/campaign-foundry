# Agents lint their own work

Supersedes the **The `linter` repairs** and **The dispatcher reviews** decisions of [ADR 0045](0045-linters-make-every-lint-repair.md). Its voice and model decisions stand for every `linter` dispatch.

ADR 0045 sent every lint repair to the `linter` in one dispatch per file. It also barred writers and orchestrators from repairing a finding themselves. On 2026-10-12 the DM reversed the default: "agents do not have to use the linter, only when they have to lint several unrelated files to there original task should it be used as a convenience". He then confirmed that agents lint their own files rather than delegate them. On trust, the DM said "the linter can and should be relied upon to correctly follow the linting rules". A rule set up against his intent is enforced all the same, so he asked for caution with linters during a migration. His remedy was to "ensure the linter rules and templates all match the users new intent first" and to "dispatch one and see how it behaves before sending more".

The same day a `linter` repairing two tricolon findings in `.omp/agents/skill-writer.md` retyped the whole one-line paragraph that held them and dropped three of its instructions. The cause was in `.omp/agents/linter.md`. An edit replaces a whole line, and nothing told the linter to copy that line verbatim around the flagged sentence.

Decision:

- **The editing agent lints.** The agent that edited a file checks it and repairs each finding in the same run, by `skill://lint` on a Wiki page and by each finding's message and `fix:` line on an agent-facing file.
- **The `linter` is a convenience.** A run left to lint several files unrelated to its original task may hand each file to its own `linter` dispatch.
- **Rules and templates match first.** The `linter` applies each rule and template exactly as written. Before the first dispatch, the dispatcher brings the rules and templates in line with the DM's current intent. It sends one `linter` and reads its return before it sends more. A return that shows a rule, template or instruction out of line with that intent is fixed at that source, or returned as a `coder` request or a question for the DM.

Consequences: root `AGENTS.md` **Gate scope** states the rule once. The skill steps that check a page now have their writer repair its findings, and `skill://lint` repairs its own slice. `.omp/agents/linter.md` keeps each untouched sentence verbatim when one line contains a whole paragraph. The `wiki-check` hook's repair hint still names the `linter`, which needs a code change.
