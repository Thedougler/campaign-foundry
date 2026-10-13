---
title: Swarm of Hoard Scarabs
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swarm of Hoard Scarabs
size: Medium
type: monstrosity
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 31
hit_dice: 7d8
modifier: 3
speed: 20 ft., burrow 20 ft., fly 20 ft.
stats: [ 6, 16, 11, 3, 8, 6 ]
damage_resistances: bludgeoning, piercing, slashing
condition_immunities: charmed, frightened, grappled, paralysed, petrified, prone, restrained, stunned
senses: darkvision 60 ft., tremorsense 60 ft., passive Perception 9
cr: "2"
traits:
  - name: False Appearance
    desc: If the swarm is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the swarm move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the swarm is animate.
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny scarab. The swarm can't regain hit points or gain temporary hit points.
actions:
  - name: Swarm of Bites
    desc: "*Melee Weapon Attack:* +5 to hit, reach 0 ft., one creature in the swarm's space. *Hit:* 13 (3d6 + 3) piercing damage, or 6 (1d6 + 3) piercing damage if the swarm is at half of its hit points or fewer, and the target has disadvantage on attack rolls until the start of its next turn."
bonus_actions:
  - name: Scale Dust (1/Day)
    desc: The swarm releases magical glittering dust from its wings. Each creature within 10 feet of the swarm must succeed on a DC 13 Dexterity saving throw or be outlined in blue light for 10 minutes. While outlined in this way, a creature sheds dim light in a 10-foot radius and can't benefit from being invisible. In addition, every Dragon within 1 mile of the creature becomes aware of it and can unerringly track the creature. Casting *dispel magic* on the creature ends the effect on it.
```
