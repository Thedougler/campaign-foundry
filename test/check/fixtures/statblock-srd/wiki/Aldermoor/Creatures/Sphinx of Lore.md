---
type: Creature
summary: "Sphinx of Lore, from the SRD 5.2 monsters."
sources: []
revealed: ""
title: "Sphinx of Lore"
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
name: Sphinx of Lore
size: Large
type: celestial
subtype: ""
alignment: lawful neutral
ac: 17
ac_class: ""
hp: 170
hit_dice: 20d10 + 60
speed: 40 ft., fly 60 ft.
stats:
  - 18
  - 15
  - 16
  - 18
  - 18
  - 18
saves: []
skillsaves:
  - arcana: 12
  - history: 12
  - perception: 8
  - religion: 12
damage_vulnerabilities: ""
damage_resistances: necrotic, radiant
damage_immunities: psychic
condition_immunities: Charmed, Frightened
senses: truesight 120 ft., passive Perception 18
languages: Celestial, Common
cr: 11
traits:
  - name: Inscrutable
    desc: No magic can observe the sphinx remotely or detect its thoughts without its permission. Wisdom (Insight) checks made to ascertain its intentions or sincerity are made with Disadvantage.
  - name: Legendary Resistance
    desc: If the sphinx fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The sphinx makes three Claw attacks.
  - name: Claw
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 14 (3d6 + 4) Slashing damage."
  - name: Mind-Rending Roar
    desc: "*Wisdom Saving Throw:* DC 16, each enemy in a 300-foot Emanation originating from the sphinx. *Failure:* 35 (10d6) Psychic damage, and the target has the Incapacitated condition until the start of the sphinx’s next turn."
  - name: Spellcasting
    desc: "The sphinx casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 16):"
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions:
  - name: Arcane Prowl
    desc: The sphinx can teleport up to 30 feet to an unoccupied space it can see, and it makes one Claw attack.
  - name: Weight of Years
    desc: "*Constitution Saving Throw:* DC 16, one creature the sphinx can see within 120 feet. *Failure:* The target gains 1 Exhaustion level. While the target has any Exhaustion levels, it appears 3d10 years older. *Failure or Success:* The sphinx can’t take this action again until the start of its next turn."
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
