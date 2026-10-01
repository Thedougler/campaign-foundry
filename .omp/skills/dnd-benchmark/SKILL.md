---
name: dnd-benchmark
description: Prose Benchmark — run or resume the cross-family Matrix Narration ranking; refresh its leaderboard after a top-pin or committed prompt change. Scratch-World fixture cases use run-evals; skill authoring uses skill-creator.
---

# D&D Prose Benchmark

Every family's `top` pin answers the committed prompts; an anonymous Judge scores each sample, and `cf bench` writes the leaderboard. Read `.omp/AGENTS.md` before dispatch for shared native-task policy. For scratch-World fixture checks, read `.omp/skills/run-evals/SKILL.md` instead.

## Preserved, always

- **Pins** — families and their `top`/`fallback` pins exactly as `evals/models.yaml` reads right now.
- **Committed bytes** — runner briefs and the Judge template are byte-exact. Before changing prompt identity or cache handling, read `docs/adr/0012-benchmark-prompts-are-committed-and-deterministic.md`; prompt-set edits move `bench_version` and clear the cache wholesale.
- **Rounds** — one Round = one prompt-set entry, every family's top pin, yaml order. Every family is closed and reported before the next Round begins; stopping after any Round is clean — the cache resumes the rest.
- **Anonymity** — integer 1–5 rubric scores from a fresh Judge that sees only the anonymized brief.
- **One ledger** — `evals/benchmark.json` and `evals/benchmark.md`, written only by `cf bench record` / `render`, are the recorded results. Read these paths when checking recorded rows or presenting the leaderboard.

## Before benchmarking

If repository dependencies or script execution are not ready, read `README.md` for the supported Bun setup before starting; use the committed lockfile and the repository's documented scripts.

**Choose the data root** — live runs use the repository. For dry runs, pass `--root <absolute-temp-root>` to every benchmark subcommand and read data/briefs from that root's copies of `evals/models.yaml`, `evals/prose-bench.yaml` and `evals/bench/judge-brief.md`. **Done when** one root is selected for the whole run; a dry run leaves the live cache untouched.

**Align the runner agents** — inspect `evals/models.yaml` and `.omp/agents/` before dispatch. Maintain one benchmark-owned `.omp/agents/dnd-benchmark-<family>.md` per current Matrix family: frontmatter `name: dnd-benchmark-<family>`, a concise benchmark description, `model: [<top.model>:high, <top.fallback>:high]`, `tools: [yield]`, `blocking: true`, and a body instructing it to yield the brief's prose string with no file mutations. Update verified benchmark-owned definitions and create missing ones. Refuse a matching filename or discovered agent name owned by any other definition; report the collision instead of overwriting or dispatching it. Remove obsolete benchmark-owned definitions for families no longer in the Matrix; preserve unrelated definitions, including ambiguous ownership, and report those as blockers. **Done when** every current family resolves uniquely to its exact pins and blocking capture contract, no removed family's benchmark-owned definition remains, and unrelated agents are unchanged.

**Seat the Judge** — read `.omp/agents/prose-grader.md` before judging for its artifact permissions and configured role. **Done when** its definition is identified and each fresh dispatch will retain actual completion provenance.

## Steps

1. **Plan HIT/MISS.** In JS `eval`, import `loadPromptSet` / `promptSha` from `<repo>/src/bench/prompts.ts`, `loadMatrix` from `<repo>/src/bench/matrix.ts`, and `loadCache` / `findHit` from `<repo>/src/bench/cache.ts`. Read those functions before composing the planner. Load `<root>/evals/prose-bench.yaml`, `<root>/evals/models.yaml` and `<root>/evals/benchmark.json`; `repo` is the real code repository and `root` is the live or temporary benchmark data root. For each prompt entry and family in YAML order, call `findHit(cache, { version: set.version, id: entry.id, family: family.name, model: family.top.model, promptSha: promptSha(entry) })`. Only MISSes run. Avoid `cf bench status`: it gates on omp-on-PATH and prints CLI model commands.

   If the eval loader rejects these imports by failing to resolve `yaml` after documented dependency setup, save the planner as a temporary `.mjs` and run `node <absolute-planner-script>` from the real repo. This installed-loader failure and the Node path were observed here, not established for other loaders or builds. **Done when** the per-Round HIT/MISS plan is saved and any temporary planner script is removed.

2. **Briefs and runs.** From the repo root, run `bun run cf bench briefs --check`; on DRIFT run `bun run cf bench briefs`, commit the rewritten briefs and re-check. Read `references/task-results.md` before dispatch for blocking capture and conversion. Pass the exact bytes of `evals/benchmark-samples/<bench_version>/<id>/<id>.brief.md` to each MISS family's `dnd-benchmark-<family>` agent. **Done when** every MISS has a complete raw blocking response or a preserved execution failure reason; HITs remain unchanged.

3. **Convert results.** Apply the evidence gate and conversion in `references/task-results.md`. **Done when** each candidate has unchanged raw response, normalized evidence and a task-derived event named for its actual identity, or preserved raw evidence and an explicit rejection reason.

4. **Extract and judge.** Run `bun run cf bench extract <absolute-events.jsonl>`; it writes `<tag>.md` beside the artifact and prints timing JSON. Exit 1 means the sample lacks the expected `> [!narration]` opening: inspect the written sample and judge it only if the breach should be scored; other extraction failures are missed runs. Run `bun run cf bench judge-brief --id <id> --sample <absolute-extracted-sample.md>` to fill the committed `evals/bench/judge-brief.md` template and print the anonymous brief and grades paths. Read the template when checking its contract, then read the printed brief before dispatch. Give a fresh `prose-grader` exactly those brief bytes and permission to write only the printed grades path; its input contains no events, raw response, family or model identity. Preserve its observed `resolvedModelIdentity`, `resolvedModel`, `resolvedThinkingLevel` and any fallback metadata. Grades are `[{rubric,score,reason}]`: rubric text verbatim, integer scores 1–5, each reason one sentence quoting the sample. **Done when** every judged sample has complete grades and observed Judge provenance, or an explicit failure reason. A `record` validation failure returns to a fresh Judge with the same anonymous brief.

5. **Record top-only.** `cf bench record` attributes scored rows to the family's top pin. A scored record therefore requires the runner's observed `resolvedModelIdentity` to equal that pin. Use the Judge's observed `resolvedModelIdentity` for `--judge`, not its selector (which may include `:high`):

   ```bash
   bun run cf bench record --id <id> --family <family> --grades <absolute-grades.json> --judge <observed-judge-resolvedModelIdentity> --events <absolute-events.jsonl>
   ```

   A fallback run is extracted and judged like any other, then reported to the DM under its real identity and left without a scored cache row — mark the top-pin gap with `bun run cf bench record --id <id> --family <family> --status skipped --reason "<top-pin failure; fallback <model> judged, uncached>"`. A quota/auth failure on both pins puts the family dark for the session: use the same command with `--status dark --reason "<why>"`, and later Rounds skip it without retry; any other dead pin (invalid pin, unsupported thinking, unexpected routing, unrecordable evidence) records `--status skipped` with its reason. Recording rebuilds `evals/benchmark.md` itself; `bun run cf bench render` rebuilds it without touching rows. **Done when** every family in the Round is scored, fallback-reported, dark or skipped — and nothing is misattributed.

6. **Close the Round.** Report the side-by-side to the DM: per family its actual model (top pin, fallback under its real identity, or miss reason), prose score and rubric scores, sample paths, judge identity with any fallback flag, and every dark/skipped reason. Begin the next Round only after this report. **Done when** the DM holds the Round's complete picture.
