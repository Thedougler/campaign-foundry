---
name: dnd-benchmark
description: Prose Benchmark — run a requested blind council benchmark of the Matrix families on a DM-written Benchmark prompt, or present its leaderboard. Skill evals and improvement use dogfood; new skills use skill-creator.
---

# D&D Prose Benchmark

This skill is the Benchmark branch of `evals/README.md`, and ADR 0038 sets out its design. Each selected family's Runner answers one DM-written Benchmark prompt with the Wiki page it asks for, built around a `> [!narration]` callout. `bun run cfcli -- bench alias` anonymises the samples, a council of the same families grades and ranks them, and `bun run cfcli -- bench reveal` writes the committed log. The run is finished when its directory `evals/bench/runs/<date>-<id>-v<N>/` contains each sample and grade with the council result, the Leaderboard (`leaderboard.md` in `evals/bench/`) is rebuilt and the DM has the report. For a committed skill eval, read `skill://dogfood` instead.

## Always

- **The DM writes the prompts.** A Benchmark prompt is `evals/bench/prompts/<id>/v<N>.md`, named by its version `<id>/v<N>`. Agents never write, edit, generate or add a file there. A changed prompt is a new version the DM writes. Run the version the DM names, or the highest version of the prompt he names. When `bench status` doesn't list a prompt, stop and tell the DM the prompt slot is empty.
- **Models.** A family's seat is the `model` and `thinking-level` in the frontmatter of `.omp/agents/bench-runner-<family>.md` and `.omp/agents/bench-grader-<family>.md`, identical in both. A seat changes only on the DM's request, through `skill://model-evidence` § Refresh Benchmark seats.
- **Blind.** Runners and graders receive exactly the task text below. The mapping stays in the directory `bench alias` prints until `bench reveal` moves it into the log, so leave it unread and out of every dispatch.
- **The commands write the log.** Samples, grades and results stay as their agents returned them. Commands leave earlier log entries unchanged, and an amendment is a new dated entry that records the entry it amends.

## Steps

1. **Select families.** Run `bun run cfcli -- bench status`. Per family it prints the seat's model and thinking level and its quota: `available`, `exhausted` or `unknown`, with the meter it read (xAI reads the Grok Build limit), its `remaining` fraction and `resetsAt`. Per prompt version it lists the latest log entry and its pending families. Select each `available` family whose remaining usage can finish a Runner and a grader on this prompt, judged from `remaining` and how soon `resetsAt` comes. Skip a family whose usage might run out before then, along with `exhausted` and `unknown` seats (`skill://model-evidence` § Sources). Each skipped family is pending, with its reason.

   When the version's latest log entry lists pending families, this run is an amendment to it. Run only those pending families that now pass the check. Families with a sample in that entry join the council when their usage can finish a grader.

   **Done when** each family is selected or pending with a reason, with two council seats or more. A new entry needs at least two selected families and an amendment at least one. Short of that, report the quota to the DM and stop.

2. **Run.** Dispatch one `task` batch with one item per selected family, on agent `bench-runner-<family>`. Each item gets the same `context` and the task text `Benchmark prompt: evals/bench/prompts/<id>/v<N>.md`. As each returns, copy its result into one temporary directory: `results=$(mktemp -d)` once, then `cp agent://<id> "$results/<family>.json"`. Rerun a Runner once when it fails or its `page` lacks a `> [!narration]` callout. A second failure drops its family, with the error as the reason. **Done when** each selected family has a result file or a reason, and a new entry has at least two results or an amendment has at least one.

3. **Anonymise.** Run `bun run cfcli -- bench alias --prompt <id>/v<N> <family>=$results/<family>.json …`. Add `--pending <family>="<reason>"` for each family skipped in step 1 and `--dropped <family>="<reason>"` for each family dropped in step 2. For an amendment, add `--amend <earlier run dir>`. The command copies that entry's samples into the new entry byte for byte and gives each sample in the entry a fresh animal name. It writes the run directory and prints that directory, the aliases and one council brief path per grader. **Done when** the command exits 0 and every sample is in `<run dir>/samples/`.

4. **Council.** Dispatch one `task` batch with one item per council seat, on agent `bench-grader-<family>`. The council is each selected family with a sample, plus in an amendment each family from step 1 that joins it. Each item gets the same `context` and the task text `Council brief: <that grader's brief path>`. Save each result with `cp agent://<id> <run dir>/grades/<family>.json`. Rerun a grader that fails once. A second failure leaves its seat empty, which `bench reveal` records. **Done when** at least two grades files are saved.

5. **Reveal.** Run `bun run cfcli -- bench reveal --run <run dir>`. It checks each grades file and averages the council's scores and ranks. Then it moves the mapping into the log and writes `report.md`, and it rebuilds the Leaderboard. Exit 1 names an invalid grades file: rerun that grader (step 4), then reveal again. **Done when** the command exits 0.

6. **Report.** Give the DM the council's order from `report.md`, with each family's seat and its mean rank and mean score. Add the top sample's narration callout and each pending or dropped family with its reason and `resetsAt`, then the Runners' and graders' friction. **Done when** the DM has the run's complete picture.

To present the standing results, read `leaderboard.md` in `evals/bench/`. `bun run cfcli -- bench render` rebuilds it from the committed runs.
