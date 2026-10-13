---
title: Vegepygmy Chief
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Plant
size: Small
habitat:
  - Forest
  - Swamp
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vegepygmy Chief
size: Small
type: plant
alignment: Typically Neutral
ac: 14
ac_class: natural armour
hp: 33
hit_dice: 6d6 + 12
modifier: 2
speed: 30 ft.
stats: [ 14, 14, 14, 7, 12, 9 ]
skillsaves:
  - perception: 3
  - stealth: 4
damage_resistances: lightning, piercing
gear:
  - spear
senses: darkvision 60 ft., passive Perception 13
languages: Vegepygmy
cr: "2"
traits:
  - name: Plant Camouflage
    desc: The vegepygmy has advantage on Dexterity (Stealth) checks it makes in any terrain with ample obscuring vegetation.
  - name: Regeneration
    desc: The vegepygmy regains 5 hit points at the start of its turn. If it takes cold, fire, or necrotic damage, this trait doesn't function at the start of the vegepygmy's next turn. The vegepygmy dies only if it starts its turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: The vegepygmy makes two Claw attacks or two melee Spear attacks.
  - name: Claws
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage."
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack."
  - name: Spores (1/Day)
    desc: A 15-foot-radius cloud of toxic spores extends out from the vegepygmy. The spores spread around corners. Each creature in that area that isn't a Plant must succeed on a DC 12 Constitution saving throw or be poisoned. While poisoned in this way, a target takes 9 (2d8) poison damage at the start of each of its turns. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
```
