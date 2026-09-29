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

### Setting and play

**World**:
A setting (its places, people, factions, history and powers) that exists independently of anyone playing in it, as Faerûn does. Campaigns take place in a World and move its history forward.
_Avoid_: setting, universe, bare "world" for a Foundry world

**Campaign**:
One group of Players moving through a World over a series of Sessions, with its own Party, Plot Threads and timeline. A World has at most one active Campaign.
_Avoid_: game, adventure, run

**Session**:
One real-world meeting where the DM runs play for the Players, in person.
_Avoid_: game, game night, sitting

**Party**:
The PCs of one Campaign, taken together.
_Avoid_: group, team, adventurers, players (the humans)

### World pages

**Location**:
A place in a World, at any scale from a plane or continent down to a single room. Locations nest inside larger Locations.
_Avoid_: place, area, region (as a page kind), map

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
A distinct object that matters by its rules or its story, such as a magic item, an artifact or a notable mundane object.
_Avoid_: loot, treasure, equipment, gear

**Lore**:
World knowledge that belongs to no single Location, NPC, Faction, Deity, Creature or Item: history, cosmology, customs, past events.
_Avoid_: history, background, notes, setting info

### Campaign pages

**PC**:
A Player's character in a Campaign, sheet and story together. Its sheet is kept current by Ingest from D&D Beyond.
_Avoid_: player (the human), hero, character

**Plot Thread**:
A storyline that runs across Sessions and moves whether or not the Party engages with it, such as a cult's plan or a brewing war.
_Avoid_: arc, storyline, hook, plot

**Quest**:
A concrete task the Party has been offered or has taken on, with a clear point where it is done or failed. A Quest often advances a Plot Thread.
_Avoid_: mission, job, objective

### Session work

**Prep**:
The plan for an upcoming Session, holding everything the DM needs to run it from the Wiki alone. Prep ends with a Push.
_Avoid_: session plan, outline, notes

**Scene**:
A narrative situation planned in Prep, such as the party confronting the Duke at the masquerade. Never a map.
_Avoid_: beat, moment, bare "scene" for a Foundry scene

**Encounter**:
A Scene expected to need Creatures and initiative, usually combat, and balanced against the Party.
_Avoid_: fight, battle, combat (as a noun for the plan)

**Transcript**:
The full text of one recorded Session, handed to the Agent as Raw.
_Avoid_: log, recording (that's the audio), notes

**Recap**:
The account of what happened in one Session, compiled from its Transcript. It sits beside that Session's Prep.
_Avoid_: summary, session notes, log

### Knowledge

**Wiki**:
The canonical, human-readable record of Worlds and Campaigns. The DM and the Agent both edit it, and the DM must be able to run a Session from it alone.
_Avoid_: vault, notes, knowledge base

**Canon**:
What is true in a World or Campaign. By precedence: what the DM says (to the Agent, or at the table), then what the Wiki says, then material being ingested.
_Avoid_: draft, approved, official

**Raw**:
Source material waiting to be ingested into the Wiki, such as Transcripts, brain-dumps and reference text.
_Avoid_: inbox, sources, imports

**Ingest**:
The Agent bringing outside material into the Wiki: a Raw file (afterwards moved to the Archive), or PC updates pulled from D&D Beyond. The only way material enters the Wiki besides the DM editing it.
_Avoid_: import, process, compile, sync

**Archive**:
Raw material that has already been ingested, kept so it is always clear what has been ingested and what hasn't.
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
