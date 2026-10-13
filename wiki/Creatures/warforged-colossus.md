---
title: Warforged Colossus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 25
creature_type: Construct
size: Gargantuan
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Warforged Colossus
size: Gargantuan
type: construct
alignment: Unaligned
ac: 23
ac_class: natural armour
hp: 410
hit_dice: 20d20 + 200
modifier: 0
speed: 60 ft.
stats: [ 30, 11, 30, 3, 11, 8 ]
saves:
  - int: 4
  - wis: 8
  - cha: 7
damage_immunities: necrotic; poison; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, incapacitated, paralysed, petrified, poisoned, stunned
senses: truesight 150 ft., passive Perception 10
languages: understands Common but can't speak
cr: "25"
traits:
  - name: Immutable Form
    desc: The colossus is immune to any spell or effect that would alter its form.
  - name: Legendary Resistance (3/Day)
    desc: If the colossus fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The colossus has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The colossus deals double damage to objects and structures.
  - name: Towering Terror
    desc: Any enemy outside the colossus that starts its turn within 30 feet of it must succeed on a DC 26 Wisdom saving throw or be frightened until the start of the enemy's next turn. If the enemy's saving throw is successful, it is immune to this colossus's Towering Terror for the next 24 hours.
actions:
  - name: Multiattack
    desc: The colossus makes three attacks, one with its slam and two with its eldritch turrets, and then uses Stomp.
  - name: Slam
    desc: "*Melee Weapon Attack:* +18 to hit, reach 20 ft., one target. *Hit:* 29 (3d12 + 10) bludgeoning damage, and the colossus can push the target up to 20 feet away from it."
  - name: Eldritch Turret
    desc: "*Ranged Spell Attack:* +18 to hit, range 300 ft., one target. *Hit:* 18 (4d8) force damage, and if the target is a creature, it is knocked prone."
  - name: Stomp
    desc: |-
      The colossus stomps one of its feet at a point on the ground within 20 feet of it. Any creature in a 20-foot-radius, 20-foot-high cylinder centred on this point must succeed on a DC 26 Dexterity saving throw or take 33 (6d10) bludgeoning damage and fall prone. Until the colossus uses its Stomp again or moves, the creature is restrained. While restrained in this way, the creature (or another creature within 5 feet of it) can use its action to make a DC 26 Strength check. On a success, the creature relocates to an unoccupied space of its choice within 5 feet of the colossus and is no longer restrained.

      Structures, as well as nonmagical objects that are neither being worn nor carried, take the same amount of damage if they are in the cylinder (no save).
  - name: Incinerating Beam (Recharge 5–6)
    desc: The colossus fires a beam of light in a 150-foot line that is 10 feet wide. Each creature in the line must make a DC 26 Dexterity saving throw, taking 60 (11d10) radiant damage on a failed save, or half as much damage on a successful one. A creature reduced to 0 hit points by this beam is disintegrated, leaving behind anything it was wearing or carrying.
```
