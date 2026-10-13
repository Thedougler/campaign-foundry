---
title: Animated Breath
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Elemental
size: Large
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Animated Breath
size: Large
type: elemental
alignment: typically Neutral Evil
ac: 15
ac_class: natural armour; 17 cold form only
hp: 95
hit_dice: 10d10 + 40
modifier: 0
speed: 30 ft., fly 30 ft. (hover)
stats: [ 19, 11, 18, 6, 10, 5 ]
damage_resistances: damage of the type matching the animated breath's form (acid, cold, fire, lightning, or poison)
condition_immunities: exhaustion, paralysed, petrified, poisoned, restrained, unconscious
senses: darkvision 60 ft., passive Perception 10
languages: understands Draconic but can't speak
cr: "6"
traits:
  - name: Chromatic Form
    desc: "When created, the animated breath takes one of five forms, matching its creator's breath weapon: Acid, Cold, Fire, Lightning, or Poison. This form determines the creature's AC, damage resistance, traits, and attacks."
  - name: Fire Aura (Fire Form Only)
    desc: At the start of each of the animated breath's turns, each creature within 5 feet of it takes 3 (1d6) fire damage, and flammable objects in the aura that aren't being worn or carried ignite. A creature that touches the animated breath or hits it with a melee attack takes 3 (1d6) fire damage.
  - name: Putrid Aura (Acid and Poison Forms Only)
    desc: A creature that starts its turn within 5 feet of the animated breath must succeed on a DC 15 Constitution saving throw or be poisoned until the start of its next turn. A creature that touches the animated breath or hits it with a melee attack takes 3 (1d6) acid damage.
actions:
  - name: Multiattack
    desc: The animated breath makes two Slam attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) bludgeoning damage plus 11 (2d10) damage of a type determined by the animated breath's form: acid, cold, fire, lightning, or poison."
bonus_actions:
  - name: Lightning Burst (Lightning Form Only)
    desc: The animated breath magically teleports to an unoccupied space it can see within 30 feet of it. Each creature within 5 feet of the animated breath after it teleports takes 3 (1d6) lightning damage.
```
