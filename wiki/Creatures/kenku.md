---
title: Kenku
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Monstrosity
size: Medium
habitat:
  - Forest
  - Planar (Shadowfell)
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kenku
size: Medium
type: monstrosity
alignment: Neutral
ac: 13
hp: 13
hit_dice: 3d8
modifier: 3
speed: 30 ft.
stats: [ 10, 16, 10, 11, 10, 10 ]
skillsaves:
  - deception: 4
  - perception: 2
  - stealth: 5
senses: Darkvision 60 ft., passive Perception 12
languages: Common, Primordial (Auran)
cr: 1/4
traits:
  - name: Mimicry
    desc: The kenku can mimic any sounds it has heard, including voices. A creature that hears the sounds can tell they are imitations with a successful DC 14 Wisdom (Insight) check.
actions:
  - name: Shadow Blade
    desc: "*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 60 ft. *Hit:* 6 (1d6 + 3) Necrotic damage. *Hit or Miss:* The blade magically returns to the kenku's hand immediately after a ranged attack."
bonus_actions:
  - name: Eldritch Lantern (Recharge 4–6)
    desc: |
      The kenku casts *Faerie Fire*, using Intelligence as the spellcasting ability (spell save DC 10).
```
