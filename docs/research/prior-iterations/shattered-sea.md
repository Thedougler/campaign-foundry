# shattered-sea

https://github.com/Thedougler/shattered-sea · Claude-Code-powered Obsidian "LLM-wiki" for the Shattered Sea campaign, scaffolded but never ingested · last visible activity 2026-04-26 (`log.md` INIT; shallow clone, no git history) · stack Claude Code skills (Markdown SKILL.md), Obsidian, Fantasy Statblocks plugin, QMD, external `wiki` CLI [INFERENCE]

## Summary
An early application of the Karpathy LLM-wiki pattern to D&D: a scaffolded vault (`raw/` → `wiki/`, index/log/hot) driven by Claude Code slash-skills. The vault stayed empty — `log.md` records only the 2026-04-26 INIT — while the real creative engine accumulated in ~30 skills under `.claude/skills/`, chiefly `prep-content` (Brennan Lee Mulligan prep framework), `dndtale`, `prep-statblock`, `mercр-voice` and `humanize-writing`. Superseded by Campaign Foundry, which already implements the wiki mechanics (ADR 0001, 0011); the prep-creativity references are the mine.

## Worth salvaging

1. **Pop Culture Mashup roleplay method** (`.claude/skills/prep-content/SKILL.md` § Roleplay Method) — every speaking NPC/monster gets a one-line mashup ("owl Obi-Wan Kenobi", "rat grandma Scarface") as its operating system, plus a Voice & Delivery block: speech patterns, 2–3 lines the DM can actually say, physical mannerisms, emotional default + what cracks it, and 2–3 performance hooks. Highest per-word creativity gain for character pages; co-opt the idea into `npc-design` (and intelligent Creatures). Not covered by CF today.

2. **PC Gravity model** (same file § PC Gravity) — per PC: Two Dials (opposed internal tensions), Terminal Node (asymptotic desire, never cleanly solvable), Active Friction (where toys go); the gravity filter ("does this pull a dial or terminal node? else cut") and the Session Zero five questions (become / afraid of losing / who they love / personal failure / red button). Feeds `plan-session` intent settling and campaign-config intake; CF has Threads and Spotlight but not this wiring model.

3. **Thread-selection & pacing heuristics** (`prep-content/references/pacing-heuristics.md`) — spotlight rotation (PC unspotlit 2 sessions → mandatory beat), max 2 faction threads and 2 locations per session, register-alternation table (social/exploratory/combat/revelation), max 1 major revelation, "urgent means this session or next", plus a sparse-threads strategy table (early campaign / post-arc lull / single-location lockdown → focused, not thin). Lands as a reference under `prep-session`/`plan-session`; CF paces the Scene Chart but has no thread-selection heuristics.

4. **Strong Start taxonomy** (`prep-content/references/strong-start-types.md`) — five types (In Medias Res, Interrupted Routine, Standoff, Discovery, Return), each with works-when, a worked read-aloud example and a failure mode; anti-pattern table (Recap Start, Lore Gate, Gentle Nudge, Split-Party Opener, Over-Authored Start); quality checklist; vary-type-across-sessions rule. Merge into `hook-scene` as reference material.

5. **Island template with default outcomes** (`prep-content/references/island-template.md`) — one-sentence dramatic question as the scene diagnostic; a mandatory default outcome (what happens if the party never shows — proves stakes and feeds a future Strong Start); `[!secret]` as labelled improv fuel; "if the party pushes back / ignores this" written as behavioural rules, not scripts; failure-mode table (Info Dump, Skill Gate, No-Stakes Meeting, Railroad, Dead NPC). Co-opt the default-outcome and behavioural-fallback fields into CF Scene pages.

6. **Mercer voice style guide** (`.claude/skills/mercр-voice/SKILL.md`) — slow zoom, three-sense minimum, active-environment verb list (flickers, coils, pools, clings), earned adjectives, trailing hook, no em-dashes, Full/lite intensity dial, and content-type guides with worked examples (room, NPC intro, player-hit / enemy-hit / killing-blow narration) plus sentence starters. CF has `theatre-of-the-mind`; port the worked examples and intensity dial as a reference there if absent.

