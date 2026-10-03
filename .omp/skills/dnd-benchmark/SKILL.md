---
name: dnd-benchmark
description: Prose Benchmark — run or resume requested cross-family Matrix Narration ranking, or refresh its source-grounded prompts and leaderboard on the DM's request. Committed skill Eval uses run-evals; skill authoring uses skill-creator.
---

# D&D Prose Benchmark

This skill is the Benchmark branch of `evals/README.md`, which holds the eval methodology. Every family's `top` pin answers the committed prompts as a plain `omp -p` process; an anonymous Judge (`prose-grader`, also an `omp -p` process — `docs/adr/0016-evals-run-without-a-custom-harness.md`) scores each sample, and `bun run cf -- bench` writes the leaderboard. Everything runs in Bash from the repo root. For a committed skill Eval, read `skill://run-evals` instead.

## Preserved, always

- **Pins** — families and their `top`/`fallback` pins exactly as `evals/models.yaml` reads right now.
- **Committed bytes** — runner briefs and the Judge template are byte-exact. Before changing prompt identity or cache handling, read `docs/adr/0012-benchmark-prompts-are-committed-and-deterministic.md`; prompt-set edits move `bench_version` and clear the cache wholesale.
- **Rounds** — one Round = one prompt-set entry, every family's top pin, yaml order. Every family is closed and reported before the next Round begins; stopping after any Round is clean — the cache resumes the rest.
- **Anonymity** — integer 1–5 rubric scores from a fresh Judge that sees only the anonymized brief.
- **One ledger** — `evals/benchmark.json` and `evals/benchmark.md`, written only by `bun run cf -- bench record` / `render`, are the recorded results. Read these paths when checking recorded rows or presenting the leaderboard.

## Refresh source context

Before authoring or refreshing benchmark inputs, read `evals/README.md` for the shared grounding and source-refresh contract. Refresh only on an explicit request: read the real Wiki sources, update the committed fact excerpts and their provenance, then use the existing deterministic brief pipeline below. A benchmark run consumes committed bytes; it does not refresh them from the live Wiki. Historical sample directories and grades remain immutable. Data migration alone does not trigger benchmarking current skills.

**Done when** every changed prompt is grounded in its recorded source, its regenerated brief belongs to the new prompt version, and historical artifacts are unchanged.

## Before benchmarking

If repository dependencies or script execution are not ready, read `README.md` for the supported Bun setup before starting.

**Choose the data root** — live runs use the repository. For dry runs, pass `--root <absolute-temp-root>` to every `bun run cf -- bench` subcommand. **Done when** one root is selected for the whole run; a dry run leaves the live cache untouched.

## Steps

1. **Briefs.** Run `bun run cf -- bench briefs --check`; on DRIFT run `bun run cf -- bench briefs`, commit the rewritten briefs and re-check. **Done when** the check exits 0.

2. **Plan HIT/MISS.** Run `bun run cf -- bench status --round <id>` (omit `--round` for the whole set; `--json` for machine-readable). It prints `omp: found` or the benchmark is skipped, then per family HIT (cached sample path) or MISS with the exact runner command. Only MISSes run; HITs stay untouched. **Done when** the Round's MISS list and commands are in hand.

3. **Run the MISSes.** Paste every printed MISS command, verbatim, into one Bash call as background jobs and wait, with a generous timeout (runs take minutes):

   ```bash
   ( <MISS command 1> ) &
   ( <MISS command 2> ) &
   wait
   ```

   Each writes `<id>.<tag>.events.jsonl` and `<id>.<tag>.error.log` beside the brief. A missing `turn_end`, non-JSON stream or non-empty error log is a failed pin: rerun that family on its `fallback` pin by swapping the `--model` value and naming the outputs `<id>.<fallback-tag>.events.jsonl`. **Done when** every MISS has an events file or a preserved failure reason.

4. **Extract.** Run `bun run cf -- bench extract <events.jsonl>` per run. It writes `<tag>.md` beside the events and prints JSON with `sample_path`, timing and `model`. Exit 1 means the sample is not a bare `> [!narration]` block: inspect it and judge it only if the breach should be scored; any other failure is a missed run. **Done when** each run has a sample and its observed `model`.

5. **Judge.** Run `bun run cf -- bench judge-brief --id <id> --sample <abs sample.md>`; it prints the brief path (`…/judge/sample-<h8>.brief.md`) and the grades path. Read the brief, then run a fresh Judge per sample (all samples of a Round may run as background jobs):

   ```bash
   omp -p --no-session --config evals/subject.config.yml --model @PROSE-GRADER --no-skills --tools read --mode json \
     --append-system-prompt "$(awk 'f>=2; /^---$/{f++}' .omp/agents/prose-grader.md)" \
     "$(cat <judge-brief-path>)" > <judge-dir>/sample-<h8>.judge.events.jsonl
   bun run cf -- bench extract <judge-dir>/sample-<h8>.judge.events.jsonl --tag sample-<h8>.grades
   mv <judge-dir>/sample-<h8>.grades.md <grades-path>
   ```

   The Judge cannot write files; its final message is the grades array, which `extract` pulls from the events (exit 1 there is expected — grades are not Narration). The printed `model` is the Judge's observed identity. **Done when** the grades file holds one 1–5 entry per rubric, rubric text verbatim.

6. **Record top-only.** `bun run cf -- bench record` attributes scored rows to the family's top pin, so a scored row requires the runner's observed `model` (step 4) to equal that pin. Pass the Judge's observed `model` (step 5) as `--judge`:

   ```bash
   bun run cf -- bench record --id <id> --family <family> --grades <abs grades.json> --judge <observed judge model> --events <abs events.jsonl>
   ```

   A fallback run is extracted and judged like any other, then reported to the DM under its real identity and left without a scored cache row — mark the top-pin gap with `bun run cf -- bench record --id <id> --family <family> --status skipped --reason "<top-pin failure; fallback <model> judged, uncached>"`. A quota/auth failure on both pins puts the family dark for the session: use `--status dark --reason "<why>"`, and later Rounds skip it without retry; any other dead pin (invalid pin, unsupported thinking, unexpected routing, unrecordable events) records `--status skipped` with its reason. Recording rebuilds `evals/benchmark.md`; `bun run cf -- bench render` rebuilds it without touching rows. **Done when** every family in the Round has a scored, dark or skipped row and `git status --porcelain wiki raw archive` is empty.

7. **Close the Round.** Report the side-by-side to the DM: per family its actual model (top pin, fallback under its real identity, or miss reason), prose score and rubric scores, sample paths, judge identity, and every dark/skipped reason. Begin the next Round only after this report. **Done when** the DM holds the Round's complete picture.
