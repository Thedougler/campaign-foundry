---
type: Creature
summary: "Vampire Spawn, from the SRD 5.2 monsters."
sources: []
revealed: ""
title: ""
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
name: Vampire Spawn
size: Medium Or Small
type: undead
subtype: ""
alignment: neutral evil
ac: 16
ac_class: ""
hp: 90
hit_dice: 12d8 + 36
speed: 30 ft.
stats:
  - 16
  - 16
  - 16
  - 11
  - 10
  - 12
saves:
  - dex: 6
  - wis: 3
skillsaves:
  - perception: 3
  - stealth: 6
damage_vulnerabilities: ""
damage_resistances: necrotic
damage_immunities: ""
condition_immunities: ""
senses: darkvision 60 ft., passive Perception 13
languages: Common plus one other language
cr: 5
traits:
  - name: Spider Climb
    desc: The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - name: Vampire Weakness
    desc: "The vampire has these weaknesses:"
  - name: Forbiddance
    desc: The vampire can’t enter a residence without an invitation from an occupant.
  - name: Running Water
    desc: The vampire takes 20 Acid damage if it ends its turn in running water.
  - name: Stake to the Heart
    desc: The vampire is destroyed if a weapon that deals Piercing damage is driven into the vampire’s heart while the vampire has the Incapacitated condition.
  - name: Sunlight
    desc: The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.
actions:
  - name: Multiattack
    desc: The vampire makes two Claw attacks and uses Bite.
  - name: Claw
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 8 (2d4 + 3) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13) from one of two claws."
  - name: Bite
    desc: "*Constitution Saving Throw:* DC 14, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. *Failure:* 5 (1d4 + 3) Piercing damage plus 10 (3d6) Necrotic damage. The target’s Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains Hit Points equal to that amount."
bonus_actions:
  - name: Deathless Agility
    desc: The vampire takes the Dash or Disengage action.
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
