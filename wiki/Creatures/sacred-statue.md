---
title: Sacred Statue
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sacred Statue
size: Large
type: construct
alignment: as the eidolon's alignment
ac: 19
ac_class: natural armour
hp: 95
hit_dice: 10d10 + 40
modifier: -1
speed: 25 ft.
stats: [ 19, 8, 19, 14, 19, 16 ]
saves:
  - wis: 8
damage_resistances: acid; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: cold, necrotic, poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 14
languages: the languages the eidolon knew in life
traits:
  - name: False Appearance
    desc: If the statue is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the statue move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the statue isn't an object.
  - name: Ghostly Inhabitant
    desc: The eidolon that enters the statue remains inside it until the statue drops to 0 hit points, the eidolon uses a bonus action to move out of the statue, or the eidolon is turned or forced out by an effect such as the *dispel evil and good* spell. When the eidolon leaves the statue, it appears in an unoccupied space within 5 feet of the statue.
  - name: Inert
    desc: Without an eidolon inside, the statue is an object.
  - name: Unusual Nature
    desc: The statue doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The statue makes two Slam or Rock attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 43 (6d12 + 4) bludgeoning damage."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +8 to hit, range 60 ft./240 ft., one target. *Hit:* 37 (6d10 + 4) bludgeoning damage."
```
