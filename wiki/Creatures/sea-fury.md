---
title: Sea Fury
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Fey
size: Medium
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sea Fury
size: Medium
type: fey
alignment: Chaotic Evil
ac: 14
ac_class: natural armour
hp: 105
hit_dice: 14d8 + 42
modifier: 2
speed: 30 ft., swim 50 ft.
stats: [ 19, 15, 16, 12, 12, 18 ]
skillsaves:
  - deception: 8
  - insight: 5
  - perception: 5
  - stealth: 6
damage_immunities: cold; fire; poison; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
condition_immunities: paralysed, poisoned
senses: darkvision 120 ft., passive Perception 15
languages: Aquan, Common, Giant
cr: "12"
traits:
  - name: Innate Spellcasting
    desc: |-
      The sea fury's innate spellcasting ability is Charisma (spell save DC 16, +8 to hit with spell attacks). It can innately cast the following spells, requiring no material components:

      **At will:** witch bolt

      **1/day each:** *bestow curse*, *fear*, *thunderwave*
  - name: Amphibious
    desc: The sea fury can breathe air and water.
  - name: Legendary Resistance (3/Day)
    desc: If the sea fury fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The sea fury has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The sea fury makes two attacks with its claws.
  - name: Claws
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) slashing damage."
  - name: Death Glare
    desc: The sea fury targets one frightened creature it can see within 30 feet of it. The target must succeed on a DC 16 Wisdom saving throw or drop to 0 hit points.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the sea fury can expend a use to take one of the following actions. The sea fury regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: As Water
    desc: The sea fury transforms into a wave of foaming seawater, along with whatever it is wearing or carrying, and moves up to its speed without provoking opportunity attacks. While in this form, it can't be grappled or restrained. It reverts to its true form at the end of this movement.
  - name: Fearsome Apparition (Costs 2 Actions)
    desc: The sea fury conjures an apparition of one of its dead sisters, which appears in an unoccupied space the sea fury can see within 30 feet of it. Enemies of the sea fury that can see the apparition must succeed on a DC 16 Wisdom saving throw or be frightened of it until it vanishes at the end of the sea fury's next turn.
  - name: Conjure Snakes (Costs 3 Actions)
    desc: The sea fury disgorges a swarm of poisonous snakes, which occupies the same space as the sea fury, acts on its own initiative count, and attacks as directed by the sea fury. The sea fury can control up to three of these swarms at a time.
```
