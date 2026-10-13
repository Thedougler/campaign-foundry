---
title: Demilich
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Undead
size: Tiny
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Demilich
size: Tiny
type: undead
alignment: Neutral Evil
ac: 20
hp: 180
hit_dice: 72d4
modifier: 17
speed: 5 ft., fly 30 ft. (hover)
stats: [ 1, 20, 10, 20, 17, 20 ]
saves:
  - dex: 11
  - con: 6
  - int: 11
  - wis: 9
damage_resistances: bludgeoning, piercing, slashing
damage_immunities: necrotic, poison, psychic
condition_immunities: charmed, deafened, exhaustion, frightened, paralysed, petrified, poisoned, prone, stunned
senses: Truesight 120 ft., passive Perception 13
cr: "18"
traits:
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the demilich fails a saving throw, it can choose to succeed instead.
  - name: Undead Restoration
    desc: If the demilich is destroyed, it reforms and regains all its Hit Points in 1d10 days unless a *Wish* spell is cast on its remains.
actions:
  - name: Multiattack
    desc: The demilich makes three Necrotic Burst attacks.
  - name: Necrotic Burst
    desc: "*Melee or Ranged Attack Roll:* +11, reach 5 ft. or range 120 ft. *Hit:* 24 (7d6) Necrotic damage."
  - name: Howl (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 19, each creature in a 30-foot Emanation originating from the demilich. *Failure:* 70 (20d6) Psychic damage. *Failure or Success:* The target has the Frightened condition until the start of the demilich's next turn."
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the demilich can expend a use to take one of the following actions. The demilich regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Energy Drain
    desc: "*Constitution Saving Throw:* DC 19, one creature the demilich can see within 120 feet. *Failure:* The target's Hit Point maximum decreases by 14 (4d6). *Failure or Success:* The demilich can't take this action again until the start of its next turn."
  - name: Grave-Dust Flight
    desc: The demilich flies up to its Fly Speed, shedding grave dust. Each creature within 5 feet of the demilich as it moves is targeted once by the following effect. *Constitution Saving Throw:* DC 19. *Failure:* The target has the Blinded condition until the end of the demilich's next turn. *Failure or Success:* The demilich can't take this action again until the start of its next turn.
  - name: Necrosis
    desc: The demilich makes one Necrotic Burst attack.
```
