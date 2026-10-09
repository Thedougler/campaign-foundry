---
type: Creature
summary: "A veteran raider who leads from the front."
sources: []
revealed: ""
title: "Bandit Captain"
---

## At a glance

- **Role at the table.** Text.
- **Threat.** Text.
- **Tell.** Text.
- **Weak to.** Text.
- **Used by.** [[Mara Voss]]

> [!narration] First sight
> Iron rings click on his sword hand.

## Statblock

```statblock
layout: Basic 5e Layout
name: Bandit Captain
size: Medium Or Small
type: humanoid
subtype: ""
alignment: neutral
ac: 15
ac_class: studded leather armor
hp: 52
hit_dice: 8d8 + 16
speed: 30 ft.
stats:
  - 15
  - 16
  - 14
  - 14
  - 11
  - 14
saves:
  - str: 4
  - dex: 5
  - wis: 2
skillsaves:
  - athletics: 4
  - deception: 4
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: passive Perception 10
languages: Common, Thieves’ Cant
cr: 2
traits: []
actions:
  - name: Multiattack
    desc: The bandit makes two attacks, using Scimitar and Pistol in any combination.
  - name: Scimitar
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Slashing damage."
  - name: Pistol
    desc: "*Ranged Attack Roll:* +5, range 30/90 ft. *Hit:* 8 (1d10 + 3) Piercing damage."
bonus_actions: []
reactions:
  - name: Parry
    desc: "Trigger: The bandit is hit by a melee attack roll while holding a weapon. Response: The bandit adds 2 to its AC against that attack, possibly causing it to miss."
legendary_description: ""
legendary_actions: []
```

## Play

Text.

### Tactics

Text.

### Outside a fight

Text.

## Depth

Text.

### Ecology

Text.

### Hidden truths

Text.

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
