---
title: Fensir Skirmisher
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Giant
size: Large
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fensir Skirmisher
size: Large
type: giant
alignment: Any alignment
ac: 15
ac_class: chain shirt
hp: 94
hit_dice: 9d10 + 45
modifier: 2
speed: 30 ft.
stats: [ 18, 15, 20, 14, 11, 12 ]
saves:
  - int: 5
  - wis: 3
skillsaves:
  - perception: 6
gear:
  - battleaxe
senses: darkvision 60 ft., passive Perception 16
languages: Common, Giant
cr: "6"
traits:
  - name: Regeneration
    desc: The fensir regains 10 hit points at the start of its turn if it isn't in sunlight. If the fensir takes acid or fire damage, this trait doesn't function at the start of the fensir's next turn. The fensir dies only if it starts its turn with 0 hit points and doesn't regenerate.
  - name: Sunlight Hypersensitivity
    desc: When the fensir starts its turn in sunlight, it must succeed on a DC 15 Constitution saving throw or have the petrified condition until the fensir is no longer in sunlight.
actions:
  - name: Multiattack
    desc: The fensir makes three Battleaxe attacks or two Magic Stone attacks.
  - name: Battleaxe
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) slashing damage, or 15 (2d10 + 4) slashing damage if used with two hands."
  - name: Magic Stone
    desc: "*Ranged Spell Attack:* +5 to hit, range 60 ft., one target. *Hit:* 15 (2d12 + 2) bludgeoning damage. If the target is a Large or smaller creature, it must succeed on a DC 13 Strength saving throw or have the prone condition."
  - name: Mud to Stone (Recharge 6)
    desc: The fensir lobs a magical mass of mud that splashes all creatures in a 30-foot-radius sphere centred on a point the fensir can see within 60 feet of itself. Each non-fensir creature in that area must succeed on a DC 13 Dexterity saving throw or take 13 (3d8) bludgeoning damage and have the restrained condition as the mud begins to turn to stone. An affected creature must repeat the saving throw at the end of its next turn. On a successful save, the effect ends on the creature. On a failed save, the creature has the petrified condition for 24 hours.
  - name: Spellcasting
    desc: |-
      The fensir casts one of the following spells, using Intelligence as the spellcasting ability:

      **1/day each:** *create or destroy water*, *detect magic*, *pass without trace*
```
