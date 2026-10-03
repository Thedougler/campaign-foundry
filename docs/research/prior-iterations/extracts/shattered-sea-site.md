# shattered-sea-site salvage extract

Branch `v5` of prior/shattered-sea-site. Copies live under `docs/research/prior-iterations/sources/shattered-sea-site/`. Findings: `docs/research/prior-iterations/shattered-sea-site.md`.

## Shattered Sea tone triad

- source: `content/skills/shattered_sea_tone_guide.md` (found), `content/skills/npc_construction_formula.md` (found), `content/skills/scene_construction_rule.md` (found)
- destination: `campaign-config.md` tone note; light checks in `npc-design`, scene skills, `theatre-of-the-mind`
- load-bearing:
  - Core equation (verbatim): **"High competence trapped inside low emotional maturity."** One-sentence tone (verbatim): "Swashbuckling sophistication often complicated by pettiness."
  - Six pillars: (1) real stakes + childish dysfunction — "epic consequences, petty triggers"; (2) competence without adulthood (dangerous expert + personal disaster); (3) stylish surface, rotten interior; (4) banter as combat — "weaponized wit", status testing, old slights; (5) mundane pettiness in lethal situations (kraken attack as paperwork); (6) cynicism without emptiness — dysfunction without removing consequences.
  - Tone boundaries table: keep glamour/danger/sharp dialogue/emotional damage played lightly; avoid broad parody, meme humor, every NPC sarcastic in one voice, world itself silly, removed consequences.
  - World feel: "Everyone is tired. Everyone is performing. Everyone wants something."
  - Agent application defaults: NPC register = status-testing, competitive, guarded about real needs; scene energy = competent professionals sabotaged by interpersonal baggage; comedy from character flaws, never world silliness.
  - NPC formula (verbatim): **"Public image + real competence + one humiliating need + one petty fixation."** Rule: the need is never admitted but consistently acted on; the fixation must plausibly derail a functional scene; worked example row: "Naval legend | Brilliant tactician | Needs royal approval | Obsessed with seeming younger than rival."
  - Scene rule — five components (verbatim list): "1. A real external threat 2. A petty internal conflict 3. Stylish presentation 4. Fast verbal escalation 5. Consequences that remain real." Guideline, not per-encounter requirement; petty conflict should feel disproportionate to the external threat; component 4 is where NPC fixations/needs activate.
- skip-from-this-file: Obsidian wikilinks, frontmatter provenance scores, `raw/` source pointers.

## PC Gravity

- source: `.claude/skills/prep-content/SKILL.md` (found)
- destination: `plan-session`, `prep-session`, design skills
- load-bearing:
  - Per PC extract from their pages: **Two Dials** (two opposed internal behavioral axes, e.g. family loyalty / reckless ambition — "must be *internal tensions*, not surface traits"), **Terminal Node** (single deepest long-term desire, "asymptotic — the PC approaches but never cleanly arrives"), **Active Friction** (what currently blocks them — "this is where you place toys").
  - Gravity Filter (verbatim): "Every entity must pass: **does this pull on at least one PC's dials or terminal node?** Yes → include it, note which PC and how. No → cut it, or retrofit a connection."
  - Relevance pre-screen (hard gate): before generating anything, name the specific PC and the connection; if you cannot, "do not generate — ask the GM for the PC link first." Stakes first: lead with what a PC gains/loses before lore or description.
  - Anti-patterns table: content unconnected to PC wells (players drift past); hooks requiring care about strangers; all pulls in same direction (removes choice); Terminal Node treated as solvable; only one dial threatened.
- skip-from-this-file: vault filing, `wiki workflow` CLI calls, Fantasy Statblocks routing, Mercer-voice reference table.

## Pop-culture mashup OS

- source: `.claude/skills/prep-content/SKILL.md` (found)
- destination: `npc-design` Voice section (optional, campaign-config gated); `creature-design` for intelligent monsters
- load-bearing:
  - Formula (verbatim): "`[unexpected animal/archetype/vibe] + [pop culture character/persona]`" — examples: *owl Obi-Wan Kenobi*, *rat grandma Scarface*, *southern golden retriever lawyer*, *burned-out vice principal Voldemort*.
  - "The mashup is the character's **operating system** — not look, not job, not backstory. Every choice flows from it. The two halves must create tension (warm AND territorial, menacing AND exhausted). If a line could belong to any character, rewrite it."
  - Voice & Delivery block per performed character: speech patterns/tics; **2–3 actual lines the DM can say at the table**; physical mannerisms; emotional default + what cracks it.
  - Performance hooks: 2–3 DM moves (when to lean in, when to let the crack show), "written as felt actions, not clinical instructions."
  - Skip the mashup for mindless beasts, non-dialogue constructs, non-speaking roles.
- skip-from-this-file: same harness/file-filing machinery as above.

## Narrative Islands + default outcomes

- source: `.claude/skills/prep-content/references/island-template.md` (found)
- destination: `prep-session` / scene skills checklist language (CF Scene Chart exists; island diagnostics and the cuttable-optional island do not)
- load-bearing:
  - Island card fields: register (social/exploratory/combat/revelation/hybrid); Reskin line (reusable scene structure); DM-facing brief where **the default outcome is "the most important sentence — it tells you what the scene is about"**; `[!secret]` as labelled improv fuel to crack open when the scene stalls; opening read-aloud where "first sentence establishes space; second establishes the wrong thing"; NPC opening line must reveal Active Problem or Consistent Method in subtext.
  - Behavioural fallbacks, not scripts: "If the party pushes back" = what the NPC concedes/escalates/reveals under pressure; "If the party ignores this" = an observable later world change (another NPC mentions it, evidence appears, or it "escalates into a future session's Strong Start").
  - Diagnostic: "Can you state the dramatic question in one sentence? YES → it's an island. NO → it's a task, an errand, or an info dump disguised as a scene."
  - Every island needs: entity with an `active_problem`; a pressure that resolves itself without the party; ≥1 PC whose backstory makes it personal; a default outcome the GM can narrate if the party never shows.
  - Failure-mode table (name → symptom → fix): Info Dump (info is the reward, not the scene); Skill Gate (check opens a door to a *new* choice); No-Stakes Meeting (add ticking clock/competing interest); Railroad (write the ignore-it default as a complete scene); Dead NPC (no Active Problem = set dressing, wire or cut); Double Register (alternate registers to prevent fatigue).
