---
type: Creature
summary: "Hinewai the Blight, a unique Creature stat block from the archived NPC record."
sources:
 - "archive/hinewai.md"
---

## At a glance

- **Role at the table.** Unique named Creature represented by the NPC.
- **Threat.** See the stat block (CR as listed in the archived record).
- **Tell.** Its signature movement or attack is visible before it commits.
- **Weak to.** The counter play described in Tactics.
- **Used by.** The NPC of the same name.

> [!narration] First sight
> The Creature's distinctive silhouette and signature tell are apparent before it attacks.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Hinewai, the Blight (Stage 1)"
size: Large
type: undead
subtype: ""
alignment: "neutral"
ac: 18
hp: 289
hit_dice: "34d10 + 102"
speed: "30 ft., climb 30 ft."
stats: [20, 14, 16, 17, 20, 15]
saves:
  - constitution: 9
  - wisdom: 11
skillsaves:
  - nature: 9
  - perception: 11
  - survival: 11
damage_resistances: "Cold, Necrotic, Poison"
condition_immunities: "Charmed, Exhaustion, Frightened, Paralyzed, Poisoned"
senses: "Darkvision 120 ft., Passive Perception 21"
languages: "Druidic, Elvish"
cr: "19"
traits:
  - name: "Rooted Phylactery"
    desc: "While the Death Bloom holds, Hinewai reforms at the Grove's tree 1d10 days after her body is destroyed. Destroying the Death Bloom first makes her next death permanent."
  - name: "Corrupted Ground"
    desc: "Hinewai moves through plants without spending extra movement, and Difficult Terrain within 1 mile of the Death Bloom costs her no extra movement."
  - name: "Turn Resistance"
    desc: "Hinewai has Advantage on saving throws against any effect that turns Undead."
spells:
  - "Spellcasting. Hinewai casts spells using Wisdom as her spellcasting ability (spell save DC 19, +11 to hit with spell attacks), requiring no Material components."
  - "At will: Druidcraft, Produce Flame, Thorn Whip"
  - "3/day each: Entangle, Moonbeam, Plant Growth, Spike Growth"
  - "2/day each: Insect Plague, Wall of Thorns"
  - "1/day each: Circle of Death, Foresight, Sunburst"
actions:
  - name: "Multiattack"
    desc: "Hinewai makes two Rotten Claw attacks."
  - name: "Rotten Claw"
    desc: "Melee Attack Roll: +11, reach 10 ft. Hit: 16 (2d10 + 5) Slashing damage plus 10 (3d6) Poison damage."
  - name: "Acid Bloom (Recharge 5–6)"
    desc: "Dexterity Saving Throw: DC 19, each creature in a 20-foot-radius Sphere centered on a point Hinewai can see within 60 feet. Failure: 36 (8d8) Acid damage. Success: Half damage."
legendary_actions:
  - name: ""
    desc: "Legendary Action Uses: 3. Immediately after another creature's turn, Hinewai can expend a use to take one of the following actions. She regains all expended uses at the start of each of her turns."
  - name: "Grasping Roots"
    desc: "Strength Saving Throw: DC 19, each creature in a 10-foot Cube Hinewai can see within 60 feet. Failure: The target has the Restrained condition until the end of its next turn."
  - name: "Rotten Claw (Costs 2 Uses)"
    desc: "Hinewai makes one Rotten Claw attack."
  - name: "Spore Burst (Costs 2 Uses)"
    desc: "Constitution Saving Throw: DC 19, one creature Hinewai can see within 30 feet. Failure: The target has the Poisoned condition until the end of its next turn."
  - name: "Feed the Bloom (Costs 3 Uses)"
    desc: "Hinewai regains 20 Hit Points, drawn from the Death Bloom."
```

## Play

### Tactics

Use the archived tactics and signature abilities. Telegraph the strongest option and let the Party answer with positioning, cover, or focused fire. It withdraws when its objective is lost or its advantage is gone.

### Outside a fight

Its appearance, habits, and traces identify it before an encounter. It acts according to the NPC's established role and habitat.

## Depth

### Ecology

This unique Creature's habitat, diet, and signs follow the archived NPC record. Observant travellers can identify its signs with Wisdom (Survival).

### Hidden truths

The archived NPC record contains the Creature's history and concealed motives. Examination or relevant questioning can reveal them.

## Links

```base
filters:
 and:
  - file.hasLink(this.file)
views:
 - type: table
  name: Linked from
  groupBy:
   property: note.type
   direction: ASC
  order:
   - file.name
   - note.summary
```
