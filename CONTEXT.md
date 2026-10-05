# Campaign Foundry

An agentic assistant for a DM running home D&D campaigns. It keeps a whole campaign world as a wiki and does the DM's work between Sessions.

## Language

### People

**DM**:
The human who runs Sessions for the Players and has final say over everything in the Wiki.
_Avoid_: GM, user, Dungeon Master (in prose, fine to expand once)

**Player**:
A human who plays a PC at the DM's table. Never a character in the fiction.
_Avoid_: user, PC (the character, not the human)

**Agent**:
The AI assistant that does worldbuilding, Prep and Ingest between Sessions. Never present at the table.
_Avoid_: co-DM, AI DM, assistant

**omp**:
oh-my-pi, the default harness the Agent runs in.
_Avoid_: OpenMP

### Setting and play

**World**:
A setting (its places, people, factions, history and powers) that exists independently of anyone playing in it, as Faerûn does. Campaigns take place in a World and move its history forward.
_Avoid_: setting, universe, bare "world" for a Foundry world

**Campaign**:
One group of Players moving through a World over a series of Sessions, with its own Party, Threads and timeline. A World has at most one active Campaign.
_Avoid_: game, adventure, run

**Session**:
One real-world meeting where the DM runs play for the Players, in person.
_Avoid_: game, game night, sitting

**Calendar**:
A World's reckoning of in-world time: its months, weekdays and year numbering. Every Session and every event carries an in-world date on it.
_Avoid_: timeline, dates, time system

**Party**:
The PCs of one Campaign, taken together.
_Avoid_: group, team, adventurers, players (the humans)

### World pages

**Location**:
A place in a World, always exactly one of three kinds: Region, Settlement or Site. Locations nest inside larger Locations.
_Avoid_: place, area, map

**Region**:
A Location spanning a wide area, such as a realm, province, sea or wilderness.
_Avoid_: zone, territory, land

**Settlement**:
A Location where people live together, such as a city, town or village.
_Avoid_: city (as a kind), town (as a kind), hub

**Site**:
A Location the Party explores or visits within a Region or Settlement, such as a dungeon, ruin, building, landmark or shop. Hazards that can't be carried are part of a Site.
_Avoid_: place, dungeon (as a kind), point of interest

**NPC**:
A specific, named person in a World whom the DM plays, with an identity and a story. An NPC's game statistics come from a Creature; many NPCs can share one Creature, and a unique NPC can have a Creature of its own.
_Avoid_: character (ambiguous with PC), monster, mob

**Creature**:
A stat block: the game statistics for a kind of being (Bandit Captain, Adult Red Dragon) or for one unique being. A Creature is rules, never a person; the person is the NPC.
_Avoid_: monster, enemy, actor, stat block (as a page kind)

