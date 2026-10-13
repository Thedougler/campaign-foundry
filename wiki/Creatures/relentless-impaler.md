---
title: Relentless Impaler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Relentless Impaler
size: Large
type: fiend
alignment: typically Neutral Evil
ac: 16
ac_class: natural armour
hp: 184
hit_dice: 16d10 + 96
modifier: 3
speed: 30 ft.
stats: [ 23, 16, 22, 12, 15, 18 ]
saves:
  - str: 11
  - dex: 8
  - cha: 9
skillsaves:
  - athletics: 11
  - perception: 7
  - survival: 7
condition_immunities: charmed, exhaustion, frightened
senses: darkvision 120 ft., passive Perception 17
languages: understands all languages but can't speak
cr: "15"
traits:
  - name: Bloodheart Stake
    desc: The impaler is magically bound to the ceremonial stake and the sacrificed corpse the ritual caster used to create it. If the impaler is reduced to 0 hit points, it disappears, then re-forms 1d8 hours later in the nearest unoccupied space to the stake and regains all its hit points. The impaler dies only if it is reduced to 0 hit points while either the ceremonial stake is removed from the sacrifice's corpse or the impaler is on a different plane of existence from that corpse.
  - name: Legendary Resistance (3/Day)
    desc: If the impaler fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The impaler makes one Spike attack and two Wicked Spear attacks.
  - name: Spike
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 15 (2d8 + 6) piercing damage, and the target's speed is halved until the start of the impaler's next turn."
  - name: Wicked Spear
    desc: "*Melee or Ranged Weapon Attack:* +11 to hit, reach 10 ft. or range 20/40 ft., one target. *Hit:* 13 (2d6 + 6) piercing damage plus 13 (3d8) necrotic damage."
  - name: Spike Burst (Recharge 5–6)
    desc: Twisted, spectral spikes shoot out from the impaler's body. Each creature within 30 feet of the impaler must make a DC 19 Dexterity saving throw, taking 40 (9d8) force damage on a failed save or half as much damage on a successful one.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the relentless impaler can expend a use to take one of the following actions. The relentless impaler regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Speed Spike
    desc: The impaler teleports up to 30 feet to an unoccupied space it can see. It can then make a Spike attack.
  - name: Deepen Wounds (Costs 2 Actions)
    desc: Each creature whose speed is currently reduced by the impaler's Spike attack takes 18 (4d8) necrotic damage.
```
