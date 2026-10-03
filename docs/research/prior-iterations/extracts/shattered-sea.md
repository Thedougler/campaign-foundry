# shattered-sea salvage extract

Claude-Code skill library for an LLM-wiki vault that was never ingested — all value is in `.claude/skills/`. Source paths below are repo-root-relative; verbatim copies live under `sources/shattered-sea/`. Sections follow the findings file's "Worth salvaging" numbering.

## 1. Pop Culture Mashup roleplay method
- source: `.claude/skills/prep-content/SKILL.md` § Roleplay Method (found)
- destination: `npc-design`; mashup for intelligent creatures in `creature-design`
- load-bearing:
  - Formula: `[unexpected animal/archetype/vibe] + [pop culture character/persona]`. Examples: *owl Obi-Wan Kenobi*, *rat grandma Scarface*, *southern golden retriever lawyer*, *burned-out vice principal Voldemort*, *yoga instructor who is also a hitman*.
  - "The mashup is the character's **operating system** — not look, not job, not backstory. Every choice flows from it." The two halves must create tension (warm AND territorial, menacing AND exhausted). "If a line could belong to any character, rewrite it."
  - Voice & Delivery block, every performed character: speech patterns/vocabulary/verbal tics; **2–3 actual lines the DM can say at the table**; physical mannerisms (hands, eye contact, posture); emotional default + what cracks it.
  - Performance Hooks: 2–3 specific DM moves (when to lean into the bit, when to let the crack show, when to surprise), "written as felt actions, not clinical instructions".
  - Mandatory for NPCs and intelligent monsters, inserted as the first line of the character. Skip for mindless beasts, non-dialogue constructs, no-speaking-role entities.
- skip-from-this-file: `shared-references/` paths, `dnd-callouts` callout names, CLAUDE.md filing/commit machinery, relevance-table wiring to `wiki-query`

## 2. PC Gravity model
- source: `.claude/skills/prep-content/SKILL.md` § PC Gravity; Session Zero questions from `references/universal-toys.md` § Session Zero (found)
- destination: `plan-session` intent settling, campaign-config intake, `new-campaign` PC questions
- load-bearing:
  - Per PC, from their entity page: **Two Dials** — two core behavioral axes defining decision-making (e.g. family loyalty / reckless ambition), "must be *internal tensions*, not surface traits"; **Terminal Node** — single deepest long-term desire, "asymptotic — the PC approaches but never cleanly arrives"; **Active Friction** — what currently blocks them, "this is where you place toys".
  - Gravity Filter: "Every entity must pass: **does this pull on at least one PC's dials or terminal node?** Yes → include it, note which PC and how. No → cut it, or retrofit a connection."
  - Anti-patterns: content unconnected to PC wells (players drift past); hooks requiring care about strangers; all pulls in the same direction (removes meaningful choice); Terminal Node treated as solvable; only one dial threatened ("half as interesting as both dials in opposition").
  - Relevance Pre-Screen (universal rules): before generating anything, name the PC whose backstory/goal/fear/active thread it touches — "If you cannot, do not generate — ask the GM for the PC link first." Stakes first.
  - Session Zero five questions: 1) What is your character trying to *become*? 2) What are they *afraid* of losing? 3) Who do they love, or who did they love? 4) What does failure look like for them personally? 5) What "red button" makes them throw caution to the wind? "Wire campaign tentpoles to these answers… players *want* to follow them because they built the rails themselves."
- skip-from-this-file: gravity-well extraction from Obsidian entity pages, frontmatter filing commands

