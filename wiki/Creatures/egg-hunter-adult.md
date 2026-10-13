---
title: Egg Hunter Adult
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Small
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Egg Hunter Adult
size: Small
type: monstrosity
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 52
hit_dice: 8d6 + 24
modifier: 5
speed: 40 ft., climb 40 ft.
stats: [ 14, 20, 16, 3, 13, 5 ]
saves:
  - dex: 8
  - wis: 4
skillsaves:
  - perception: 4
  - stealth: 11
condition_immunities: frightened, poisoned
senses: darkvision 120 ft., passive Perception 14
cr: "5"
traits:
  - name: Amphibious
    desc: The egg hunter can breathe air and water.
  - name: False Appearance
    desc: If the egg hunter is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the egg hunter move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the egg hunter is animate. Dragons have disadvantage on this check.
actions:
  - name: Multiattack
    desc: The egg hunter makes two Barbed Proboscis attacks, and it can use Torpor Spores if it's available.
  - name: Barbed Proboscis
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 8 (1d6 + 5) piercing damage plus 9 (2d8) necrotic damage, and the egg hunter regains hit points equal to the necrotic damage dealt."
  - name: Torpor Spores (Recharge 5–6)
    desc: The egg hunter releases a billow of sparkling blue spores. Each creature in a 30-foot-radius sphere centred on the egg hunter must succeed on a DC 14 Constitution saving throw or be poisoned for 1 minute. While poisoned in this way, the creature can take either an action or a bonus action on its turn but not both, and it can't take reactions. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to this egg hunter's Torpor Spores for the next 24 hours.
reactions:
  - name: Rapid Adaptation
    desc: When the egg hunter takes damage, it gives itself resistance to that damage.
```
