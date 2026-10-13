---
title: Salamander Inferno Master
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Elemental
size: Large
habitat:
  - Planar (Fire)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Salamander Inferno Master
size: Large
type: elemental
alignment: Neutral Evil
ac: 18
hp: 256
hit_dice: 27d10 + 108
modifier: 8
speed: 40 ft., climb 40 ft.
stats: [ 24, 16, 18, 14, 10, 20 ]
saves:
  - dex: 8
  - wis: 5
damage_vulnerabilities: cold
damage_immunities: fire
senses: Darkvision 120 ft., passive Perception 10
languages: Primordial (Ignan)
cr: "15"
traits:
  - name: Fire Aura
    desc: At the end of each of the salamander's turns, each creature of the salamander's choice in a 10-foot Emanation originating from the salamander takes 10 (3d6) Fire damage.
  - name: Magic Resistance
    desc: The salamander has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The salamander makes two Flame Trident attacks.
  - name: Flame Trident
    desc: "*Melee or Ranged Attack Roll:* +12, reach 5 ft. or range 30/90 ft. *Hit:* 16 (2d8 + 7) Piercing damage plus 14 (4d6) Fire damage. *Hit or Miss:* The trident magically returns to the salamander's hand immediately after a ranged attack."
  - name: Inferno Blast (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 18, each creature in a 30-foot-radius Sphere centred on a point the salamander can see within 120 feet. *Failure:* 35 (10d6) Fire damage, and the target starts burning, taking 5 (1d10) Fire damage at the start of each of its turns instead of the normal burning damage. The target gains 1 Exhaustion level whenever it takes this burning damage. *Success:* Half damage only."
bonus_actions:
  - name: Blazing Movement
    desc: The salamander moves up to its Speed without provoking Opportunity Attacks. During this movement, fire fills a 5-foot Emanation originating from the salamander. When the Emanation enters a creature's space, that creature takes 7 (2d6) Fire damage. A creature can take this damage only once per turn.
```