## 3. Thread-selection & pacing heuristics
- source: `.claude/skills/prep-content/references/pacing-heuristics.md` (found)
- destination: reference under `prep-session` / `plan-session`
- load-bearing:
  - Selection priorities: P1 PC personal arcs unspotlit 2+ sessions ("players track this even when they don't say anything"); P2 faction threads with off-screen momentum — pick the faction "whose actions would be hardest to ignore this session given the party's current location"; P3 threads marked urgent/timed — "urgent means this session or next. If it can wait 3 sessions, it's not urgent — it's important. Different queue."; P4 threads with a ready-to-stage location (proximity lowers activation cost).
  - Hard limits: **max 2 faction threads per session**; **mandatory spotlight rotation** — PC without a personal beat in 2 sessions → one island must connect to their arc; Strong Start must acknowledge last session's dramatic ending ("if the party killed the duke, session N doesn't open with shopping"); **max 2 locations per session** unless travel *is* the session.
  - Register rhythm: social / exploratory / combat / revelation. Never repeat a register back-to-back; open high or low, not medium; the climax needn't be combat; end on an up-note or cliffhanger, never a plateau; the optional island should be the most fun — "if you can't bear to skip it, it's not optional."
  - Failure modes + fixes: Escalation Fatigue → insert a low-energy breather; The Slow Middle → front-load a social-combat hybrid after the Strong Start; Combat Slog → an encounter that will take 45+ minutes counts as 2 islands, plan fewer; Revelation Overload → **max 1 major revelation per session**; The Orphan Ending → 3 mandatory + 1 optional islands, "don't start an island you can't finish".
  - Sparse-threads table: early campaign (2–4 threads) → go deeper not wider, seed threads *through play*, lean on PC backstory; post-arc lull → breathing session, Return strong start, one island each for fallout / PC beat / next-arc seed; single-location lockdown → filter by what can fire there, layered islands force NPC encounters (pressure cooker); one dominant thread → split into facets (political/combat/revelation), "one thread ≠ one island". Rule: "Sparse threads don't mean a thin session — they mean a *focused* session."
- skip-from-this-file: `wiki/hot.md` reading, frontmatter `type: note` scaffolds

## 4. Off-screen faction action rule
- source: `.claude/skills/prep-content/references/pacing-heuristics.md` § Faction Off-Screen Actions (found)
- destination: Thread/prep guidance in `prep-session`; `faction-design` agenda ticks
- load-bearing:
  - Every session 1–2 factions visibly advance their agenda; more than 2 overwhelms tracking capacity.
  - Procedure: read the faction's `off_screen_action` + `primary_goal` fields → advance one logical step → "make the evidence **observable but not explained** — the party sees the effect, not the cause."
  - Worked pair — Good: *"Three more warehouses near the docks have been bought by anonymous buyers this week. The dock workers are nervous."* Bad: *"The Ironmantle faction has continued their plan to control the shipping lanes by purchasing dock property."* (narrator voice explaining mechanics).
  - Advance the faction the party is NOT currently engaging; evidence specific and physical ("three more soldiers arrived on the morning ferry", not "tensions are rising"); connect to an island when possible so the world feels interconnected.

