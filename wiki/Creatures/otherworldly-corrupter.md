---
title: Otherworldly Corrupter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Aberration
size: Small or Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Otherworldly Corrupter
size: Small or Medium
type: aberration
alignment: typically Chaotic Evil
ac: 19
ac_class: natural armour
hp: 217
hit_dice: 29d8 + 87
modifier: 6
speed: 40 ft., climb 40 ft.
stats: [ 12, 22, 16, 22, 18, 20 ]
saves:
  - dex: 12
  - int: 12
skillsaves:
  - perception: 10
  - stealth: 18
damage_resistances: psychic
condition_immunities: charmed, frightened
senses: blindsight 30 ft., passive Perception 20
languages: Common, telepathy 120 ft., Thieves' cant
cr: "17"
traits:
  - name: Alien Mind
    desc: Magic and other features can't determine the corrupter's creature type. If a creature tries to read the corrupter's thoughts, that creature must succeed on a DC 20 Intelligence saving throw or have the stunned condition for 1 minute. The stunned creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Legendary Resistance (3/Day)
    desc: If the corrupter fails a saving throw, it can choose to succeed instead.
  - name: Spider Climb
    desc: The corrupter can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The corrupter makes three Whispering Blade attacks and can use Debilitating Touch.
  - name: Whispering Blade
    desc: "*Melee or Ranged Weapon Attack:* +12 to hit, reach 5 ft. or range 60 ft., one target. *Hit:* 10 (1d8 + 6) piercing damage plus 14 (4d6) psychic damage. If the target is a creature, it must succeed on a DC 20 Wisdom saving throw or be unable to speak until the start of the corrupter's next turn."
  - name: Debilitating Touch
    desc: The corrupter's squirming tentacle lashes out at a creature the corrupter can see within 30 feet of itself. The target must succeed on a DC 20 Constitution saving throw or have the paralysed condition until the end of its next turn, after which the target is immune to this Debilitating Touch for 24 hours.
bonus_actions:
  - name: Change Shape
    desc: The corrupter magically transforms into any creature that is Small or Medium, while retaining its game statistics (other than its size). This transformation ends if the corrupter is reduced to 0 hit points or uses a bonus action to end it.
reactions:
  - name: Uncanny Dodge
    desc: When an attacker the corrupter can see hits the corrupter with an attack, the corrupter halves the attack's damage against it.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the otherworldly corrupter can expend a use to take one of the following actions. The otherworldly corrupter regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Cunning
    desc: The corrupter escapes nonmagical restraints and ends the grappled and restrained conditions on itself, then moves up to its speed without provoking opportunity attacks.
  - name: Stab (Costs 2 Actions)
    desc: The corrupter makes one Whispering Blade attack.
  - name: Amorphous Escape (Costs 3 Actions)
    desc: The corrupter dissolves into a shifting mass of flesh, tentacles, eyes, claws, and mouths. Up to two creatures the corrupter can see within 20 feet of itself must make a DC 20 Intelligence saving throw, taking 18 (4d8) psychic damage on a failed save, or half as much damage on a successful one. This transformation lasts until the end of the corrupter's next turn. While transformed, the corrupter has advantage on attack rolls, attack rolls made against it have disadvantage, and it can move through spaces at least 1 inch wide without squeezing.
```
