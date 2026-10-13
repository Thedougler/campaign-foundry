---
title: Adult Solar Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Dragon
size: Huge
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Solar Dragon
size: Huge
type: dragon
alignment: typically Neutral
ac: 17
ac_class: natural armour
hp: 200
hit_dice: 16d12 + 96
modifier: 2
speed: 30 ft., fly 90 ft. (hover)
stats: [ 24, 15, 22, 15, 16, 14 ]
saves:
  - dex: 7
  - con: 11
  - wis: 8
  - cha: 7
skillsaves:
  - perception: 13
  - stealth: 7
damage_immunities: radiant
condition_immunities: blinded
senses: darkvision 180 ft., passive Perception 23
languages: Draconic
cr: "14"
traits:
  - name: Flyby
    desc: The dragon doesn't provoke opportunity attacks when it flies out of an enemy's reach.
  - name: Legendary Resistance (2/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
  - name: Nebulous Thoughts
    desc: Magical attempts to read the dragon's mind or glean its thoughts fail automatically.
  - name: Siege Monster
    desc: The dragon deals double damage to objects and structures.
  - name: Unusual Nature
    desc: The dragon doesn't require air.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and one Tail attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +12 to hit, reach 15 ft., one target. *Hit:* 14 (2d6 + 7) piercing damage plus 7 (2d6) radiant damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +12 to hit, reach 20 ft., one target. *Hit:* 10 (1d6 + 7) bludgeoning damage."
  - name: Photonic Breath (Recharge 5–6)
    desc: The dragon exhales a flashing mote of radiant energy that travels to a point the dragon can see within 180 feet of itself, then blossoms into a 30-foot-radius sphere centred on that point. Each creature in the sphere must make a DC 19 Constitution saving throw, taking 55 (10d10) radiant damage on a failed save, or half as much damage on a successful one.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Tail Attack
    desc: The dragon makes one Tail attack.
  - name: Burst of Light (Costs 2 Actions)
    desc: The dragon emits magical light in a 30-foot-radius sphere centred on itself. Each creature in this area must succeed on a DC 23 Wisdom saving throw or be blinded until the end of its next turn.
```
