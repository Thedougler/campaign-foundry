---
title: Saidra d'Honaire
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Saidra d'Honaire
size: Medium
type: undead
alignment: Neutral Evil
ac: 13
hp: 90
hit_dice: 12d8 + 36
modifier: 11
speed: 5 ft., fly 60 ft. (hover)
stats: [ 6, 17, 16, 12, 14, 17 ]
saves:
  - dex: 7
  - wis: 6
skillsaves:
  - insight: 10
  - perception: 6
  - performance: 7
  - stealth: 7
damage_resistances: acid, bludgeoning, cold, fire, piercing, slashing
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Darkvision 60 ft., passive Perception 16
languages: Common
cr: "9"
traits:
  - name: Darklord Restoration
    desc: If Saidra dies, she revives with all her Hit Points in 1d10 weeks somewhere in Dementlieu.
  - name: Incorporeal Movement
    desc: Saidra can move through other creatures and objects as if they were Difficult Terrain. She takes 5 (1d10) Force damage if she ends her turn inside an object.
  - name: Lie Detector
    desc: Saidra knows whether she hears a lie.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Saidra fails a saving throw, she can choose to succeed instead.
  - name: Sunlight Sensitivity
    desc: While in sunlight, Saidra has Disadvantage on ability checks and attack rolls
actions:
  - name: Multiattack
    desc: Saidra makes three Necrotic Burst attacks. She can replace one of these attacks with a use of Spellcasting.
  - name: Necrotic Burst
    desc: "*Melee Attack Roll:* +7, reach 5 ft. or range 30 ft. *Hit:* 14 (2d10 + 3) Necrotic damage."
  - name: Life Drain
    desc: "*Constitution Saving Throw:* DC 15, one creature Saidra can see within 30 feet. *Failure:* 28 (8d6) Necrotic damage, and its Hit Point maximum decreases by an amount equal to the damage taken. *Success:* Half damage only."
  - name: At Will
    desc: "*Charm Person* (duchess form only), *Fear* (Red Death form only)."
  - name: Spellcasting
    desc: |
      Saidra casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):
  - name: Truth or Die (1/Day)
    desc: |
      Saidra asks a creature she can see within 60 feet to identify itself and casts *Disintegrate* targeting the creature, requiring no Material components and using Charisma as the spellcasting ability (DC 15, with Disadvantage if the target lies).
bonus_actions:
  - name: Shape-Shift
    desc: Saidra shape-shifts into the Red Death, or she returns to her true form as the duchess. Her game statistics are the same in each form. Any equipment she is wearing or carrying isn't transformed.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Saidra can expend a use to take one of the following actions. Saidra regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Lash Out
    desc: Saidra makes one Necrotic Burst attack.
  - name: Shadow Veil
    desc: Saidra gives herself the Invisible condition until the start of her next turn and can fly up to half her Fly Speed. The condition ends early immediately after Saidra deals damage. Saidra can't take this action again until the start of her next turn.
```
