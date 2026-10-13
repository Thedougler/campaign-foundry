---
title: Ruin Spider
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ruin Spider
size: Large
type: monstrosity
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 105
hit_dice: 14d10 + 28
modifier: 4
speed: 40 ft., climb 40 ft.
stats: [ 16, 18, 14, 2, 13, 4 ]
skillsaves:
  - stealth: 10
damage_immunities: acid
senses: darkvision 60 ft., passive Perception 11
cr: "5"
traits:
  - name: Ruinous Acid
    desc: Any nonmagical weapon that hits the spider corrodes. After dealing damage, the weapon takes a permanent and cumulative -1 penalty to damage rolls. If its penalty drops to -5, the weapon is destroyed. Nonmagical ammunition made of metal that hits the spider is destroyed after dealing damage.
  - name: Spider Climb
    desc: The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Web Sense
    desc: While in contact with a web, the spider knows the exact location of any other creature in contact with the same web.
  - name: Web Walker
    desc: The spider ignores movement restrictions caused by webbing.
actions:
  - name: Multiattack
    desc: The spider makes two Ruinous Bite attacks. It can replace one attack with a use of Web.
  - name: Ruinous Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage and 9 (2d8) acid damage. In addition, if the target is a creature wearing nonmagical armour, the armour takes a permanent and cumulative -1 penalty to the AC it offers. Armour reduced to an Armour Class of 10 is destroyed."
  - name: Web (Recharge 5–6)
    desc: "*Ranged Weapon Attack:* +7 to hit, range 30/60 ft., one creature. *Hit:* The target has the restrained condition. As an action, a restrained target can make a DC 13 Strength check, bursting the webbing on a successful check. The webbing can also be destroyed (AC 10; 5 hit points; vulnerability to fire damage; immunity to acid, bludgeoning, poison, and psychic damage)."
```
