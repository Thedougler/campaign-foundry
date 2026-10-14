# Campaign Foundry

An agentic assistant for a DM running home D&D campaigns: it records a whole campaign world in a wiki and does the DM's work between Sessions. More terms live with their work: creative work (Story, Story Bible, Beat, Pitch, Simulation, Persona, Director, Adaptation) in `docs/creative-process.md` § Terms, the Combat sim in `docs/combat-sim.md`, evals and the Prose Benchmark in `evals/README.md` § Terms.

## Language

### People

**DM**:
the human who runs Sessions for the Players and has final say over everything in the Wiki.
_Avoid_: GM, user, Dungeon Master (fine to expand once in prose)

**Player**:
a human who plays a PC at the DM's table, never a character in the fiction.
_Avoid_: user, PC (the character)

**Guest character**:
an NPC that a guest Player, beyond the Campaign's regulars, plays in the Party for a quest. Its page stays an NPC page, and its quest deeds go into that page's History and the Recap as a PC's do, without a PC page or `pull-pcs`. Every PC is still at the table.
_Avoid_: guest PC, temporary PC

**Agent**:
the AI assistant that does worldbuilding, Prep and Ingest between Sessions, never at the table.
_Avoid_: co-DM, AI DM, assistant

**omp**:
oh-my-pi, the coding-agent CLI the Agent runs in by default.
_Avoid_: OpenMP

### Setting and play

**World**:
a setting (places, people, factions, history, powers) that exists independently of anyone playing in it, as Faerûn does. Campaigns take place in a World and move its history forward.
_Avoid_: setting, universe, bare "world" for a Foundry world

**Campaign**:
one group of Players moving through a World over a series of Sessions, with its own Party, Threads and timeline.
_Avoid_: game, adventure, run

**Campaign folder**:
the Wiki folder of one Campaign, a lowercase-hyphenated slug (`wiki/shattered-sea/`), holding its pages and its World's: both overviews, `campaign-config.md`, `story-so-far.md`, `hot.md`, `index.md`, `log.md` and the page folders. A page that belongs to no one Campaign (World-free, or reused by a second Campaign) goes in a kind folder at the vault root, such as `wiki/Creatures/` (`docs/wiki-layout.md` **One vault, many Campaigns**).
_Avoid_: campaign directory, World folder

**World-free page**:
a page tied to no World, holding the minimum playable in any World: a Creature's statblock and essentials, an Item's rules and a bare description. Only a reusable kind can be one (Creature, Item, Spell, Vehicle, NPC, Faction, Deity, Lore, Location, House Rule). It lives in its kind folder at the vault root, using its kind's template without the Campaign-bound properties and optional sections. The content skill decides from the DM's ask whether a page is World-free. A Campaign that needs it copies it into a self-contained Campaign version, and the World-free page stays as it is.
_Avoid_: generic page, World-agnostic page, shared page

**Session**:
one real-world, in-person meeting where the DM runs play for the Players.
_Avoid_: game, game night, sitting

**Calendar**:
a World's reckoning of in-world time: months, weekdays and year numbering. Each Session and event has an in-world date.
_Avoid_: timeline, dates, time system

**Party**:
the PCs of one Campaign, taken together.
_Avoid_: group, team, adventurers, players (the humans)

### World pages

**Location**:
a place in a World, exactly one of Region, Settlement or Site. Locations nest inside larger Locations.
_Avoid_: place, area, map

**Region**:
a Location spanning a wide area, such as a realm, province, sea or wilderness.
_Avoid_: zone, territory, land

**Settlement**:
a Location where people live together, such as a city, town or village.
_Avoid_: city or town (as a kind), hub

**Site**:
a Location the Party explores or visits within a Region or Settlement, such as a dungeon, ruin, building, landmark or shop. A hazard fixed in place is part of a Site.
_Avoid_: place, dungeon (as a kind), point of interest

**NPC**:
a specific, named person in a World whom the DM plays. When the NPC fights or their rules matter at the table, the page includes their Statblock.
_Avoid_: character (ambiguous with PC), monster, mob

**Creature**:
a creature, monster or other sentient thing that isn't an NPC: a kind of being (Bandit Captain) or one unique being. One that fights or whose rules matter has its Statblock on its page, and a published monster (a 5etools monster) is its Statblock alone.
_Avoid_: monster (as a page kind), enemy, actor, stat block (as a page kind)

