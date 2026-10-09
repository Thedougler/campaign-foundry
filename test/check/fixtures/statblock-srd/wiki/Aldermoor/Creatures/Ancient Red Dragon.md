---
type: Creature
summary: "Ancient Red Dragon, from the SRD 5.2 monsters."
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
name: Ancient Red Dragon
size: Gargantuan
type: dragon
subtype: ""
alignment: chaotic evil
ac: 22
ac_class: ""
hp: 507
hit_dice: 26d20 + 234
speed: 40 ft., climb 40 ft., fly 80 ft.
stats:
  - 30
  - 10
  - 29
  - 18
  - 15
  - 27
saves:
  - dex: 7
  - wis: 9
skillsaves:
  - perception: 16
  - stealth: 7
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: fire
condition_immunities: ""
senses: darkvision 120 ft., blindsight 60 ft., passive Perception 26
languages: Common, Draconic
cr: 24
traits:
  - name: Legendary Resistance
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray (level 3 version).
  - name: Rend
    desc: "*Melee Attack Roll:* +17, reach 15 ft. *Hit:* 19 (2d8 + 10) Slashing damage plus 10 (3d6) Fire damage."
  - name: Fire Breath
    desc: "*Dexterity Saving Throw:* DC 24, each creature in a 90-foot Cone. *Failure:* 91 (26d6) Fire damage. *Success:* Half damage."
  - name: Spellcasting
    desc: "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 23, +15 to hit with spell attacks):"
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions:
  - name: Commanding Presence
    desc: The dragon uses Spellcasting to cast Command (level 2 version). The dragon can’t take this action again until the start of its next turn.
  - name: Fiery Rays
    desc: The dragon uses Spellcasting to cast Scorching Ray (level 3 version). The dragon can’t take this action again until the start of its next turn.
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
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
