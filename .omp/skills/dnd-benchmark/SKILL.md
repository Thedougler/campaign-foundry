---
name: dnd-benchmark
description: Prose Benchmark — run or resume requested cross-family Matrix Narration ranking, or refresh its source-grounded prompts and leaderboard on the DM's request. Skill evals and improvement use dogfood; new skills use skill-creator.
---

# D&D Prose Benchmark

This skill is the Benchmark branch of `evals/README.md`, which holds the eval contract. Every family's `top` pin answers the committed prompts as a plain `omp -p` process. An anonymous Judge (`prose-grader`, also an `omp -p` process, per `docs/adr/0016-evals-run-without-a-custom-harness.md`) scores each sample, and `bun run cfcli -- bench` writes the leaderboard. Everything runs in Bash from the repo root. For a committed skill eval, read `skill://dogfood` instead.

## Preserved, always

- **Pins.** Families and their `top`/`fallback` pins are exactly as `evals/models.yaml` reads right now. Refreshing them is a separate DM request, run through `skill://model-evidence` § Refresh Matrix pins.
- **Committed bytes.** Runner briefs and the Judge template are byte-exact. Before changing prompt identity or cache handling, read `docs/adr/0012-benchmark-prompts-are-committed-and-deterministic.md`. Prompt-set edits move `bench_version` and clear the cache wholesale.
- **Rounds.** A Round is one prompt-set entry run on each family's top pin, in yaml order. The next Round begins once the current Round's families are closed and reported. A stop after any Round is clean, and the cache resumes the rest.
- **Anonymity.** Integer rubric scores from 1 to 5 come from a fresh Judge that sees only the anonymised brief.
- **One ledger.** `evals/benchmark.json` and `evals/benchmark.md`, written only by `bun run cfcli -- bench record` / `render`, are the recorded results. Read these paths when checking recorded rows or presenting the leaderboard.

## Refresh source context

Benchmarking is a separate, requested measurement, not a prerequisite for each feedback revision. Refresh only on an explicit request, after reading `evals/README.md` § Grounding for the shared source contract. `evals/prose-bench.yaml` holds self-contained fact excerpts from real Wiki pages, identified by its `fixture_page` provenance field. Refresh those excerpts from current sources, exclude existing Narration answers, and preserve uncertain dates and unresolved outcomes. Then commit the changed prompts and regenerate the briefs with `bun run cfcli -- bench briefs` and the deterministic pipeline below. The prompt-set hash identifies the new inputs. A benchmark run consumes committed bytes and never refreshes them from the live Wiki. Historical sample directories and grades remain historical evidence, not results for the new prompt version, and a data migration on its own is no reason to benchmark current skills.

**Done when** every changed prompt is grounded in its recorded source, its regenerated brief belongs to the new prompt version, and historical artifacts are unchanged.

## Before benchmarking

If repository dependencies or script execution are not ready, read `README.md` for the supported Bun setup before starting.

**Choose the data root.** Live runs use the repository. For dry runs, pass `--root <absolute-temp-root>` to every `bun run cfcli -- bench` subcommand. **Done when** one root is selected for the whole run, and a dry run leaves the live cache unchanged.

## Steps

1. **Briefs.** Run `bun run cfcli -- bench briefs --check`; on DRIFT run `bun run cfcli -- bench briefs`, commit the rewritten briefs and re-check. **Done when** the check exits 0.

2. **Plan HIT/MISS.** Run `bun run cfcli -- bench status --round <id>` (omit `--round` for the whole set, and add `--json` for machine-readable output). It prints `omp: found` or the benchmark is skipped, then per family HIT (cached sample path) or MISS with the exact runner command. Only MISSes run, and HITs are left unchanged. Then run `omp usage --json` and read `capacity` for the provider (the pin before `/`) of each MISS family's `top` and `fallback` pins. A provider with any window at `remainingAccounts` 0 is exhausted. When both pins' providers are exhausted, record the family dark now (step 6). Its reason is the exhausted window and that window's `reports[].limits[].window.resetsAt`. When only the top pin's provider is, run that MISS on its fallback pin as step 3 does for a failed pin. A provider absent from `capacity` runs as planned. **Done when** the Round's MISS list and commands are in hand, and each family with both providers exhausted is recorded dark.

