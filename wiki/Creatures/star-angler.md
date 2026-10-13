---
title: Star Angler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Star Angler
size: Large
type: monstrosity
alignment: Unaligned
ac: 15
ac_class: natural armour
hp: 119
hit_dice: 14d10 + 42
modifier: 2
speed: 0 ft., fly 40 ft.
stats: [ 21, 15, 17, 3, 14, 6 ]
skillsaves:
  - perception: 5
  - stealth: 8
senses: blindsight 120 ft. (can't see beyond this radius), passive Perception 15
cr: "8"
traits:
  - name: Avoidance
    desc: If the star angler is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw and only half damage if it fails.
  - name: Illumination
    desc: The star angler's lure sheds bright light in a 30-foot radius and dim light for an additional 30 feet.
actions:
  - name: Multiattack
    desc: The star angler makes three Bite attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 16 (2d10 + 5) piercing damage."
bonus_actions:
  - name: Lure Charm
    desc: The star angler's lure flares with enchanting starlight, targeting one creature the star angler can see within 120 feet of itself. The target must succeed on a DC 13 Wisdom saving throw or have the charmed condition until the start of the star angler's next turn. While charmed in this way, the target has the incapacitated condition and must use its movement on its turn to move directly toward the star angler; a charmed target doesn't avoid opportunity attacks, but it does avoid damaging terrain. A target can be charmed by only one star angler at a time.
```
