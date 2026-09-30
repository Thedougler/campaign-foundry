---
type: Creature
summary: "Beaumont Sel, a unique Creature stat block from the archived NPC record."
sources:
 - "archive/beaumont-sel.md"
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
name: "Beaumont Sel"
size: Medium
type: humanoid
subtype: tortle
alignment: neutral good
ac: 19
hp: 52
hit_dice: "8d8 + 16"
speed: "15 ft."
stats: [18, 8, 14, 12, 14, 13]
saves:
  - strength: 6
  - constitution: 4
skillsaves:
  - athletics: 6
  - perception: 4
  - intimidation: 3
senses: "passive Perception 14"
languages: "Common, Aquan"
cr: 2
traits:
  - name: Salvaged Antheri Plate
    desc: "Ranged weapon attacks against Beaumont are made at disadvantage. The Antheri alloy's mirror-bright surface throws a hard glare at anyone trying to draw a bead on it."
  - name: Hold Breath
    desc: "Beaumont can hold his breath for 1 hour."
  - name: Old Bones
    desc: "Beaumont's speed is 15 ft. When he Dashes, he moves 20 ft. Total rather than doubling his speed."
actions:
  - name: Multiattack
    desc: "Beaumont makes one Uppercut and one Jab. He can replace either attack with a Throw."
  - name: Uppercut
    desc: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage."
  - name: Jab
    desc: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d4 + 4) bludgeoning damage."
  - name: Throw
    desc: "One creature within 5 ft. Makes a contested Strength (Athletics) check against Beaumont (+6). On a failure, the target takes 7 (1d6 + 4) bludgeoning damage, is moved up to 10 ft. In a direction Beaumont chooses, and falls prone."
  - name: The Kalowe Maneuver
    desc: "Beaumont tosses a potion of healing alongside Bisou to a creature within 30 ft. That is unconscious or at half hit points or fewer. Bisou lands, uncorks the potion, and empties it into the target's mouth , the target regains 2d4 + 2 hit points. Bisou returns to Beaumont's shoulder at the start of his next turn. Requires one available potion of healing. Bisou must not be incapacitated. Beaumont currently has three potions."
  - name: The Calveno Maneuver
    desc: "Beaumont hands Bisou an alchemical item. Bisou moves up to 60 ft., delivers it to a point of Beaumont's choosing, triggers it, and drops it there. The item activates at the start of Beaumont's next turn. Bisou then moves 15 ft. Away as a free reaction. Requires an available alchemical item. Bisou must not be incapacitated."
  - name: The Tidefall Maneuver
    desc: "Beaumont tosses Bisou toward a target creature within 30 ft. Bisou locates and soaks any exposed black powder on the target. The target must succeed on a DC 12 Dexterity saving throw or have all black powder weapons rendered inoperable until dried. Bisou returns to Beaumont's shoulder at the start of his next turn. Bisou must not be incapacitated."
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
