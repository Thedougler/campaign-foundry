# The CLI script is `cfcli`, not `cf`

Issue #56, 2026-10-10. Campaign Foundry's CLI ran as `bun run cf -- <command>`. A bare `cf` on PATH is Cloudflare's CLI, so shell history, muscle memory and every doc line that said "run `cf check`" pointed at two tools.

Decision:

- **One name.** The `package.json` script, the Commander program name and every invocation are `cfcli`: `bun run cfcli -- <command>`. The `cf` script is deleted, with no alias.
- **One spelling in code.** `CF` in `src/commands/kit.ts` holds the invocation every Examples block, hint and approval command prints. Changing the name again is a one-line edit plus the callers below.
- **Every caller migrated at once.** The migration rewrote 166 tracked files outside `prior/` and `legacy-import-report.json`, spanning `src/`, `test/`, `scripts/`, `python/`, `docs/`, `.omp/` hooks, skills and agents, `.agents/` skills, the root instruction files, CI, `.vale.ini`, `.markdownlint.yaml`, `biome.jsonc`, `.gitignore`, `.env.example`, Wiki templates and generated index headers. Three forms were rewritten: `bun run cf …`, code-spanned `` `cf <command>` `` and `` `cf` ``, and argv spellings (`["run", "cf", "--", …]` in the wiki-check hook, `["cf", "cf", …]` in the in-process runner).
- **Left as written.** `prior/` and `legacy-import-report.json` are frozen provenance. Wiki `log.md` entries are append-only history. The test helper `cf()` in `test/check/helpers.ts` is a local function name, not the tool. Prose that names the old tool in research notes (`docs/research/prior-iterations/`) describes the repo as it was.

## Catching misses

- A stale `bun run cf …` fails loudly: Bun reports `Script not found "cf"`. Look here, then write `bun run cfcli -- <command>`.
- Every `bun run lint` run also reports a `names` pass (`scripts/lint/retired.ts`). It flags the three retired forms as `lint/retired-cf`, with the fix in its message, in any text file of the selection whatever its scope, and in every visible file under `--all`. The frozen paths above are skipped, as are this ADR and that module, which quote the old name on purpose. At the migration commit, `bun run lint --all` reported `names: ok (1685 files)`.
- The help suite in `test/cli-help.test.ts` asserts that every command's Examples spell `bun run cfcli --`.

## Considered Options

- **Keeping `cf` as an alias of `cfcli`**: rejected. Two names keep the ambiguity alive in docs and history, and the repo cuts over cleanly without shims.
- **Renaming the command name only in docs**: rejected. The script name is what collides, so a doc-only change leaves the wrong binary one keystroke away.
