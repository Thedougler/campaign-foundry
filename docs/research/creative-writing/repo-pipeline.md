# RepoCreativePipeline report (verbatim scout output)

INVOCATION FLAGS: only three skills are DM-activated (disable-model-invocation: true): collab-with-me (.omp/skills/collab-with-me/SKILL.md:4), dogfood, setup-campaign-foundry. Every .agents/skills creative skill is model-invocable (no flag in frontmatter).

== 1. PER SKILL ==

collab-with-me (.omp/skills/collab-with-me/SKILL.md) — description: 'DM-activated collaborative Campaign creation — riff on the DM's raw ideas across turns, weave them into Canon, and file them into the Wiki in the background once the DM calls them done.' Steps: (1) Open: read user-config.md, campaign-config.md, hot.md; create or re-read notes. (2) Catch: every DM fragment into notes. (3) Search and read: self QMD + page reads; heavy exploration goes to a read-only scout subagent batch (returns page paths + hooks + gaps); rules/balance questions go to a subagent that reads creature-design/item-design/spell-design and returns a sketch. (4) Develop: build on the idea, weave wikilinks, test vs timeline/geography/motives, and per :20 'Offer concrete ways to expand, improve or simplify it (a named lieutenant, a line of dialogue, a reveal, a cut)'. (5) File on DM confirmation: raw file, then ingest subagent, then lint subagent. (6) Relay reports. (7) Close. Brainstorms: yes. Alternatives: yes, tracked with the DM's verdicts. Critique/revision of its own prose: none. Voice: chat-talk rule below. Subagents: native task dispatch per .omp/AGENTS.md:31.

