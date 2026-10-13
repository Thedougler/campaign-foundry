---
title: Bodak
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Undead
size: Medium
habitat:
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bodak
size: Medium
type: undead
alignment: Typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 58
hit_dice: 9d8 + 18
modifier: 3
speed: 30 ft.
stats: [ 15, 16, 15, 7, 12, 12 ]
skillsaves:
  - perception: 4
  - stealth: 6
damage_resistances: cold; fire; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: necrotic, poison
condition_immunities: charmed, frightened, poisoned
senses: darkvision 120 ft., passive Perception 14
languages: Abyssal, the languages it knew in life
cr: "6"
traits:
  - name: Death Gaze
    desc: |-
      When a creature that can see the bodak's eyes starts its turn within 30 feet of the bodak, the bodak can force it to make a DC 13 Constitution saving throw if the bodak isn't incapacitated and can see the creature. If the saving throw fails by 5 or more, the creature is reduced to 0 hit points unless it is immune to the frightened condition. Otherwise, a creature takes 16 (3d10) psychic damage on a failed save.

      Unless surprised, a creature can avert its eyes to avoid the saving throw at the start of its turn. If the creature does so, it has disadvantage on attack rolls against the bodak until the start of its next turn. If the creature looks at the bodak in the meantime, that creature must immediately make the saving throw.
  - name: Sunlight Hypersensitivity
    desc: The bodak takes 5 radiant damage when it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
  - name: Unusual Nature
    desc: The bodak doesn't require air, food, drink, or sleep.
actions:
  - name: Fist
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) bludgeoning damage plus 9 (2d8) necrotic damage."
  - name: Withering Gaze
    desc: One creature that the bodak can see within 60 feet of it must make a DC 13 Constitution saving throw, taking 22 (4d10) necrotic damage on a failed save, or half as much damage on a successful one.
bonus_actions:
  - name: Aura of Annihilation
    desc: The bodak activates or deactivates this deathly aura. While active, the aura deals 5 necrotic damage to any creature that ends its turn within 30 feet of the bodak. Undead and Fiends ignore this effect.
```
