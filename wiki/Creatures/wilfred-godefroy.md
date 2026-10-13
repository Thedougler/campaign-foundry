---
title: Wilfred Godefroy
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Wilfred Godefroy
size: Medium
type: undead
alignment: Neutral Evil
ac: 12
hp: 72
hit_dice: 16d8
modifier: 2
speed: 30 ft., fly 30 ft.
stats: [ 8, 14, 10, 13, 14, 17 ]
skillsaves:
  - intimidation: 6
  - perception: 5
damage_resistances: acid, bludgeoning, cold, fire, lightning, piercing, slashing, thunder
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
gear:
  - hunting rifle
senses: Darkvision 120 ft., passive Perception 15
languages: Common
cr: "6"
traits:
  - name: Darklord Restoration
    desc: If Wilfred dies, he revives with all his Hit Points in 1d10 weeks somewhere in Mordent.
  - name: Incorporeal Movement
    desc: Wilfred can move through other creatures and objects as if they were Difficult Terrain. He takes 5 (1d10) Force damage if he ends his turn inside an object.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Wilfred fails a saving throw, he can choose to succeed instead.
  - name: Possessive Aura
    desc: Grasping, ghostly servants surround Wilfred in a 5-foot Emanation originating from him. A creature that ends its turn in this area is subjected to the following effect. *Charisma Saving Throw:* DC 14. *Failure:* The target has the Charmed condition. While the creature is Charmed in this way, its Speed is reduced to 0. The target repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
actions:
  - name: Multiattack
    desc: Wilfred makes two attacks, using Object Slam or Hunting Rifle in any combination.
  - name: Object Slam
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 10 (2d6 + 3) Force damage."
  - name: Hunting Rifle
    desc: "*Ranged Attack Roll:* +6, range 40/120 ft. *Hit:* 9 (1d12 + 3) Necrotic damage."
reactions:
  - name: Redirect Attack
    desc: "Trigger: A creature Wilfred can see makes an attack roll against him. _Response:_ Wilfred chooses a Small or Medium creature within 5 feet of himself that has the Charmed condition. Wilfred and that creature swap places, and the creature becomes the target of the attack instead."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Wilfred can expend a use to take one of the following actions. Wilfred regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Bone-Chilling Step
    desc: Wilfred teleports up to 60 feet to an unoccupied space he can see, and each creature within 10 feet of the space he left takes 4 (1d8) Necrotic damage. Wilfred can't take this action again until the start of his next turn.
  - name: Fated Bullet
    desc: "*Dexterity Saving Throw:* DC 14, one creature Wilfred can see within 120 feet. *Failure:* 16 (2d12 + 3) Necrotic damage, and the target can't regain Hit Points until the start of its next turn. *Failure or Success:* Wilfred can't take this action again until the start of his next turn."
  - name: Slam
    desc: Wilfred makes one Object Slam attack.
```
