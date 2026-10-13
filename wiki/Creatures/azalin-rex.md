---
title: Azalin Rex
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Azalin Rex
size: Medium
type: undead
subtype: wizard
alignment: Neutral Evil
ac: 20
hp: 390
hit_dice: 52d8 + 156
modifier: 17
speed: 30 ft.
stats: [ 11, 16, 16, 21, 17, 16 ]
saves:
  - dex: 10
  - con: 10
  - int: 12
  - wis: 10
skillsaves:
  - arcana: 19
  - history: 12
  - insight: 10
  - perception: 10
damage_resistances: cold, lightning
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: Truesight 120 ft., passive Perception 20
languages: all
cr: "23"
traits:
  - name: Darklord Restoration
    desc: If Azalin dies and his spirit jar remains intact, he revives with all his Hit Points in 2d10 days in the unoccupied space nearest his spirit jar. If Azalin's spirit jar is destroyed, he instead revives in 4d10 days in Castle Avernus in Darkon.
  - name: Legendary Resistance (4/Day, or 5/Day in Domain)
    desc: If Azalin fails a saving throw, he can choose to succeed instead.
actions:
  - name: Multiattack
    desc: Azalin makes three attacks, using Eldritch Burst or Paralysing Touch in any combination.
  - name: Eldritch Burst
    desc: "*Melee or Ranged Attack Roll:* +12, reach 5 ft. or range 120 ft. *Hit:* 31 (4d12 + 5) Force damage."
  - name: Paralysing Touch
    desc: "*Melee Attack Roll:* +12, reach 5 ft. *Hit:* 15 (3d6 + 5) Cold damage, and the target has the Paralysed condition until the start of Azalin's next turn."
  - name: Spellcasting
    desc: |-
      Azalin casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 20):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Dispel Magic*, *Invisibility*, *Lightning Bolt* (level 5 version), *Mage Hand*, *Prestidigitation*

      **2/day each:** *Animate Dead*, *Dimension Door*, *Modify Memory*, *Plane Shift*, *Scrying*

      **1/day each:** *Chain Lightning*, *Finger of Death*, *Power Word Kill*
reactions:
  - name: Siphon Spell
    desc: |
      Azalin casts *Counterspell* in response to the spell's trigger, using the same spellcasting ability as Spellcasting. If the target creature fails its saving throw against this *Counterspell*, Azalin steals knowledge of the triggering spell. For 1 hour or until Azalin takes this Reaction again, Azalin can cast that spell once, using the same spellcasting ability as Spellcasting.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Azalin can expend a use to take one of the following actions. Azalin regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Eldritch Teleport
    desc: Azalin teleports up to 60 feet to an unoccupied space he can see and makes one Eldritch Burst or Paralysing Touch attack.
  - name: Forbidden Knowledge
    desc: "*Intelligence Saving Throw:* DC 20, up to three creatures Azalin can see within 60 feet. *Failure:* 28 (8d6) Psychic damage, and the target has the Stunned condition until the end of Azalin's next turn. *Success:* Half damage only. *Failure or Success:* Azalin can't take this action again until the start of his next turn."
```
