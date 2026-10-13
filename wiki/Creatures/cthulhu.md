---
title: Cthulhu
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 25
creature_type: Aberration
size: Gargantuan
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cthulhu
size: Gargantuan
type: aberration
alignment: Chaotic Evil
ac: 19
hp: 385
hit_dice: 22d20 + 154
modifier: 9
speed: 30 ft., climb 30 ft., swim 60 ft.
stats: [ 29, 12, 25, 28, 18, 24 ]
saves:
  - con: 15
  - wis: 12
  - cha: 15
skillsaves:
  - insight: 12
  - perception: 12
  - persuasion: 15
damage_resistances: acid, cold, lightning, psychic
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: Truesight 120 ft., passive Perception 22
languages: all; telepathy 120 ft.
cr: "25"
traits:
  - name: Amphibious
    desc: Cthulhu can breathe air and water.
  - name: Darklord Restoration
    desc: If Cthulhu dies, it revives with all its Hit Points in 1d10 weeks inside the Vault of Cthulhu.
  - name: Impossible Geometry
    desc: Ground, air, and water in a 10-foot Emanation originating from Cthulhu is Difficult Terrain. A creature that starts its turn in the Emanation takes 7 (2d6) Bludgeoning damage.
  - name: Legendary Resistance (4/Day, or 5/Day in Domain)
    desc: If Cthulhu fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: Cthulhu has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Cthulhu makes three Eldritch Claw attacks and uses Spellcasting to cast *Befuddlement* if available or *Mind Spike* (level 4 version). It can replace one Eldritch Claw attack with a use of Tentacle.
  - name: Eldritch Claw
    desc: "*Melee Attack Roll:* +17, reach 10 ft. *Hit:* 18 (2d8 + 9) Slashing damage plus 9 (2d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 19) from one of two limbs."
  - name: Tentacle
    desc: "*Constitution Saving Throw:* DC 25, one creature Grappled by Cthulhu. *Failure:* 21 (6d6) Acid damage plus 13 (3d8) Psychic damage. *Success:* Half damage. *Failure or Success:* The target's Hit Point maximum decreases by an amount equal to the Psychic damage taken, and Cthulhu regains Hit Points equal to that amount."
  - name: Spellcasting
    desc: |-
      Cthulhu casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 25):

      **At will:** *Mind Spike* (level 4 version)

      **3/day each:** *Dream*, *Geas* (can target creatures through dreams)

      **1/day each:** *Befuddlement*, *Plane Shift* (self only)
bonus_actions:
  - name: Warp
    desc: Cthulhu teleports to an unoccupied space it can see within 120 feet, taking creatures it is grappling with it. Then each creature within 10 feet of the space it left is subjected to the following effect. *Strength Saving Throw:* DC 25. *Failure:* 7 (2d6) Bludgeoning damage plus 7 (2d6) Thunder damage, and if the target is a Large or smaller creature, it has the Prone condition. *Success:* Half damage only.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Cthulhu can expend a use to take one of the following actions. Cthulhu regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Clamp
    desc: Cthulhu makes an Eldritch Claw attack.
  - name: Fold Space
    desc: "*Charisma Saving Throw:* DC 25, each creature and object that isn't being worn or carried in a 10-foot-radius Sphere centred on a point Cthulhu can see within 60 feet. *Failure:* 36 (8d8) Force damage, and the target is teleported to an unoccupied space within 60 feet of Cthulhu that is horizontal to it. *Success:* Half damage only. *Failure or Success:* Cthulhu can't take this action again until the start of its next turn."
```
