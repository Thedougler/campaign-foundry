---
title: Madam Eva
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Madam Eva
size: Medium
type: humanoid
subtype: human
alignment: Chaotic Neutral
ac: 15
hp: 117
hit_dice: 18d8 + 36
modifier: 4
speed: 30 ft.
stats: [ 8, 11, 14, 17, 20, 18 ]
saves:
  - wis: 9
  - cha: 8
skillsaves:
  - arcana: 7
  - insight: 9
  - perception: 9
  - religion: 7
senses: passive Perception 19
languages: Abyssal, Common, Elvish, Infernal
cr: "10"
traits:
  - name: Magic Resistance
    desc: Madam Eva has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Madam Eva makes three attacks, using Cursed Dagger or Radiant Flame in any combination.
  - name: Cursed Dagger
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 10 (2d4 + 5) Piercing damage plus 21 (6d6) Necrotic damage."
  - name: Radiant Flame
    desc: "*Ranged Attack Roll:* +9, range 60 ft. *Hit:* 21 (3d10 + 5) Radiant damage, and the target has the Blinded condition until the start of Madam Eva's next turn."
  - name: Apocalyptic Visions (Recharge 5–6)
    desc: "*Wisdom Saving Throw:* DC 17, each creature in a 20-foot-radius Sphere centred on a point Madam Eva can see within 120 feet. *Failure:* 24 (7d6) Necrotic damage plus 24 (7d6) Psychic damage, and the target has the Frightened condition until the start of Madam Eva's next turn. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      Madam Eva casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 17):

      **At will:** *Light*, *Mending*, *Thaumaturgy*

      **2/day each:** *Dispel Magic*, *Remove Curse*

      **1/day each:** *Greater Restoration*, *Raise Dead*, *Scrying*, *Spirit Guardians* (level 8 version)
bonus_actions:
  - name: Evil Eye (2/Day)
    desc: |
      Madam Eva casts *Hold Person*, using the same spellcasting ability as Spellcasting.
```
