# Campaign Foundry

An agentic assistant for a DM running home D&D campaigns. It records a whole campaign world in a wiki and does the DM's work between Sessions.

## Language

### People

**DM**:
the human who runs Sessions for the Players and has final say over everything in the Wiki.
_Avoid_: GM, user, Dungeon Master (in prose, fine to expand once)

**Player**:
a human who plays a PC at the DM's table. Never a character in the fiction.
_Avoid_: user, PC (the character, not the human)

**Guest character**:
an NPC whom a guest Player, someone beyond the Campaign's regular Players, plays as a member of the Party for a quest. Its page stays an NPC page. Its quest deeds go into that page's History and into the Recap as a PC's do, without a PC page or `pull-pcs`. A guest adds a Player to the table, and every PC is still at the table.
_Avoid_: guest PC, temporary PC or quest character

**Agent**:
the AI assistant that does worldbuilding, Prep and Ingest between Sessions. Never present at the table.
_Avoid_: co-DM, AI DM, assistant

**omp**:
oh-my-pi, the coding-agent CLI the Agent runs in by default.
_Avoid_: OpenMP

### Setting and play

**World**:
a setting (its places, people, factions, history and powers) that exists independently of anyone playing in it, as Faerûn does. Campaigns take place in a World and move its history forward.
_Avoid_: setting, universe, bare "world" for a Foundry world

**Campaign**:
one group of Players moving through a World over a series of Sessions, with its own Party, Threads and timeline. Its Campaign folder keeps its World's pages beside its own.
_Avoid_: game, adventure, run

**Campaign folder**:
the Wiki folder of one Campaign, named for it as a lowercase-hyphenated slug (`wiki/shattered-sea/`). It keeps the Campaign's pages and its World's pages together: both overviews, `campaign-config.md`, `story-so-far.md`, `hot.md`, `index.md`, `log.md` and the page folders. Kind folders at the vault root (`NPCs`, `Items`) exist only for pages a second Campaign reuses.
_Avoid_: campaign directory, World folder

**Session**:
one real-world meeting where the DM runs play for the Players, in person.
_Avoid_: game, game night, sitting

**Calendar**:
a World's reckoning of in-world time: its months, weekdays and year numbering. Each Session and each event has an in-world date.
_Avoid_: timeline, dates, time system

**Party**:
the PCs of one Campaign, taken together.
_Avoid_: group, team, adventurers, players (the humans)

### World pages

**Location**:
a place in a World, always exactly one of three kinds (Region, Settlement or Site). Locations nest inside larger Locations.
_Avoid_: place, area, map

**Region**:
a Location spanning a wide area, such as a realm, province, sea or wilderness.
_Avoid_: zone, territory, land

**Settlement**:
a Location where people live together, such as a city, town or village.
_Avoid_: city (as a kind), town (as a kind), hub

**Site**:
a Location the Party explores or visits within a Region or Settlement, such as a dungeon, ruin, building, landmark or shop. A hazard fixed in place is part of a Site.
_Avoid_: place, dungeon (as a kind), point of interest

**NPC**:
a specific, named person in a World whom the DM plays, with an identity and a story. An NPC's game statistics come from a Creature; many NPCs can share one Creature, and a unique NPC can have a Creature of its own.
_Avoid_: character (ambiguous with PC), monster, mob

**Creature**:
the game statistics, or stat block, for a kind of being (Bandit Captain, Adult Red Dragon) or for one unique being. A Creature is rules, never a person. The person is the NPC.
_Avoid_: monster, enemy, actor, stat block (as a page kind)

