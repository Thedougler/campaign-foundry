---
title: Viktra Mordenheim
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Viktra Mordenheim
size: Medium
type: humanoid
subtype: human
alignment: Lawful Evil
ac: 15
hp: 123
hit_dice: 19d8 + 38
modifier: 3
speed: 30 ft.
stats: [ 11, 16, 15, 21, 10, 10 ]
saves:
  - con: 5
  - cha: 3
skillsaves:
  - arcana: 8
  - investigation: 8
  - medicine: 6
gear:
  - studded leather armour
senses: passive Perception 10
languages: Common, Draconic, Dwarvish, Elvish, Goblin, Halfling
cr: "7"
traits:
  - name: Bolster Inventions
    desc: At the end of each of Viktra's turns, each of her Construct allies in a 5-foot Emanation originating from Viktra gains 5 Temporary Hit Points. This trait doesn't function if Viktra has the Incapacitated condition.
  - name: Darklord Restoration
    desc: If Viktra dies, she revives with all her Hit Points in 1d10 weeks somewhere in Lamordia.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Viktra fails a saving throw, she can choose to succeed instead.
actions:
  - name: Multiattack
    desc: Viktra makes two Lightning Rod attacks. She can replace one attack with a use of Syringe.
  - name: Lightning Rod
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 90 ft. *Hit:* 12 (2d8 + 3) Lightning damage, and the target can't take Reactions until the start of its next turn."
  - name: Syringe
    desc: |-
      *Constitution Saving Throw:* DC 16, one creature Viktra can see within 5 feet. *Failure:* The target has the Poisoned condition for 1 minute. While Poisoned in this way, the target suffers one of the following effects (Viktra's choice). The target repeats the save at the end of each of its turns, ending the effect on itself on a success. The target succeeds automatically after 1 minute:

      - **Corrosive Serum.** The target takes 10 (4d4) Acid damage at the start of each of its turns, and its Speed decreases by 10 feet.  
      - **Deadly Serum.** The target takes 11 (2d10) Necrotic damage at the start of each of its turns, and it can't regain Hit Points.  
      - **Mind-Altering Serum.** The target takes 10 (3d6) Psychic damage at the start of each of its turns, and it has Disadvantage on saving throws to maintain Concentration.  
bonus_actions:
  - name: Activate Constructs (1/Day)
    desc: |
      Viktra casts *Animate Objects*, using Intelligence as the spellcasting ability.
reactions:
  - name: Redirect Attack
    desc: "Trigger: A creature Viktra can see makes an attack roll against her. _Response:_ Viktra chooses a Small or Medium ally within 5 feet of herself. Viktra and that ally swap places, and the ally becomes the target of the attack instead."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Viktra can expend a use to take one of the following actions. Viktra regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Shocking Prod
    desc: Viktra moves up to half her Speed and makes one Lightning Rod attack. Viktra can't take this action again until the start of her next turn.
  - name: Static Explosion
    desc: "*Dexterity Saving Throw:* DC 16, each creature in a 10-foot-radius Sphere centred on a point Viktra can see within 90 feet. *Failure:* 5 (2d4) Lightning damage. *Success:* Half damage."
```
