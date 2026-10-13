---
title: Zariel
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 26
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Zariel
size: Large
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 21
ac_class: natural armour
hp: 420
hit_dice: 29d10 + 261
modifier: 7
speed: 50 ft., fly 150 ft.
stats: [ 27, 24, 28, 26, 27, 30 ]
saves:
  - int: 16
  - wis: 16
  - cha: 18
skillsaves:
  - intimidation: 18
  - perception: 16
damage_resistances: cold; fire; radiant; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, frightened, poisoned
gear:
  - flail
  - longsword
senses: darkvision 120 ft., passive Perception 26
languages: all, telepathy 120 ft.
cr: "26"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede Zariel's darkvision.
  - name: Legendary Resistance (3/Day)
    desc: If Zariel fails a saving throw, she can choose to succeed instead.
  - name: Magic Resistance
    desc: Zariel has advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: Zariel regains 20 hit points at the start of her turn. If she takes radiant damage, this trait doesn't function at the start of her next turn. Zariel dies only if she starts her turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: Zariel makes three Flail or Longsword attacks. She can replace one attack with a use of Horrid Touch, if available.
  - name: Flail
    desc: "*Melee Weapon Attack:* +16 to hit, reach 10 ft., one target. *Hit:* 17 (2d8 + 8) force damage plus 36 (8d8) fire damage."
  - name: Longsword
    desc: "*Melee Weapon Attack:* +16 to hit, reach 10 ft., one target. *Hit:* 17 (2d8 + 8) radiant damage, or 19 (2d10 + 8) radiant damage when used with two hands, plus 36 (8d8) fire damage."
  - name: Horrid Touch (Recharge 5–6)
    desc: Zariel touches one creature within 10 feet of her. The target must succeed on a DC 26 Constitution saving throw or take 44 (8d10) necrotic damage and be poisoned for 1 minute. While poisoned in this way, the target is blinded and deafened. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Teleport
    desc: Zariel teleports, along with any equipment she is wearing or carrying, up to 120 feet to an unoccupied space she can see.
  - name: Spellcasting
    desc: |-
      Zariel casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 26):

      **At will:** *alter self* (can become Medium when changing her appearance), *detect evil and good*, *fireball*, *invisibility* (self only), *major image*, *wall of fire*

      **3/day each:** *blade barrier*, *dispel evil and good*, *finger of death*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Zariel can expend a use to take one of the following actions. Zariel regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Teleport
    desc: Zariel uses Teleport.
  - name: Immolating Gaze (Costs 2 Actions)
    desc: Zariel turns her magical gaze toward one creature she can see within 120 feet of her and commands it to burn. The target must succeed on a DC 26 Wisdom saving throw or take 22 (4d10) fire damage.
```