## 5. Strong Start taxonomy
- source: `.claude/skills/prep-content/references/strong-start-types.md` (found)
- destination: reference merged into `hook-scene`
- load-bearing:
  - Strong Start = first 30 seconds, party already mid-action, "no briefing, no recap, no 'you're at the inn.' The world moved while the players were away." Five types, pick one per session, **vary type across sessions**:
    1. **In Medias Res** — already moving. Works: cliffhanger follow-on, travel, time skip. Failure: needing a lore dump to explain the running ("The situation must be self-evident").
    2. **Interrupted Routine** — mundane intruded (breakfast, repairs → the bell rings). Works: downtime→action transition, establish normalcy then break it. Failure: interruption not connected to an open thread feels random — "the knock on the door must be from someone the party recognizes or fears, not a stranger with a quest."
    3. **Standoff** — two forces already in tension, party is the variable. Works: live faction conflict, forcing an early choice. Failure: "a standoff between strangers is scenery" — at least one side needs a PC-personal connection.
    4. **Discovery** — finding what shouldn't be there, or missing what should. Works: conspiracy, mystery advancement, consequence surfacing. Failure: discovery requiring explanation is exposition — wrongness must be visceral ("'The door is open and there's blood' works. 'You notice the sigils have been rearranged according to the Third Protocol' does not.")
    5. **Return** — something resolved came back, changed. Works: world reacting to party choices, reviving a cold thread. Failure: callback unrelated to a party choice is just a returning NPC, not a Return.
  - Each type ships a worked read-aloud example (in source; e.g. Return: the merchant from Kalowe who swore he'd never leave the island, "and he's not smiling the way he used to").
  - Quality checklist: describable in one sentence without lore; party must choose within 30 seconds of narration ending; connects to an open thread; first line read-aloud ready; makes sense if the party forgot last session.
  - Anti-patterns: Recap Start (puts players in listening mode), Lore Gate, Gentle Nudge ("the messenger is bleeding. The letter is on fire."), Split-Party Opener, Consequence-Free Hook ("make ignoring it visibly costly"), Over-Authored Start ("2–4 sentences max. Every sentence after the fourth is the GM talking to themselves.").
- skip-from-this-file: `wiki/hot.md` references

## 6. Island template with default outcomes
- source: `.claude/skills/prep-content/references/island-template.md` (found); composition limits also in prep-content/SKILL.md § Session Prep (found)
- destination: CF Scene page fields / `prep-session` island guidance
- load-bearing:
  - Diagnostic: "Can you state the dramatic question in one sentence? YES → it's an island. NO → it's a task, an errand, or an info dump disguised as a scene."
  - Every island needs: 1) a center entity with an `active_problem`; 2) "a pressure that will resolve itself if the party doesn't intervene"; 3) ≥1 PC whose backstory makes it personal; 4) "a default outcome the GM can narrate if the party never shows up."
  - Template fields: register; reskin (reusable scene pattern + when it applies); DM brief 2–3 sentences — "the default outcome is the most important sentence — it tells you what the scene is about"; `[!secret]` as labelled improv fuel ("when the scene stalls, crack this open"); read-aloud opening 2–4 sentences (first sentence establishes space, second "establishes the wrong thing"); NPC opening line revealing Active Problem or Consistent Method *in subtext*, not exposition.
  - Behavioral fallbacks, not scripts: "**If the party pushes back:** what the NPC concedes, escalates, or reveals under pressure… a behavioral rule." "**If the party ignores this:** what changes in the world. This must be observable later — another NPC mentions it, evidence appears, or it escalates into a future session's Strong Start."
  - Composition limits: 3 mandatory + 1 optional (4+1 long sessions); registers never adjacent-repeat; max 1 major revelation; optional island genuinely cuttable; never major revelation + major combat in the same island; ≥1 island targets a spotlight-neglected PC.
  - Failure-mode table: Info Dump (info is the reward, not the scene); Skill Gate (check opens a door, behind it a new choice); No-Stakes Meeting (add a ticking clock or competing interest); Railroad ("if you can't imagine the party not doing this, you've written a railroad"); Dead NPC (no Active Problem = set dressing — wire to a pressure or cut); Double Register (alternate registers).
- skip-from-this-file: Obsidian callout syntax, session-prep template filing

## 7. Mercer voice style guide (worked examples + intensity dial)
- source: `.claude/skills/mercer-voice/SKILL.md` (found — findings wrote `mercр-voice` with a Cyrillic р; actual dir is `mercer-voice`)
- destination: reference under `theatre-of-the-mind` (worked examples + intensity dial if absent)
- load-bearing:
  - Craft rules: second-person present tense ("the player *is* the camera"); the Slow Zoom (broad atmosphere → telling detail, never all at once); ≥3 senses per description (sound, smell, texture/temperature; taste sparingly); active environment verbs — *flickers, dances, coils, pools, drifts, presses, clings, hangs, breathes, watches*; earned adjectives (specific beats generic: "a door of weathered oak, its iron bands gone orange with rust…"); emotional resonance (name the feeling the space evokes); trailing hook (end unresolved); rhythm via punctuation — short sentence after long "lands like a beat drop".
  - **Intensity dial:** Full Mercer (theatrical, layered; 3–5 sentence locations, rich NPCs — big moments, first impressions, climaxes) vs Mercer-lite (same rhythm, 2–3 sentences, every word load-bearing — transitions, combat pacing, revisits). Default Full for locations + NPC intros, lite for revisits; combat "almost always Full".
  - Worked examples (full text in source): temple occupied by cultists (Full room); dwarven blacksmith NPC intro ending *"Door was unlocked," she says. "Doesn't mean you were invited."*; combat triptych — player lands a blow ("more surprise than pain… then the fury floods back in"), enemy hits the player ("the world tilts… remind yourself that the fight isn't over"), killing blow ("the silence that follows is almost louder than the fight was").
  - "What Mercer Does NOT Do": no em dashes ("use a short sentence instead to land the beat"); no passive voice; no generic fantasy filler ("ancient and mysterious," "of unknown origin"); no player choice in description; no over-explanation; no purple prose; never tell the player how to feel.
  - Sentence starters: *"The [noun] [active verb]s around you…"*, *"There is a [quality] to this place — [elaboration]"*, *"[NPC] doesn't [expected action]. Instead, [distinctive behavior]"*, etc.
  - Style layer only: applies to prose the DM reads aloud; mechanical content keeps its own format.
