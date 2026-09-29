---
type: Creature
summary: "Seeded stat block: Bad Escape Dc."
sources: []
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
name: Goblin Warrior
size: Small
type: fey
subtype: ""
alignment: chaotic neutral
ac: 15
ac_class: leather armor, shield
hp: 10
hit_dice: 3d6
speed: 30 ft.
stats: [8, 15, 10, 10, 8, 8]
saves: []
skillsaves:
  - stealth: 6
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: darkvision 60 ft., passive Perception 9
languages: Common, Goblin
cr: 1/4
traits: []
actions:
  - name: Scimitar
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Slashing damage."
bonus_actions:
  - name: Nimble Escape
    desc: The target has the Grappled condition (escape DC 13).
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
