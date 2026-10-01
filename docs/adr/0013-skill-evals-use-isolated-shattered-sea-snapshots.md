# Skill evals use isolated Shattered Sea snapshots

The synthetic Lowtide fixture World exercised invented Campaign situations while the DM's home Shattered Sea Campaign held the content actually used at the table. Skill regressions could pass without testing current Wiki practices. GitHub issue [#31](https://github.com/Thedougler/campaign-foundry/issues/31) requests real Campaign grounding and preservation of the originals.

All active skill evaluation inputs now come from the real Shattered Sea Wiki, Raw and Archive. The DM and Players playtest the Wiki in weekly home Sessions; the Agent processes their reports between Sessions. `evals/README.md` owns the grounding, isolation and feedback contract. Project and skill instructions point to it when authoring, preparing or refreshing eval data or processing feedback.

Committed cases identify their real source pages and optional Ingest replay inputs. A preparation command makes an independent filesystem snapshot, starting baseline, scratch-local QMD configuration and source-hash manifest. Runners receive only scratch content paths. Paired runs clone one frozen preparation, rather than taking two snapshots while the home Campaign changes. Source verification invalidates a run when originals or isolation boundaries differ from the manifest.

omp isolation is requested for eval subagents when available, while prepared content and outputs remain outside the isolated repository workspace. It is an additional execution boundary, not a replacement for Campaign data snapshots. Completion metadata must establish isolation and absence of root changes because configured successful changes can apply back to the parent.

Narration benchmark inputs remain committed, self-contained excerpts. Explicit source refresh changes the prompt-set hash and generates a new brief directory under ADR 0012; historical samples remain intact. Model benchmarks are separate requested measurements, not an automatic prerequisite for feedback-driven skill iteration. This migration verifies data preparation and isolation without benchmarking the current skills.

Software unit-test fixtures stay synthetic and independent: they test deterministic checker boundaries, not Campaign craft. Historical intent and evaluation artifacts stay unchanged. Existing skill branch coverage is migrated to real content; new regression cases are added only for reported issues, in the smallest set that exposes the behavior.
