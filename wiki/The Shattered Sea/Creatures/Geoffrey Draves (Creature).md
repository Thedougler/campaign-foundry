---
type: Creature
summary: "Geoffrey Draves, a unique Creature stat block from the archived NPC record."
sources:
 - "archive/geoffrey-draves.md"
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
name: "Geoffrey Draves"
size: Medium
type: humanoid
subtype: human
alignment: neutral
ac: 13
hp: 11
hit_dice: 2d8+2
speed: "30 ft."
stats: [11, 13, 12, 12, 10, 8]
skillsaves:
  - athletics: 2
  - perception: 2
senses: "passive Perception 12"
languages: "Common"
cr: 1/8
traits:
  - name: Sea Legs
    desc: "Difficult terrain caused by ship movement, waves, or wet deck does not cost Geoffrey extra movement."
  - name: Ship's Hand
    desc: "Geoffrey is proficient with navigator's tools and knows the Midchain shipping lanes, inspection procedures, and cargo manifests from his time on the HCS Surety. When assisting a creature making a check related to navigation, rigging, repairs, or maritime law, he grants advantage rather than the normal +2 from the Help action."
actions:
  - name: Cutlass
    desc: "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage."
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
