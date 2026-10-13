---
title: Lord Soth of Sithicus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 19
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lord Soth of Sithicus
size: Medium
type: undead
alignment: Lawful Evil
ac: 18
hp: 228
hit_dice: 24d8 + 120
modifier: 6
speed: 30 ft.
stats: [ 22, 11, 20, 12, 16, 20 ]
saves:
  - dex: 6
  - wis: 9
  - cha: 11
damage_immunities: necrotic, poison
condition_immunities: exhaustion, frightened, poisoned
senses: Darkvision 120 ft., passive Perception 13
languages: Common, Infernal
cr: "19"
traits:
  - name: Darklord Restoration
    desc: If Lord Soth dies, he revives with all his Hit Points in 1d10 weeks somewhere in Sithicus.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Lord Soth fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Lord Soth has Advantage on saving throws against spells and other magical effects.
  - name: Marshal Undead
    desc: Undead creatures of Lord Soth's choice (excluding himself) in a 60-foot Emanation originating from him have Advantage on attack rolls and saving throws. Lord Soth can't use this trait if he has the Incapacitated condition.
actions:
  - name: Multiattack
    desc: Lord Soth makes three Forsaken Brand attacks.
  - name: Forsaken Brand
    desc: "*Melee Attack Roll:* +12, reach 5 ft. *Hit:* 10 (1d8 + 6) Slashing damage plus 13 (3d8) Necrotic damage."
  - name: Cataclysmic Fire (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 19, each creature in a 20-foot-radius Sphere centred on a point Lord Soth can see within 120 feet. *Failure:* 24 (7d6) Fire damage plus 24 (7d6) Necrotic damage. *Success:* Half damage."
  - name: Face of Death (1/Day)
    desc: "*Charisma Saving Throw:* DC 19, each creature in a 60-foot Emanation originating from Lord Soth. *Failure:* 22 (4d10) Psychic damage, and the creature has the Frightened condition. *Success:* Half damage only. *Failure or Success:* If this damage reduces the target to 0 Hit Points, the target dies."
bonus_actions:
  - name: Commanding Magic (3/Day)
    desc: |
      Lord Soth casts *Dispel Magic*, *Hold Person*, or *Banishment* (level 5 version), using Charisma as the spellcasting ability (spell save DC 19).
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Lord can expend a use to take one of the following actions. Lord regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Punish
    desc: Lord Soth moves up to half his Speed, and he makes one Forsaken Brand attack.
  - name: Soth's Command
    desc: Lord Soth casts *Command* (level 3 version), using the same spellcasting ability as Commanding Magic. Lord Soth can't take this action again until the start of his next turn.
```
