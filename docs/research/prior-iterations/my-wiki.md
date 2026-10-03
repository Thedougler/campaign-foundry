# my-wiki

https://github.com/Thedougler/my-wiki · personal Obsidian Life OS with a Claude Code workspace · last activity 2026-06-06 in the vault operation log; latest commit date unverified · stack Markdown, Claude Code, Obsidian, Templater, Dataview, Tasks

## Summary
`CLAUDE.md` describes an ADHD-friendly life-management vault shared between a human using Obsidian mobile/Sync and an Agent using git/MCP. It separates human-authored projects, daily notes and reviews from an Agent-maintained knowledge spine, with progressive context loading and external ingest tooling. The inspected snapshot is lightly populated: `wiki/index.md` has empty concept/entity/source catalogs, while project pages mainly cache GitHub activity. There is no evidence explaining its supersession; it is adjacent workspace infrastructure rather than an earlier D&D writing engine.

## Worth salvaging

1. **Small, concrete reflection prompts** (`wiki/templates/weekly.md`, `wiki/templates/monthly.md`, `wiki/templates/quarterly.md`) — Weekly review asks what worked, what failed and what to change; monthly review adds observed patterns; quarterly review contrasts intended goals with actual outcomes and asks what is being avoided. Co-opt the questions into `plan-session` when the DM volunteers feedback: propose one grounded adjustment to pacing, Spotlight or tone, rather than introducing a review form. Campaign Foundry already reads the previous Recap and follows the DM's energy; these prompts add a compact way to learn from the experience of running the Session, not merely its fictional events. Never infer the Players' enjoyment from fictional success or turn these into mandatory bookkeeping.

2. **Research briefs that return usable material, not transcripts** (`.claude/agents/gemini-research-expert.md`) — The specialist first identifies the real information need, domain boundaries and desired output, then splits complex questions into focused queries, synthesizes results, flags gaps and refines shallow searches. Co-opt that briefing recipe into research handoffs used by `lore-design`, `location-design` and other design skills: ask for concrete customs, physical details or institutional tensions a writer can transform into playable material. Campaign Foundry already has research/search capabilities; no new agent or Gemini dependency is warranted. Strengthen the original's optional citation language to the current requirement for primary-source evidence, and distinguish researched facts from creative adaptations.

3. **Explicit edit boundaries around human work** (`CLAUDE.md`, `.claude/commands/refresh-projects.md`) — The ownership table makes the human/Agent split visible; the refresh command replaces only the block between `%%github-start%%` and `%%github-end%%`, preserving surrounding prose. Co-opt the boundary-setting idea, not the folder permissions: document exactly which maintenance output a tool owns and which authored or historical text it must preserve. Campaign Foundry already goes further in several places: `audit` protects played Session records, `query` files surgically, and scripts own index/log. Apply marker-bounded replacement only if a future generated metadata block genuinely needs it; do not add markers to Narration or prevent Agents from writing Campaign content.

## Lore to retell

None. `wiki/projects/Shattered Sea.md` identifies the separate D&D wiki and caches commits mentioning Hierarch creatures and La Cenere items, but contains no actual descriptions, motives, locations or hooks to retell. `wiki/projects/shattered-sea-inbox` appears in the file listing but could not be opened; its contents are unverified and must not become Canon.

## Skip

- **Memory spine as a new feature** (`CLAUDE.md`, `wiki/hot.md`, `wiki/index.md`, `wiki/log.md`) — Already present in Campaign Foundry. Its hot cache still says zero active projects despite populated project pages, illustrating why orientation is not evidence.
- **Assumed ingest/load implementation** (`CLAUDE.md`) — `/wiki-load` and `/wiki-setup` are referenced, but their definitions are absent from the inspected command directory. Current atomic Ingest and QMD are stronger; there is no local ingest code to port.
- **Machine-specific hooks** (`.claude/settings.json`) — The wikilink hook points to an absolute external checkout. Reuse Campaign Foundry's unified gate instead.
- **Life-productivity machinery** (`wiki/dashboards/home.md`, `wiki/templates/daily.md`, `.obsidian/community-plugins.json`) — Task dashboards, mood/energy fields and calendar plugins do not improve Campaign prose enough to justify extra ceremony.
- **GitHub activity feeds and Gemini routing** (`.claude/commands/refresh-projects.md`, `.claude/agents/gemini-research-expert.md`) — Preserve their narrow workflow lessons, not the feed feature, model pin or nested CLI dependency.