7. **Toy fields as queryable frontmatter** (prep-content § NPC/Faction/Encounter, `references/universal-toys.md`) — machine-readable `primary_goal / consistent_method / active_problem / performance_hooks / link_of_relevance` (+ `off_screen_action` for Factions) in YAML, queried directly. CF's Obsidian wiki could adopt these keys on NPC/Faction/Creature pages so Prep and Push read narrative state without prose parsing.

8. **Off-screen faction action rule** (pacing-heuristics § Faction Off-Screen Actions) — advance 1–2 factions per session; evidence "observable but not explained", with a good/bad example pair. CF's Threads already "move whether or not the Party engages"; take the observable-evidence writing rule into Thread/Prep guidance.

9. **Theatrical mechanics** (`references/universal-toys.md`) — Degrees of Success (10/15/20 tiers, failure moves the story), one Mechanical Shenanigan offer per session (advantage/reroll for a meaningful character cost), Box of Doom (declare DC and both outcomes publicly before the roll). Small, high-leverage table-drama tools CF lacks; add to prep-session/Encounter guidance.

10. **Monster craft heuristics** (prep-content § Monster) — Four Laws (one signature moment; mechanics deducible from one lore sentence; protagonists, not punching bags; simple to run, rich to fight), ability tier hierarchy, telegraphing rule, max-2 phases. `creature-design` covers 2024 statblock construction; take the laws and telegraphing as creativity constraints.

11. **Canon→skill generation pipeline** (mercр-voice file header: "GENERATED FILE - DO NOT EDIT DIRECTLY. Edit wiki/system/agent-runtime/canon.") — evidence style references were rendered from a canon source [INFERENCE: generator not in this repo]. Idea for CF: keep big style references as generated artifacts of one canon file.

12. **Image-prompt file convention** (`dndtale/STRUCTURE.md`) — per-location/scene prompt files with frontmatter `title / aspect_ratio / resolution / instructions: <style-file>`, doubling read-aloud prose as the image prompt. Pairs with `generate-image`; adopt one style-instructions file per campaign.

13. **Co-occurrence synthesis scan** (`wiki-synthesize/SKILL.md`) — rank page pairs by backlink co-occurrence, write "A × B" synthesis pages with Tensions and Open Questions, and report the next 10 un-taken candidates. Could power an autonomous lore-deepening pass in `lore-design`; CF has QMD, the loop is the novel part.

## Lore to retell
None. The vault was never ingested (`index.md` empty; `log.md` records only INIT). Skill examples reference Kalowe — already a Location in the current wiki — and throwaway example names (Ironmantle, Antheri, Captain Voss, the *Lasting Insult*). `dndtale/examples/the-stolen-flame/` is generic template fiction (Redbrook, the Eternal Flame), not Shattered Sea canon.

## Skip
- llm-wiki scaffold mechanics (`CLAUDE.md`, `scaffold/`, index/log/hot protocol) — superseded by CF ADR 0001/0011 and per-World index/log/hot.
- Obsidian plugin skills (`obsidian-bases/cli/canvas/automation/markdown`) — tooling CF replaced with its own CLI and Push.
- `prep-statblock` — Fantasy Statblocks plugin landmines; obsolete under Foundry Push.
- `dndtale` STRUCTURE/templates/checklists/workflows — published-adventure chapter format, superseded by CF's Scene Chart and wiki templates.
- `humanize-writing` — CF already has the `humanizer` skill; keep only its slop-word blacklist as a cross-check.
- Named-enemy naming rules — keep only the slop-name blacklist (Aerin, Theron, Kael, Lyra, Vex, Draven, Zara) as a Vale/lint wordlist.
- `defuddle`, memory/context/plans/debugging/verification skills — generic Claude Code tooling, not campaign content.
- CR tables (`references/cr-tables.md`) — standard DMG math; CF's full-rules-in-wiki ADR covers it.
