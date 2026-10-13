---
title: Cradle of the Fire Scion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 25
creature_type: Elemental
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cradle of the Fire Scion
size: Gargantuan
type: elemental
alignment: typically Lawful Evil
ac: 20
ac_class: natural armour
hp: 555
hit_dice: 30d20 + 240
modifier: 1
speed: 40 ft.
stats: [ 28, 12, 27, 12, 20, 17 ]
damage_resistances: cold; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: fire, poison
condition_immunities: exhaustion, petrified, poisoned
senses: darkvision 120 ft., passive Perception 15
languages: Giant, Primordial
cr: "25"
traits:
  - name: Awakening of the Scion
    desc: The cradle is a container for the scion of Surtur. When the cradle drops to 0 hit points, its body hardens and crumbles to ash. The scion instantly appears in the space the cradle occupied and uses the cradle's initiative count.
  - name: Legendary Resistance (5/Day)
    desc: If the cradle fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The cradle has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The cradle deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The cradle makes three Slam or Hurl Lava attacks in any combination.
  - name: Slam
    desc: "*Melee Weapon Attack:* +17 to hit, reach 20 ft., one target. *Hit:* 31 (4d10 + 9) bludgeoning damage plus 14 (4d6) fire damage."
  - name: Hurl Lava
    desc: "*Ranged Weapon Attack:* +17 to hit, range 120 ft., one target. *Hit:* 27 (4d8 + 9) fire damage. If the target is a creature or a flammable object, it ignites. Until a creature within 5 feet of the fire takes an action to douse the fire, the target takes 10 (3d6) fire damage at the start of each of its turns."
  - name: Erupting Breath (Recharge 5–6)
    desc: |-
      The cradle exhales flames and volcanic gases in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw. On a failed save, a creature takes 55 (10d10) fire damage and has the poisoned condition for 1 minute. On a successful save, a creature takes half as much damage only.

      A creature poisoned in this way can make a DC 24 Constitution saving throw at the end of each of its turns, ending the effect on itself on a success.
bonus_actions:
  - name: Lava Geyser
    desc: The cradle causes lava to erupt from a point on the ground it can see within 120 feet of itself. Each creature in a 20-foot-radius, 50-foot-high cylinder centred on that point must succeed on a DC 21 Dexterity saving throw or take 14 (4d6) fire damage.
```
