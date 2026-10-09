---
type: Creature
summary: "Wraith, from the SRD 5.2 monsters."
sources: []
revealed: ""
title: "Wraith"
---

## At a glance

- **Role at the table.** Text.
- **Threat.** Text.
- **Tell.** Text.
- **Weak to.** Text.
- **Used by.** Text.

> [!narration] First sight
> Spoken text for the table.

## Statblock

```statblock
layout: Basic 5e Layout
name: Wraith
size: Medium Or Small
type: undead
subtype: ""
alignment: neutral evil
ac: 13
ac_class: ""
hp: 67
hit_dice: 9d8 + 27
speed: 5 ft., fly 60 ft., hover true
stats:
  - 6
  - 16
  - 16
  - 12
  - 14
  - 15
saves: []
skillsaves: []
damage_vulnerabilities: ""
damage_resistances: acid, bludgeoning, cold, fire, piercing, slashing
damage_immunities: necrotic, poison
condition_immunities: Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious
senses: darkvision 60 ft., passive Perception 12
languages: Common plus two other languages
cr: 5
traits:
  - name: Incorporeal Movement
    desc: The wraith can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the wraith has Disadvantage on ability checks and attack rolls.
actions:
  - name: Life Drain
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 21 (4d8 + 3) Necrotic damage. If the target is a creature, its Hit Point maximum decreases by an amount equal to the damage taken."
  - name: Create Specter
    desc: The wraith targets a Humanoid corpse within 10 feet of itself that has been dead for no longer than 1 minute. The target’s spirit rises as a Specter in the space of its corpse or in the nearest unoccupied space. The specter is under the wraith’s control. The wraith can have no more than seven specters under its control at a time.
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

Text.

## Depth

Text.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    order:
      - file.name
```