- skip-from-this-file: Mercer-voice instruction in the template, frontmatter dates.

## Wiki synthesize (scoring idea only — do not port the Python)

- source: `.claude/skills/wiki-synthesize/SKILL.md` (found)
- destination: scoring idea for `cf` or a `lore-design`/`query` companion; keep CF page kinds, not `content/synthesis/`
- load-bearing:
  - Discovery loop: build a co-occurrence matrix over all pages; filter pairs already connected; score candidates by co-occurrence count, cross-domain-ness, hub status, contradiction signal; surface ranked top-N plus a skipped-candidates list as the ready-made backlog.
  - Synthesis page `A × B` template sections: The Connection (the non-obvious relationship), Where They Co-occur, Cross-cutting Insight ("the thing you couldn't see from either concept page alone"), Tensions and Trade-offs, Open Questions.
  - Quality bar (verbatim): "A synthesis page that only summarizes its sources is useless." Backlink both directions (synthesis → sources, sources' `## Related` → synthesis); report skipped candidates; three-way syntheses only for genuine triangles.
- skip-from-this-file: `wiki_guard.py` invocation and flags, index/log/hot bookkeeping, `^[inferred]` provenance footnotes.

## Stakes-first + clocks + Toy Chest

- source: `.claude/skills/prep-content/references/universal-toys.md` (found)
- destination: `plan-session` / Faction Thread clock grammar
- load-bearing:
  - Clocks: "Every toy has a timeline that advances regardless of player action" — banded Day 1 (visible but ignorable) → Day 2 (someone affected) → Day 3 (faction involvement) → Day 5 (point of no return). "Players do nothing → things change anyway."
  - Toy Chest (one-time campaign palette, "a pressure system", not a timeline): 6–10 NPCs, 3–5 Factions each with an active off-screen action, 2–3 Locations, 3–5 clocks already running; layer toys via shared NPCs/conflicting goals so emergent story generates itself.
  - Session Zero five questions (verbatim): "1. What is your character trying to *become* by the end of this campaign? 2. What are they *afraid* of losing? 3. Who do they love, or who did they love? 4. What does failure look like for them personally? 5. What 'red button' makes them throw caution to the wind?" — wire tentpoles to the answers.
  - Theatrical mechanics: Degrees of Success 10/15/20 with "failure must move the story forward, never stall it"; one Mechanical Shenanigan per session (advantage/reroll for a meaningful character cost); Box of Doom (declare DC and both outcomes publicly before the roll).
  - Stakes-first narration structure: 1) what is at risk right now, 2) what makes the stakes legible, 3) environment only if it affects stakes; GM script 2–4 sentences; worked bad/good example pair ("You enter a large stone chamber…" vs "The chanting has already started…").
- skip-from-this-file: load-routing header (CF skills own their own loading).

## wiki_guard agent presets

- source: not copied — assignment says skip the wiki_guard Python; idea only
- destination: none (CF already has `cf check`/`cf log`/QMD; do not reintroduce a Python dual stack)
- load-bearing: deterministic prep/finalize JSON so agents don't re-scan blindly (per findings); the pattern, not the code.
- skip-from-this-file: everything else in `.claude/bin/`.

## Antheri engineering texture (lore)

- source: `content/concepts/antheri_engineering.md` (found)
- destination: retell onto CF Antheri/Lore pages to sharpen salvage Scenes
- load-bearing (short excerpt): Antheri vanished ~-495DR yet exceed 1495DR engineering: corrosion-proof composite stone; living machinery functional millennia later; underwater architecture oriented around and into the Drowned Maw trench, with the Ruins descending toward the planar fissure beyond any living diver's depth. In 1488DR Catarina DaVirelli became the only known person to reverse-engineer components (clockwork owl familiar, salvaged Antheri plate), proving functional Antheri tech is rare and extremely valuable.
- skip-from-this-file: Obsidian wikilinks, provenance frontmatter.

## Shelfworks Goldrush (lore)

- source: `content/concepts/shelfworks_goldrush.md` (found)
- destination: retell as a named Lore event feeding prospector/criminal pressure; not a named event in current CF Wiki
- load-bearing (short excerpt): after Catarina's 1488DR success, prospectors, scholars and criminal contractors descended on the Shelfworks (60–200 ft depth — accessible to surface divers); named retroactively; Catarina did not participate, returning to Calveno to put her workshop into production; accessible sections likely heavily picked over by 1495DR; the goldrush is the proximate cause of increased activity on the Maw's upper rim before the campaign.
- skip-from-this-file: Obsidian wikilinks, provenance frontmatter.

## Explicit publish filter (not copied)

- source: `quartz/plugins/filters/explicit.ts` + `docs/features/private pages.md` — not copied (Quartz; out of scope)
- destination: only if a player-facing garden returns; CF Push already separates Handouts
- load-bearing: `publish: true` allowlist plus ignoring `private`/`templates` paths — an explicit-opt-in publish model rather than denylist.
- skip-from-this-file: all Quartz plugin/config detail.
