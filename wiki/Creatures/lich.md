---
title: Lich
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Undead
size: Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lich
size: Medium
type: undead
subtype: wizard
alignment: Neutral Evil
ac: 20
hp: 315
hit_dice: 42d8 + 126
modifier: 17
speed: 30 ft.
stats: [ 11, 16, 16, 21, 14, 16 ]
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
damage_resistances: cold, lightning
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
gear:
  - component pouch
senses: Truesight 120 ft., passive Perception 19
languages: all
cr: "21"
traits:
  - name: Legendary Resistance (4/Day, or 5/Day in Lair)
    desc: If the lich fails a saving throw, it can choose to succeed instead.
  - name: Spirit Jar
    desc: If destroyed, the lich reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the lich's lair.
actions:
  - name: Multiattack
    desc: The lich makes three attacks, using Eldritch Burst or Paralysing Touch in any combination.
  - name: Eldritch Burst
    desc: "*Melee or Ranged Attack Roll:* +12, reach 5 ft. or range 120 ft. *Hit:* 31 (4d12 + 5) Force damage."
  - name: Paralysing Touch
    desc: "*Melee Attack Roll:* +12, reach 5 ft. *Hit:* 15 (3d6 + 5) Cold damage, and the target has the Paralysed condition until the start of the lich's next turn."
  - name: Spellcasting
    desc: |-
      The lich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Dispel Magic*, *Fireball* (level 5 version), *Invisibility*, *Lightning Bolt* (level 5 version), *Mage Hand*, *Prestidigitation*

      **2/day each:** *Animate Dead*, *Dimension Door*, *Plane Shift*

      **1/day each:** *Chain Lightning*, *Finger of Death*, *Power Word Kill*, *Scrying*
reactions:
  - name: Protective Magic
    desc: |
      The lich casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the lich can expend a use to take one of the following actions. The lich regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Deathly Teleport
    desc: The lich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.
  - name: Disrupt Life
    desc: "*Constitution Saving Throw:* DC 20, each creature that isn't an Undead in a 20-foot Emanation originating from the lich. *Failure:* 31 (9d6) Necrotic damage. *Success:* Half damage. *Failure or Success:* The lich can't take this action again until the start of its next turn."
  - name: Frightening Gaze
    desc: |
      The lich casts *Fear*, using the same spellcasting ability as Spellcasting. The lich can't take this action again until the start of its next turn.
```
