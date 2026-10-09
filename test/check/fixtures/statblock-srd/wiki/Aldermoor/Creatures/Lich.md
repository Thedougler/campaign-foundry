---
type: Creature
summary: "Lich, from the SRD 5.2 monsters."
sources: []
revealed: ""
title: "Lich"
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
name: Lich
size: Medium
type: undead
subtype: ""
alignment: neutral evil
ac: 20
ac_class: ""
hp: 315
hit_dice: 42d8 + 126
speed: 30 ft.
stats:
  - 11
  - 16
  - 16
  - 21
  - 14
  - 16
saves:
  - dex: 10
  - con: 10
  - int: 12
  - wis: 9
skillsaves:
  - arcana: 19
  - history: 12
  - insight: 9
  - perception: 9
damage_vulnerabilities: ""
damage_resistances: cold, lightning
damage_immunities: necrotic, poison
condition_immunities: Charmed, Exhaustion, Frightened, Paralyzed, Poisoned
senses: truesight 120 ft., passive Perception 19
languages: All
cr: 21
traits:
  - name: Legendary Resistance
    desc: If the lich fails a saving throw, it can choose to succeed instead.
  - name: Spirit Jar
    desc: If destroyed, the lich reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the lich’s lair.
actions:
  - name: Multiattack
    desc: The lich makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination.
  - name: Eldritch Burst
    desc: "*Melee or Ranged Attack Roll:* +12, reach 5 ft. or range 120 ft. *Hit:* 31 (4d12 + 5) Force damage."
  - name: Paralyzing Touch
    desc: "*Melee Attack Roll:* +12, reach 5 ft. *Hit:* 15 (3d6 + 5) Cold damage, and the target has the Paralyzed condition until the start of the lich’s next turn."
  - name: Spellcasting
    desc: "The lich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20):"
bonus_actions: []
reactions:
  - name: Protective Magic
    desc: The lich casts Counterspell or Shield in response to the spell’s trigger, using the same spellcasting ability as Spellcasting.
legendary_description: ""
legendary_actions:
  - name: Deathly Teleport
    desc: The lich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.
  - name: Disrupt Life
    desc: "*Constitution Saving Throw:* DC 20, each creature that isn’t an Undead in a 20-foot Emanation originating from the lich. *Failure:* 31 (9d6) Necrotic damage. *Success:* Half damage. *Failure or Success:* The lich can’t take this action again until the start of its next turn."
  - name: Frightening Gaze
    desc: The lich casts Fear, using the same spellcasting ability as Spellcasting. The lich can’t take this action again until the start of its next turn.
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
