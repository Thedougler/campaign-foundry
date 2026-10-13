---
title: Rusted Wyrm
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Construct
size: Gargantuan
habitat:
  - Coastal
  - Forest
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Rusted Wyrm
size: Gargantuan
type: construct
alignment: Neutral
ac: 20
hp: 231
hit_dice: 14d20 + 84
modifier: 6
speed: 40 ft., swim 60 ft.
stats: [ 25, 13, 22, 8, 14, 6 ]
damage_immunities: fire, poison
condition_immunities: exhaustion, frightened, petrified, poisoned
senses: Darkvision 120 ft., passive Perception 12
languages: Common, Draconic
cr: "14"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the Rusted fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The Rusted makes two Bite attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +12, reach 20 ft. *Hit:* 29 (4d10 + 7) Piercing damage."
  - name: Steam Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 19, each creature and flammable object that isn't being worn or carried in a 60-foot Cone. *Failure:* 45 (7d12) Fire damage, and the target starts burning. *Success:* Half damage only. *Failure or Success:* Being underwater doesn't grant Resistance to this Fire damage."
bonus_actions:
  - name: Encasing Rust
    desc: "*Constitution Saving Throw:* DC 19, one creature within 20 feet of the Rusted. *Failure:* 14 (4d6) Poison damage, and the target has the Poisoned condition until the end of its next turn. While Poisoned, the target has the Paralysed condition."
```
