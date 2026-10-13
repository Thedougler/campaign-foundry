---
title: Cave Fisher
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Medium
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cave Fisher
size: Medium
type: monstrosity
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 58
hit_dice: 9d8 + 18
modifier: 1
speed: 20 ft., climb 20 ft.
stats: [ 16, 13, 14, 3, 10, 3 ]
skillsaves:
  - perception: 2
  - stealth: 5
senses: blindsight 60 ft., passive Perception 12
cr: "3"
traits:
  - name: Flammable Blood
    desc: If the cave fisher drops to half its hit points or fewer, it gains vulnerability to fire damage.
  - name: Spider Climb
    desc: The cave fisher can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The cave fisher makes two Claw attacks.
  - name: Claw
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) slashing damage."
  - name: Retract Filament
    desc: One Large or smaller creature grappled by the cave fisher's Adhesive Filament must make a DC 13 Strength saving throw. On a failed save, the target is pulled into an unoccupied space within 5 feet of the cave fisher, and the cave fisher makes one Claw attack against it. Anyone else who was attached to the filament is released. Until the grapple ends on the target, the cave fisher can't use Adhesive Filament.
bonus_actions:
  - name: Adhesive Filament
    desc: The cave fisher extends a sticky filament up to 60 feet, and the filament adheres to anything that touches it. A creature the filament adheres to is grappled by the cave fisher (escape DC 13), and ability checks made to escape this grapple have disadvantage. The filament can be attacked (AC 15; 5 hit points; immunity to poison and psychic damage). A weapon that fails to sever it becomes stuck to it, requiring an action and a successful DC 13 Strength check to pull free. Destroying the filament deals no damage to the cave fisher. The filament crumbles away if the cave fisher takes this bonus action again.
```
