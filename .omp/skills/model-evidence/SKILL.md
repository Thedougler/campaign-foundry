---
name: model-evidence
description: Model evidence — gather the evidence for a model choice or comparison, each question from its one source (writing scores, quota, selectors and thinking levels, catalogue rates, speed, past spend). Use when choosing a test subject, grader or Benchmark seat, comparing models, or when the DM asks for a model's benchmarks, quota or speed.
---

# Model evidence

Each question about a model has one source, listed below. The run is finished when every model the ask names is resolved to an omp selector and an EQ-Bench result or `missing`, and every question the ask poses has its source's answer or a stated gap. The reply cites the command or tool behind each figure. The sources return evidence only. Choosing a model from it is your judgement, by the role criteria in `.omp/AGENTS.md` **Model choice**.

## Sources

|Question|Source|Read|
|---|---|---|
|Writing quality|`model_evidence` tool (in Bash, `bun run benchmarks`, `--help`)|`rows[].creative` (Elo), `rows[].longform` (out of 100), `missing`. `details: true` adds other published benchmark scores and the EQ-Bench rubric, style and repetition data.|
|Remaining quota|`omp usage --json`|`capacity.<provider>[]`: `remainingAccounts` per window, pooled across accounts. `reports[].limits[]`: `status`, `amount.remainingFraction` and `window.resetsAt` (epoch ms).|
|Selectors, thinking levels, catalogue rates|`omp models find <substring> --json`, or `omp models --json` for all|`models[].selector`, `thinking`, `contextWindow`, `cost` (USD per million tokens) and `pricingStatus`|
|Speed|`omp stats --json` for this machine's past runs; `omp bench <selector>... --json` for a live measurement, which spends quota|`byModel[]`: `avgTtft` (ms), `avgTokensPerSecond`, `errorRate`|
|Past spend|`omp usage --history --days <n> --json`, `omp usage clients --days <n>`, `omp stats --summary`|Limit snapshots and tokens per client (`usage`). Requests and API-equivalent cost per model (`stats`).|

Bare `omp stats` starts a dashboard server, so pass `--json` or `--summary`.

A provider is available when every one of its `capacity` windows has `remainingAccounts` above 0. A window at 0 is exhausted until its `reports[].limits[].window.resetsAt`. A provider absent from `capacity` has unknown quota, and unknown quota counts as unavailable for choosing a model. `xai-oauth` takes its availability from the Grok Build meter alone: the `reports[].limits[]` entry with `id` `xai-oauth:product:grokbuild:1w` ("Grok Build (Weekly)"). It is exhausted until its `window.resetsAt` when its `status` is `exhausted` or its `amount.remainingFraction` is 0, and available otherwise. Its pooled `capacity` window, SuperGrok credits and GrokChat limit meter other xAI products. Catalogue rates are reference prices, not subscription costs.

## Resolve each name

1. **Selector.** Run `omp models find <the DM's words, shortened to the model id> --json` (for "Sol 6.1", `omp models find 6.1-sol --json`). Several providers can serve one model (`openai-codex/gpt-6.1-sol`, `github-copilot/gpt-6.1-sol`). Report each provider's availability from `omp usage --json` by the rule in § Sources, for each provider the ask needs. **Done when** every model in the ask has its selectors and their availability.
2. **EQ-Bench row.** Query `model_evidence` with the selector's model id, the part after `/` (`gpt-6.1-sol`). Exact name matches come before substring matches unless `variants` is set, so check that each returned row's `model` is the model asked about. **Done when** each model id has its row or is listed in `missing`.

A model in `missing` has no EQ-Bench run: report it as missing. A sibling's score (`gpt-6-sol` for `gpt-6.1-sol`) stays labelled as that sibling's and is never reported as the asked model's score.

## Refresh Benchmark seats

A family's Benchmark seat is the `model` and `thinking-level` in the frontmatter of `.omp/agents/bench-runner-<family>.md` and `.omp/agents/bench-grader-<family>.md`, set identically in both. When the DM asks to refresh the seats, run `bun run cfcli -- bench status --json` first: its `quota` for each seat applies the availability rule above. Gather the evidence above for every candidate in each family, then apply the **Benchmark seats** criteria in `docs/agents/delegation.md` § Models. Pass `excludeModels: ["fable"]` to every `model_evidence` call. **Done when** `omp models --json` lists each seat's selector with the seat's level in its `thinking` list, and its provider is available with quota data in `omp usage --json`. Both definitions give the seat, and the reply gives each seat's writing scores and quota with why it was chosen over the other candidates. A cheap pin in `evals/models.yaml` is refreshed from the same evidence by that file's header rules.
