---
title: Citadel Spider
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Citadel Spider
size: Gargantuan
type: monstrosity
alignment: typically Neutral Evil
ac: 18
ac_class: natural armour
hp: 310
hit_dice: 20d20 + 150
modifier: 0
speed: 50 ft., climb 50 ft.
stats: [ 26, 10, 21, 6, 12, 9 ]
condition_immunities: charmed, exhaustion, frightened
senses: blindsight 30 ft., darkvision 120 ft., passive Perception 11
cr: "18"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the spider fails a saving throw, it can choose to succeed instead.
  - name: Spider Climb
    desc: The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Web Walker
    desc: The spider ignores movement restrictions caused by webbing.
actions:
  - name: Multiattack
    desc: The spider makes two Bite attacks. It can replace one of these attacks with a use of Web Bomb.
  - name: Bite
    desc: "*Melee Weapon Attack:* +14 to hit, reach 20 ft., one target. *Hit:* 19 (2d10 + 8) piercing damage plus 7 (2d6) poison damage."
  - name: Web Bomb
    desc: "*Ranged Weapon Attack:* +14 to hit, range 300 ft./600 ft., one target. *Hit:* 24 (3d10 + 8) bludgeoning damage, and the target and all creatures within 10 feet of it must succeed on a DC 19 Dexterity saving throw or take 10 (3d6) acid damage and have the restrained condition until the start of the spider's next turn."
reactions:
  - name: Absorb Blow
    desc: In response to being hit with an attack roll, the spider's carapace absorbs some of the blow, reducing the damage it takes by 11 (2d10).
```
