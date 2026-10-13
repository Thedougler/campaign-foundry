---
title: Ultroloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Fiend
size: Medium
habitat:
  - Planar (Lower)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ultroloth
size: Medium
type: fiend
subtype: yugoloth
alignment: Neutral Evil
ac: 19
hp: 221
hit_dice: 26d8 + 104
modifier: 8
speed: 30 ft., fly 60 ft. (hover)
stats: [ 19, 16, 18, 19, 15, 18 ]
skillsaves:
  - deception: 9
  - perception: 7
  - stealth: 8
damage_resistances: cold, fire, lightning
damage_immunities: acid, poison
condition_immunities: charmed, frightened, poisoned
senses: Truesight 120 ft., passive Perception 17
languages: Abyssal, Infernal; telepathy 120 ft.
cr: "13"
traits:
  - name: Fiendish Restoration
    desc: If the ultroloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in Gehenna.
  - name: Magic Resistance
    desc: The ultroloth has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The ultroloth uses Hypnotic Gaze and makes two Mercurial Whip attacks.
  - name: Mercurial Whip
    desc: "*Melee Attack Roll:* +9, reach 15 ft. *Hit:* 25 (6d6 + 4) Force damage, and the ultroloth can teleport the target up to 10 feet to an unoccupied space the ultroloth can see that isn't in the air."
  - name: Hypnotic Gaze
    desc: "*Wisdom Saving Throw:* DC 17, each creature in a 30-foot Cone. *Failure:* 10 (3d6) Psychic damage, and the target has the Stunned condition until the start of the ultroloth's next turn. *Success:* The target is immune to this ultroloth's Hypnotic Gaze for 24 hours."
  - name: Spellcasting
    desc: |-
      The ultroloth casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 17):

      **At will:** *Alter Self*, *Clairvoyance*, *Detect Magic*

      **1/day each:** *Dimension Door*, *Fireball* (level 5 version), *Wall of Fire*
bonus_actions:
  - name: Fiendish Guile (Recharge 4–6)
    desc: |
      The ultroloth casts *Dispel Magic*, *Invisibility* (self only), *Misty Step*, or *Suggestion*, requiring no Material components and using the same spellcasting ability as Spellcasting.
```
