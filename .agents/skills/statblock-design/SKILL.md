---
name: statblock-design
description: >-
  Statblock design — the D&D 2024 combat statistics of a Creature or NPC: its
  source peers, role, signature, CR, Party tuning and the Fantasy Statblocks
  `statblock` fence with every derived number written out. Use when a page or
  reply needs combat statistics, when writing, converting or checking a
  statblock, or when the DM reports a fight was too soft or too hard.
---

# Statblock design

A statblock is a being's D&D 2024 combat statistics: one Fantasy Statblocks fence under the `## Statblock` heading of its Creature or NPC page, or alone in a reply. The section is optional on both kinds, and a page has one when the being fights or its rules matter at the table. This skill decides every number and entry in the block. The being's identity, how it lives and how it behaves outside its entries belong to `creature-design` and `npc-design`, which invoke this skill when their subject needs combat statistics.

The run is finished when the block passes its check and is on its page or in the reply. The reply reports its sources, path, tuning and consumers.

- [references/sourcing.md](references/sourcing.md) (the source ladder, the five paths, the source record and the 2024 rules ledger).
- [references/tuning.md](references/tuning.md): the Party dossier, encounter budget, three-round model, probability and CR.
- [references/fence.md](references/fence.md) (the fence's fields, 2024 entry forms, derived numbers and its check).

## Steps

### 1. Scope

From the caller or the DM, record the being and its page (a Creature or NPC path or a chat-only block), its concept, role and signature, the visible tells its page gives, the number fighting, terrain, the requested difficulty and whether this is a new block, a reuse or a retune. A block tied to no World or Campaign is **World-free** (`docs/wiki-layout.md` **World-free pages**). Otherwise resolve the caller's root, vault and Campaign and run every read and write inside them. Read the Campaign's `hot.md`, its `index.md`, the last ten entries of its `log.md` and the applicable House Rules. For a retune, read the page and every unplayed Encounter, Prep or Scene that embeds or uses its block, and mark played Session records and heard Narration as fixed evidence.

**Done when** the notes state the target path, World-free or Campaign, count, terrain, difficulty mapping, House Rules and every consumer.

### 2. Party dossier

A Campaign block follows [references/tuning.md](references/tuning.md) § Party dossier. A World-free or chat-only block for no Party skips this step and anchors to its peer at step 5.

**Done when** every active PC has a filled row and the Party summary is written, or the step is skipped for a World-free block.

### 3. Source and choose a path

Follow [references/sourcing.md](references/sourcing.md). Search the ladder by rules function and fantasy, record each candidate retrieved, and choose reuse, reskin, variant, new design or retune. Published peers by CR and kind are in the vault-root `wiki/Creatures/`, which the `cr` and `creature_type` properties sort, and in `raw/bestiary-cr1-cr30.md`, read only at the matching blocks.

**Done when** the source record lists the retrieved candidates, their retrieval status, one path and why each earlier path does not fit. A reskin doesn't change any number.

### 4. Design the mechanics

Give the being one concrete primary role that shows on its first turn. Build its signature as **Tell → Threat → Answers → Payoff** in its own entries, with a wind-up or recharge the Party sees before the danger, at least two answers the entries themselves give (an escape DC or a save that ends the effect or a range or position that avoids it), and an opening or changed choice when it is answered. Give a solo or boss an escalation. Cut each feature with no tie to the concept and no player response.

A signature the caller gives without numbers takes them from two sources. Its save DC and attack bonus come from [references/fence.md](references/fence.md) § Derived numbers. Its damage, area, range and aura radius start from the comparable entry of the CR peer ([references/tuning.md](references/tuning.md) § CR and trade-offs), and step 5's round ledger keeps or adjusts them.

Write each feature as the entry that produces the effect. A class burst such as Action Surge becomes a `Multiattack` option or a limited-use action (Recharge or X/Day) that makes its attacks itself, since an action that grants another action spends the action it gives. Concentration limits a creature to one spell at a time (SRD 5.2.1, Concentration), so two Concentration effects take turns, or one becomes an entry without Concentration.

A World-free block uses the kind's plain name, with no proper noun, place, faction, deity or World event. It adds a feature beyond the core block (a lore trait, lair actions, regional effects) only when that feature fits any setting and belongs to the monster, and leaves it out when in doubt.

**Done when** the role shows on the first turn, the signature has its tell, two answers and payoff in its entries, each number the caller left open names its peer entry or formula, every burst action makes its own attacks, and one Concentration effect runs at a time.

### 5. Tune

A Campaign block follows [references/tuning.md](references/tuning.md) for the 2024 Low, Moderate or High budget for the actual Party (the caller's **Hard** is **High**), then three legal rounds. Write each round as one **round ledger** line of the entries it spends, at most one Action, one Bonus Action and one Reaction plus any legendary or limited-use entry: `R1: Multiattack + Spiritual Weapon`, then `R2: Barrage if its Recharge 5 or 6 returns (1 in 3), else Multiattack`. Compute every damage figure, survival round and time to drop from those lines. Each claim about what the Party can or cannot do cites the PC page it rests on.

A World-free block anchors `cr` to its retrieved peer per [references/tuning.md](references/tuning.md) § CR and trade-offs, without a Party model.

**Done when** the notes show the budget from each PC's recorded level, the round ledger, attack and save chances, survival, time to drop, the cited peer and separately labelled CR estimates, or for a World-free block the peer the `cr` rests on.

### 6. Write and verify the fence

Write the block per [references/fence.md](references/fence.md) § Write, steps 1 to 4.

**Done when** the block's check prints `ok: 0 findings`.

### 7. Place the block

- **On a page.** Put the fence under the page's `## Statblock`, which is the first `##` section on a Creature page and follows `## Roleplaying` on an NPC page, as each template places it. On a Creature page, fill `cr`, `creature_type`, `size`, `habitat` and `sourcebooks` from the block per the template's guidance comment.
- **World-free, no page yet.** File `wiki/Creatures/<slug>.md` from `wiki/templates/creature.md`: `title` the kind's plain name, `summary` one line on its role and CR, `sources` any archived Raw it came from or `[]`, the five sort keys, and the block under `## Statblock`. Delete the `revealed` line with its `# Campaign-bound.` comment and every optional section. A 5etools monster has this page structure ([ADR 0044](../../../docs/adr/0044-creatures-are-their-statblock.md)).
- **Chat only.** The reply contains the fence, verified in the scratch vault, and the run files no page.

A retune changes the block once on its page and lists every consumer in the reply. Played Session Prep, Scenes, Recaps, Previously On pages, Transcript-derived records and `hot.md` stay as they are. An Encounter shows a block as the embed `![[<page-slug>#Statblock|<page title>]]`, and every other page links the block's page.

**Done when** the block is on its page or in the reply, a Creature page's five sort keys match it, and the reply lists each consumer of a retuned block.

### 8. Close

Close per `skill://lint` § Commands over every page this run touched. When another skill invoked this one, that caller closes and logs. A standalone Campaign run logs `create` once the page gate prints `ok: 0 findings`. The vault root has no `log.md`, so a World-free run doesn't log.

Reply with the page path or the fence, the path chosen and its peers, the attribution for any published material, the tuning assumptions with the round ledger and the source of each number the caller left open, the consumers and the check result.

**Done when** the page gate prints `ok: 0 findings` and the reply contains each of those.
