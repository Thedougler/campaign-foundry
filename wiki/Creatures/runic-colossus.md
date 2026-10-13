---
title: Runic Colossus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Construct
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Runic Colossus
size: Gargantuan
type: construct
alignment: Unaligned
ac: 20
ac_class: natural armour
hp: 315
hit_dice: 18d20 + 126
modifier: -1
speed: 60 ft.
stats: [ 25, 9, 24, 3, 11, 1 ]
damage_resistances: acid, cold, fire, lightning
damage_immunities: poison; psychic; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 120 ft., passive Perception 10
languages: understands Giant but can't speak
cr: "21"
traits:
  - name: Immutable Form
    desc: The colossus is immune to any spell or effect that would alter its form.
  - name: Magic Resistance
    desc: The colossus has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The colossus deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The colossus makes two Slam attacks and then uses Stomp.
  - name: Slam
    desc: "*Melee Weapon Attack:* +14 to hit, reach 20 ft., one target. *Hit:* 26 (3d12 + 7) bludgeoning damage."
  - name: Stomp
    desc: "*Melee Weapon Attack:* +14 to hit, reach 20 ft., one target. *Hit:* 29 (4d10 + 7) bludgeoning damage. If the target is a Huge or smaller creature, it must succeed on a DC 22 Dexterity saving throw or have the prone condition. Until the colossus uses its Stomp again or moves, the creature has the restrained condition. The restrained creature or another creature within 5 feet of it can use its action to make a DC 22 Strength check. On a successful check, the affected creature relocates to an unoccupied space of its choice within 5 feet of the colossus and is no longer restrained."
  - name: Arcane Beam (Recharge 5–6)
    desc: The colossus fires a beam of magical force from its chest, hands, or head in a 150-foot line that is 10 feet wide. Each creature in that area must make a DC 22 Dexterity saving throw, taking 58 (9d12) force damage on a failed save, or half as much damage on a successful one.
reactions:
  - name: Spell Reflection (2/Day)
    desc: "*Ranged Spell Attack:* +14 to hit, range 120 ft., one creature casting a spell of 5th level or lower. *Hit:* 26 (4d12) force damage, and the target must succeed on a DC 15 Intelligence saving throw or the spell fails and has no effect."
```
