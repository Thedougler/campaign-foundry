---
title: Baelnorn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Undead
size: Medium
habitat:
  - Forest
  - Urban
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Baelnorn
size: Medium
type: undead
subtype: wizard
alignment: Neutral Good
ac: 18
hp: 255
hit_dice: 34d8 + 102
modifier: 15
speed: 30 ft.
stats: [ 11, 16, 16, 21, 14, 16 ]
skillsaves:
  - arcana: 17
  - history: 11
  - insight: 8
  - perception: 8
damage_resistances: lightning, radiant
damage_immunities: necrotic, poison
condition_immunities: charmed, frightened, paralysed, poisoned
senses: passive Perception 18
languages: all
cr: "18"
traits:
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the baelnorn fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The baelnorn has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The baelnorn makes three attacks, using Arcane Burst or Paralysing Touch in any combination. It can replace two attacks with a use of Spellcasting to cast *Lightning Bolt* (level 4 version).
  - name: Arcane Burst
    desc: "*Melee or Ranged Attack Roll:* +11, reach 5 ft. or range 120 ft. *Hit:* 31 (4d12 + 5) Force damage."
  - name: Paralysing Touch
    desc: "*Melee Attack Roll:* +11, reach 5 ft. *Hit:* 10 (2d4 + 5) Cold damage, and the target has the Paralysed condition until the start of the baelnorn's next turn."
  - name: Spellcasting
    desc: |-
      The baelnorn casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Dispel Magic*, *Invisibility*, *Lightning Bolt* (level 4 version), *Mage Hand*, *Prestidigitation*

      **2/day each:** *Dimension Door*, *Scrying*

      **1/day each:** *Clone*, *Guards and Wards*
reactions:
  - name: Counterspell
    desc: |
      The baelnorn casts *Counterspell* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the baelnorn can expend a use to take one of the following actions. The baelnorn regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Overwhelming Radiance
    desc: "*Constitution Saving Throw:* DC 19, each creature in a 20-foot Emanation originating from the baelnorn; Undead have Disadvantage on this save. *Failure:* 11 (2d10) Radiant damage. *Success:* Half damage."
  - name: Recuperative Teleport
    desc: The baelnorn teleports up to 60 feet to an unoccupied space it can see and regains 11 (2d10) Hit Points. The baelnorn can't take this action again until the start of its next turn.
  - name: Frightening Glance
    desc: |
      The baelnorn casts *Fear*, using the same spellcasting ability as Spellcasting. The baelnorn can't take this action again until the start of its next turn.
```
