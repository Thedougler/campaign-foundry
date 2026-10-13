---
title: Aurelia
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aurelia
size: Medium
type: celestial
subtype: angel
alignment: Lawful Good
ac: 22
ac_class: natural armour
hp: 287
hit_dice: 25d8 + 175
modifier: 7
speed: 50 ft., fly 150 ft.
stats: [ 26, 24, 25, 17, 25, 30 ]
saves:
  - dex: 14
  - con: 14
  - cha: 17
skillsaves:
  - insight: 14
  - perception: 14
damage_resistances: necrotic; radiant; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
gear:
  - longsword
senses: truesight 120 ft., passive Perception 24
languages: all
cr: "23"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Aurelia fails a saving throw, she can choose to succeed instead.
  - name: Magic Resistance
    desc: Aurelia has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Aurelia makes three longsword attacks and uses Leadership.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +15 to hit, reach 5 ft., one target. *Hit:* 12 (1d8 + 8) slashing damage, or 13 (1d10 + 8) slashing damage when used with two hands, plus 27 (6d8) radiant damage."
  - name: Leadership
    desc: Aurelia utters a few inspiring words to one creature she can see within 30 feet of her. If the creature can hear her, it can add a d10 to one attack roll or saving throw it makes before the start of Aurelia's next turn.
  - name: Warleader's Helix (Recharge 5–6)
    desc: "*Ranged Spell Attack:* +17 to hit, range 60 ft., one creature. *Hit:* 54 (12d8) radiant damage, and Aurelia can choose another creature she can see within 10 feet of the target. The second creature regains 27 (6d8) hit points."
reactions:
  - name: Parry
    desc: Aurelia adds 7 to her AC against one melee attack that would hit her. To do so, Aurelia must see the attacker and be wielding a melee weapon.
  - name: Unyielding
    desc: When Aurelia is subjected to an effect that would move her, knock her prone, or both, she can use her reaction to be neither moved nor knocked prone.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Aurelia can expend a use to take one of the following actions. Aurelia regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Command Allies
    desc: Aurelia chooses up to three creatures she can see within 30 feet of her. If a chosen creature can see or hear Aurelia, it can immediately use its reaction to make one weapon attack, with advantage on the attack roll.
  - name: Longsword Attack (Costs 2 Actions)
    desc: Aurelia makes one longsword attack.
  - name: Frighten Foes (Costs 3 Actions)
    desc: Aurelia targets up to five creatures she can see within 30 feet of her. Each target must succeed on a DC 25 Wisdom saving throw or be frightened of her until the end of her next turn. Any target within 5 feet of Aurelia has disadvantage on the saving throw.
```
