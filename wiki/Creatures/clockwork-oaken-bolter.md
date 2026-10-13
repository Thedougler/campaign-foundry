---
title: Clockwork Oaken Bolter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Construct
size: Medium
habitat:
  - Forest
  - Grassland
  - Hill
  - Mountain
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
  - Return to the Glory
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Clockwork Oaken Bolter
size: Medium
type: construct
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 117
hit_dice: 18d8 + 36
modifier: 4
speed: 30 ft.
stats: [ 12, 18, 15, 3, 10, 1 ]
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 10
languages: understands one language of its creator but can't speak
cr: "5"
traits:
  - name: Magic Resistance
    desc: The clockwork has advantage on saving throws against spells and other magical effects.
  - name: Unusual Nature
    desc: The clockwork doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The clockwork makes two Lancing Bolt attacks or one Lancing Bolt attack and one Harpoon attack.
  - name: Lancing Bolt
    desc: "*Melee or Ranged Weapon Attack:* +7 to hit, reach 5 ft. or range 100/400 ft., one target. *Hit:* 15 (2d10 + 4) piercing damage."
  - name: Harpoon
    desc: "*Ranged Weapon Attack:* +7 to hit, range 50/200 ft., one target. *Hit:* 9 (1d10 + 4) piercing damage, and the target is grappled (escape DC 12). While grappled in this way, a creature's speed isn't reduced, but it can move only in directions that bring it closer to the clockwork. A creature takes 5 (1d10) slashing damage if it escapes from the grapple or if it tries and fails. The clockwork can grapple only one creature at a time with its harpoon."
  - name: Explosive Bolt (Recharge 5–6)
    desc: The clockwork launches an explosive charge at a point within 120 feet. Each creature in a 20-foot-radius sphere centred on that point must make a DC 15 Dexterity saving throw, taking 17 (5d6) fire damage on a failed save, or half as much damage on a successful one.
bonus_actions:
  - name: Reel In
    desc: The clockwork pulls the creature grappled by its Harpoon up to 20 feet closer.
```
