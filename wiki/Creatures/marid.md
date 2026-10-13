---
title: Marid
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Elemental
size: Large
habitat:
  - Coastal
  - Planar (Water)
  - Underwater
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Marid
size: Large
type: elemental
subtype: genie
alignment: Chaotic Neutral
ac: 17
hp: 229
hit_dice: 17d10 + 136
modifier: 5
speed: 30 ft., fly 60 ft., swim 90 ft.
stats: [ 22, 12, 26, 18, 17, 18 ]
saves:
  - dex: 5
  - cha: 8
damage_resistances: acid, cold, lightning
senses: Blindsight 30 ft., Darkvision 120 ft., passive Perception 13
languages: Primordial (Aquan)
cr: "11"
traits:
  - name: Amphibious
    desc: The marid can breathe air and water.
  - name: Elemental Restoration
    desc: If the marid dies outside the Elemental Plane of Water, its body dissolves into brine, and it gains a new body in 1d4 days, reviving with all its Hit Points somewhere on the Plane of Water.
  - name: Wishes
    desc: The marid has a 30 percent chance of knowing the *Wish* spell. If the marid knows it, the marid can cast it only on behalf of a non-genie creature who communicates a wish in a way the marid can understand. If the marid casts the spell for the creature, the marid suffers none of the spell's stress. Once the marid has cast it three times, the marid can't do so again for 365 days.
actions:
  - name: Multiattack
    desc: The marid makes three Aquatic Lash attacks.
  - name: Aquatic Lash
    desc: "*Melee Attack Roll:* +10, reach 15 ft. *Hit:* 15 (2d8 + 6) Slashing damage plus 9 (2d8) Cold damage."
  - name: Water Jet
    desc: "*Dexterity Saving Throw:* DC 18, each creature in a 60-foot-long, 10-foot-wide Line. *Failure:* 31 (9d6) Cold damage. If the target is a Huge or smaller creature, it is pushed up to 20 feet straight away from the marid and has the Prone condition. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The marid casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *Create or Destroy Water*, *Detect Evil and Good*, *Detect Magic*, *Purify Food and Drink*

      **1/day each:** *Control Water*, *Gaseous Form*, *Invisibility*, *Plane Shift*, *Tongues*
bonus_actions:
  - name: Misty Veil (Recharge 5–6)
    desc: |
      The marid casts *Fog Cloud*, using the same spellcasting ability as Spellcasting.
```
