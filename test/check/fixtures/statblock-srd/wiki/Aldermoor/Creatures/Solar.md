---
type: Creature
summary: "Solar, from the SRD 5.2 monsters."
sources: []
revealed: ""
title: "Solar"
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
name: Solar
size: Large
type: celestial
subtype: ""
alignment: lawful good
ac: 21
ac_class: ""
hp: 297
hit_dice: 22d10 + 176
speed: 50 ft., fly 150 ft., hover true
stats:
  - 26
  - 22
  - 26
  - 25
  - 25
  - 30
saves: []
skillsaves:
  - perception: 14
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: poison, radiant
condition_immunities: Charmed, Exhaustion, Frightened, Poisoned
senses: truesight 120 ft., passive Perception 24
languages: All; telepathy 120 ft.
cr: 21
traits:
  - name: Divine Awareness
    desc: The solar knows if it hears a lie.
  - name: Exalted Restoration
    desc: If the solar dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its Hit Points somewhere in Mount Celestia.
  - name: Legendary Resistance
    desc: If the solar fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The solar has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The solar makes two Flying Sword attacks. It can replace one attack with a use of Slaying Bow.
  - name: Flying Sword
    desc: "*Melee or Ranged Attack Roll:* +15, reach 10 ft. or range 120 ft. *Hit:* 22 (4d6 + 8) Slashing damage plus 36 (8d8) Radiant damage. *Hit or Miss:* The sword magically returns to the solar’s hand or hovers within 5 feet of the solar immediately after a ranged attack."
  - name: Slaying Bow
    desc: "*Dexterity Saving Throw:* DC 21, one creature the solar can see within 600 feet. *Failure:* If the creature has 100 Hit Points or fewer, it dies. It otherwise takes 24 (4d8 + 6) Piercing damage plus 36 (8d8) Radiant damage."
  - name: Spellcasting
    desc: "The solar casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 25):"
bonus_actions:
  - name: Divine Aid
    desc: The solar casts Cure Wounds (level 2 version), Lesser Restoration, or Remove Curse, using the same spellcasting ability as Spellcasting.
reactions: []
legendary_description: ""
legendary_actions:
  - name: Blinding Gaze
    desc: "*Constitution Saving Throw:* DC 25, one creature the solar can see within 120 feet. *Failure:* The target has the Blinded condition for 1 minute. *Failure or Success:* The solar can’t take this action again until the start of its next turn."
  - name: Radiant Teleport
    desc: "The solar teleports up to 60 feet to an unoccupied space it can see. Dexterity Saving Throw: DC 25, each creature in a 10-foot Emanation originating from the solar at its destination space. *Failure:* 11 (2d10) Radiant damage. *Success:* Half damage."
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
