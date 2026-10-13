---
name: creature-design
description: >-
  Creature design — a Creature page for a creature, monster or other sentient
  thing that isn't an NPC: its concept, place in the World, behaviour, First
  sight and hidden truths, grounded in World canon. Use when an Encounter,
  Location or Scene needs a kind of being or one unique being, when a Creature
  page needs its ecology, tactics or Narration, or when the DM wants a reusable
  monster tied to no World.
---

# Creature design

A **Creature** is a creature, monster or other sentient thing that isn't an NPC: a kind of being (a Bandit Captain, an Adult Red Dragon) or one unique being. The target is a Creature page that gives the Party something specific to notice, learn and answer, with a place in the World. Its combat statistics are optional: when the Creature fights or its rules matter at the table, `skill://statblock-design` writes them under `## Statblock`, and this skill writes everything else on the page.

[references/filing-and-operations.md](references/filing-and-operations.md) is the page and CLI contract.

## Steps

### 1. Establish scope and read the target Campaign

Capture the caller's Creature name, purpose, existing page, role, whether it will fight, the number of Creatures, terrain and whether this is reuse, creation or a deepening of a filed page. When the DM asks for a reusable monster tied to no World or Campaign, follow [World-free Creature](#world-free-creature) in place of these steps. Otherwise resolve the caller's root, vault and Campaign explicitly, and run all retrieval and writes inside them.

Read the World overview, the target Campaign's overview, `hot.md`, its Campaign folder's `index.md` and the last ten entries of its `log.md`, and every page the request touches. Search the Wiki (`.omp/AGENTS.md` § Wiki access) and retrieve the full target-root pages each hit identifies. Change each page as its `revealed` property allows (`CONTEXT.md` **Revealed**). Mark played Session records and already-heard Narration as fixed evidence.

**Gate:** the working notes state the target path, World, Campaign, whether it fights, source pages and the pages that link it, and each required page has been read in full.

### 2. Find the Creature before inventing one

Look for an existing fitting Creature in both of the Wiki's homes, the Campaign folder's `Creatures/` and the vault-root `wiki/Creatures/`, by fantasy and role as well as name. A World-free Creature is a candidate the Campaign copies into its own version (`docs/wiki-layout.md` **Campaign versions**). Then search published and homebrew material by the root `AGENTS.md` **Sourcing** ladder for a being whose concept fits.

**Gate:** the notes list the candidates retrieved and what fits and fails in each, plus the decision to reuse or adapt or create.

### 3. Make the Creature specific

Define the World-grown twist, ecological niche, role, goal, fear or limit, and the body part or habit that exposes each signature. Run a swap test against a regional neighbour: rewrite every line that remains true under the neighbour's name. Give the Creature a morale or ending condition: what makes it flee, yield or stop.

**Gate:** the twist, niche and signature fail the swap test. Each signature has a body part or habit the Party can see, and the morale is stated.

### 4. Hand off the statistics

When the Creature will fight or its rules matter at the table, invoke `skill://statblock-design` with the page path, concept, role, each signature with its visible tell, terrain, number fighting and requested difficulty. It returns the page with its `## Statblock` and sort keys filled, or a retuned block. A Creature that never fights has no `## Statblock`, and its five sort keys stay blank (`""` or `[]`).

**Gate:** a fighting Creature's page has a statblock that passed `statblock-design`'s check, and every signature from step 3 has an entry whose tell matches it.

### 5. Put the Creature in the World and hand off Narration

Place it in the World. Write where it lives and how it fits there, including what it eats or lives beside or is used for as its kind allows. Give a niche that differs from its neighbours'. For every signature, write a trace the Party can find before contact: tracks, kills, shed material, damaged terrain, smell, sound, or a changed pattern of prey. State its origin and hidden truths with concrete ways the Party can learn them. A filed Creature whose presence reads generic gets a `flesh-out` pass.

When the Party will see it, hand `theatre-of-the-mind` the First sight slot with the visible appearance behind every signature. When it fights, write Tactics from its statblock and habitat, with the tell before its signature as a Cue (`==…==`, `theatre-of-the-mind` `references/recipes.md` § Cues). Keep rules, numbers, secrets and any name the Party has not learned out of First sight.

**Gate:** every signature has an ecological sign and a visible tell. Habitat, niche, ecology, origin, learnable truths and morale agree with the statblock, when it has one, and with canon. First sight gives size in feet or against a familiar thing, and each of its details is one the Party can sense from where it stands. Its counts match the things it describes and Canon.

### 6. File and compare

Follow [references/filing-and-operations.md](references/filing-and-operations.md). Copy `wiki/templates/creature.md` to `<campaign-folder>/Creatures/<slug>.md` (the slug of its `title`), or work on the page `statblock-design` filed. Add each optional section and callout whose guidance condition this Creature meets, per `docs/wiki-layout.md` **Templates define pages**, and leave out the parts it has nothing for. Add at least one real incoming wikilink besides the generated index. Hand the filed page to `visuals`.

Once the page is drafted, **compare** its prose with its sources. List each claim in First sight, Tactics, Outside a fight, Ecology and Hidden truths: every ability, resource, trigger, condition, exit, counter and answer it names, every PC capability it cites, and every Canon fact or played event it retells. Beside each, quote the line it rests on from the statblock entry with its trigger, the PC's page or SRD entry, or the record line with its actor and outcome. Rewrite the claim until the two agree, or send the entry back to `statblock-design`. A claim with no line behind it goes.

**Gate:** the page has every template property, and each optional part present has the content its condition calls for. It has one incoming link and complete source attribution, and no played record changed. The compare list pairs every claim with a quoted line that says the same.

### 7. Close the operation

Close per `skill://lint` § Commands over the Creature page and every page this run touched, reading `bun run cfcli -- check --help` first for the installed syntax. Log only once the page gate prints `ok: 0 findings`. When another skill invoked this one, that caller writes the operation log. Append a `create` log entry only when this invocation is standalone. Report the page path, source candidates and decision, the statblock hand-off result, the compare list, new canon and the verification result.

**Final gate:** the page passes the page gate (`skill://lint` § Commands). Its index, links and source record are complete.

## World-free Creature

A reusable monster tied to no World or Campaign is a World-free page (`docs/wiki-layout.md` **World-free pages**). It has its frontmatter and `## Statblock` as a published 5etools monster is. Optional sections are left out. It has no Narration, Party tuning or setting lore, so this branch skips the Campaign reads and steps 2 to 7.

1. **Scope.** Record the concept, role, CR or tier and signature the DM gives, each detail the ask leaves open written as your stated choice. **Done when** the notes state each.
2. **Statistics.** Run `skill://statblock-design` as a World-free block with them. It files `wiki/Creatures/<slug>.md`, or returns the fence for a chat-only ask, and replies with the path, the peer its CR rests on and the attribution for any published material. **Done when** its page gate, or the scratch-vault check for a chat-only block, prints `ok: 0 findings`.
