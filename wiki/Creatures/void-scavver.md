---
title: Void Scavver
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Void Scavver
size: Huge
type: monstrosity
alignment: Unaligned
ac: 15
ac_class: natural armour
hp: 157
hit_dice: 15d12 + 60
modifier: 3
speed: 0 ft., fly 40 ft.
stats: [ 22, 16, 19, 4, 13, 5 ]
skillsaves:
  - perception: 5
  - stealth: 11
senses: darkvision 120 ft., passive Perception 15
cr: "11"
traits:
  - name: Unusual Nature
    desc: The scavver doesn't require air.
actions:
  - name: Swallowing Bite
    desc: |-
      *Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 45 (6d12 + 6) piercing damage. If the target is a Large or smaller creature, it must succeed on a DC 16 Dexterity saving throw or be swallowed by the scavver. The scavver can have one creature swallowed at a time.

      A swallowed creature is blinded and restrained, has total cover against attacks and other effects outside the scavver, and takes 11 (2d10) acid damage at the start of each of the scavver's turns from the digestive juices in the scavver's gullet.

      If the scavver takes 25 damage or more on a single turn from a creature inside it, the scavver must succeed on a DC 20 Constitution saving throw at the end of that turn or regurgitate the swallowed creature, which falls prone in a space within 10 feet of the scavver. If the scavver dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 10 feet of movement, exiting prone.
bonus_actions:
  - name: Ray of Fear (Recharge 4–6)
    desc: The scavver's eye emits an invisible, magical ray that targets one creature the scavver can see within 60 feet of itself. The target must succeed on a DC 16 Wisdom saving throw or be frightened of the scavver until the start of the scavver's next turn.
```