**Faction**:
An organised group with shared goals in a World, such as a guild, cult, noble house or army.
_Avoid_: organisation, group, party (that's the Party)

**Deity**:
A god or comparable power that is worshipped or bargained with in a World.
_Avoid_: god, patron, pantheon (as a page kind)

**Item**:
A distinct object that matters by its rules or its story, such as a magic item, an artifact, a notable mundane object or a hazard that can be carried.
_Avoid_: loot, treasure, equipment, gear

**Spell**:
A spell that isn't in the rules sources outside the Wiki: homebrew, or a signature spell unique to this World.
_Avoid_: magic, power, ability

**Vehicle**:
A craft that carries people, such as a ship, boat or wagon, with its crew and components.
_Avoid_: ship (as a kind), mount, transport

**House Rule**:
A change or addition the DM makes to the 2024 5e rules for a World or Campaign. It outranks every other rules source.
_Avoid_: homebrew rule, variant rule, table rule

**Lore**:
World knowledge that belongs to no single Location, NPC, Faction, Deity, Creature or Item: history, cosmology, customs, past events.
_Avoid_: history, background, notes, setting info

### Campaign pages

**PC**:
A Player's character in a Campaign, sheet and story together. Its sheet is kept current by Ingest from D&D Beyond.
_Avoid_: player (the human), hero, character

**Thread**:
A live strand of the story, such as a PC's goal, a Faction's agenda, a mystery, a relationship under strain or a dwindling resource. It can open in one Session and resolve many Sessions later, and it moves whether or not the Party engages with it.
_Avoid_: plot thread, arc, storyline, plot, hook

**Quest**:
A concrete task the Party has been offered or has taken on, with a clear point where it is done or failed. A Quest often advances a Thread.
_Avoid_: mission, job, objective

### Session work

**Prep**:
The plan for an upcoming Session: one page holding its Scene Chart, Threads, opposition and Clues, plus a page for each Scene. Everything the DM needs to run the Session from the Wiki alone. Prep ends with a Push.
_Avoid_: session plan, outline, notes

**Scene Chart**:
The planned order of a Session's Scenes: a Hook first, then alternating Developments and Cliffhangers, then a Climax and a Resolution. It paces the Session and never fixes outcomes.
_Avoid_: beat chart, outline, running order

**Scene**:
A chunk of play of about half an hour, planned in Prep as exactly one of five kinds: Hook, Development, Cliffhanger, Climax or Resolution. Never a map.
_Avoid_: beat, moment, bare "scene" for a Foundry scene

**Hook**:
The first Scene of a Session: one opening pressure that pulls the Party in within minutes.
_Avoid_: strong start, cold open, intro, "hook" for a Thread or a PC's goal

**Development**:
A non-action Scene that changes what the Party knows, can reach or can choose between, such as a revelation, a conversation, an alliance or a betrayal.
_Avoid_: roleplay scene, downtime, bump

**Cliffhanger**:
An action Scene: a contest whose outcome stays in doubt and puts bodies, a vehicle or a place at physical risk, such as a chase, a fight or a hazard.
_Avoid_: combat scene, action beat

**Climax**:
The Session's highest-stakes Scene, earned by the Scenes before it, where its Threads converge.
_Avoid_: finale, boss fight

**Resolution**:
The short Scene after the Climax that shows what changed.
_Avoid_: epilogue, denouement, wrap-up

**Encounter**:
The Creatures and battlefield of a Cliffhanger or Climax, balanced against the Party under the 5e rules.
_Avoid_: fight, battle, combat (as a noun for the plan)

**Clue**:
A true, concrete fact the Players can discover, deliberately revealable in more than one Scene.
_Avoid_: secret, reveal, lore drop

**Spotlight**:
A Scene where one PC's goal, bond or fear drives play.
_Avoid_: PC hook, character moment

**Narration**:
Prose written for the DM to speak or show to the Players. The Previously On and a Handout's text are Narration.
_Avoid_: boxed text, read-aloud, flavour text

**Transcript**:
The full text of one recorded Session, handed to the Agent as Raw.
_Avoid_: log, recording (that's the audio), notes

**Handout**:
Anything meant for the Players' eyes, such as a letter, wanted poster, player map or portrait. The only material Push makes visible to Players.
_Avoid_: prop, player document, reveal

**Recap**:
The DM-facing account of what happened in one Session, compiled from its Transcript. Ingest applies it to the Wiki.
_Avoid_: summary, session notes, log

**Previously On**:
A short account of the last Session, written for the DM to read aloud to the Players at the start of the next one.
_Avoid_: player recap, read-aloud recap, boxed text

### Creative work

**Story**:
The DM's narrative for an idea, written with fiction craft before Adaptation: its premise, conflict, cast, setting, plot points and ending. It stays session-local until Adaptation turns it into material for the table.
_Avoid_: plot, script, campaign (for the Story)

**Story Bible**:
The session-local working file for a Story, `local://collab/bible.md`, holding its sections, cast cards and Story Outline. It never becomes a Wiki page.
_Avoid_: series bible, campaign bible, notes

**Beat**:
One moment of a Story's outline, with its place, the characters present and what changes. A Beat belongs to a Story and never to Prep; Adaptation turns Beats into situations, and Scenes come later through Prep.
_Avoid_: Scene, scene beat, plot point

**Seed**:
A short optional pitch, three sentences long, generated under one Stance by its own writer. The DM takes, merges or drops each one.
_Avoid_: option, suggestion, draft

**Stance**:
A drafting lens that sets what a writer optimises for, such as Character-first or Hook-seeder, listed in `docs/agents/co-writing.md`. Any Stance fits any idea.
_Avoid_: style, voice, genre

**Simulation**:
NPCs played by Personas under a Director through `simulate-npcs`, to find what they would do or say. Its results stay possibilities until the DM keeps them.
_Avoid_: roleplay, sandbox, playtest

**Persona**:
The subagent that plays exactly one NPC in a Simulation, knowing only its dossier and the events it witnesses.
_Avoid_: actor, character agent, NPC (for the agent)

**Director**:
The agent that runs a Simulation: it frames the scenes, commands each Persona in turn and keeps the ledger. It plays no NPC.
_Avoid_: narrator, GM, DM (that's the human)

**Adaptation**:
Turning a Story into situations, Threads, Clues and Scenes that the Party meets through its own choices.
_Avoid_: conversion, port, rewrite

### Knowledge

**DM Settings**:
The DM's defaults for every World and Campaign, kept on one page at the root of the Wiki, such as Session length. A Campaign may override them.
_Avoid_: config, preferences, settings (bare)

**campaign-config**:
The DM's instructions to agents for one Campaign, kept as `campaign-config.md` in that Campaign's folder: its tone, themes, and Lines and Veils. Its Lines and Veils are the only content limits; everything else follows the DM's rating (`AGENTS.md` Content stance). Meta content that tells agents how to write content, rather than being Campaign content, lives here, or on DM Settings when it spans every Campaign. Agents read it after `user-config.md` before Wiki work in the Campaign.
_Avoid_: DM Settings, user-config

**Repo**:
The Campaign Foundry git project. Its root, the repo root, is the checkout `cf --root` names: it holds the Wiki at `wiki/`, plus `raw/`, `archive/`, `.cspell/`, `src/`, `evals/` and `docs/`. Repo-relative paths start here, such as a page's `sources` (`archive/session-11-transcript.md`); `cf` run from the repo root prints page paths this way (`wiki/<World>/...`).
_Avoid_: project, workspace, bare "root", "vault" for the Repo

**Wiki** (also **vault**):
The canonical, human-readable record of Worlds and Campaigns: the Obsidian vault at `wiki/` in the Repo. Wiki and vault are one thing under two names, so the Wiki root and the vault root are both `wiki/`, the folder holding `.obsidian/`, `index.md` and `.cspell-words.txt`. `cf --vault` points there, and wikilinks, `--page` values and vault-relative paths start there. `wiki/` is the only vault this project works in; vaults elsewhere on the machine are legacy. The DM and the Agent both edit the Wiki, and the DM must be able to run a Session from it alone.
_Avoid_: notes, knowledge base, "vault" for the Repo

**Canon**:
What is true in a World or Campaign. By precedence: what the DM says (to the Agent, or at the table), then what the Wiki says, then material being ingested.
_Avoid_: draft, approved, official

**Raw**:
Any file waiting to be ingested into the Wiki, such as a Transcript, a brain-dump, a PDF or an image. It waits in `raw/` at the repo root, outside the Wiki.
_Avoid_: inbox, sources, imports

**Ingest**:
The Agent digesting outside material into the Wiki: a Raw file (afterwards moved to the Archive), or PC updates pulled from D&D Beyond. The material is broken into its atomic units, and each unit is merged into the page of its kind in the Wiki's own format. The only way material enters the Wiki besides the DM editing it.
_Avoid_: import, process, compile, sync

**Lint**:
The Agent's autonomous repair of mechanical Wiki issues: template layout, headings, wikilinks, placement, and index, via `cf check --fix`. It finishes without asking; if something is unclear it queries the Wiki.
_Avoid_: audit (as routine health), a DM-facing lint report, a blocking review

**Archive**:
Raw material that has already been ingested, kept in `archive/` at the repo root so it is always clear what has been ingested and what hasn't.
_Avoid_: trash, done

### Foundry

**Foundry world**:
The Foundry VTT container that projects one Campaign onto the virtual tabletop. Always written in full.
_Avoid_: world, VTT world

**Foundry scene**:
A map canvas in a Foundry world, with its walls, lights and tokens. Always written in full.
_Avoid_: scene, map (for the canvas)

**Push**:
The Agent writing everything a Session needs from the Wiki into its Foundry world. The only way material leaves the Wiki.
_Avoid_: sync, export, publish

### Evals

**Fixture eval**:
A committed `cases.yaml` run against the live Wiki: the Runner reads read-only and saves its pages and DM reply to a per-run output directory, Checks run on that Outcome, then Grades. Distinct from the Prose Benchmark.
_Avoid_: benchmark, unit test

**Check**:
A deterministic assertion `eval:check` runs on the Outcome (live pages with the run's output pages and deletions overlaid): pages exist, headings exist, canon/absent regexes. Constrained artifacts only.
_Avoid_: scoring speakability with a Check

**Grade**:
Independent reading of authored prose. Fixture-eval Grades are pass/fail. Benchmark Grades are the Judge's 1–5 scores.
_Avoid_: keyword search as a substitute for reading


**Runner**:
The model that executes an eval or benchmark entry. A cheap Codex or GLM model runs ordinary skill evals; the top tier runs the Prose Benchmark. Never the Judge.

**Judge**:
The grader that scores every Prose Benchmark sample — Opus 5.5 when the claude CLI answers, otherwise one seated substitute from the Matrix — blind and independent, on anonymized samples.

**Matrix**:
The families under test and their pinned cheap and top models, kept in `evals/models.yaml`.

**Prose Benchmark**:
The rarely-run, cached ranking of Matrix families by Narration quality, one sample per content type. Every prompt in it is committed and rendered deterministically (Runner brief, Judge brief).

**Runner brief**:
The committed, byte-exact prompt a benchmark entry runs from: the entry's `context`, then its `prompt` verbatim, rendered by `cf bench briefs` into `evals/benchmark-samples/<bench_version>/<id>/<id>.brief.md`.

**Judge brief**:
The committed scoring prompt `evals/bench/judge-brief.md`, filled per anonymized sample by `cf bench judge-brief`. The Judge sees the writer's brief, the sample and the rubrics — nothing that names a family or model.

**prompt_sha**:
First 12 hex of a runner brief's sha256: the byte identity a cached row must match to count. Distinct from `bench_version`, which hashes the whole prompt set.

**Leaderboard**:
The standing ranked record of Prose Benchmark runs: `evals/benchmark.json`, with `evals/benchmark.md` as its rendered view, regenerated only by `cf bench record` and `cf bench render`.

**dark**:
A Matrix family over its usage limit for the rest of a session: skipped without retry, never cached, back next session.
