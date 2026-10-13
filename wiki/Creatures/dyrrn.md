---
title: Dyrrn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 24
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dyrrn
size: Medium
type: aberration
alignment: Chaotic Evil
ac: 21
ac_class: natural armour
hp: 325
hit_dice: 31d8 + 186
modifier: 5
speed: 40 ft., fly 40 ft. (hover)
stats: [ 26, 21, 22, 26, 23, 24 ]
saves:
  - int: 15
  - wis: 13
  - cha: 14
skillsaves:
  - arcana: 15
  - history: 15
  - insight: 13
  - perception: 13
damage_resistances: poison, psychic
condition_immunities: blinded, charmed, exhaustion, frightened, poisoned, prone
senses: truesight 120 ft., passive Perception 23
languages: Deep Speech, telepathy 120 ft.
cr: "24"
traits:
  - name: Alien Mind
    desc: If a creature tries to read Dyrrn's thoughts or deals psychic damage to it, that creature must succeed on a DC 23 Intelligence saving throw or be stunned for 1 minute. The stunned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Legendary Resistance (3/Day)
    desc: If Dyrrn fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: Dyrrn has advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: Dyrrn regains 20 hit points at the start of its turn. If Dyrrn takes radiant damage, this trait doesn't function at the start of its next turn. Dyrrn dies only if it starts its turn with 0 hit points and doesn't regenerate.
  - name: Teleport
    desc: As a bonus action, Dyrrn can teleport up to 30 feet to an unoccupied space it can see.
actions:
  - name: Multiattack
    desc: Dyrrn makes one Tentacle Whip attack and uses its Corruption once. Dyrrn can replace its Tentacle Whip attack with Extract Brain if it has a creature grappled.
  - name: Tentacle Whip
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 24 (3d10 + 8) slashing damage. If the target is a Medium or smaller creature, it is grappled (escape DC 23), pulled into an unoccupied space within 5 feet of Dyrrn, and must succeed on a DC 23 Intelligence saving throw or be stunned until this grapple ends. Dyrrn can't use the same tentacle whip on another target until this grapple ends. Dyrrn has two tentacle whips."
  - name: Corruption
    desc: |-
      Dyrrn targets one creature it can see within 60 feet of it. The target must succeed on a DC 23 Constitution saving throw or take 22 (4d6 + 8) necrotic damage and become corrupted for 1 minute.

      A corrupted creature's flesh twists in alien ways. The creature has disadvantage on attack rolls, its speed is reduced by half, and if it tries to cast a spell, it must first succeed on a DC 15 Intelligence check or the spell fails and is wasted. The corrupted creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Extract Brain
    desc: "*Melee Weapon Attack:* +15 to hit, reach 5 ft., one incapacitated creature grappled by Dyrrn. *Hit:* 55 (10d10) piercing damage. If this damage reduces the target to 0 hit points, Dyrrn kills the target by extracting and devouring its brain."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Dyrrn can expend a use to take one of the following actions. Dyrrn regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Tentacle Whip
    desc: Dyrrn makes one attack with its Tentacle Whip.
  - name: Spawn Aberration (Costs 2 Actions)
    desc: Dyrrn regurgitates an intellect devourer in an unoccupied space within 5 feet of it. The intellect devourer is under Dyrrn's control and acts immediately after Dyrrn in the initiative order.
  - name: Mind Blast (Costs 3 Actions)
    desc: Dyrrn magically emits psychic energy in a 60-foot cone. Each creature in that area must succeed on a DC 23 Intelligence saving throw or take 30 (5d8 + 8) psychic damage and be stunned for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
```
