# dnd-wiki

https://github.com/Thedougler/dnd-wiki · Private Obsidian D&amp;D 5e wiki + Claude skill stack for the Shattered Sea campaign · last activity ~2026-05-17 (content/log.md) · stack Python (wiki-lint, hatch/pytest), Claude skills, Obsidian vault

## Summary

Prior Campaign Foundry ancestor: an Obsidian vault under `content/shattered-sea/` with agent skills in `.claude/skills/`, situation-driven sandbox prep (`wiki-dnd`), post-session `world-tick`, tone/roleplay craft layers, and dense Shattered Sea canon (ships, factions, situations). It already invented the hot/log/index pattern and much of the design vocabulary Campaign Foundry kept. Superseded by CF’s Scene Chart, deterministic gates, Foundry Push, and omp skill tree — but several creative workflows and lore beats never fully landed in CF.

## Worth salvaging

1. **World Tick** (`.claude/skills/world-tick/SKILL.md`) — Collaborative post-Session ritual: only party-touched threads; read situation → propose one off-screen goal → DM confirms → real d20 (1–5 setback / 6–15 partial / 16–20 full) → write every affected page immediately; hard canon discipline (no invented consequences, no next-destination). Makes the living World feel honest between Sessions. **Adopt:** new skill or `ingest`/`plan-session` post-play branch; pair with Thread pages + `hot.md`. CF has opposition timelines in Prep but no post-play off-screen dice ritual.

2. **Easy-to-Roleplay: Roleplay Prompt + Anchor** (`.claude/skills/easy-to-roleplay/SKILL.md`) — Make Some Noise one-liner premise (“sommelier who’s never tasted wine”) plus delivery mashup (“burned-out VP Voldemort”); output includes ask/refusal/pressure lines, Off-Screen Action, sandbox constraint. Faster table performance than CF’s face/voice/tells alone (`npc-design/references/craft.md`). **Adopt:** layer into `npc-design` Play section / craft.md; optional field on NPC template. Partial overlap with existing voice craft — keep CF swap-test, add Prompt+Anchor.

3. **Shattered Sea Tone Guide** (`content/shattered-sea/private/system/guides/Shattered-Sea-Tone-Guide.md` + `.claude/skills/shattered-sea-style/SKILL.md`) — Equation “high competence trapped inside low emotional maturity”; NPC formula public image + competence + humiliating need + petty fixation; scene rule threat + petty conflict + style + verbal escalation + real consequences. **Adopt:** paste into Campaign `campaign-config` / World style note and require from `theatre-of-the-mind`, `npc-design`, scene skills. CF lacks an explicit World tone equation.

4. **Situation subtypes: Revelation & Question** (`templates/situation-revelation.md`, `templates/situation-question.md`, `templates/situation-thread.md`) — Revelation: unrevealed/foreshadowed/revealed + early/mid/late tier, Design, At-Table Reveal reframe. Question: Best Guess / Evidence / Against / What Would Resolve / Sub-questions for provisional DM canon. **Adopt:** extend Thread (or DM-only Lore/Situation) templates; feed `plan-session` and mystery Scenes. CF Threads exist; these two shapes do not.

5. **PC Gravity + Interview wiring** (`.claude/skills/wiki-dnd/PREP.md` PC Gravity; `templates/pc-interview.md`; `…/guides/UNIVERSAL-TOYS.md` Session Zero; Character-Interview-Guide) — Two Dials, Terminal Node, Active Friction; Session Zero red-button questions; interview → Mark/Gift/Open Questions. Forces every prep element onto a PC well. **Adopt:** deepen `new-campaign` / PC template Goals; optional interview ingest path. CF has Goals/bonds and spotlights; not the dial/terminal vocabulary or interview pipeline.

6. **Mystery clue board** (`…/guides/Mystery-Making-Framework.md`) — Who/Why/How before clues; ≥3 clues per question; flexible move-the-clue; tracker table. **Adopt:** reference under `development-scene` / `lore-design` (CF already wants three discovery routes — this is the prep worksheet).

7. **Theme-park Settlement attractions** (`…/guides/City-Creation-Guide.md`) — One legible theme; attractions table (contest, infiltration, ball, clue trail…) adapted to theme and table tastes. **Adopt:** ideas into `location-design` Settlement branch. Partial: CF already wants opposed wants + services.

8. **Travel event density** (`…/guides/Traveling-Event-System.md`) — Close/Far/Very Far → 1 / 2–3 / ≤5 curated thread-pulling events; no exact day counts. **Adopt:** `location-design` Region travel + cliffhanger journey prep.

## Lore to retell

- **Tessarine Concordat = Magus Dragon debt-hoard** — `content/shattered-sea/situations/Concordat-True-Architect.md` (Cosimo Verantio as Principal face; wound the dragon by invalidating debt). Check CF Faction page before merge.
- **Auralis / Antheri / Shelfworks inversion** — `…/situations/Auralis-and-the-Maw.md` (last Antheri demigod-tech guardian; ruins built bottom-up; salvagers stripping safety valves; Pearl beacon). CF has `wiki/.../Lore/Auralis.md` — diff and deepen, don’t duplicate.
- **Sunken Crown blessing crisis** — `…/situations/Sunken-Crown-Blessing-Crisis.md` (Pearl theft → Umberlee blessing fails; Keth-Naar / Vel-Orn / Stripes mission; nesting beaches).
- **Il Palio delle Voci Contese** — `content/shattered-sea/lore/Il-Palio-delle-Voci.md` (crowd-judged three-night Calveno battle of the bands; stages, competitors, hooks) — high-play Settlement attraction.
- Sample situations worth skimming for hooks: `Who-Commissioned-the-Theft.md`, `What-Sunk-The-Vestra.md`, `Pearl-of-Souls.md`, factions under `content/shattered-sea/factions/`.

## Skip

- Generic wiki skill shell in root `AGENTS.md` (concepts/entities taxonomy) — wrong domain; CF already specialized.
- Python `wiki-lint` (`.claude/skills/wiki-lint/`) — CF has Vale + `bun run cf -- check`; don’t port second linter.
- Obsidian CLI / Templater-centric filing in PREP.md — CF is filesystem + QMD.
- Full Pointy Hat monster/villain ingest corpus under `raw/ingested/` — frameworks above are enough; bulk SRD/stat dumps are noise.
- Quartz/graph-colorize/tag-taxonomy product skills — not agentic writing leverage.
- Mercer-voice as separate skill name — CF theatre-of-the-mind already owns speakable Narration.
