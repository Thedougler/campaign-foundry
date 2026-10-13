---
title: Modron Planar Incarnate
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Fiend
size: Gargantuan
habitat: []
sourcebooks:
  - Turn of Fortune's Wheel
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Modron Planar Incarnate
size: Gargantuan
type: fiend
alignment: Any alignment
ac: 20
ac_class: natural armour
hp: 333
hit_dice: 18d20 + 144
modifier: 0
speed: 40 ft., fly 40 ft.
stats: [ 27, 10, 26, 15, 20, 20 ]
skillsaves:
  - perception: 12
damage_immunities: necrotic; poison; radiant; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, restrained, stunned, unconscious
senses: truesight 120 ft., passive Perception 22
languages: all
cr: "22"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the incarnate fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The incarnate has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The incarnate deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The incarnate makes two Slam or Energy Bolt attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +15 to hit, reach 15 ft., one target. *Hit:* 27 (3d12 + 8) force damage."
  - name: Energy Bolt
    desc: "*Ranged Spell Attack:* +12 to hit, range 120 ft., one target. *Hit:* 32 (5d12) necrotic damage."
  - name: Planar Exhalation (Recharge 5–6)
    desc: The incarnate exhales concentrated energy native to its plane in a 60-foot cone. Each creature in that area must make a DC 23 Constitution saving throw. On a failed save, a creature takes 52 (8d12) necrotic damage, and the creature has the blinded condition until the end of the incarnate's next turn. On a successful save, a creature takes half as much damage only.
reactions:
  - name: Searing Gaze
    desc: In response to being hit by an attack roll, the incarnate turns its magical gaze toward one creature it can see within 120 feet of itself and commands it to combust. The target must succeed on a DC 20 Wisdom saving throw or take 16 (3d10) fire damage.
  - name: Teleport
    desc: Immediately after a creature the incarnate sees ends its turn, the incarnate teleports up to 60 feet to an unoccupied space it can see.
```
