---
title: Gearkeeper Construct
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gearkeeper Construct
size: Large
type: construct
alignment: Unaligned
ac: 18
ac_class: natural armour
hp: 161
hit_dice: 17d10 + 68
modifier: 3
speed: 60 ft.
stats: [ 20, 16, 18, 3, 11, 1 ]
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: fire, poison, psychic
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: blindsight 120 ft., passive Perception 10
languages: understands the languages of its creator but can't speak
cr: "10"
traits:
  - name: Immutable Form
    desc: The gearkeeper is immune to any spell or effect that would alter its form.
  - name: Rapid Shifting
    desc: Opportunity attacks made against the gearkeeper have disadvantage.
  - name: Whirling Blades
    desc: Any creature that starts its turn within 5 feet of the gearkeeper takes 4 (1d8) slashing damage.
actions:
  - name: Multiattack
    desc: The gearkeeper makes two Arm Blade attacks, or one Arm Blade attack and one Spear Launcher attack.
  - name: Arm Blade
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 18 (3d8 + 5) slashing damage."
  - name: Spear Launcher
    desc: "*Ranged Weapon Attack:* +9 to hit, range 90 ft., one target. *Hit:* 12 (2d6 + 5) piercing damage, and the target is knocked prone."
  - name: Shrapnel Blast (Recharge 6)
    desc: The gearkeeper jettisons a spray of jagged metal in a 30-foot cone. Each creature in the area must make a DC 15 Dexterity saving throw, taking 21 (6d6) piercing damage on a failed save, or half as much damage on a successful one.
```
