---
title: Enchanting Infiltrator
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Fey
size: Small or Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Enchanting Infiltrator
size: Small or Medium
type: fey
alignment: typically Neutral Evil
ac: 18
ac_class: veiled presence
hp: 156
hit_dice: 24d8 + 48
modifier: 5
speed: 40 ft.
stats: [ 10, 20, 15, 20, 16, 18 ]
saves:
  - dex: 9
  - int: 9
skillsaves:
  - deception: 12
  - perception: 7
  - stealth: 13
condition_immunities: charmed, frightened
senses: blindsight 30 ft., passive Perception 17
languages: Common, thieves' cant, plus any one language
cr: "11"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the infiltrator fails a saving throw, it can choose to succeed instead.
  - name: Veiled Presence
    desc: The infiltrator's AC includes its Wisdom modifier, and the infiltrator can't be targeted by divination magic or features that would read its mind or determine its creature type.
actions:
  - name: Multiattack
    desc: The infiltrator makes two Poison Blade attacks and can use Beguiling Whisper.
  - name: Poison Blade
    desc: "*Melee or Ranged Weapon Attack:* +9 to hit, reach 5 ft. or range 60 ft., one target. *Hit:* 7 (1d4 + 5) piercing damage plus 11 (2d10) poison damage."
  - name: Beguiling Whisper
    desc: The infiltrator magically whispers to a creature it can see within 30 feet of itself. The target must succeed on a DC 17 Wisdom saving throw or have the stunned condition due to fear or delight (the infiltrator's choice) until the end of the target's next turn, after which the target is immune to this Beguiling Whisper for 24 hours.
reactions:
  - name: Uncanny Dodge
    desc: When an attacker the infiltrator can see hits the infiltrator with an attack, the infiltrator halves the attack's damage against it.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the enchanting infiltrator can expend a use to take one of the following actions. The enchanting infiltrator regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Cunning
    desc: The infiltrator escapes nonmagical restraints and ends the grappled condition on itself, then moves up to its speed without provoking opportunity attacks.
  - name: Stab (Costs 2 Actions)
    desc: The infiltrator makes one Poison Blade attack.
  - name: Misdirecting Escape (Costs 3 Actions)
    desc: The infiltrator magically has the invisible condition and creates an illusory duplicate of itself in its space, then teleports, along with any equipment it is wearing or carrying, to an unoccupied space within 15 feet of itself. The image flings illusory blades at two creatures of the infiltrator's choice within 20 feet of the image. Each target must make a DC 17 Wisdom saving throw, taking 13 (3d8) psychic damage on a failed save, or half as much damage on a successful one. The invisibility lasts until the end of the infiltrator's next turn.
```
