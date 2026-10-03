# shattered-sea-wiki

https://github.com/Thedougler/shattered-sea-wiki · LLM-assisted Obsidian D&D 5e (2024) campaign wiki + Claude Code prep/ingest workspace for Shattered Sea · last activity 2026-07-05 · stack Obsidian Markdown, Claude Code skills/hooks, pure-stdlib Python scripts, pnpm TS monorepo (`sea` CLI + Astro UI), optional MLX/pyannote audio

## Summary

Predecessor of Campaign Foundry: one vault of canon (`wiki/hot.md`, entities, situations, sessions) plus agent skills that prep run-guides, design toys, ingest transcripts, and lint frontmatter/wikilinks. Table work optimized for cold-read scannability (inline-first cards, NPC handles, visible clock ticks). Superseded by CF’s World/Campaign split, Scene Chart kinds, design skills, and `cf` gate; audio live-co-DM and Astro player UI sit outside CF’s between-Sessions contract (ADR 0002).

## Worth salvaging

1. **Inline-first run-guide craft** (`.claude/skills/prep-session/references/run-guide-spec.md`, `wiki/sessions/session-06-run-guide.md`) — Dashboard (Snapshot, How Tonight Runs, Threads with If ignored + visible tick, NPC Bench handles), scene cards with What’s true / If engaged / If ignored / Hook out, order-agnostic secondary scenes, climax “What’s true board” + `[!mechanic]` detonation. Makes Prep runnable without wiki thrash. **Adopt:** co-opt into `prep-session` + scene skills + templates; keep CF fixed Hook→…→Resolution chart but allow optional middle menu like S06 4–6. Partially covered by Scene Chart; missing table handles and visible-tick language.

2. **Roleplay Concept mashup + Quote + proactive objective** (`.claude/skills/prep-npc/SKILL.md`, `references/NPC.md`, `ttrpg-llm-wiki-init/references/PREP.md`, Solange page) — One-line OS (“Seminary dropout meets demolitions engineer”), speakable quote, present-tense doing-when-met. Faster than trait lists. **Adopt:** idea into `npc-design` / `creature-design` Play; optional field beside face/voice. CF has face/voice/tells; not mashup OS.

3. **Player Gravity Wells + engagement intelligence** (`wiki/system/player-gravity-wells.md`, `wiki/dm/player-interests.md`, `session-ingest/references/extraction-targets.md` `[SIGNAL]`/`[COMBAT]`) — Per-PC dials, terminal nodes, cross-party collisions; post-session engaged/cold queues; transcript tags for preference + combat metrics feeding party CR band (`.claude/skills/pc-combat-primer/references/PARTY-COMBAT-PROFILE.md`). **Adopt:** co-opt gravity map into `plan-session` / Campaign config; SIGNAL→ingest extras; party combat profile idea into cliffhanger/climax budget (CF already has +1 offset). No CF equivalent for interests loop.

4. **ttrpg-writing standards** (`.claude/skills/ttrpg-writing/SKILL.md`, `references/dm-reference-standards.md`, `brennan-voice.md`, `UNIVERSAL-TOYS.md`) — Mode split (DM reference vs player prose), anti-slop (Deletion Test, Negation Limit, banned structures, no “wrong” as mood), consequence-first voice, point-first OSE keys, Three Clue Rule, concrete If-ignored, Toy Chest/Session Zero red buttons. **Adopt:** fold into `theatre-of-the-mind`, `humanizer`, scene skills, `docs/intent/`. CF bans some slop via Vale/narration; this is denser creative law.

5. **Faction/thread simulation modes** (`.claude/skills/prep-faction/references/faction-simulation.md`, `world-update/`) — Planning (pending pressure only) vs Advancement (canon write) vs Review; collision resolution; urgency→scene placement. **Adopt:** idea into `faction-design` agenda ticks + post-ingest hot rewrite; optional thin world-update step after Recap. CF agendas exist; explicit planning/advancement split does not.

6. **Paint-by-numbers battlemaps** (`.claude/skills/prep-map/`, `docs/superpowers/specs/2026-06-18-prep-map-design.md`, `scripts/lib/scene.mjs`, `map.mjs`) — Agent-authored `grid`+`legend` guide → free render → img2img beautify → vector grid composite; geometry locked, style free. **Adopt:** port code under `cf`/skill if Foundry maps stay weak; else idea only. CF `generate-image` forbids grids—orthogonal upgrade.

7. **Narrative island / street banks** (`.claude/skills/prep-island/references/ISLAND-TEMPLATE.md`, `wiki/narrative-islands/calveno-street-encounters.md`) — Self-contained situations with register, default if-ignored, d6 drop-ins (Wrong Mark, canal rescue, papers). **Adopt:** optional Scene bank pages for Settlements; `plan-session` riffs. Partial via dungeon/location design.

8. **Sandbox multi-pass generation** (`.claude/skills/sandbox-narrative/references/SANDBOX-PIPELINE.md`, `narrative-devices.md`) — Architecture→entities→spatial→micro-detail; Chekhov/clocks/false victory as placement tools. **Adopt:** discipline notes for `dungeon-design` / `location-design`. CF already multi-skill; pipeline sequencing still useful.

## Lore to retell

Canon already largely lives in CF wiki (Beffe, Solange/Ruma, Pearl/Maw, Calveno). Still worth retelling where thin:

- **Street texture:** Fen’s hatch key, Orso→Nona credit, Beffa ambient teams (`wiki/narrative-islands/calveno-street-encounters.md`).
- **Beffa winners table / beffa doppia** as social leverage color (`wiki/lore/il-gioco-delle-beffe.md`) — CF Beffe page is thinner on winners.
- **S06 climax kit:** Solange channeling, non-spell ceiling detonation, circle ward, escape-if-disrupted intel to Simone (`wiki/entities/characters/npcs/solange-barret.md`, session-06 run-guide).
- **Gravity dials** formalized (`wiki/system/player-gravity-wells.md`) even where PC pages already imply them.
- **Sunken Crown island ring** detail if CF region pages lag (`wiki/entities/places/regions/sunken-crown.md`).

## Skip

- **live-co-dm / live-transcription / record-session-audio / tools/audio** — violates CF between-Sessions-only stance; heavy Apple Silicon ML stack.
- **Astro `ui/` player site + publish/audience pairing** — CF Wiki+Foundry Push owns player surface; dual publish pages add secrecy footguns.
- **`sea` monorepo / biome hooks / continuous-self-improvement** — CF `cf` + Vale already own gates; don’t re-platform.
- **Mandatory world-tick d20 bands** — optional flavor; CF prefers concrete agenda milestones over dice theatre.
- **Narrative-island `[!secret]` / sprawling callout zoo** — CF narrowed callouts; convert not copy.
- **Full notebooklm-export / Inbox dumps** — raw provenance, not craft.
