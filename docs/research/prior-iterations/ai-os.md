# ai-os

https://github.com/Thedougler/ai-os · Umbrella repository for independent AI/productivity projects · last activity unverified (commit metadata unavailable through exposed tools) · stack Git submodules, Markdown, Bash

## Summary

`ai-os` groups independent repositories rather than implementing a campaign-writing system. Its root documentation routes agents to each project's own instructions and toolchain; a Bash script initializes submodules and optionally runs their setup scripts. No shared build or test tooling exists at the root, and the inspected files contain no campaign templates, creative prompts, evaluations, or lore. There is no evidence here that the umbrella itself was superseded.

Scope: all five root files were read from the supplied local clone. Submodule descriptions below come from the umbrella's documentation, not inspection of their implementations. Campaign Foundry's glossary, agent instructions, ADR filenames, and existing skill names were consulted to avoid treating established capabilities as new discoveries.

## Worth salvaging

1. **Direct campaign-writing research target: Shattered Sea** (`shattered-sea/`, `.gitmodules`, `CLAUDE.md`) — This submodule points to **Thedougler/shattered-sea-wiki**, not Thedougler/shattered-sea. The umbrella describes an Obsidian campaign vault plus Claude Code workspace, TypeScript `sea` CLI, and Python voice/transcription tools. Prioritize its creative instructions, prompts, and canon over its application infrastructure in a separate survey. Potential destinations are `ingest`, `prep-session`, the Scene/design skills, and retold Wiki content. Campaign Foundry already covers the high-level vault/agent/CLI pattern; specific improvements remain [INFERENCE] until those files are read.

2. **Shared creative-skill research target** (`agent-skills/`, `CLAUDE.md`) — The umbrella advertises a consolidated library of 85 skills, nine hooks, and four subagents sourced from its projects. This is the second directly relevant submodule: it may preserve writing workflows displaced during consolidation [INFERENCE]. Co-opt useful instructions selectively into existing omp skills and `docs/intent/`; do not wholesale copy Claude-specific hooks or create another skill registry. Campaign Foundry already has extensive Scene, design, ingest, and evaluation skills. The advertised counts were not independently verified.

3. **Keep content memory distinct from developer instructions** (`CLAUDE.md`) — The root explicitly warns that vault/wiki directories hold content or AI memory, and that nextturn's vault-level instructions are a user profile rather than development configuration. Preserve this distinction when mining older prose: profile preferences are not automatically canonical lore or engineering policy. Land any useful clarification in Campaign Foundry's existing orientation/sourcing instructions, not a new subsystem. Its current glossary, DM settings, campaign configuration, and Wiki separation already cover much of this.

4. **Peripheral wiki-workflow candidate** (`my-wiki/`, `README.md`, `CLAUDE.md`) — Identified as a personal Obsidian wiki with an agent workspace. It is relevant only as a possible source of durable-memory or knowledge-maintenance practices [INFERENCE], not D&D canon. Any useful findings should strengthen existing `ingest`/`query`/`audit` workflows; QMD and atomic Wiki pages already serve this purpose. No personal content was inspected.

## Lore to retell

None in the inspected umbrella files. They identify the Shattered Sea campaign repository but contain no named people, places, factions, or adventure hooks. This does not establish that the submodule lacks lore.

## Skip

- **`nextturn/`** — AI life coach with a card UI, planning loop, and wiki memory. Peripheral agent-memory relevance only; no demonstrated D&D-writing benefit warrants a deep dive here.
- **`ai-job-search/`** — CV/cover-letter drafting is agentic writing, but job boards, application workflows, and LaTeX are outside campaign-authoring scope.
- **`odure/`** — Shop website; no identified campaign-writing relevance.
- **`onward/`** — Declared only in `.gitmodules`; purpose and relevance are unclassified. Do not invent either.
- **`setup.sh`** — Generic dependency orchestration, not creative tooling. It handles five of seven declared submodules and suppresses branch-checkout failures; do not port it.
- **Automatic commit/push instructions in `CLAUDE.md`** — Harness-era operational policy, not a writing improvement; do not import it.
- **A new umbrella/shared build layer** — Unnecessary for Campaign Foundry. The useful takeaway is instruction routing, already present, not submodule architecture.
