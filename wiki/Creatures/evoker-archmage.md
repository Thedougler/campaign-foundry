---
title: Evoker Archmage
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Humanoid
size: Medium
habitat:
  - Any
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Evoker Archmage
size: Medium
type: humanoid
subtype: wizard
alignment: Neutral
ac: 16
hp: 214
hit_dice: 39d8 + 39
modifier: 8
speed: 30 ft., fly 30 ft.
stats: [ 10, 16, 12, 20, 15, 16 ]
skillsaves:
  - arcana: 15
  - history: 10
  - intimidation: 8
  - perception: 7
gear:
  - orb
senses: passive Perception 17
languages: Common plus five other languages
cr: "15"
traits:
  - name: Evocation Sculptor
    desc: When the archmage casts a spell that creates an area of effect, it can choose itself and up to five other creatures it can see, sculpting the spell's energy around them. A chosen creature automatically succeeds on its saving throw against the spell, and it takes no damage if it would normally take half damage on a successful save.
  - name: Magic Resistance
    desc: The archmage has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The archmage makes four Arcane Burst attacks. It can replace one attack with a use of Spellcasting to cast *Shatter*.
  - name: Arcane Burst
    desc: "*Melee or Ranged Attack Roll:* +10, reach 5 ft. or range 150 ft. *Hit:* 27 (4d10 + 5) Force damage."
  - name: Spellcasting
    desc: |-
      The archmage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *Detect Magic*, *Mage Armour* (included in AC), *Mage Hand*, *Prestidigitation*, *Shatter* (level 3 version)
  - name: Evocation Barrage (Recharge 5–6)
    desc: |
      The archmage casts *Fireball*, *Ice Storm*, or *Lightning Bolt* twice in any combination, using the same spellcasting ability as Spellcasting.
reactions:
  - name: Protective Magic (3/Day)
    desc: |
      The archmage casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
```
