---
title: Ankhtepot
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ankhtepot
size: Medium
type: undead
alignment: Lawful Evil
ac: 17
hp: 202
hit_dice: 27d8 + 81
modifier: 6
speed: 30 ft., fly 30 ft. (hover)
stats: [ 18, 10, 17, 15, 20, 16 ]
saves:
  - int: 8
  - wis: 11
skillsaves:
  - history: 8
  - perception: 11
  - religion: 8
damage_vulnerabilities: fire
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: Truesight 60 ft., passive Perception 21
languages: Celestial, Common, Draconic
cr: "17"
traits:
  - name: Darklord Restoration
    desc: If Ankhtepot dies, he revives with all his Hit Points in 1d10 weeks somewhere in Har'Akir.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Ankhtepot fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Ankhtepot has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Ankhtepot makes four Negative Energy Burst attacks. He can replace one attack with a use of Spellcasting to cast *Power Word Stun*.
  - name: Negative Energy Burst
    desc: "*Melee or Ranged Attack Roll:* +11, reach 5 ft. or range 60 ft. *Hit:* 26 (6d6 + 5) Necrotic damage."
  - name: Touch of Death (Recharge 6)
    desc: Ankhtepot touches one creature within 5 feet. If the creature has 80 Hit Points or fewer, it dies. Otherwise, it takes 52 (8d12) Necrotic damage.
  - name: Spellcasting
    desc: |-
      Ankhtepot casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 19):

      **At will:** *Dispel Magic*, *Divination*, *Mage Hand* (hand is Invisible), *Power Word Stun*

      **1/day each:** *Animate Dead*, *Sunburst*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Ankhtepot can expend a use to take one of the following actions. Ankhtepot regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Death Strike
    desc: Ankhtepot makes one Negative Energy Burst attack.
  - name: Hand of Fate
    desc: "*Strength Saving Throw:* DC 19, one Large or smaller creature Ankhtepot can see within 60 feet. *Failure:* 14 (2d8 + 5) Force damage, and the target is pushed or pulled up to 20 feet straight away or toward Ankhtepot. *Success:* Half damage only. *Failure or Success:* Ankhtepot can't take this action again until the start of his next turn."
  - name: Sands of Time
    desc: Ankhtepot teleports up to 60 feet to an unoccupied space he can see. *Charisma Saving Throw:* DC 19, each creature in a 10-foot Emanation originating from Ankhtepot at his destination space. *Failure:* 11 (2d10) Necrotic damage, and the target magically ages 10 years. *Success:* Half damage only. *Failure or Success:* Ankhtepot can't take this action again until the start of his next turn.
```
