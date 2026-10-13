---
title: Dragonbone Golem
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dragonbone Golem
size: Large
type: construct
alignment: Unaligned
ac: 17
ac_class: natural armour
hp: 161
hit_dice: 19d10 + 57
modifier: 0
speed: 40 ft.
stats: [ 20, 10, 17, 3, 11, 10 ]
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 10
languages: understands Draconic and the languages of its creator but can't speak
cr: "11"
traits:
  - name: Fear Aura
    desc: Each creature of the golem's choice that starts its turn within 20 feet of the golem must make a DC 15 Wisdom saving throw unless the golem is incapacitated. On a failed save, the creature is frightened until the start of its next turn. On a successful save, the creature is immune to this golem's Fear Aura for the next 24 hours.
  - name: Magic Resistance
    desc: The golem has advantage on saving throws against spells and other magical effects.
  - name: Unusual Nature
    desc: The golem doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The golem makes one Pinion attack and two Rend attacks.
  - name: Pinion
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) piercing damage. If the target is a Medium or smaller creature, it is pinned beneath the bony pinion and restrained. The golem has two pinions, each of which can restrain one target. If a creature is restrained by one of the pinions, the golem can't attack with it. Any creature restrained by a pinion can free itself at the start of its turn with a successful DC 17 Strength (Athletics) check."
  - name: Rend
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) piercing damage plus 5 (1d10) necrotic damage."
  - name: Petrifying Breath (Recharge 5–6)
    desc: The golem emits a 60-foot cone of petrifying gas from its mouth. Each creature in that area must succeed on a DC 15 Constitution saving throw or take 35 (10d6) poison damage and be restrained as it begins to turn to stone. The restrained target must repeat the saving throw at the end of its next turn. On a successful save, the effect ends on the target. On a failed save, the target is petrified.
```
