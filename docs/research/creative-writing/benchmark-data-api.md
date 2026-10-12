# Creative-writing benchmark data APIs

Research date: 2026-10-11. Target families: Anthropic/Claude, OpenAI/GPT, xAI/Grok and Z.ai/GLM. This note concerns access to existing benchmark results, not inference APIs or running new evaluations.

## Repo helper

`model_evidence` is a native omp custom tool in `.omp/tools/model-evidence.ts`, and `bun run benchmarks` is the same lookup through Bash. Both return published EQ-Bench writing scores only. Quota, pricing and thinking levels come from omp itself (`omp usage --json`, `omp models --json`), so the helper doesn't repeat them.

```sh
bun run benchmarks --model claude-opus-5-5 gpt-6-sol grok-4.7 glm-5.3
bun run benchmarks --model gpt-5-2025-08-07 --variants --details --sort longform
bun run benchmarks --help
```

The default output retains every numeric field in the official EQ-Bench creative and longform feeds, original run names, reasoning labels and sample links. `--details` adds all published Sophon model scores (general and writing benchmarks), the 15-criterion rubric, style associations and repetition diagnostics. Exact model names win over substrings unless `--variants` is set. Scores, model names and individual `creative.<metric>` / `longform.<metric>` fields are sortable; `--order asc|desc`, `--limit` (0 for all) and `--offset` control the page. Unknown values sort last. Creative Elo and longform /100 remain separate.

Native tool arguments are `models` (an array), `benchmark`, `variants`, `details`, `sort`, `order`, `limit`, `offset` and `excludeModels` (name substrings to drop). There are no role presets, recommendations or combined suitability scores. Selection remains agent judgement.

Public benchmark reads require no API key and make no inference calls. Source timestamps expose staleness. A query that matches no published model, or a lookup failure, exits 1, and a query dropped only by `--exclude-model` is not missing. Invalid CLI arguments exit 2.

The compiled omp binary can't resolve npm packages from on-disk custom tool code (`Cannot find package` in `~/.omp/logs`). So the tool imports none: it runs `scripts/benchmarks.ts` under the real Bun runtime. omp discovers the tool when it initialises its tool registry, so a running session doesn't pick up a newly written module.

## Recommendation: Sophon JSON API over EQ-Bench results

[Sophon's API documentation](https://sophon.at/cli) documents an unauthenticated, read-only JSON API. Responses are cached for an hour; upstream licences apply. It asks for reasonable request volume but gives no numeric quota or service-level guarantee on that page.

| Benchmark | Documented entity endpoint | Metric | Observed records |
| --- | --- | --- | --- |
| EQ-Bench Creative Writing v3 | `https://sophon.at/api/v1/evals/eqbench-creative-writing` | Pairwise writing Elo | 105 |
| EQ-Bench Longform Creative Writing | `https://sophon.at/api/v1/evals/eqbench-longform-creative-writing` | Overall score, 0–100 | 107 |

Actual unauthenticated HTTP requests returned 200 for both endpoints. Their `scores` arrays contain `{model: {slug, title}, score}` objects. Scores are strings, and the response order is not ranking order: convert to numbers and sort. Observed `samples` arrays were empty; full rubric, slop, repetition and chapter diagnostics were not present in these score objects.

### Verified target-family coverage

These example rows appeared in both API responses. All eight values matched the official EQ-Bench score feeds fetched in the same run. They establish coverage, not a claim that these are the newest available models or a complete family ranking.

| Family | Sophon model slug | Creative-writing Elo | Longform score / 100 |
| --- | --- | ---: | ---: |
| Anthropic | `claude-opus-5-5` | 2050.1 | 84.6 |
| OpenAI | `gpt-6-sol` | 2124.7 | 82.8 |
| xAI | `grok-4-7` | 2006.7 | 83.0 |
| Z.ai | `glm-5-3` | 2075.0 | 81.8 |

### Minimal access

```sh
curl -fsS 'https://sophon.at/api/v1/evals/eqbench-creative-writing'
curl -fsS 'https://sophon.at/api/v1/evals/eqbench-longform-creative-writing'
```

The documented search endpoint discovers benchmark slugs:

```text
https://sophon.at/api/v1/search?q=WritingBench&type=eval
```

It returned a `writingbench` entity, but [that entity's response](https://sophon.at/api/v1/evals/writingbench) had an empty `scores` array. Do not recommend it as a results API merely because its metadata exists.

## Benchmark fit and limits

- [Creative Writing v3 methodology](https://github.com/EQ-bench/creative-writing-bench): 32 prompts, three iterations each, rubric grading and pairwise comparisons. Normalised Elo is the primary relative ranking metric. Not a conversational roleplay benchmark.
- [Longform methodology](https://eqbench.com/creative_writing_longform.html): brainstorm, plan, revise, develop characters, then write eight roughly 1,000-word chapters. Measures character consistency, narrative coherence, plot, dialogue and prose across chapters. This is genuine multi-chapter generation, not merely long-context retrieval.
- Both are LLM-judged, with possible family/style bias. Treat them as a shortlist and read samples; they do not prove suitability for the DM's spoken Narration.
- Elo and longform 0–100 scores are distinct scales. Keep separate rankings.

## Direct upstream access: richer, but not a supported REST API

Public official score feeds:

- [Creative Writing JavaScript](https://eqbench.com/creative_writing.js), variable `leaderboardDataCreativeWritingV3` contains CSV with `model_name`, `elo_score`, `creative_writing_score`, `avg_length`, `vocab_complexity`, `slop_score`, `repetition_score`.
- [Longform JavaScript](https://eqbench.com/creative_writing_longform.js), variable `leaderboardDataLongformV3` contains CSV with `overall_score_100`, chapter averages, final judgement, length, slop and repetition.
- [Official website repository](https://github.com/EQ-bench/EQ-bench-site) supplies the same files and can be pinned to a commit for reproducible snapshots.

Both live JavaScript feeds returned HTTP 200 and parsed to 140 rows each. Both reported Last-Modified 2026-09-24, so successful retrieval is not proof of coverage of releases since then. Sophon exposes fewer rows and may lag upstream. CSV is embedded in JavaScript, not a promised JSON schema: extract as text, never execute fetched code. Preserve original model identifiers and annotations in archived data.

For prompts, generated text and judging evidence, the [creative-writing repository](https://github.com/EQ-bench/creative-writing-bench) provides `creative_bench_runs.zip` and `elo_results.zip`. Its README explicitly warns that these archives may lag the leaderboard and supplies `contact@eqbench.com` for latest results. The [longform repository](https://github.com/EQ-bench/longform-writing-bench) provides the generation and scoring harness.

## Alternatives

See [benchmark-api-alternatives.md](benchmark-api-alternatives.md) for LLM Stats, Artificial Analysis, Arena and WritingBench. Prefer the Sophon endpoints for the requested creative/longform scores; use upstream EQ-Bench when completeness or diagnostics matter.

## Verification performed

Live Sophon and official EQ-Bench fetches verified four-family coverage and the eight headline values above. Detail output exposed 12–15 Sophon scores per sampled model, all 15 rubric criteria, 50 style associations and both repetition profiles. On 2026-10-11, a fresh `omp -p` session (omp 18.9.2) loaded `model_evidence` and returned the GLM-5.3, Claude Opus 5.5 and Grok 4.7 scores, with `gpt-6.1-sol` listed under `missing`. TypeScript diagnostics passed for the tool and both scripts.
