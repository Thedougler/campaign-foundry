---
title: Jammer Leech
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Plant
size: Tiny
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Jammer Leech
size: Tiny
type: plant
alignment: Unaligned
ac: 12
ac_class: natural armour
hp: 27
hit_dice: 5d4 + 15
modifier: -5
speed: 10 ft.
stats: [ 11, 1, 16, 1, 10, 1 ]
condition_immunities: charmed, frightened, prone
senses: darkvision 30 ft., passive Perception 10
cr: "1"
traits:
  - name: Spelljammer Overload
    desc: If the leech is reduced to 0 hit points while attached to a ship that has a spelljamming helm, the creature attuned to that helm must make a DC 13 Constitution saving throw. On a failed save, the creature takes 10 (4d4) psychic damage and is incapacitated for 1 minute. On a successful save, the creature takes half as much damage and is incapacitated until the end of its next turn.
  - name: Unusual Nature
    desc: The leech doesn't require air or sleep.
actions:
  - name: Spiked Tentacle
    desc: "*Melee Weapon Attack:* +2 to hit, reach 5 ft., one target. *Hit:* 2 (1d4) piercing damage."
bonus_actions:
  - name: Attach to Hull
    desc: The leech attaches itself to a ship's hull in its space, dealing 2 (1d4) piercing damage to the ship (ignoring the ship's damage threshold). This damage can't be repaired until the leech is scraped off the hull. While the leech is attached, its speed is 0, and it can detach itself as a bonus action. As an action, a creature within reach of the leech can to try to scrape it off the hull, doing so with a successful DC 18 Strength check. On a failed check, the action is wasted as the leech remains attached to the hull. Removing the leech in this way deals no damage to the leech or the ship.
reactions:
  - name: Magical Discharge (1/Day)
    desc: When it takes damage, the leech can discharge a bolt of magical energy from its eye that targets one creature it can see within 30 feet of itself. The target must succeed on a DC 13 Dexterity saving throw or take 10 (3d6) force damage and be stunned until the end of its next turn.
```