VERBATIM .omp/skills/collab-with-me/SKILL.md:11 (The gate):
```
The Wiki is an Obsidian vault (`vault://_/`, searched through QMD) and stays untouched until
the DM says an idea is done for now ('lock it in', 'file it', 'that's the one'). Until then
each idea lives in the chat and the notes.
```
VERBATIM .omp/skills/collab-with-me/SKILL.md:22 (Develop):
```
Write it as talk, not a document: plain paragraphs the way a co-writer speaks across the
table, casual, free to wander where the DM goes, with no headings, bullet lists, labelled
sections or option menus. Ask your one or two questions inside the prose where they arise,
never as a numbered list and never through the `ask` tool. [...]
```
Note: the original uses double quotes inside 'lock it in' etc. Notes live at local://collab-notes.md (:13), outside the Wiki; after a context reset, re-read them.

plan-session (.agents/skills/plan-session/SKILL.md) — description: 'A friendly yes-and conversation with the DM about what they want from the next Session, grounded in Canon, ending in a settled Session intent that prep-session builds from.' Steps: Gather (hot.md, last Recap, active Threads/open Quests, each PC's Goals and bonds) → Open (five to ten lines plus 'two or three directions Canon points toward', :13) → Riff turn by turn → Settle (write intent in chat, hand to prep-session). Writes nothing to the Wiki. No subagents. VERBATIM :19-30 (## Riffing: yes, and), trimmed:
```
- **Fixed points.** Every idea the DM offers is a fixed point: take it as given, then add to it.
- **Pitch before you ask.** Each turn brings at least one concrete idea from Canon, with its
  page linked: [...]
- **Invitations.** End a turn with at most two questions, each offering two or three specific
  options the DM can pick or riff on.
- **Intent only.** Ask what the DM wants to happen and how it should feel. [...]
- **PC pull.** [...] hold two pulls that oppose each other and the want they can never cleanly
  arrive at. Favour pitches that strain a pull; name a pitch that pulls on no PC as scenery.
- **Canon as written.** [...] mark every pitch the Wiki doesn't support as a pitch. A pitch
  becomes Canon when the DM keeps it.
```
The Session intent template (:35-49) fixes fields: Promise, Tone, Fixed points, Opening, Threads, Climax, Resolution, Spotlights, Left to Prep.

prep-session — description: 'Prep — build the next Session from settled intent into a complete Scene Chart and runnable Scene pages, then generate missing images, refresh hot.md and Push.' Twelve steps: intent/scope → ground Party (qmd) → budget and chart (reserve about ninety minutes for Hook+Climax+Resolution; middle ceiling max(0, floor((total minutes - 90) / 30))) → distribute Threads/Clues (three to five Threads, faction-driven capped at two, about ten Clues, three independent routes per critical conclusion) → cast before minting → file Prep → fill every Scene via kind skills and reconcile conditional outcomes → locate Previously On → images via generate-image → cold-read the full Session → hot/index/gate/log → push-session. Dispatches: the five kind skills, eight design skills plus dungeon-design, theatre-of-the-mind, generate-image, push-session. Reference: references/journey.md (five leg slots: Departure cost, Landmark, Events, Toll, Arrival). Brainstorm: no ('use plan-session only when intent is missing').

VERBATIM prep-session step 5 (Cast before minting): 'use `npc-design`, `location-design`, `creature-design`, `item-design`, `faction-design`, `vehicle-design`, `spell-design` and `lore-design` for their corresponding missing owners; use `dungeon-design` when a Site needs area-by-area exploration. Author required Handouts to their current template, with `theatre-of-the-mind` for spoken or shown text.'

SCENE SKILLS (hook-, development-, cliffhanger-, climax-scene, resolution-scene) — all delegate inputs, page contracts, Narration and completion to docs/agents/scene-pages.md and own kind craft plus a card catalogue. hook-scene description: 'Hook authoring — fill Prep's first Scene from its Scene Chart row, or build a Session opening directly for the DM, including resuming interrupted play. One immediate pressure invites commitment and opens the question the Climax will answer.' Handles rule (:13): 'provide at least three materially different responses, each with an upside, a cost and a World response'. development-scene: turn/evidence/people/choices + about 29 cards. cliffhanger-scene: fight/chase/hazard engines, 13 cards, reuse audit, 3-5 rounds or 20-30 minutes pacing. climax-scene: earned lever, High difficulty default, at least three real outcomes, 10 cards. resolution-scene: 8 earned-ending cards, Closing image, ten to twenty-five minutes. All: conditional ## Outcomes, cold read, page gate, totm dispatch for Opening/Closing image. Brainstorm: no. Alternatives: outcome branches. Critique: cold read only.

VERBATIM docs/agents/scene-pages.md:19 (## Scripting the Game):
```
Mike Pondsmith's *Scripting the Game* is the pacing method; it takes precedence over a loose
pool of potential Scenes. A Session has one Hook first, alternating non-action Developments
and physical-risk Cliffhangers in the middle, then one Climax and its Resolution. An action
Hook starts the middle with a Development; a cerebral Hook starts it with a Cliffhanger. [...]
```

toM (theatre-of-the-mind) — description: 'Writes Narration, the prose the DM speaks or shows the Players, into `[!narration]` callouts — every slot from Scene openings and first looks to the Previously On and Handout text.' Strict read/write scope lists. Steps: Find slot → Gather (caller-named pages only) → Draft (point + anchor) → Revise (silent read, read aloud, retell from memory) → File (callout body only, then index + page gate). Craft: situation-first, told (hand-off), evidence (judgement-word ban), speakable, withhold, fresh words, People (one ~six-second NPC line, no speech tag after). VERBATIM hard lines :62-64:
```
1. **The Players own their characters.** A PC does, says, decides and feels only what their
   player declared (`Narration.PcInterior`). Put the cause in the world: 'the scream rattles
   the lantern glass'.
2. **Only the perceivable.** The block holds what the characters can sense or already know. [...]
3. **One event, stopped at the reaction point.** [...] 'What do you do?' is the DM's line. [...]
```
Voice handling, VERBATIM (Craft, The DM's voice): 'When the DM corrects the wording or rhythm of returned Narration, state the correction as a rule and append it as one dated line under `## Prose voice` in repo-root `user-config.md`'. Length bands (:68-86): Hook opening 80-120 words, Climax 100-200, Previously On 120-160, Closing image 60-120, etc. References: recipes.md (Job/Build/End per slot + shape-to-match samples), previously-on.md (table-marked moments ranked; end inside the stopped moment), critique.md (max five findings, each Quote/Table-cost/Fix/Severity; hunt list incl. Info-dump, Templating, Metagame spotlight, Stock tells; credit: 'adapted in our own words from haowjy/creative-writing-skills'). Explicit revise + critique pass. No subagents.

DESIGN SKILLS (npc-, faction-, location-, lore-, creature-, item-, dungeon-, vehicle-, spell-design) — shared skeleton: qmd canon read → AGENTS.md source ladder → craft fields → swap test → one theatre-of-the-mind Narration slot → file to template → page gate ok: 0 findings → one log entry (--op create when standalone). They decide Canon themselves (ADR 0003) and 'list every new fact decided as Canon'; they never brainstorm with the DM. Alternatives appear as candidate enumeration: item-design 'reuse / reskin / adjust / trade / combine [...] or build new'; creature-design Reuse/Reskin/Variant/New design/Retune. npc-design has a Scale ladder (Incidental, Scene, Recurring, Villain) and references craft.md (face/voice/tells, swap test), influence.md (2024 Influence; DC max(15, the NPC's Intelligence score); 'Do not gate an essential clue behind one Influence check'), villain.md (plan steps with trigger/sign/cost/interruption/fallback; at least three live endings). location-design references authoring.md (orient/canon/source ladder/gate), weave.md (hazard six-element answers: Sign, Trigger, Effect, Counterplay, Bypass, Leverage; three Clues per important hidden truth), region.md, settlement.md, site.md (each ends in a table-use criterion). creature-design references sourcing-and-rules.md (source ledger; 'Never disguise a balance change as a reskin'), tuning-and-budget.md (party dossier of every PC; three-round model; attack chances clamped to 5%-95%; CR estimates labelled, never averaged), filing-and-operations.md (template as sole schema; retunes never edit played records). dungeon-design: entrance-to-objective graph, keyed stock, Pressure/Rest procedures, references/expeditions.md (bound the next expedition; child Sites by links not folders; return ledger; causal absence).

humanizer — vendored skill (MIT, v3.1.0): 'Rewrite AI-sounding text so it reads like the writer without changing what it says.' 22 numbered patterns strongest-first; '§1 to §5 justify an edit on one sighting'; weak-alone markers; Voice via writing sample; Embedded mode returns only the final text; 'Fiction is exempt because invented detail is the task.' Not wired to the repo gate; no other skill invokes it.

ingest — description: 'Digests Raw (a Transcript, a brain-dump, notes, a PDF, images, stat blocks) into the Wiki, merging each atomic unit into the page of its kind, resolving conflicts by Canon precedence, then archiving the file.' Fourteen steps: Claim (shasum dedupe) → Orient → Read → Units → Canon (talk-not-play / agrees / new / moves-the-story-on / contradicts) → Write → Fill → Session records → Images → Check → Archive → Log → Close (runs the audit skill over touched pages, advances due Threads, rewrites hot lines) → Report. Fill ladder (:39-45): (1) file + Wiki; (2) rest of raw/archive; (3) VERBATIM: 'The published sources the kind's design skill (`npc-design`, `location-design`, `creature-design`, `item-design`, `faction-design`, `lore-design`, `vehicle-design`) fetches'; (4) 'Novel Canon that design skill decides, in prose.' Step 8: a Transcript writes Recap + Previously On and 'hand `theatre-of-the-mind` the whole Transcript for the Previously On'.

new-campaign / new-world — talk-first gatherers per ADR 0003. new-world builds a skeleton by dispatching faction-/location-/npc-/lore-design plus theatre-of-the-mind. new-campaign does overview + campaign-config (tone sentence plus its two consequences), PC pages with pull-pcs (public D&D Beyond URLs), three to five initial Threads, hot.md (about 500 words, gate 550), then :43 'Offer `plan-session` as the next step'.

== 2. HOW COLLAB-WITH-ME REACHES THE REST ==

- Design skills, path (a) direct but sketch-only, for rules/balance questions only, VERBATIM :19: 'a rules or balance question (a Creature's CR, an Item's rarity) goes to a subagent that reads the owning design skill (`creature-design`, `item-design`, `spell-design`) and returns a sketch in its result'. Path (b) indirect via filing: step 5 dispatches ingest, whose Fill reaches design skills; VERBATIM :26: 'Ingest finds each subject's page, reaches the design skills (`npc-design`, `faction-design`, `location-design`, `lore-design`, `creature-design`, `item-design`) for Fill'. That list omits vehicle-design and spell-design; ingest's own Fill ladder adds vehicle-design; no list anywhere in the collab→ingest chain names spell-design (outside collab's rules-question path) or dungeon-design.
- theatre-of-the-mind: only indirectly — ingest step 8 (Previously On) and design skills' Narration slots during Fill. Collab never requests Narration; dialogue it invents stays chat-only and is not carried into the raw file as Narration.
- plan-session / prep-session / scene skills: no path at all. Nothing passes collab output into Session intent; a filed idea reaches Prep only through Wiki pages that later qmd reads.
- scout agent: dispatched (:19) but .omp/agents/ is empty in this checkout (verified with gitignore and hidden off). test-subject and prose-grader, referenced by evals/README.md:48,52 as .omp/agents/*.md, are also absent from the repo — agent definitions presumably live in user-level harness config [INFERENCE] or are missing.

== 3. DUPLICATIONS AND CONFLICTS ==

- Source ladder restated in AGENTS.md Sourcing, location-design/references/authoring.md §2, creature-design/references/sourcing-and-rules.md, and again in faction/lore/item/vehicle/spell step 2 — consistent, about nine copies.
- Gate+log cycle (check --fix, check, ok: 0 findings, one log entry; standalone vs composed ownership) repeated in every design skill, scene-pages Completion, prep-session, totm, ingest; the scene skills and scene-pages restate each other's cold read.
- Three-independent-routes rule stated in eight places: npc-design gates, npc-design/references/influence.md, development-scene:16, dungeon-design step 5, lore-design step 5, faction-design step 6, location-design/references/weave.md, prep-session step 4.
- Swap test in six design skills (npc, faction, creature, item, vehicle, spell).
- Coverage-list conflict: prep-session step 5 names 8 design skills + dungeon-design; collab :26 names 6; ingest Fill names 7. Spell/vehicle/dungeon coverage depends on which entrypoint files the idea.
- Tone conflict (minor): collab riffs 'without claiming facts' while a search is in flight (:22); plan-session demands a Canon-backed pitch every turn — different evidence standards for two conversation skills.
- humanizer vs repo voice: humanizer bans em/en dashes in any final rewrite; totm bans them only inside Narration; the skills' own prose uses dashes heavily, so humanizer-on-skill-text would fight the house style.

== 4. GAPS VS A COMPLETE CREATIVE PROCESS ==

- Ideation/divergent options: capped at 'two or three directions' (plan-session:13) plus ad-hoc collab suggestions; no N-way divergent generation or explicit option comparison.
- Outline/beat structure: strong — Scene Chart, Scripting the Game, journey legs.
- Character voice: NPC voice well specified (npc-design craft.md; totm People); PC voice/PC interview exists only in prior-iteration research (docs/research/prior-iterations); new-campaign has prompts but no dedicated skill.
- Drafting: covered (scene pages, design templates, totm prose).
- Critique/revision: only totm has a real critique pass (critique.md, adapted from haowjy/creative-writing-skills). Scene skills cold-read for completeness, not prose craft; design skills rely on the mechanical gate; collab-with-me has no critique or revision pass on its own chat prose; humanizer is never invoked by any skill.
- Consistency check: covered for ingest (audit at step 13) and Prep (cold read); collab filing runs lint only — mechanical repair, not the canon-contradiction audit (lint and audit are distinct per CONTEXT.md).
- Filing: strong (raw → ingest → archive → log), but collab ideas that are plans for future Sessions have no route into Prep intent — ingest files Canon, plan-session never reads collab-notes.
- Brainstorm↔Prep seam: two parallel conversation skills (collab worldbuilding, plan-session session-planning) with no shared notes or handoff.

== 5. KEY PASSAGE ANCHORS ==

- .omp/skills/collab-with-me/SKILL.md:4 (disable-model-invocation), :11 (gate), :13 (notes), :19 (scout + design-skill subagents), :22 (talk voice), :23-28 (file + ingest/lint chain)
- .agents/skills/plan-session/SKILL.md:17-30 (riffing), :33-49 (Session intent template)
- .agents/skills/prep-session/SKILL.md steps 1-12 (cast-before-minting is step 5; middle-scene ceiling step 3)
- docs/agents/scene-pages.md:19 (Scripting the Game), :23-41 (Encounters), :43+ (Completion)
- .agents/skills/theatre-of-the-mind/SKILL.md:40-58 (craft incl. The DM's voice), :60-66 (hard lines), :68-86 (length bands), :88+ (final check); references/critique.md:1-9 (finding shape, credit line)
- .agents/skills/ingest/SKILL.md:37-45 (Fill ladder), step 8 (totm Previously On), step 13 (audit/hot)
- AGENTS.md (Sourcing, Gate scope, Zero findings); .omp/AGENTS.md:31 (Native delegation)
- docs/adr/0002 (agent works only between Sessions), 0003 (intent not bookkeeping; Canon precedence), 0004 (one active Campaign per World), 0011 (atomic ingest), 0017 (one professional-quality case per content type; Narration graded inside content cases)
- evals/README.md:24 (Grade: 'no rubric requires verbatim wording'), :48-52 (read-only runner/grader agents)
- wiki/templates/ — 29 templates: five Scene - <Kind>.md, Prep.md, Previously On.md, Recap.md, hot.md, campaign-config.md, DM Settings.md, World.md, Campaign.md, NPC.md, Creature.md, Deity.md, Faction.md, Item.md, Lore.md, Spell.md, Vehicle.md, House Rule.md, Thread.md, Quest.md, PC.md, Handout.md, Location - Region/Settlement/Site.md
- .omp/agents/ — empty; no agent definition files found