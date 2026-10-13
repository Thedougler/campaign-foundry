---
title: Dragonblood Ooze
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Ooze
size: Large
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dragonblood Ooze
size: Large
type: ooze
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 68
hit_dice: 8d10 + 24
modifier: -2
speed: 20 ft., climb 20 ft.
stats: [ 18, 6, 17, 2, 12, 10 ]
skillsaves:
  - perception: 4
  - stealth: 4
damage_resistances: acid, cold, fire, lightning, poison
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, grappled, prone, restrained
senses: blindsight 120 ft. (blind beyond this radius), passive Perception 14
languages: understands Draconic and the languages of its creator but can't speak
cr: "5"
traits:
  - name: Amorphous
    desc: The ooze can move through a space as narrow as 1 inch wide without squeezing.
  - name: Spider Climb
    desc: The ooze can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The ooze makes two Pseudopod attacks. The ooze can replace one Pseudopod attack with its Slime Breath, if available.
  - name: Pseudopod
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 9 (1d10 + 4) bludgeoning damage plus 14 (4d6) acid damage. If the target is a Large or smaller creature, it is grappled (escape DC 15). Until this grapple ends, the target takes 7 (2d6) acid damage at the start of each of its turns."
  - name: Slime Breath (Recharge 6)
    desc: The ooze expels a spray of its gelatinous mass in a 30-foot cone. Each creature in that area must make a DC 14 Dexterity saving throw. On a failed save, the creature takes 22 (4d10) acid damage and is pulled up to 30 feet straight toward the ooze. On a successful save, the creature takes half as much damage and isn't pulled.
```
