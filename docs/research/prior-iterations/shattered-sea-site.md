# shattered-sea-site

https://github.com/Thedougler/shattered-sea-site · Quartz site + v5 LLM-wiki/agent prep for the Shattered Sea · last activity 2026-04-28 (v5 tip; repo pushed 2026-07-19) · stack TypeScript Quartz 4/5, Python wiki_guard, Claude skills, Obsidian Markdown

## Summary
Default branch `v4` is an unmodified Quartz template with empty `content/`—no campaign agents or lore. The real prior iteration is branch `v5`: an LLM-wiki (`content/` + `index.md`/`log.md`/`hot.md`), `wiki_guard` CLI, and D&D prep skills (Brennan-style situations, Mercer narration, synthesis discovery) publishing via Quartz. Campaign Foundry already owns the Wiki hub, Ingest/Query/Lint/Prep/Push, and Scene Chart; this repo is valuable for *creative formulas* and a few lore/CLI ideas, not for re-adopting the site generator.

## Worth salvaging
1. **Shattered Sea tone triad** (`content/skills/shattered_sea_tone_guide.md`, `npc_construction_formula.md`, `scene_construction_rule.md`) — Core equation “high competence trapped inside low emotional maturity”; NPC = public image + competence + humiliating need + petty fixation; scenes layer real external threat + petty internal conflict + style + verbal escalation + real consequences. Directly improves agentic voice for this World. Adopt into `wiki/.../campaign-config.md` and light checks in `npc-design` / scene skills / `theatre-of-the-mind`. CF has no equivalent tone pack yet.
2. **PC Gravity** (`.claude/skills/prep-content/SKILL.md`) — Two Dials, Terminal Node, Active Friction; relevance pre-screen that refuses prep with no PC link. Stronger than CF’s Spotlight-as-afterthought. Co-opt into `plan-session`, `prep-session`, and design skills. Partial: PC Goals/bonds exist; gravity filter does not.
3. **Pop-culture mashup OS** (`prep-content/SKILL.md` Roleplay Method) — `[vibe] + [persona]` operating system plus 2–3 speakable lines and performance hooks. Co-opt into `npc-design` Voice (optional, campaign-config gated). CF has voice craft but no mashup formula.
4. **Narrative Islands + default outcomes** (`prep-content/references/island-template.md`, session-prep section) — Situation with dramatic question, default if ignored, register rotation, failure modes (info dump, skill gate, railroad). Maps onto Development/Cliffhanger rows. Co-opt checklist language into `prep-session` / scene skills. Partial: Scene Chart + “if ignored” exist; island diagnostics and optional cuttable island do not.
5. **Wiki synthesize** (`.claude/skills/wiki-synthesize/SKILL.md`, `.claude/bin/wiki_guard_lib/synthesis_audit.py`, `tests/test_wiki_guard_synthesis.py`) — Co-occurrence pairs scored by frequency, cross-domain, hubs, contradiction status; drafts `A × B` synthesis with backlinks. Makes agents *compose* Canon, not only retrieve. Port scoring into `cf` or a `lore-design`/`query` companion; keep CF page kinds (Lore/Thread), not `content/synthesis/`.
6. **Stakes-first + clocks + Toy Chest** (`prep-content/references/universal-toys.md`) — Lead with risk; faction clocks that advance off-screen; Session Zero red-button questions. Co-opt into `plan-session` / Faction Threads. Partial: Threads already move; explicit clock grammar and stakes-first default are thinner.
7. **wiki_guard agent presets** (`.claude/bin/README.md`, ingest runner finalize, query-prep JSON) — Deterministic prep/finalize JSON so agents don’t re-scan blindly. Idea only for `cf` Ingest/Query bookkeeping; CF already has `cf check`/`cf log`/QMD—don’t reintroduce Python dual stack.
8. **Antheri engineering texture** (`content/concepts/antheri_engineering.md`) — Corrosion-proof composite stone, living machinery, underwater architecture. Retell onto Antheri/Lore pages to sharpen salvage Scenes. Timeline already notes Catarina salvage; materials list is thinner.
9. **Named Shelfworks Goldrush** (`content/concepts/shelfworks_goldrush.md`) — 1488DR reverse-engineering boom Catarina didn’t join; Shelfworks 60–200 ft picked over by 1495. Retell as Lore event feeding prospector/criminal pressure. Not a named event in current Wiki.
10. **Explicit publish / private filter** (`quartz/plugins/filters/explicit.ts`, `docs/features/private pages.md`, `quartz.config.ts` ignorePatterns) — `publish: true` allowlist + ignore `private`/`templates`. Only if a player-facing garden returns; CF Push already separates Handouts.

## Lore to retell
- **Shelfworks Goldrush** — `content/concepts/shelfworks_goldrush.md` (name, 1488 trigger, Catarina returns to Calveno, depth band, picked-over 1495).
- **Antheri engineering suite** — `content/concepts/antheri_engineering.md` (composite stone, living machines, Maw-oriented architecture).
- **“Slow arithmetic of obligation”** — `content/entities/the_tessarine_concordat.md` (phrase for Concordat method; CF has debt/Seven Houses, not this line).
- **Pearl as fissure amplifier** — `content/entities/pearl_of_souls.md` (soul draw, five captains compressed into Fisk, directed attractor). Mostly present on `wiki/.../Items/Pearl of Souls.md` / timeline—use only to fill gaps.
- **Tone as Canon-adjacent guide** — retell pillars into campaign-config, not player lore.
- Sample names already in CF or superseded: Port Tidefall, Pearl, Tessarine, Fisk’s Fleet, Drowned Maw—prefer current Wiki as Canon.

## Skip
- Default `v4` empty Quartz clone — no content/agents.
- Full Quartz SSG/UI (graph, SPA, OG images, Docker site CI) — CF Wiki+Foundry replaces public garden.
- `dndtale` chapter/adventure packaging + quality checklists — CF Session/Scene model supersedes.
- Mercer-voice as *default* for all narration (`.claude/skills/mercer-voice/SKILL.md`) — conflicts with Shattered Sea pettiness tone; optional style only. CF `theatre-of-the-mind` covers speakable narration.
- snake_case entity layout + Obsidian CLI/Bases automation — CF layout/templates and disabled Obsidian CLI (`user-config.md`).
- Opaque 99% context compression as primary (`.claude/skills/context-compression/SKILL.md`) — keep only anchored summary sections if needed; quality too lossy for Canon work.
- Rebuilding `wiki_guard` as parallel linter — CF `cf check`/lint is the gate.