- skip-from-this-file: GENERATED-FILE header (see item 11), trigger boilerplate, "rewrite this" user-input handling

## 8. Toy fields as queryable frontmatter
- source: `.claude/skills/prep-content/SKILL.md` §§ NPC/Monster/Encounter/Location/Faction + `references/universal-toys.md` (found)
- destination: CF wiki template frontmatter keys on NPC/Faction/Creature pages so prep/push read narrative state without prose parsing
- load-bearing:
  - Rule: "Toy fields live in YAML frontmatter only — no body `## Toy` sections. One sentence per field." Machine-queryable.
  - NPC/Monster (5): `primary_goal` · `consistent_method` · `active_problem` · `performance_hooks` · `link_of_relevance`.
  - Faction (6): NPC five + `off_screen_action` — "what they do when the party isn't watching. This is the sandbox engine: it makes the world move between sessions."
  - Location (4): `verb` ("what this location *does* — its active principle, even when untouched") · `unstable_condition` · `consequence` · `link_of_relevance`.
  - Encounter 10-field toy: Primary Goal (thematic, not tactical — what the encounter proves), Consistent Method (opposition behavior/tactics), Active Problem (situation already in motion before the party arrives — not enemy intent), Performance Hooks (one vibe reference + one tic for the lead antagonist), Link of Relevance (required), Terrain Shift (one specific, timed mid-encounter change), Challenge Calibration (enemy count, stat citations, action economy), Pressure Valve ("targets party weakness — tension without unfairness"), Advantage Window ("plays to party strength — lets them feel powerful if found"), Drama Suite (DC table 10/15/20, Shenanigan offers, Box of Doom flags). First 6 frontmatter, last 4 body.
  - "Consistent Method = a gimmick, not a personality. If the DM can't do it at the table in 5 seconds, rewrite it."
  - Encounter type router: social primary → Drama Suite leads; skill challenge → Challenge Calibration becomes a Skill Track (3–5 skills, DC tiers, failure consequences); ambush/chase → Terrain Shift fires round 1; otherwise standard combat. Level tone table ends "17–20: threaten things they love, not their HP."
- skip-from-this-file: Bases query syntax, Obsidian directory layout, prep-statblock delegation

## 9. Theatrical mechanics
- source: `.claude/skills/prep-content/references/universal-toys.md` § Theatrical Mechanics (found)
- destination: `prep-session` / Encounter guidance (`cliffhanger-scene` prep)
- load-bearing:
  - **Degrees of Success** — 3-tier DC (10 / 15 / 20). "Failure must move the story forward, never stall it."
  - **Mechanical Shenanigans** — one character-specific gamble per session: *"Offer [Character] advantage / reroll / automatic success if they [pay a meaningful character cost]."*
  - **Box of Doom** — flag climactic rolls; "declare DC and both outcomes publicly before dice fall."
  - Same file, adjacent: Stakes-first narration — lead with what characters stand to lose; order: what is at risk right now → what makes the stakes legible → environment only if it affects the stakes; GM script 2–4 sentences; player prompts max 2 per scene (Self-Discovery / Environmental Gap / Mechanical Interpretation). ❌ *"You enter a large stone chamber. Torches line the walls."* ✅ *"The chanting has already started. You can see the altar from here — and the figure bound to it."*
- skip-from-this-file: Clocks template and Toy Chest quantities (living-world tick is mined from sibling repos)