3. **Run the MISSes.** Paste every printed MISS command, verbatim, into one `bash` call with `timeout: 900` (each run stops itself at `--max-time 600`). The call moves to a background job, and its result arrives on its own:

   ```bash
   ( <MISS command 1> ) &
   ( <MISS command 2> ) &
   wait
   ```

   Each writes `<id>.<tag>.events.jsonl` and `<id>.<tag>.error.log` beside the brief. A missing `turn_end`, non-JSON stream or non-empty error log is a failed pin: rerun that family on its `fallback` pin by swapping the `--model` value and naming the outputs `<id>.<fallback-tag>.events.jsonl`. **Done when** every MISS has an events file or a preserved failure reason.

4. **Extract.** Run `bun run cfcli -- bench extract <events.jsonl>` per run. It writes `<tag>.md` beside the events and prints JSON with `sample_path`, timing and `model`. Exit 1 means the sample is not a bare `> [!narration]` block: inspect it and judge it only if the breach should be scored. Any other failure is a missed run. **Done when** each run has a sample and its observed `model`.

5. **Judge.** Run `bun run cfcli -- bench judge-brief --id <id> --sample <abs sample.md>`. It prints the brief path (`…/judge/sample-<h8>.brief.md`) and the grades path. Read the brief, then run a fresh Judge per sample (all samples of a Round may run as background jobs). When `@PROSE-GRADER` resolves into a Matrix family, replace it in the command below with one Judge selector for the whole run, chosen by `.omp/AGENTS.md` **Model choice**.

   ```bash
   omp -p --no-session --config evals/subject.config.yml --model @PROSE-GRADER --no-skills --tools read --mode json \
     --append-system-prompt "$(awk 'f>=2; /^---$/{f++}' .omp/agents/prose-grader.md)" \
     "@<judge-brief-path>" > <judge-dir>/sample-<h8>.judge.events.jsonl
   bun run cfcli -- bench extract <judge-dir>/sample-<h8>.judge.events.jsonl --tag sample-<h8>.grades
   mv <judge-dir>/sample-<h8>.grades.md <grades-path>
   ```

   The Judge cannot write files. Its final message is the grades array, which `extract` pulls from the events (exit 1 there is expected, since grades are not Narration). The printed `model` is the Judge's observed identity. **Done when** the grades file has one entry from 1 to 5 per rubric, rubric text verbatim.

6. **Record top-only.** `bun run cfcli -- bench record` attributes scored rows to the family's top pin. A scored row requires the runner's observed `model` (step 4) to equal that pin. Pass the Judge's observed `model` (step 5) as `--judge`:

   ```bash
   bun run cfcli -- bench record --id <id> --family <family> --grades <abs grades.json> --judge <observed judge model> --events <abs events.jsonl>
   ```

   A fallback run is extracted and judged like any other, then reported to the DM under its real identity and left without a scored cache row. Mark the top-pin gap with `bun run cfcli -- bench record --id <id> --family <family> --status skipped --reason "<top-pin failure; fallback <model> judged, uncached>"`. A quota or auth failure on both pins puts the family dark for the session. Record it with `--status dark --reason "<why>"`, and later Rounds skip it without retry. Any other dead pin (an invalid pin, unsupported thinking, unexpected routing or unrecordable events) records `--status skipped` with its reason. Recording rebuilds `evals/benchmark.md`, and `bun run cfcli -- bench render` rebuilds it without touching rows. **Done when** every family in the Round has a scored, dark or skipped row and `git status --porcelain wiki raw archive` is empty.

7. **Close the Round.** Report the side-by-side to the DM. For each family, give its actual model with its prose and rubric scores and sample paths. The actual model is the top pin, the fallback under its real identity, or the miss reason. State the judge identity and each dark or skipped reason too. Begin the next Round only after this report. **Done when** the DM has the Round's complete picture.
