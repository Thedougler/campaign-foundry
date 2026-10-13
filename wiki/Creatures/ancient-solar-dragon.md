---
title: Ancient Solar Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Solar Dragon
size: Gargantuan
type: dragon
alignment: typically Neutral
ac: 18
ac_class: natural armour
hp: 425
hit_dice: 23d20 + 184
modifier: 2
speed: 30 ft., fly 120 ft. (hover)
stats: [ 28, 15, 26, 17, 18, 16 ]
saves:
  - dex: 9
  - con: 15
  - wis: 11
  - cha: 10
skillsaves:
  - perception: 18
  - stealth: 9
damage_immunities: radiant
condition_immunities: blinded
senses: darkvision 240 ft., passive Perception 28
languages: Draconic
cr: "21"
traits:
  - name: Flyby
    desc: The dragon doesn't provoke opportunity attacks when it flies out of an enemy's reach.
  - name: Legendary Resistance (3/Day)
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
    desc: "*Melee Weapon Attack:* +16 to hit, reach 20 ft., one target. *Hit:* 19 (3d6 + 9) piercing damage plus 10 (3d6) radiant damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +16 to hit, reach 20 ft., one target. *Hit:* 13 (1d8 + 9) bludgeoning damage."
  - name: Photonic Breath (Recharge 5–6)
    desc: The dragon exhales a flashing mote of radiant energy that travels to a point the dragon can see within 240 feet of itself, then blossoms into a 40-foot-radius sphere centred on that point. Each creature in the sphere must make a DC 23 Constitution saving throw, taking 66 (12d10) radiant damage on a failed save, or half as much damage on a successful one.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Tail Attack
    desc: The dragon makes one Tail attack.
  - name: Blinding Brilliance (Costs 2 Actions)
    desc: The dragon emits magical light in a 30-foot-radius sphere centred on itself. Each creature in this area must succeed on a DC 23 Wisdom saving throw or be blinded until the end of its next turn.
```
