---
title: Rakshasa
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Fiend
size: Medium
habitat:
  - Planar (Nine Hells)
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Rakshasa
size: Medium
type: fiend
alignment: Lawful Evil
ac: 17
hp: 221
hit_dice: 26d8 + 104
modifier: 8
speed: 40 ft.
stats: [ 14, 17, 18, 13, 16, 20 ]
skillsaves:
  - deception: 10
  - insight: 8
  - perception: 8
damage_vulnerabilities: piercing damage from weapons wielded by creatures under the effect of a *Bless* spell
condition_immunities: charmed, frightened
senses: Truesight 60 ft., passive Perception 18
languages: Common, Infernal
cr: "13"
traits:
  - name: Greater Magic Resistance
    desc: The rakshasa automatically succeeds on saving throws against spells and other magical effects, and the attack rolls of spells automatically miss it. Without the rakshasa's permission, no spell can observe the rakshasa remotely or detect its thoughts, creature type, or alignment.
  - name: Fiendish Restoration
    desc: If the rakshasa dies outside the Nine Hells, its body turns to ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
actions:
  - name: Multiattack
    desc: The rakshasa makes three Cursed Touch attacks.
  - name: Cursed Touch
    desc: "*Melee Attack Roll:* +10, reach 5 ft. *Hit:* 12 (2d6 + 5) Slashing damage plus 19 (3d12) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target gains no benefit from finishing a Short or Long Rest."
  - name: Baleful Command (Recharge 5–6)
    desc: "*Wisdom Saving Throw:* DC 18, each enemy in a 30-foot Emanation originating from the rakshasa. *Failure:* 28 (8d6) Psychic damage, and the target has the Frightened and Incapacitated conditions until the start of the rakshasa's next turn."
  - name: Spellcasting
    desc: |-
      The rakshasa casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Disguise Self*, *Mage Hand*, *Minor Illusion*

      **1/day each:** *Fly*, *Invisibility*, *Major Image*, *Plane Shift*
```
