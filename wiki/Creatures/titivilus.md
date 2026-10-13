---
title: Titivilus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Titivilus
size: Medium
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 20
ac_class: natural armour
hp: 150
hit_dice: 20d8 + 60
modifier: 6
speed: 40 ft., fly 60 ft.
stats: [ 19, 22, 17, 24, 22, 26 ]
saves:
  - dex: 11
  - con: 8
  - wis: 11
  - cha: 13
skillsaves:
  - deception: 13
  - insight: 11
  - intimidation: 13
  - persuasion: 13
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: darkvision 120 ft., passive Perception 16
languages: all, telepathy 120 ft.
cr: "16"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Titivilus fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Titivilus has advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: Titivilus regains 10 hit points at the start of his turn. If he takes cold or radiant damage, this trait doesn't function at the start of his next turn. Titivilus dies only if he starts his turn with 0 hit points and doesn't regenerate.
  - name: Ventriloquism
    desc: Whenever Titivilus speaks, he can choose a point within 60 feet of him; his voice emanates from that point.
actions:
  - name: Multiattack
    desc: Titivilus makes one Silver Sword attack, and he uses Frightful Word.
  - name: Silver Sword
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) force damage, or 9 (1d10 + 4) force damage if used with two hands, plus 16 (3d10) necrotic damage. If the target is a creature, its hit point maximum is reduced by an amount equal to half the necrotic damage taken."
  - name: Frightful Word
    desc: Titivilus targets one creature he can see within 10 feet of him. The target must succeed on a DC 21 Wisdom saving throw or become frightened of him for 1 minute. While frightened in this way, the target must take the Dash action and move away from Titivilus by the safest available route on each of its turns, unless there is nowhere to move, in which case it needn't take the Dash action. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Teleport
    desc: Titivilus teleports, along with any equipment he is wearing or carrying, up to 120 feet to an unoccupied space he can see.
  - name: Twisting Words
    desc: Titivilus targets one creature he can see within 60 feet of him. The target must succeed on a DC 21 Charisma saving throw or become charmed by Titivilus for 1 minute. The charmed target can repeat the saving throw if Titivilus deals any damage to it. A creature that succeeds on the saving throw is immune to Titivilus's Twisting Words for 24 hours.
  - name: Spellcasting
    desc: |-
      Titivilus casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 21):

      **At will:** *alter self*, *major image*, *nondetection*, *sending*, *suggestion*

      **3/day each:** *mislead*, *modify memory*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Titivilus can expend a use to take one of the following actions. Titivilus regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Corrupting Guidance
    desc: Titivilus uses Twisting Words. Alternatively, he targets one creature charmed by him that is within 60 feet of him; that charmed target must succeed on a DC 21 Charisma saving throw, or Titivilus decides how the target acts during its next turn.
  - name: Teleport
    desc: Titivilus uses Teleport.
  - name: Assault (Costs 2 Actions)
    desc: Titivilus makes one Silver Sword attack, or he uses Frightful Word.
```
