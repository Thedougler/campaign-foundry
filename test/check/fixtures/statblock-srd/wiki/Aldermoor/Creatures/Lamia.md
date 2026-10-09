---
type: Creature
summary: "Lamia, from the SRD 5.2 monsters."
sources: []
revealed: ""
title: "Lamia"
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
name: Lamia
size: Large
type: fiend
subtype: ""
alignment: chaotic evil
ac: 13
ac_class: ""
hp: 97
hit_dice: 13d10 + 26
speed: 40 ft.
stats:
  - 16
  - 13
  - 15
  - 14
  - 15
  - 16
saves: []
skillsaves:
  - deception: 7
  - insight: 4
  - stealth: 5
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: darkvision 60 ft., passive Perception 12
languages: Abyssal, Common
cr: 4
traits: []
actions:
  - name: Multiattack
    desc: The lamia makes two Claw attacks. It can replace one attack with a use of Corrupting Touch.
  - name: Claw
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Slashing damage plus 7 (2d6) Psychic damage."
  - name: Corrupting Touch
    desc: "*Wisdom Saving Throw:* DC 13, one creature the lamia can see within 5 feet. *Failure:* 13 (3d8) Psychic damage, and the target is cursed for 1 hour. Until the curse ends, the target has the Charmed and Poisoned conditions."
  - name: Spellcasting
    desc: "The lamia casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 13):"
bonus_actions:
  - name: Leap
    desc: The lamia jumps up to 30 feet by spending 10 feet of movement.
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
