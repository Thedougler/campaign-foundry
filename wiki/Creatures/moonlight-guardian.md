---
title: Moonlight Guardian
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Moonlight Guardian
size: Medium
type: construct
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 105
hit_dice: 14d8 + 42
modifier: -1
speed: 30 ft.
stats: [ 19, 9, 16, 6, 12, 6 ]
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison, radiant
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: truesight 120 ft., passive Perception 11
languages: understands the languages of its creator but can't speak
cr: "6"
traits:
  - name: Immutable Form
    desc: The guardian is immune to any spell or other effect that would alter its form.
  - name: Magic Resistance
    desc: The guardian has advantage on saving throws against spells and other magical effects.
  - name: Radiant Absorption
    desc: Whenever the guardian is subjected to radiant damage, it takes no damage and instead regains a number of hit points equal to the radiant damage.
actions:
  - name: Multiattack
    desc: The guardian makes two Moonlight Slam attacks.
  - name: Moonlight Slam
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) bludgeoning damage plus 4 (1d8) radiant damage."
  - name: Moonlight Blast (Recharge 5–6)
    desc: The guardian unleashes a magical blast of moonlight in a line 60 feet long and 5 feet wide. Each creature in that area must make a DC 14 Dexterity saving throw. Creatures that aren't in their true form have disadvantage on the save. On a failed save, a creature takes 22 (5d8) radiant damage, and if it isn't in its true form, it is forced into its true form and can't change forms until the end of the guardian's next turn. On a successful save, a creature takes half as much damage only.
```
