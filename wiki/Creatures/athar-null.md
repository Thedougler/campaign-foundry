---
title: Athar Null
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Athar Null
size: Small or Medium
type: humanoid
alignment: Any alignment
ac: 14
ac_class: leather armour
hp: 84
hit_dice: 13d8 + 26
modifier: 3
speed: 30 ft.
stats: [ 12, 16, 14, 15, 14, 10 ]
saves:
  - dex: 6
  - wis: 5
skillsaves:
  - investigation: 8
  - perception: 5
  - stealth: 6
senses: passive Perception 15
languages: Common plus two more languages
cr: "5"
traits:
  - name: Avoidance
    desc: If the null is subjected to an effect that allows it to make a saving throw to take half as much damage, it instead takes no damage if it succeeds on the saving throw, and half as much damage if it fails.
actions:
  - name: Multiattack
    desc: The null makes two Force Dagger attacks.
  - name: Force Dagger
    desc: "*Melee or Ranged Weapon Attack:* +6 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage plus 13 (3d8) force damage. *Hit or Miss:* The dagger magically returns to the null's hand immediately after a ranged attack."
bonus_actions:
  - name: Defier's Whim
    desc: The null takes the Dash, Disengage, or Use an Object action.
reactions:
  - name: Nullify Spell (3/Day)
    desc: The null utters a magical word of cancellation to interrupt a creature it can see that is casting a spell. If the spell is 3rd level or lower, it fails and has no effect. If the spell is 4th level or higher, the null makes an Intelligence check (DC 10 + the spell's level). On a successful check, the spell fails and has no effect.
```
