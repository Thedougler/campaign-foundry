# Skill evals use isolated Shattered Sea snapshots

> Copied Worlds, baselines, clones, seeds and confined writes are superseded by [ADR 0014](0014-skill-eval-runners-read-live-wiki-and-return-pages.md); its access-control extension and Session storage by [ADR 0016](0016-evals-run-without-a-custom-harness.md). Real Shattered Sea grounding and the benchmark and fixture rules below still hold.

The synthetic Lowtide fixture World exercised invented Campaign situations while the DM's home Shattered Sea Campaign held the content actually used at the table. Skill regressions could pass without testing current Wiki practices. GitHub issue [#31](https://github.com/Thedougler/campaign-foundry/issues/31) requests real Campaign grounding and preservation of the originals.

All active skill evaluation inputs now come from the real Shattered Sea Wiki, Raw and Archive. The DM and Players playtest the Wiki in weekly home Sessions; the Agent processes their reports between Sessions. `evals/README.md` owns the grounding, isolation and feedback contract. Project and skill instructions point to it when authoring, preparing or refreshing eval data or processing feedback.

Committed cases identify current real source pages and optional Ingest replay inputs. Preparation creates independent Wiki/Raw/Archive copies in an OS-temp Session (`campaign-foundry-eval-*`), with a frozen starting baseline and schema-version-2 manifest in private sibling control storage. Paired runs clone one frozen preparation so the home Campaign cannot change the pair's starting inputs. The immutable public Runner descriptor carries the natural DM request and operational paths, while criteria, seed explanations and evaluator history stay private.

The existing real-project QMD index supplies read-only search and retrieval. Preparation and execution neither copy that index into scratch nor update/embed it. Status, collection inspection and actual query/retrieval provide parent-side grounding evidence; source/hash drift invalidates the run and requires fresh preparation, not Canon repairs or index refresh.

`evals/runner-tools.ts` and `.omp/extensions/eval-access-control.ts` enforce per-run grants, assigned skill versions and writes confined to the prepared World. Runners use those capabilities rather than inherited live vault/QMD MCP or shell routes. Native omp isolation (`isolated: true`, `apply: false`) adds a worktree boundary, not a replacement for access enforcement. Completion metadata must establish isolation and no root changes.

Worlds, private control, authoring and human-audit artifacts share the creating Session's OS-temp lifetime. After child jobs, Grade and reporting settle, close the returned `sessionRoot`; owner shutdown/replacement also closes it. Keep only verdict/commit in completion records unless the DM explicitly requests durable evidence export. Earlier in-repository scratch, scratch-QMD and committed-manifest lifetime assumptions are superseded by this contract.

Narration benchmark inputs remain committed, self-contained excerpts. Explicit source refresh changes the prompt-set hash and generates a new brief directory under ADR 0012; historical samples remain intact. Model benchmarks are separate requested measurements, not an automatic prerequisite for feedback-driven skill iteration. This migration verifies data preparation and isolation without benchmarking the current skills.

Software unit-test fixtures stay synthetic and independent: they test deterministic checker boundaries, not Campaign craft. Historical intent and evaluation artifacts stay unchanged. Existing skill branch coverage is migrated to real content; new regression cases are added only for reported issues, in the smallest set that exposes the behavior.