## 10. Monster craft heuristics
- source: `.claude/skills/prep-content/SKILL.md` § Monster (found)
- destination: `creature-design` creativity constraints (alongside 2024 statblock construction)
- load-bearing:
  - **Four Laws:** 1) One signature moment — "what players describe after the session"; 2) Mechanics tell the story — "every ability deducible from flavour. Can't explain it in one lore sentence? Cut it."; 3) Players are protagonists — "design monsters that react to player choices"; 4) "Complexity in decisions, not procedures. Simple to run, rich to fight."
  - Ability hierarchy, build in order, stop when enough: Tier 1 core identity (Multiattack at CR 2+ + one Signature Ability: recharge/limited/save-or-suffer); Tier 2 combat texture 1–2 (passive/reaction/bonus action that changes fight dynamics); Tier 3 flavour 0–1, skip if Tiers 1–2 aren't solid. **Max 3 unique named abilities on a non-boss.** No save-or-die without repeat save and damage on success.
  - Telegraphing: include at least one of environmental traces, social NPC reaction, or mechanical preview (a previous victim showing the signature ability's effect).
  - Multi-phase: **max 2 phases (3 for campaign climax)**, trigger at 50% HP, "phase 2 must feel *different* — new threat vector, not just stronger", initiative uninterrupted.
  - Solo boss suite: 3 legendary actions (fast/reactive + pressure + 2-cost powerful), 3 lair actions (environmental + repositioning + dramatic), Legendary Resistance 3/day on any boss trivially ended by a single failed save.
  - Role arrays: Solo Boss / Elite / Standard / Minion / Skirmisher / Controller with priority stats (full table in source). CR math (defensive/offensive averaging, recharge multipliers) exists but CF's skip-list covers `references/cr-tables.md`.
- skip-from-this-file: CR tables, prep-statblock delegation, vault filing commands

## 11. Canon→skill generation pipeline
- source: `.claude/skills/mercer-voice/SKILL.md` header (found): `<!-- GENERATED FILE - DO NOT EDIT DIRECTLY. Edit wiki/system/agent-runtime/canon. -->`
- destination: idea only — CF could keep large style references as generated artifacts of one canon source file
- load-bearing: the header alone is the evidence: style references were rendered from a canon source so edits land in one place and regenerate everywhere. [INFERENCE] The generator script is not in this repo.
- skip-from-this-file: nothing else here; the vault's own canon files were never populated

## 12. Image-prompt file convention
- source: `.claude/skills/dndtale/STRUCTURE.md` — image-prompt convention only (found)
- destination: `generate-image` — adopt one per-campaign style-instructions file + per-scene prompt files
- load-bearing:
  - One markdown file per location/scene, frontmatter:
    ```markdown
    ---
    title: location             # Output filename prefix (required)
    aspect_ratio: "4:3"         # Options: 16:9, 9:16, 1:1, 4:3, 3:4
    resolution: 1K              # Options: 1K, 2K, 4K
    instructions: [campaign]_instr.md  # Optional style instructions file
    ---
    ```
  - Body is the detailed, verbose scene description — the read-aloud prose doubles as the image prompt ("It also serves as prompt for AI image generation"); insert a placeholder link where the rendered image will go.
  - `instructions:` points at one shared per-campaign style file, keeping style out of per-scene prompts.
- skip-from-this-file: the rest of STRUCTURE.md — adventure chapter anatomy, front/back matter, formatting conventions (findings Skip list: superseded by CF Scene Chart and wiki templates)

## 13. Co-occurrence synthesis scan
- source: `.claude/skills/wiki-synthesize/SKILL.md` (found)
- destination: `lore-design` autonomous deepening pass / `query` companion — the loop is the novel part, not the storage
- load-bearing:
  - Build a co-occurrence map: for every page pair (A, B), count pages linking to **both**; aim for top 20–30 pairs; grep backlink file lists per concept and intersect.
  - Filter pairs already covered by existing synthesis pages (read their `sources`/links).
  - Score: co-occurrence ≥5 +3 / 3–4 +2 / 1–2 +1; cross-domain (different categories) +2; shared tags across folders +1; hub-tagged concept +1; synthesis would resolve a flagged contradiction +2. Write pages for the top 5.
  - Page contract: title `A × B`; sections The Connection / Where They Co-occur / Cross-cutting Insight / Tensions and Trade-offs / Open Questions / Related; `sources:` frontmatter listing pages linking to both; provenance ratios (extracted/inferred/ambiguous); conclusions marked `[inferred]`, source disagreements `[ambiguous]`. Backlink each source concept's `## Related` with `[[A × B]] — synthesis`.
  - Report the next 10 un-taken candidates ("gives the user visibility into what the wiki thinks is worth exploring without forcing every synthesis in one run").
  - Quality rules: "A synthesis page that only summarizes its sources is useless" — it must add the cross-cutting insight neither source states; skip pairs that merely co-occur without a real conceptual link; three-way syntheses only for genuine triangles of mutual influence.
- skip-from-this-file: `.env`/`OBSIDIAN_VAULT_PATH`, `index.md`/`log.md`/`hot.md`/`_insights.md` machinery, `/llm-wiki` skill references
