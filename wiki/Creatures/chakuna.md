---
title: Chakuna
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Chakuna
size: Medium
type: monstrosity
subtype: lycanthrope
alignment: Neutral
ac: 16
hp: 210
hit_dice: 28d8 + 84
modifier: 12
speed: 30 ft., 50 ft. (panther form only), climb 40 ft. (panther form only)
stats: [ 17, 18, 16, 10, 15, 11 ]
saves:
  - con: 7
  - wis: 6
skillsaves:
  - perception: 10
  - stealth: 12
senses: Darkvision 150 ft., passive Perception 20
languages: Common (can't speak in panther form)
cr: "11"
traits:
  - name: Darklord Restoration
    desc: If Chakuna dies and her heart remains intact, she revives with all her Hit Points in 1d10 weeks somewhere in Valachan. Chakuna's heart is a Tiny object that has AC 17, HP 10, and Immunity to all damage except Fire.
  - name: Experienced Hunter
    desc: Difficult Terrain composed of undergrowth doesn't cost Chakuna extra movement.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Chakuna fails a saving throw, she can choose to succeed instead.
actions:
  - name: Multiattack
    desc: Chakuna makes three attacks, using Scratch or Barbed Spear in any combination. She can replace one attack with a Bite attack.
  - name: Bite (Panther or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 20 (3d10 + 4) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. *Constitution Saving Throw:* DC 15. *Failure:* The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a werepanther under the DM's control and has 10 Hit Points (use the Weretiger stat block). *Success:* The target is immune to Chakuna's curse for 24 hours."
  - name: Scratch
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 13 (2d8 + 4) Slashing damage."
  - name: Barbed Spear (Humanoid or Hybrid Form Only)
    desc: "*Melee or Ranged Attack Roll:* +8, reach 5 ft. or range 30/120 ft. *Hit:* 8 (1d8 + 4) Piercing damage and the target receives a dire wound if it doesn't have one. While the target is wounded, its speed is reduced by 10 feet, and it loses 5 (1d10) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to staunch the wound, doing so by succeeding on a DC 15 Wisdom (Medicine) check. *Hit or Miss:* The spear magically returns to Chakuna's hand immediately after a ranged attack."
bonus_actions:
  - name: Prowl (Panther or Hybrid Form Only)
    desc: Chakuna moves up to her Speed without provoking Opportunity Attacks. At the end of this movement, she can take the Hide action.
  - name: Shape-Shift
    desc: Chakuna shape-shifts into a Large panther-humanoid hybrid or a Large panther, or she returns to her true humanoid form. Her game statistics, other than her size, are the same in each form. Any equipment she is wearing or carrying isn't transformed.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Chakuna can expend a use to take one of the following actions. Chakuna regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Pounce
    desc: Chakuna moves up to half her Speed and makes one Scratch attack.
  - name: Strike from Shadows
    desc: Chakuna makes one Barbed Spear attack. If Chakuna has the Hide action's Invisible condition, this attack doesn't end that condition. Chakuna can't take this action again until the start of her next turn.
  - name: Sudden Bite
    desc: Chakuna uses Shape-Shift to turn into her hybrid form or panther form and then makes one Bite attack. Chakuna can't take this action again until the start of her next turn.
```
