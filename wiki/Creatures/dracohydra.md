---
title: Dracohydra
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dracohydra
size: Huge
type: monstrosity
alignment: typically Chaotic Evil
ac: 17
ac_class: natural armour
hp: 218
hit_dice: 19d12 + 95
modifier: 1
speed: 30 ft., fly 30 ft., swim 30 ft.
stats: [ 20, 12, 20, 6, 12, 12 ]
skillsaves:
  - perception: 9
senses: darkvision 60 ft., passive Perception 19
languages: understands Draconic but can't speak
cr: "11"
traits:
  - name: Multiple Heads
    desc: |-
      The dracohydra has five heads. While it has more than one head, the dracohydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.

      Whenever the dracohydra takes 30 or more damage in a single turn, one of its heads dies. If all its heads die, the dracohydra dies.

      At the end of its turn, the dracohydra grows two heads for each of its heads that died since its last turn, unless it has taken radiant damage since its last turn. The dracohydra regains 10 hit points for each head regrown this way.
  - name: Reactive Heads
    desc: For each head the dracohydra has beyond one, it gets an extra reaction that can be used only for opportunity attacks.
  - name: Wakeful
    desc: While the dracohydra sleeps, at least one of its heads is awake.
actions:
  - name: Multiattack
    desc: The dracohydra makes as many Bite attacks as it has heads.
  - name: Bite
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 10 (1d10 + 5) damage of a type chosen by the dracohydra: acid, cold, fire, lightning, or poison."
  - name: Prismatic Breath (Recharge 4–6)
    desc: "The dracohydra's heads exhale a single breath of multicoloured energy in a 60-foot cone. Each creature in that area must make a DC 17 Dexterity saving throw. On a failed save, the creature takes 33 (6d10) damage of a type chosen by the dracohydra: acid, cold, fire, lightning, or poison. On a successful save, the creature takes half as much damage."
```
