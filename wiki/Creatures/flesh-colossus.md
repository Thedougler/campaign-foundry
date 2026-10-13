---
title: Flesh Colossus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 20
creature_type: Construct
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Flesh Colossus
size: Gargantuan
type: construct
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 280
hit_dice: 16d20 + 112
modifier: -1
speed: 60 ft.
stats: [ 24, 9, 24, 6, 10, 5 ]
damage_immunities: lightning; poison; psychic; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 120 ft., passive Perception 10
languages: understands Giant but can't speak
cr: "20"
traits:
  - name: Berserk
    desc: If the core inside the colossus is destroyed, the colossus goes berserk. On each of its turns while berserk, the colossus attacks the nearest creature it can see. If no creature is near enough to move to and attack, the colossus attacks an object. Once the colossus goes berserk, it remains berserk until it is destroyed.
  - name: Immutable Form
    desc: The colossus is immune to any spell or effect that would alter its form.
  - name: Magic Resistance
    desc: The colossus has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The colossus deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The colossus makes two Fist attacks.
  - name: Fist
    desc: "*Melee Weapon Attack:* +13 to hit (with advantage if the colossus is berserk), reach 20 ft., one target. *Hit:* 17 (3d6 + 7) bludgeoning damage. If the target is a Large or smaller creature, it is pulled up to 15 feet toward the colossus, it has the grappled condition (escape DC 17), and it has the restrained condition until this grapple ends. The colossus can have up to two creatures grappled this way at a time."
  - name: Elemental Breath (Recharge 5–6)
    desc: |-
      The colossus exhales a cloud swirling with elemental energy in a 90-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw. On a failed save, a creature takes 40 (9d8) damage of a type of the colossus's choosing: acid, cold, fire, or lightning. On a successful save, a creature takes half as much damage.

      At the same time as the colossus releases this exhalation, creatures inside the colossus's chest cavity take 40 (9d8) force damage from churning elemental energy.
bonus_actions:
  - name: Bite
    desc: |-
      *Melee Weapon Attack:* +13 to hit, reach 5 ft., one Large or smaller creature grappled by the colossus. *Hit:* 20 (3d8 + 7) bludgeoning damage, and the creature is swallowed. A swallowed creature has the restrained condition, has total cover against attacks and other effects outside the colossus, and takes 10 (3d6) force damage at the start of each of the colossus's turns.

      The colossus's chest cavity can hold up to two creatures at a time. Inside its chest cavity is its core, which is a Large object with AC 16 that is immune to lightning, poison, and psychic damage. It has 140 hit points and sheds dim light in a 10-foot radius. If the core is destroyed, the colossus regurgitates all swallowed creatures, each of which falls in a space within 10 feet of the colossus and has the prone condition, and the colossus can no longer swallow a creature. If the colossus dies, any swallowed creature no longer has the restrained condition and can escape from the corpse using 10 feet of movement, exiting with the prone condition.
```
