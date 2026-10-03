# dnd-wiki salvage extract

Findings: `docs/research/prior-iterations/dnd-wiki.md`. Copies under `sources/dnd-wiki/` preserve repo-relative paths. All listed paths were found; none needed re-searching.

## World Tick

- source: `.claude/skills/world-tick/SKILL.md` (found) → `sources/dnd-wiki/.claude/skills/world-tick/SKILL.md`
- destination: new post-play branch in `ingest`/`plan-session`, or a new skill; pairs with Thread pages + hot cache
- load-bearing:
  - Trigger: run once after each session; "advance the world", "offscreen actions", "faction tick".
  - "Only tick threads the party has touched." A thread qualifies if: party engaged this/recent sessions; a known faction/NPC has clear motivation to react; or the party's absence from a thread they were involved in is itself meaningful. Order by proximity to party interests: touched this session → recent-action pressure → hard ticking clocks confirmed in the file. Dormant threads and unmet factions are left out entirely.
  - Ritual, one thread at a time, DM confirms each step: read situation file in full → propose "one action, one sentence" ("[Entity] was trying to [specific concrete action] this week. Does that track?") → DM may redirect, use their version → real d20 roll, wait for the number → interpret → write immediately → confirm, next thread.
  - d20 interpretation table: 1–5 **Setback** (failed or backfired — exposed plans, spent resources, stiffened opposition); 6–15 **Partial** (real progress plus friction/cost); 16–20 **Full success** ("the world shifts").
  - "A low roll isn't 'nothing happened' — it's a faction that overreached, tipped their hand, or got hit from a direction they didn't see." Follow faction logic, not narrative convenience.
  - Canon discipline section (skill calls it "the most important rule"): every claim grounded in something read, not inferred. Failure modes: timing errors (a clock doesn't start until its trigger fires — check the file, not your assumption); DM notes leaking into world state (design notes are intent, not fact); invented consequences (no downstream effects from unresolved events); assumed destinations (never state or imply where the party goes next).
  - Write-immediately checklist: situation file (update Current State + append `### World Tick — [YYYY-MM-DD]` session-log entry), NPC files (status/location/relationships/active goal), faction files (resources/power/active goal), location Current Hooks; bump `updated` on every touched page. "Do not leave gaps."
  - Close out: update situations index, refresh `hot.md`, commit `world-tick: [session] offscreen advancement`.
- skip-from-this-file: repo paths (`content/shattered-sea/…`), Obsidian/git commit step, "ask for a recap if none exists" DM prompt (CF ingests transcripts).

## Easy-to-Roleplay: Roleplay Prompt + Anchor

- source: `.claude/skills/easy-to-roleplay/SKILL.md` (found) → `sources/dnd-wiki/.claude/skills/easy-to-roleplay/SKILL.md`
- destination: `npc-design` Play section / craft reference; optional template field beside face/voice
- load-bearing:
  - Two-part system: **Roleplay Prompt** = one sentence, "the specific, ironic, or dramatically loaded thing that is true about this character right now" (Make Some Noise style — read once, know what to play). **Anchor** = pop-culture mashup locking voice/delivery ("how it sounds" vs the Prompt's "what to play").
  - Prompt structures that work: [Character] who [ironic condition] ("A sommelier who's never tasted wine"); [pop culture figure] + [impossible role] ("Jennifer Coolidge, air traffic controller"); [figure], but [twist] ("David Attenborough, but he fucking hates toads"); [two-person scene] with [hidden tension] ("Turns out the hostage negotiator knows the hostage taker from way back"); [situation] escalating ("The more tools the surgeon asks for, the clearer it is he's winging it"); [familiar figure] in [absurd moment] ("Three soldiers bored inside the Trojan Horse").
  - Quality bar: "the bit is in the premise, not in the execution"; built-in contradiction; specific over general ("clearly" does a lot of work). Avoid: vague adjective stacks; prompts where the funny is just the noun ("a skeleton who works at a bank" → push to "a skeleton loan officer increasingly unclear on whether the currency he issued in 1347 is still valid"); prompts needing explanation.
  - Anchor formula: `[unexpected thing/archetype/state] + [pop culture character/persona]` — e.g. "Burned-out high school vice principal Voldemort", "Rat grandma Scarface", "Owl Obi-Wan Kenobi", "Southern golden retriever lawyer", "Pirate dad at a BBQ competition", "Yoga instructor who is also a hitman". Doesn't need to match the character's world. If the Prompt already carries the pop-culture reference, the Anchor is redundant.
  - Output block: Roleplay Prompt, Anchor + one sentence why it nails delivery, then Voice & Delivery (speech patterns/verbal tics; **2–3 actual lines the DM can say at the table**; physical mannerisms — hands, eye contact, posture; emotional default + what cracks it), then a table: Primary Goal / Consistent Method / Active Problem / Performance Hooks (2–3 DM moves: when to lean in, when to break, when to surprise) / Link of Relevance / Off-Screen Action.
  - Generation mode: if no concept given, generate 2–3 one-line Prompts, DM picks.
  - Tone principles: "Give the DM lines, not descriptions" (don't say "she's sarcastic" — write the sarcastic thing she'd say); performance notes are physical; everything in Voice & Delivery should be a natural consequence of the Prompt.
  - Sandbox constraint: Off-Screen Action reflects what the NPC does "regardless of player choices"; Link of Relevance describes how the NPC's agenda intersects the party's path, never prescribes player reactions; "The NPC is a person with a life. The party is a variable that entered that life. Write the person."
- skip-from-this-file: references to co-firing prep-npc/prep-monster/creative-writing-craft skills, `references/prompts.md` calibration file (not copied), Obsidian-era layering notes.

## Shattered Sea tone equation + style layer

- source: `content/shattered-sea/private/system/guides/Shattered-Sea-Tone-Guide.md` (found) → `sources/dnd-wiki/content/shattered-sea/private/system/guides/Shattered-Sea-Tone-Guide.md`; and `.claude/skills/shattered-sea-style/SKILL.md` (found) → `sources/dnd-wiki/.claude/skills/shattered-sea-style/SKILL.md`
- destination: Campaign `campaign-config.md` style note; enforced lightly from `npc-design`, scene skills, `theatre-of-the-mind`
- load-bearing:
  - Equation: **"High competence trapped inside low emotional maturity."** One-sentence tone: "Swashbuckling sophistication often complicated by pettiness."
  - Six pillars: (1) real stakes + childish dysfunction — "epic consequences, petty triggers"; (2) competence without adulthood (brilliant captain, terrible impulse control); (3) stylish surface, rotten interior; (4) banter as combat — "dialogue is social violence: interruption, one-upmanship, flirtation as dominance… not random quips — weaponized wit"; (5) mundane pettiness in lethal situations (boarding action pauses to argue about bad gunpowder); (6) cynicism without emptiness — mock the institutions, never so hard that nothing matters.
  - NPC construction formula: **public image + real competence + one humiliating need + one petty fixation** (e.g. "Naval legend / brilliant tactician / needs royal approval / obsessed with seeming younger than rival"). "A flat, professional NPC is a missed opportunity."
  - Scene construction rule, five layers: real external threat + petty internal conflict (insult, jealousy, unpaid tab, grammar, décor) + stylish presentation + fast verbal escalation + consequences that remain real. Guideline, not every-encounter requirement.
  - Tone boundaries table: keep glamour/danger/sharp dialogue/emotional damage played lightly/real consequences; avoid broad clown comedy, meme humor, every-NPC-same-sarcasm, removing consequences.
  - Default registers: dialogue status-testing and guarded about real needs; scenes are "competent professionals sabotaged by interpersonal baggage"; world texture "beautiful, expensive, slightly rotten". Comedy from character flaws, never world silliness.
  - From the style skill (enforcement layer): skill load order for creative prose (creative-writing-craft → draft → tone-guide check → humanize → finalize); read-aloud tense is delivery-dependent (present for active scenes, past for retrospective); sandbox defaults (NPC goals independent of players, events as pressures not scripts, no "if players do X then Y"); image prompts must consult an art-style guide first.
- skip-from-this-file: frontmatter, wikilinks, per-repo skill load order, image-guide path.

## Situation subtypes: Revelation & Question (plus thread template)

- source: `templates/situation-revelation.md`, `templates/situation-question.md`, `templates/situation-thread.md` (found) → under `sources/dnd-wiki/templates/`
- destination: extend CF Thread templates (or DM-only Lore/Situation kinds); feeds `plan-session` and mystery Scenes
- load-bearing:
  - **Revelation** template — frontmatter: `status: unrevealed | foreshadowed | revealed`; `reveal_tier: early | mid | late` (when the truth is intended to surface); summary states the hidden truth plainly "as the GM knows it". Sections: Situation (who/what is responsible, what it means), Key Actors (what each knows / doesn't), **The Design** (mechanics/history/structure at the depth needed to run it without notes), **Immediate DM Notes** (actionable now; what foreshadowing already exists; what a perceptive party can notice pre-reveal), **At-Table Reveal** ("what recontextualization does the reveal produce — what did the party already know that now means something different?"), Session Log table.
  - **Question** template — title "phrased as a question the GM is reasoning through"; `status: open | answered | moot`; summary = "one-line summary of the GM's current best answer". Sections: **Best Guess** ("State it with confidence, even if uncertain — this is a design commitment, not a hedge"), **Evidence** (supporting facts/inferences), **Against** (complicating facts, alternative readings), **What Would Resolve This** (specific party actions or discoveries), **Sub-questions**, Resolution left blank "until the question is answered at the table". These are provisional DM canon pages, `publish: false`.
  - **Thread** template (the base the two extend): Situation (what is happening and what it is doing "right now, off-screen"), Current State (what PCs know vs. don't; GM's working model of the present), Key Facts, Involved Parties (role, current posture, what they want), Timeline, **Triggers** (specific party action/discovery that moves it forward + GM-triggered escalation), **Consequences** ("what happens if the situation advances" / "what happens if the party ignores it"), Open Questions, Session Log.
- skip-from-this-file: frontmatter keys (campaign, confidence_level, sources, relationships), `publish: false` machinery, migration note about `dm_notes` frontmatter.

## PC Gravity + Session Zero interview wiring

- source: `.claude/skills/wiki-dnd/PREP.md` (found) → `sources/dnd-wiki/.claude/skills/wiki-dnd/PREP.md`; `templates/pc-interview.md` (found) → `sources/dnd-wiki/templates/pc-interview.md`; `.claude/skills/wiki-dnd/references/UNIVERSAL-TOYS.md` (found) → `sources/dnd-wiki/.claude/skills/wiki-dnd/references/UNIVERSAL-TOYS.md`
- destination: `new-campaign` intake + PC template Goals; `plan-session`/`prep-session` gravity filter
- load-bearing:
  - Gravity Well Extraction, per PC, from their entity pages: **Two Dials** — "two core behavioral axes defining their decision-making… must be internal tensions, not surface traits" (e.g. family loyalty / reckless ambition); **Terminal Node** — "single deepest long-term desire. Asymptotic — the PC approaches but never cleanly arrives"; **Active Friction** — "what currently blocks them. This is where you place toys."
  - The Gravity Filter: every entity must pass "does this pull on at least one PC's dials or terminal node?" Yes → include, note which PC and how. No → cut or retrofit.
  - Anti-pattern table: content unconnected to PC wells ("players drift past it"); hooks requiring players to care about strangers; all pulls in the same direction ("removes meaningful choice"); Terminal Node treated as solvable ("kills the gravity well"); only one dial threatened ("half as interesting as both dials in opposition").
  - Relevance pre-screen (universal rule): before generating anything, name which specific PC's backstory/goal/fear/thread it touches; "If you cannot, do not generate — ask the GM for the PC link first." Stakes first: lead with what a PC stands to gain or lose before lore or description.
  - Session Zero five questions (UNIVERSAL-TOYS.md): (1) what is your character trying to *become* by campaign end; (2) what are they *afraid* of losing; (3) who do they love, or did love; (4) what does failure look like for them personally; (5) what "red button" makes them throw caution to the wind. "Wire campaign tentpoles to these answers… players *want* to follow them because they built the rails themselves."
  - PC-interview template fields: Summary (dense prose bio "end[ing] on the wound or open problem that defines their arc"); **Mortis** block — Mark (the defining burden "the world cannot see"), Gift (the power that comes from carrying it), Nature (aware or at war with it); Open Questions (deliberate gaps + "question that will be answered in play"); DM Notes (content boundaries, arc flags). Sources an interview transcript in `raw/ingested/interviews/` — the interview artifact feeds this template, the sheet stays separate ("Statblock pending").
- skip-from-this-file: Obsidian CLI/Templater filing commands, git-commit-after-write, PC sheet mechanics (proficiency math, spell-slot tables), entity routing table, toy-field frontmatter sync.

## Mystery clue board

- source: `content/shattered-sea/private/system/guides/Mystery-Making-Framework.md` (found) → `sources/dnd-wiki/content/shattered-sea/private/system/guides/Mystery-Making-Framework.md`
- destination: reference under `development-scene` / `lore-design` (the prep worksheet behind CF's three-discovery-routes requirement)
- load-bearing:
  - Answer the Three Core Questions in order before placing any clues: 0 — What is the Mystery?; I — Who Did It? (culprit may be multiple, non-human, or none); II — Why (motive sets tone and how players feel at the reveal); III — How (method is "the primary difficulty dial — more moving parts… means a harder mystery. If the method is too complex or esoteric, clue generation becomes impossible; simplify the method before proceeding").
  - Clue rules: every clue ties to ≥1 of Who/Why/How; **each question needs at least 3 clues**; the more complicated the method, the more clues must address it; assign every clue to a specific location/NPC/event (may be gated behind combat/puzzles/traps); **"Stay flexible. If a player looks somewhere reasonable that wasn't the planned location, move the clue there and reward the deduction."** Litmus: if you can't generate 3 clues for a method part without forcing specific NPC dialogue, the method is too complex — revise it.
  - Clue board tracker (prep + play): columns `Clue | Question | Location | Special | Found` — sample rows: "Bloody Knife | How | Porch (back door) | — | No"; "Diary | Who, Why | Master Bedroom | Hidden in puzzle-locked jewelry box | Yes".
  - Design notes: the 3-clue rule "prevents players from getting stuck and eliminates the need for GM hints, which undercut player satisfaction"; combat still allowed (end on confrontation or gate evidence); scope note — self-contained mysteries, not campaign-wide.
- skip-from-this-file: frontmatter, wikilink Connections, Pointy Hat source attribution (CF prefers primary-source evidence).

## Theme-park Settlement attractions

- source: `content/shattered-sea/private/system/guides/City-Creation-Guide.md` (found) → `sources/dnd-wiki/content/shattered-sea/private/system/guides/City-Creation-Guide.md`
- destination: ideas into `location-design` Settlement branch
- load-bearing:
  - Core philosophy: "a city is a space players want to explore, not a lore classroom or backdrop for one plot beat"; theme-park method — distinct identity plus activities tailored to what this table enjoys; "lore and history belong inside the experience, not as gates before it."
  - Step 1 theme test: immediately visual, broad enough for diverse content, specific enough for identity. Bad: abstract/emotional ("Hope", "Love"), too narrow ("Blue", "Cat"), or generic. Ask what the city is *built on, obsessed with, or defined by* — visible in architecture, economy, hierarchy, daily life. Five worked theme examples (Undeath necropolis with class distinctions extending into death; Hell trade-port grown from an uncloseable portal; Underwater city larger below than above, nobles underwater / working class in the sun; Holy theocracy monopolizing healing; Art soft-power state where fame is currency).
  - Step 2 attractions table (11 rows, `Category | Core Concept | Example Locations | Player Appeal`): Fighting Contest, Infiltration, Ball/Social Event, Competition, Performance, Test of Mettle, Dispatching an Enemy, Siege, Explore Uncharted Territory, Open a Door, Gather Clues. "An attraction is most valuable when it appeals to more than one player simultaneously."
  - Adaptation rule: every attraction fits the theme ("a Fighting Contest in an Art city is a battle of the bands; in a Hell city it's a duel run by a Pit Fiend"); attractions combine ("Infiltration + Ball = some players mingle… while others run a stealth mission"); failure states "should redirect the story or open new attractions — not dead-end".
  - Design checklist ends: "at least one attraction per player preference at this table" and "the city has something worth returning to after main plot beats resolve".
- skip-from-this-file: frontmatter, wikilinks, Pointy Hat attribution.

## Travel event density

- source: `content/shattered-sea/private/system/guides/Traveling-Event-System.md` (found) → `sources/dnd-wiki/content/shattered-sea/private/system/guides/Traveling-Event-System.md`
- destination: `location-design` Region travel + journey prep in `cliffhanger-scene`/`prep-session`
- load-bearing:
  - Core idea: "Travel events are not random encounters. They are selected or designed for this specific party, drawn from backstories, tensions, and unresolved threads. A random encounter fills time. A travel event advances something."
  - Distance framework — three tiers replace exact distances: Close → 1 event; Far → 2–3 events; Very Far → up to 5. "'A few days' beats 'four days.' Exact numbers pull players into calendar math instead of story."
  - Event design test: each event pulls on something that already matters to a specific character (unresolved backstory, party tension, or a character overdue a meaningful moment). "Events don't need resolution. They add complications, questions, and things to carry forward — a letter with no explanation, a face from the past, a choice that forces a character to reveal something."
- skip-from-this-file: frontmatter, wikilinks.

## Cross-file notes

- PREP.md's universal rules section carries the naming blacklist (fantasy slop names "Aerin, Vex, Theron, Kael, Lyra, Draven, Zara" plus "decorative apostrophes, or swapped letters") and "Never" list (no plot, no unobservable faction goals, no hooks to NPCs the party hasn't met — "wire through PC backstory instead") — useful cross-checks for CF's Vale/lint wordlists; kept in the copied PREP.md rather than extracted as a section, since the findings file doesn't claim it as its own item.
- The world-tick and tone sources overlap with siblings (shattered-sea-campaign-os hot cache; shattered-sea-site tone triad) — same lineage; CF should adopt once, not thrice.