**Faction**:
an organised group with shared goals in a World, such as a guild, cult, noble house or army.
_Avoid_: organisation, group, party (that's the Party)

**Deity**:
a god or comparable power that is worshipped or bargained with in a World.
_Avoid_: god, patron, pantheon (as a page kind)

**Item**:
a distinct object that matters by its rules or its story, such as a magic item, an artifact, a mundane object the story turns on or a portable hazard.
_Avoid_: loot, treasure, equipment, gear

**Spell**:
a spell that isn't in the rules sources outside the Wiki: homebrew, or a signature spell unique to this World.
_Avoid_: magic, power, ability

**Vehicle**:
a craft that transports people, such as a ship, boat or wagon, with its crew and components.
_Avoid_: ship (as a kind), mount, transport

**House Rule**:
a change or addition the DM makes to the 2024 5e rules for a World or Campaign. It takes precedence over every other rules source.
_Avoid_: homebrew rule, variant rule or table rule

**Lore**:
knowledge of a World that belongs on no Location, NPC, Faction, Deity, Creature or Item page: history, cosmology, customs, past events.
_Avoid_: history, background, notes, setting info

### Campaign pages

**PC**:
a Player's character in a Campaign, sheet and story together. Its sheet is kept current by Ingest from D&D Beyond.
_Avoid_: player (the human), hero, character

**Thread**:
a live strand of the story, such as a PC's goal, a Faction's agenda, a mystery, a relationship under strain or a dwindling resource. It can open in one Session and resolve many Sessions later, and it moves whether or not the Party engages with it.
_Avoid_: plot thread, arc, storyline, plot, hook

**Quest**:
a concrete task the Party has been offered or has taken on, with a clear point where it is done or failed. A Quest often advances a Thread.
_Avoid_: mission, job, objective

### Session work

**Prep**:
the plan for an upcoming Session: one page holding its Scene Chart, Threads, opposition and Clues, plus a page for each Scene. Everything the DM needs to run the Session from the Wiki alone. Prep ends with a Push.
_Avoid_: session plan, outline, notes

**Scene Chart**:
the planned order of a Session's Scenes. A Hook comes first, then alternating Developments and Cliffhangers, then a Climax and a Resolution. It paces the Session and never fixes outcomes.
_Avoid_: beat chart, outline, running order

**Scene**:
a chunk of play of about half an hour, planned in Prep as exactly one of five kinds (Hook, Development, Cliffhanger, Climax or Resolution). Never a map.
_Avoid_: beat, moment, bare "scene" for a Foundry scene

**Hook**:
the first Scene of a Session: one opening pressure that pulls the Party in within minutes.
_Avoid_: strong start, cold open, intro, "hook" for a Thread or a PC's goal

**Development**:
a non-action Scene that changes what the Party knows, can reach or can choose between. Revelations, conversations, alliances and betrayals are Developments.
_Avoid_: roleplay scene, downtime, bump

**Cliffhanger**:
an action Scene: a contest with an uncertain outcome that puts bodies, a vehicle or a place at physical risk. Chases, fights and hazards are Cliffhangers.
_Avoid_: combat scene, action beat

**Climax**:
the Session's highest-stakes Scene, built up by the Scenes before it, where its Threads converge.
_Avoid_: finale, boss fight

**Resolution**:
the short Scene after the Climax that shows what changed.
_Avoid_: epilogue, denouement, wrap-up

**Encounter**:
the Creatures and battlefield of a Cliffhanger or Climax, balanced against the Party under the 5e rules.
_Avoid_: fight, battle, combat (as a noun for the plan)

**Clue**:
a true, concrete fact the Players can discover, deliberately revealable in more than one Scene.
_Avoid_: secret, reveal, lore drop

**Spotlight**:
a Scene where one PC's goal, bond or fear drives play.
_Avoid_: PC hook, character moment

**Narration**:
prose written for the DM to speak or show to the Players. The Previously On, a Handout's text and every Cue are Narration.
_Avoid_: boxed text, read-aloud, flavour text

**Cue**:
a short spoken line (one to three sentences) the DM says in a situational moment, written inline on a DM-side line right after its trigger (a check result, a question, a gambit, a turn), between `==` marks: `Success: ==One stone sits smoother than the rest…==`. Its trigger, rules terms and DCs stay outside the marks. A Cue is Narration and the gate checks it as Narration.
_Avoid_: blurb, aside, boxed text

**Transcript**:
the full text of one recorded Session, handed to the Agent as Raw.
_Avoid_: log, recording (that's the audio), notes

**Session Ledger**:
the line-cited record of what happened in one Session, built from its Transcript by Transcript readers and kept in `archive/` beside it. Ingest writes the Wiki from it.
_Avoid_: transcript summary, notes, companion

**Laugh Highlights**:
the Session's biggest table laughs, measured from its recording by `cf transcript highlights` and aligned with the lines of a timestamped Transcript (markdown or CSV); the detector proposes them, and Ingest judges which are play before they enter the Session Ledger as MOMENT events.
_Avoid_: funniest moments, laugh track or highlight reel

**Transcript Summary**:
the AI summary TranscribeX exports beside a Transcript. Ingest uses it as an index of candidate events to check against the Session Ledger and never as evidence.
_Avoid_: recap, meeting report

**TranscribeX Dictionary**:
`transcribex-dictionary.csv` at the repo root: misheard words mapped to their Canon spelling, which the DM imports into TranscribeX so later Transcripts come out right.
_Avoid_: glossary, word list

**Handout**:
anything meant for the Players' eyes, such as a letter, wanted poster, player map or portrait. The only material Push makes visible to Players.
_Avoid_: prop, player document, reveal

**Recap**:
the DM-facing account of what happened in one Session, compiled from its Transcript. Ingest applies it to the Wiki.
_Avoid_: summary, session notes, log

**Previously On**:
a short account of the last Session, written for the DM to read aloud to the Players at the start of the next one, so they pick up where they left off. It lives in the folder of the Session it opens.
_Avoid_: player recap, read-aloud recap, boxed text

### Creative work

**Story**:
the DM's narrative for an idea, written with fiction craft before Adaptation: its premise, conflict, cast, setting, plot points and ending. It stays session-local until Adaptation turns it into material for the table.
_Avoid_: plot, script, campaign (for the Story)

**Story Bible**:
the session-local working file for a Story, `local://collab/bible.md`, holding its sections, cast cards and Story Outline. It never becomes a Wiki page.
_Avoid_: series bible, campaign bible, notes

**Beat**:
one moment of a Story's outline, with its place, the characters present and what changes. A Beat belongs to a Story and never to Prep; Adaptation turns Beats into situations, and Scenes come later through Prep.
_Avoid_: scene beat, plot point or Scene

**Seed**:
a short optional pitch, three sentences long, generated under one Stance by its own writer. The DM takes, merges or drops each one.
_Avoid_: option, suggestion, draft

**Stance**:
the priority a writer optimises for while drafting, such as Character-first or Hook-seeder, listed in `docs/agents/co-writing.md`. Any Stance fits any idea.
_Avoid_: style, voice, genre

**Simulation**:
NPCs played by Personas under a Director through `simulate-npcs`, to find what they would do or say. Its results are possibilities until the DM accepts them.
_Avoid_: roleplay, sandbox, playtest

**Persona**:
the subagent that plays exactly one NPC in a Simulation, knowing only its dossier and the events it witnesses.
_Avoid_: actor, character agent, NPC (for the agent)

**Director**:
the agent that runs a Simulation: it frames the scenes, commands each Persona one at a time and keeps the ledger. It plays no NPC.
_Avoid_: narrator, GM, DM (that's the human)

**Adaptation**:
turning a Story into situations, Threads, Clues and Scenes that the Party meets through its own choices.
_Avoid_: conversion, port, rewrite

### Knowledge

**DM Settings**:
the DM's defaults for every World and Campaign, kept on one page at the root of the Wiki, such as Session length. A Campaign may override them.
_Avoid_: config, preferences, settings (bare)

**campaign-config**:
the DM's instructions to agents for one Campaign, kept as `campaign-config.md` in the Campaign folder: its tone, themes, and Lines and Veils. Its Lines and Veils are the only content limits. Everything else follows the DM's rating (`AGENTS.md` Content stance). Meta content that tells agents how to write content, rather than being Campaign content, lives here, or on DM Settings when it spans every Campaign. Agents read it after `user-config.md` before Wiki work in the Campaign.
_Avoid_: DM Settings, user-config

**story-so-far**:
the arc-level view of one Campaign, kept as `story-so-far.md` in the Campaign folder by the `story-arc` skill and rewritten after each Session's Ingest. It retells the played story from the Recaps, and it says where the arc stands, which pressures move, what promises the Players can still pick up and where each PC's choices point. It links the Thread, Quest and PC pages and leaves their state on them.
_Avoid_: campaign summary, timeline, hot.md

**Repo**:
the Campaign Foundry git project. Its root, the repo root, is the checkout `cf --root` names: it holds the Wiki at `wiki/`, plus `raw/`, `archive/`, `.cspell/`, `src/`, `evals/` and `docs/`. Repo-relative paths start here, such as a page's `sources` (`archive/session-11-transcript.md`). When run from the repo root, `cf` prints page paths this way (`wiki/shattered-sea/NPCs/Nona Black-Jaw.md`).
_Avoid_: project, workspace, bare "root", "vault" for the Repo

**Wiki** (also **vault**):
the canonical, human-readable record of Worlds and Campaigns: the Obsidian vault at `wiki/` in the Repo. Wiki and vault are one thing under two names, so the Wiki root and the vault root are both `wiki/`, the folder holding `.obsidian/`, `index.md` and `.cspell-words.txt`. `cf --vault` points there, and wikilinks, `--page` values and vault-relative paths start there. `wiki/` is the only vault this project works in. Vaults elsewhere on the machine are legacy. The DM and the Agent both edit the Wiki, and the DM must be able to run a Session from it alone.
_Avoid_: notes, knowledge base, "vault" for the Repo

**Canon**:
what is true in a World or Campaign. By precedence, what the DM says to the Agent or at the table comes first, then what the Wiki says, then material being ingested. The Wiki holds it in two tiers, and fixed Canon on revealed pages takes precedence over draft Canon on unrevealed ones (**Revealed**).
_Avoid_: approved, official

**Revealed**:
the record of when a page's subject first came up at the table. A page's `revealed` property is `"Backstory"` when the Players held the subject before play began, because a PC's backstory established it (on the PC page or in the Player's words) or a player-facing primer did (a player or world primer, campaign pitch or similar handout given before the first Session, such as `archive/Session-00-Prologue.md`, recorded in the Campaign's Session 0 pages). Otherwise it is `"Session N"` for the first Session where the subject came up at the table in any way, else `""`. A PC page is always `"Backstory"`, since its Player wrote it. `"Backstory"` counts as earlier than any Session. A claim heard at the table fixes that it was said, not that it is true. A page with `revealed: ""` is **draft Canon**: true until changed, and an agent may freely reflavour it or reuse it elsewhere. Once revealed, a page is **fixed Canon**, and each later change to it must be narratively additive. Such a change builds only on what is present, adding depth, history, consequences or new facts without contradicting or retconning anything already revealed. The PC pages, the primers and the Session records (Recaps, Previously Ons and the Session Ledgers in `archive/`) are the evidence for each value.
_Avoid_: known, public, played (for a page)

**Raw**:
any file waiting to be ingested into the Wiki, such as a Transcript, a brain-dump, a PDF or an image. It waits in `raw/` at the repo root, outside the Wiki.
_Avoid_: inbox, sources, imports

**Ingest**:
the Agent digesting outside material into the Wiki, either a Raw file (afterwards moved to the Archive) or PC updates pulled from D&D Beyond. The material is broken into its atomic units, and each unit is merged into the page of its kind in the Wiki's own format. The only way material enters the Wiki besides the DM editing it.
_Avoid_: import, process, compile, sync

**Lint**:
the Agent's autonomous repair of mechanical Wiki issues: template layout, headings, wikilinks, placement, and index, via `cf check --fix`. It finishes without asking, and when something is unclear it queries the Wiki.
_Avoid_: audit (as routine health), a DM-facing lint report or a blocking review

**Archive**:
raw material that has already been ingested, kept in `archive/` at the repo root so it is always clear what has been ingested and what hasn't.
_Avoid_: trash, done

### Foundry

**Foundry world**:
the Foundry VTT container that projects one Campaign onto the virtual tabletop. Always written in full.
_Avoid_: world, VTT world

**Foundry scene**:
a map canvas in a Foundry world, with its walls, lights and tokens. Always written in full.
_Avoid_: scene, map (for the canvas)

**Push**:
the Agent writing everything a Session needs from the Wiki into its Foundry world. The only way material leaves the Wiki for play.
_Avoid_: sync, export, publish

### Backup

**Backup**:
the remote, managed Notion database of the Shattered Sea Wiki (`wiki/shattered-sea/`), the agent skills and their images, which `cf backup` updates on each push to `main`, one page per file, each naming its file's repo path (`.notion/backup-map.json` only caches the lookup). One search there covers a question spanning many pages, faster and for fewer tokens than local search, so agents read from it first. Agents write to the Wiki, which stays the record. An edit made in Notion is overwritten. Nothing in the Backup feeds play.
_Avoid_: sync, mirror, export, Push

### Evals

**Fixture eval**:
a committed `cases.yaml` run against the live Wiki. The Runner reads read-only and saves its pages and DM reply to a per-run output directory, then Checks run on that Outcome, then Grades. Distinct from the Prose Benchmark.
_Avoid_: benchmark, unit test

**Check**:
a deterministic assertion `eval:check` runs on the Outcome (live pages with the run's output pages and deletions overlaid): pages exist, headings exist, canon/absent regexes. Constrained artifacts only.
_Avoid_: scoring speakability with a Check

**Grade**:
independent reading of authored prose. Fixture-eval Grades are pass/fail. Benchmark Grades are the Judge's scores from 1 to 5.
_Avoid_: keyword search as a substitute for reading


**Runner**:
the model that executes an eval or benchmark entry. A cheap Codex or GLM model runs ordinary skill evals, and the top tier runs the Prose Benchmark. A Runner is never the Judge.

**Judge**:
the grader that scores every Prose Benchmark sample, blind and independent, on anonymised samples. It is Opus 5.5 when the claude CLI answers, otherwise one seated substitute from the Matrix.

**Matrix**:
the families under test and their pinned cheap and top models, kept in `evals/models.yaml`.

**Prose Benchmark**:
the rarely-run, cached ranking of Matrix families by Narration quality, one sample per content type. Its prompts are all committed and rendered deterministically (Runner brief, Judge brief); its run outputs (`evals/benchmark.json`, `evals/benchmark.md`, and everything under `evals/benchmark-samples/` except the briefs) are untracked, gitignored and archived locally under `archive/evals-benchmark/`.

**Runner brief**:
the byte-exact prompt a benchmark entry runs from: the entry's `context`, then its `prompt` verbatim, rendered by `cf bench briefs` into `evals/benchmark-samples/<bench_version>/<id>/<id>.brief.md`, committed.

**Judge brief**:
the committed scoring prompt `evals/bench/judge-brief.md`, filled per anonymised sample by `cf bench judge-brief`. The Judge sees the writer's brief, the sample and the rubrics, but never a family or model name.

**prompt_sha**:
the first 12 hex digits of a runner brief's sha256: the byte identity a cached row must match to count. Distinct from `bench_version`, which hashes the whole prompt set.

**Leaderboard**:
the standing ranked record of Prose Benchmark runs: `evals/benchmark.json`, with `evals/benchmark.md` as its rendered view, regenerated only by `cf bench record` and `cf bench render`.

**dark**:
a Matrix family over its usage limit for the rest of a session. It is skipped without retry and never cached, and it returns next session.
