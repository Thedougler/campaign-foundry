---
title: The Lord of Blades
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: The Lord of Blades
size: Medium
type: humanoid
subtype: warforged
alignment: Lawful Evil
ac: 19
ac_class: natural armour
hp: 195
hit_dice: 23d8 + 92
modifier: 2
speed: 40 ft.
stats: [ 20, 15, 18, 19, 17, 18 ]
saves:
  - str: 11
  - con: 10
  - int: 10
  - wis: 9
skillsaves:
  - arcana: 10
  - athletics: 11
  - history: 10
  - perception: 9
damage_resistances: necrotic, poison
condition_immunities: charmed, exhaustion, frightened, disease
senses: passive Perception 19
languages: Common, Draconic, Dwarvish, Elvish
cr: "18"
traits:
  - name: Spellcasting
    desc: |-
      The Lord of Blades is a 20th-level spellcaster. His spellcasting ability is Intelligence (spell save DC 18, +10 to hit with spell attacks). He has the following artificer spells prepared:

      **Cantrips (at will):** *fire bolt* (see "Actions" below), *mage hand*, *mending*, *prestidigitation*

      **1st level (4 slots):** *expeditious retreat*, *sanctuary*, *thunderwave*

      **2nd level (3 slots):** *blur*, *heat metal*, *scorching ray*, *see invisibility*

      **3rd level (3 slots):** *dispel magic*, *fly*, *haste*

      **4th level (3 slots):** *freedom of movement*, *Mordenkainen's faithful hound*

      **5th level (2 slots):** *animate objects*, *wall of force*
  - name: Adamantine Plating
    desc: Any critical hit against the Lord of Blades becomes a normal hit.
  - name: Bladed Armour
    desc: A creature that grapples the Lord of Blades or is grappled by him takes 13 (3d8) slashing damage. A creature takes 13 (3d8) slashing damage if it starts its turn grappling or being grappled by the Lord of Blades.
  - name: Charge
    desc: If the Lord of Blades moves at least 10 feet straight toward a target and then hits it with his adamantine sixblade on the same turn, the target takes an extra 11 (2d10) slashing damage. If the target is a creature, it must succeed on a DC 19 Strength saving throw or be pushed up to 10 feet away and knocked prone.
  - name: Warforged Resilience
    desc: The Lord of Blades has advantage on saving throws against being poisoned, is immune to disease, and magic can't put him to sleep.
actions:
  - name: Multiattack
    desc: "The Lord of Blades makes three attacks: two with his adamantine sixblade and one with his bladed wings."
  - name: Adamantine Sixblade
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 21 (3d10 + 5) slashing damage plus 7 (2d6) force damage."
  - name: Bladed Wings
    desc: "*Melee or Ranged Weapon Attack:* +11 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 8 (1d6 + 5) slashing damage."
  - name: Fire Bolt (Cantrip)
    desc: "*Ranged Spell Attack:* +10 to hit, range 120 ft., one target. *Hit:* 22 (4d10) fire damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, The Lord of Blades can expend a use to take one of the following actions. The Lord of Blades regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Attack
    desc: The Lord of Blades makes one weapon attack.
  - name: Cantrip
    desc: The Lord of Blades casts one of his cantrips.
  - name: Cast a Spell (Costs 2 Actions)
    desc: The Lord of Blades casts a spell of 2nd level or lower from his spell list that takes 1 action to cast.
  - name: Blade Dash (Costs 3 Actions)
    desc: The Lord of Blades moves up to his speed without provoking opportunity attacks, then makes one attack with his adamantine sixblade. He can make one bladed wings attack against each creature he moves past.
```
