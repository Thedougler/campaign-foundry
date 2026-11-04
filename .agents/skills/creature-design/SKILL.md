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

[references/filing-and-operations.md](references/filing-and-operations.md) is the page contract.

## Steps

### 1. Establish scope and read the target Campaign

Capture the caller's Creature name, purpose, existing page, role, whether it will fight, the number of Creatures, terrain and whether this is reuse, creation or a deepening of a filed page. When the DM asks for a reusable monster tied to no World or Campaign, follow [World-free Creature](#world-free-creature) in place of these steps. Otherwise resolve the caller's root, vault and Campaign explicitly, and run all retrieval and writes inside them.

Read the World overview, the target Campaign's overview and every page the request touches. Search the Wiki and retrieve the full target-root pages each hit identifies. Change each page as its `revealed` property allows (`CONTEXT.md` **Revealed**). Played Session records and already-heard Narration are fixed evidence.

### 2. Find the Creature before inventing one

Look for an existing fitting Creature in both of the Wiki's homes, the Campaign folder's `Creatures/` and the vault-root `wiki/Creatures/`, by fantasy and role as well as name. A World-free Creature is a candidate the Campaign copies into its own version (`docs/wiki-layout.md` **Campaign versions**). Then search published and homebrew material for a being whose concept fits, and decide whether to reuse, adapt or create.

### 3. Make the Creature specific

Define the World-grown twist, ecological niche, role, goal, fear or limit, and the body part or habit the Party can see that exposes each signature. Run a swap test against a regional neighbour: rewrite every line that remains true under the neighbour's name. Give the Creature a morale or ending condition: what makes it flee, yield or stop.

### 4. Hand off the statistics

When the Creature will fight or its rules matter at the table, invoke `skill://statblock-design` with the page path, concept, role, each signature with its visible tell, terrain, number fighting and requested difficulty. It returns the page with its `## Statblock` and sort keys filled, or a retuned block, with an entry for every signature whose tell matches it. A Creature that never fights has no `## Statblock`, and its five sort keys stay blank (`""` or `[]`).

### 5. Put the Creature in the World and hand off Narration

Place it in the World. Write where it lives and how it fits there, including what it eats or lives beside or is used for as its kind allows. Give a niche that differs from its neighbours'. For every signature, write a trace the Party can find before contact: tracks, kills, shed material, damaged terrain, smell, sound, or a changed pattern of prey. State its origin and hidden truths with concrete ways the Party can learn them. Habitat, niche, ecology, origin, truths and morale agree with the statblock and with Canon. A filed Creature whose presence reads generic gets a `flesh-out` pass.

When the Party will see it, hand `theatre-of-the-mind` the First sight slot with the visible appearance behind every signature. First sight gives its size in feet or against a familiar thing. It gives only details the Party can sense from where it stands, and its counts match Canon. When it fights, write Tactics from its statblock and habitat, with the tell before its signature as a Cue (`==…==`, `theatre-of-the-mind` `references/recipes.md` § Cues). Keep rules, numbers, secrets and any name the Party has not learned out of First sight.

### 6. File and compare

File per [references/filing-and-operations.md](references/filing-and-operations.md), or work on the page `statblock-design` filed. Hand the filed page to `visuals`.

Once the page is drafted, **compare** its prose with its sources. List each claim in First sight, Tactics, Outside a fight, Ecology and Hidden truths: every ability, resource, trigger, condition, exit, counter and answer it names, every PC capability it cites, and every Canon fact or played event it retells. Beside each, quote the line it rests on from the statblock entry with its trigger, the PC's page or SRD entry, or the record line with its actor and outcome. Rewrite the claim until the two agree, or send the entry back to `statblock-design`. A claim with no line behind it goes.

### 7. Close

Close per `skill://lint` § Commands over the Creature page and every page this run touched. Reply with the page path, the reuse, adapt or create decision, and the new Canon.

## World-free Creature

A reusable monster tied to no World or Campaign is a World-free page (`docs/wiki-layout.md` **World-free pages**). It has its frontmatter and `## Statblock` as a published 5etools monster is. Optional sections are left out. It has no Narration, Party tuning or setting lore, so this branch skips the Campaign reads and steps 2 to 7.

1. **Scope.** Record the concept, role, CR or tier and signature the DM gives, and decide each detail the ask leaves open as your stated choice.
2. **Statistics.** Run `skill://statblock-design` as a World-free block with them. It files `wiki/Creatures/<slug>.md`, or returns the fence for a chat-only ask, and replies with the path, the peer its CR rests on and the attribution for any published material.