**Statblock**:
a being's D&D 2024 game statistics: one Fantasy Statblocks `statblock` fence, under `## Statblock` on a Creature or NPC page and under `## Sheet` without a CR on a PC page. A page has at most one. Other pages link it, and an Encounter embeds the section.
_Avoid_: stat sheet, stats page; character sheet (a PC's Sheet contains its Statblock)

**Faction**:
an organised group with shared goals in a World, such as a guild, cult, noble house or army.
_Avoid_: organisation, group, party (that's the Party)

**Deity**:
a god or comparable power that is worshipped or bargained with in a World.
_Avoid_: god, patron, pantheon (as a page kind)

**Item**:
a distinct object that matters by its rules or its story: a magic item or an artifact, and also a mundane object or portable hazard the story turns on.
_Avoid_: loot, treasure, equipment, gear

**Spell**:
a spell absent from the rules sources outside the Wiki: homebrew, or a signature spell of this World.
_Avoid_: magic, power, ability

**Vehicle**:
a craft that transports people, such as a ship, boat or wagon, with its crew and components.
_Avoid_: ship (as a kind), mount, transport

**House Rule**:
a DM change or addition to the 2024 5e rules for a World or Campaign. It overrides every other rules source.
_Avoid_: homebrew rule, variant rule

**Lore**:
knowledge of a World that belongs on no Location, NPC, Faction, Deity, Creature or Item page: history, cosmology, customs, past events.
_Avoid_: history, background, notes, setting info

### Campaign pages

**PC**:
a Player's character, sheet and story together. Its page is Canon for both. Its Statblock is refreshed by `pull-pcs` from D&D Beyond when the character is public, else kept by hand through `statblock-design`.
_Avoid_: player (the human), hero, character

**Thread**:
a live strand of the story, such as a PC's goal, a Faction's agenda, a mystery, a strained relationship or a dwindling resource. It can resolve many Sessions after it opens, and it moves whether or not the Party engages.
_Avoid_: plot thread, arc, storyline, plot, hook

**Quest**:
a concrete task the Party was offered or took on, with a clear point where it is done or failed. It often advances a Thread.
_Avoid_: mission, job, objective

**Arc**:
a run of Sessions that builds to and settles one central question, tracked in `story-so-far.md`.
_Avoid_: chapter, season, saga, "arc" for a Thread

**Hero's journey**:
the twelve stages of Vogler's model, Ordinary World to Return with the Elixir, walked by the Party or one PC across the Campaign. Stages are read from Session history after play, never planned, and forward material is possibilities for the next Session. A PC's lives on their journey Thread, the Party's on `story-so-far.md`.
_Avoid_: character arc, bare "journey" (that's travel)

### Session work

**Prep**:
the plan for an upcoming Session: one page with its Scene Chart, Threads, opposition and Clues, plus a page per Scene, enough to run the Session from the Wiki alone. Prep ends with a Push.
_Avoid_: session plan, outline, notes

**Scene Chart**:
the planned order of a Session's Scenes. A Hook opens, Developments and Cliffhangers alternate, and a Climax and a Resolution close. It paces the Session and never fixes outcomes.
_Avoid_: beat chart, outline, running order

**Scene**:
about half an hour of play, planned in Prep as exactly one of Hook, Development, Cliffhanger, Climax or Resolution. Never a map.
_Avoid_: beat, moment, bare "scene" for a Foundry scene

**Hook**:
a Session's first Scene: one opening pressure that pulls the Party in within minutes.
_Avoid_: strong start, cold open, intro, "hook" for a Thread or a PC's goal

**Development**:
a non-action Scene that changes what the Party knows, can reach or can choose between, such as a revelation, conversation, alliance or betrayal.
_Avoid_: roleplay scene, downtime, bump

**Cliffhanger**:
an action Scene, a contest with an uncertain outcome that puts bodies, vehicles or places at physical risk. Chases, fights and hazards are Cliffhangers.
_Avoid_: combat scene, action beat

**Climax**:
the Session's highest-stakes Scene, where its Threads converge.
_Avoid_: finale, boss fight

**Resolution**:
the short Scene after the Climax that shows what changed.
_Avoid_: epilogue, denouement, wrap-up

**Stinger**:
the Resolution's last moment. A new pressure or arrival points to a live Thread and stops before the Party can answer, and the next Hook picks it up.
_Avoid_: button, tag, post-credits scene, cliffhanger (the Scene kind)

**Encounter**:
the Creatures and battlefield of a Scene the Party may fight in, balanced against the Party under the 5e rules.
_Avoid_: fight, battle, combat (as a noun for the plan)

**Clue**:
a true, concrete fact the Players can discover, revealable in more than one Scene.
_Avoid_: secret, reveal, lore drop

**Hidden truth**:
a true fact about a subject the Players don't know yet, DM-only until a Clue or play exposes it.
_Avoid_: secret, twist

**Spotlight**:
the moment in a Scene where one PC's goal, bond or fear drives play: a section within a Scene, never the Scene itself.
_Avoid_: PC hook, Spotlight Scene

**Lead PC**:
the PC whose hero's journey a Session's strongest possibilities are built around, chosen by readiness from observed play. No PC leads again until every PC has led.
_Avoid_: bare "lead" (a lead the Party follows), main character

**Angle**:
something the Party can act on to change a Scene or Thread, with what acting on it costs. It is a person or object to use, or a fact or course of action to pursue.
_Avoid_: lever, handle, purchase, leverage (an NPC's own power over others)

**Narration**:
prose for the DM to speak or show to the Players. The Previously On, a Handout's text and every Cue are Narration.
_Avoid_: boxed text, read-aloud, flavour text

**Cue**:
a one-to-three-sentence spoken line for a situational moment, inline on a DM-side line right after its trigger, between `==` marks: `Success: ==One stone sits smoother than the rest…==`. Trigger, rules terms and DCs stay outside the marks. The gate checks it as Narration.
_Avoid_: blurb, aside, boxed text

**Transcript**:
the full text of one recorded Session, handed to the Agent as Raw.
_Avoid_: log, recording (the audio), notes

**Session Ledger**:
the line-cited record of what happened in one Session, built from its Transcript by Transcript readers and kept beside it in `archive/`. Ingest writes the Wiki from it.
_Avoid_: transcript summary, notes, companion

**Laugh Highlights**:
the Session's biggest table laughs, which `cfcli transcript highlights` measures from the recording and aligns with a timestamped Transcript. Ingest judges which are play before they enter the Session Ledger as MOMENT events.
_Avoid_: laugh track, highlight reel

**Transcript Summary**:
the AI summary TranscribeX exports beside a Transcript. It indexes candidate events for Ingest to check against the Session Ledger and is never itself evidence.
_Avoid_: recap, meeting report

**TranscribeX Dictionary**:
`transcribex-dictionary.csv` at the repo root: misheard words mapped to their Canon spelling, which the DM imports into TranscribeX.
_Avoid_: glossary, word list

**Visual**:
an image or diagram on a Wiki page that shows its subject or structure to the DM: a portrait, map, scene-setter, sigil or mermaid diagram. Art for the Players' eyes is a Handout.
_Avoid_: artwork, illustration, picture, image (as the umbrella), visual aid

**Handout**:
anything meant for the Players' eyes, such as a letter, wanted poster, player map or portrait: the only material Push makes visible to Players.
_Avoid_: prop, player document, reveal

**Recap**:
the DM-facing account of one Session, compiled from its Transcript. Ingest applies it to the Wiki.
_Avoid_: summary, session notes, log

**Previously On**:
a short account of the last Session for the DM to read aloud at the start of the next, kept in the folder of the Session it opens.
_Avoid_: player recap, read-aloud recap, boxed text

### Knowledge

**DM Settings**:
the DM's defaults for every World and Campaign, such as Session length, on one page at the Wiki root. A Campaign may override them.
_Avoid_: config, preferences, bare "settings"

**campaign-config**:
the DM's instructions to agents for one Campaign, `campaign-config.md` in the Campaign folder: tone, themes, and Lines and Veils, the only content limits (`AGENTS.md` Content stance). Meta content on how to write content is stored here, or on DM Settings when it spans every Campaign. Agents read it after `user-config.md` before Wiki work in the Campaign.
_Avoid_: DM Settings, user-config

**story-so-far**:
the arc-level view of one Campaign, `story-so-far.md` in the Campaign folder, rewritten by `story-arc` after each Session's Ingest. It retells the played story from the Recaps and says where the arc and the Party's hero's journey stand, which pressures move, which promises the Players can pick up, where each PC's choices point and who leads next. It links Thread, Quest and PC pages and leaves their state on them.
_Avoid_: campaign summary, timeline, hot.md

**Repo**:
the Campaign Foundry git project. The repo root is the checkout `cfcli --root` names, holding `wiki/`, `raw/`, `archive/`, `.cspell/`, `src/`, `evals/` and `docs/`. Repo-relative paths, such as a page's `sources` and `cfcli` output run from the root, start here (`wiki/shattered-sea/NPCs/Nona Black-Jaw.md`).
_Avoid_: project, workspace, bare "root", "vault" for the Repo

**Wiki** (also **vault**):
the canonical, human-readable record of Worlds and Campaigns: the Obsidian vault at `wiki/`, the only vault this project works in (others on the machine are legacy). Its root holds `.obsidian/`, `index.md` and `.cspell-words.txt`. `cfcli --vault`, wikilinks, `--page` values and vault-relative paths start there. The DM and the Agent both edit it, and the DM must be able to run a Session from it alone.
_Avoid_: notes, knowledge base, "vault" for the Repo

**Canon**:
what is true in a World or Campaign. What the DM says to the Agent or at the table comes first, the Wiki second and material being ingested last. Fixed Canon on revealed pages wins over draft Canon on unrevealed ones (**Revealed**).
_Avoid_: approved, official

**Revealed**:
when a page's subject first came up at the table, in the page's `revealed` property. `"Backstory"` means the Players knew it before play. A PC's backstory established it (on the PC page or in the Player's words), or a pre-play player-facing primer did, such as a player or world primer or a campaign pitch (`archive/Session-00-Prologue.md`, recorded in the Campaign's Session 0 pages). Otherwise it is `"Session N"` for the first Session where the subject came up in any way, else `""`. A PC page is always `"Backstory"`, which counts as earlier than any Session. A claim heard at the table fixes that it was said, not that it is true. A page with `revealed: ""` is **draft Canon**, true until changed and free to reflavour or reuse. A revealed page is **fixed Canon**: each later change is narratively additive, adding depth, history, consequences or new facts without contradicting or retconning anything revealed. PC pages, primers and Session records (Recaps, Previously Ons, Session Ledgers) are the evidence for each value.
_Avoid_: known, public, played (for a page)

**Raw**:
any file waiting in `raw/` at the repo root to be ingested, such as a Transcript, brain-dump, PDF or image.
_Avoid_: inbox, sources, imports

**Ingest**:
the Agent digesting a Raw file (then moved to the Archive) or D&D Beyond PC updates into the Wiki, merging each atomic unit into the page of its kind in the Wiki's format. The only way material enters the Wiki besides the DM's own edits.
_Avoid_: import, process, compile, sync

**Lint**:
the Agent's autonomous repair of mechanical Wiki issues (template layout, headings, wikilinks, placement, index) via `cfcli check --fix`, the `prose` scope of `bun run lint`, querying the Wiki when unsure.
_Avoid_: audit (as routine health), a blocking review

**Archive**:
ingested raw material, kept in `archive/` at the repo root so what has been ingested stays clear.
_Avoid_: trash, done

**Backup**:
the managed Notion copy of the Shattered Sea Wiki (`wiki/shattered-sea/`), the agent skills and their images, one page per file naming its repo path, which `cfcli backup` updates on each push to `main` (`docs/notion-backup.md`). Agents read from it first, since one search covers many pages for fewer tokens, and write to the Wiki, which stays the record. An edit made in Notion is overwritten, and nothing in the Backup feeds play.
_Avoid_: sync, mirror, export, Push

### Foundry

**Foundry world**:
the Foundry VTT container that projects one Campaign onto the virtual tabletop. Always written in full.
_Avoid_: world, VTT world

**Foundry scene**:
a map canvas in a Foundry world, with its walls, lights and tokens. Always written in full.
_Avoid_: scene, map (for the canvas)

**Push**:
the Agent writing everything a Session needs from the Wiki into its Foundry world: the only way material leaves the Wiki for play.
_Avoid_: sync, export, publish
