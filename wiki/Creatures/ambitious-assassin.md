---
title: Ambitious Assassin
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ambitious Assassin
size: Small or Medium
type: humanoid
alignment: typically Neutral Evil
ac: 16
ac_class: studded leather
hp: 91
hit_dice: 14d8 + 28
modifier: 4
speed: 40 ft., climb 40 ft.
stats: [ 10, 18, 15, 18, 14, 16 ]
saves:
  - dex: 7
  - int: 7
skillsaves:
  - deception: 9
  - perception: 5
  - stealth: 10
condition_immunities: charmed, frightened
senses: blindsight 10 ft., passive Perception 15
languages: Common, thieves' cant, plus any one language
cr: "5"
traits:
  - name: Legendary Resistance (2/Day)
    desc: If the assassin fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The assassin makes two Poison Blade attacks.
  - name: Poison Blade
    desc: "*Melee or Ranged Weapon Attack:* +7 to hit, reach 5 ft. or range 60 ft., one target. *Hit:* 6 (1d4 + 4) piercing damage plus 5 (1d10) poison damage."
reactions:
  - name: Uncanny Dodge
    desc: When an attacker the assassin can see hits the assassin with an attack, the assassin halves the attack's damage against it.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the ambitious assassin can expend a use to take one of the following actions. The ambitious assassin regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Cunning
    desc: The assassin escapes nonmagical restraints and ends the grappled condition on itself, then moves up to its speed without provoking opportunity attacks.
  - name: Stab (Costs 2 Actions)
    desc: The assassin makes one Poison Blade attack.
  - name: Vanishing Escape (Costs 3 Actions)
    desc: The assassin creates a sudden distraction, such as a cloud of disorienting smoke or flash of dazzling light, filling a 10-foot cube within 5 feet of the assassin. Each creature of the assassin's choice in that area takes 9 (2d8) psychic damage, and the assassin has the invisible condition. This invisibility lasts until the end of the assassin's next turn.
```
