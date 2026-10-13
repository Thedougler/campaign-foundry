---
title: Elemental Cataclysm
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Elemental
size: Gargantuan
habitat:
  - Planar (Elemental Chaos)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Elemental Cataclysm
size: Gargantuan
type: elemental
subtype: titan
alignment: Chaotic Neutral
ac: 20
hp: 370
hit_dice: 20d20 + 160
modifier: 18
speed: 60 ft., burrow 60 ft., fly 80 ft. (hover), swim 80 ft.
stats: [ 26, 19, 27, 9, 14, 9 ]
saves:
  - dex: 11
  - con: 15
  - wis: 9
  - cha: 6
damage_immunities: acid, cold, fire, lightning, poison, thunder
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained, stunned, unconscious
senses: Truesight 150 ft., passive Perception 12
languages: Primordial
cr: "22"
traits:
  - name: Earth Glide
    desc: The cataclysm can burrow through nonmagical, unworked earth and stone. While doing so, the cataclysm doesn't disturb the material it moves through.
  - name: Legendary Resistance (4/Day)
    desc: If the cataclysm fails a saving throw, it can choose to succeed instead.
  - name: Siege Monster
    desc: The cataclysm deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The cataclysm makes two Elemental Burst attacks.
  - name: Elemental Burst
    desc: "*Melee or Ranged Attack Roll:* +15, reach 30 ft. or range 150 ft. *Hit:* 25 (5d6 + 8) damage of a type chosen by the cataclysm: Acid, Cold, Fire, Lightning, or Thunder."
  - name: Cataclysmic Event (Recharge 4–6)
    desc: |-
      The cataclysm creates one of the following effects at random (roll 1d4):

      - **1 Clinging Flames.** *Dexterity Saving Throw:* DC 23, each creature in a 60-foot-radius Sphere centred on a point the cataclysm can see within 150 feet. *Failure:* 45 (13d6) Fire damage. *Success:* Half damage. *Failure or Success:* The target starts burning.  
      - **2 Freezing Waves.** *Strength Saving Throw:* DC 23, each creature in a 90-foot Cone. *Failure:* 22 (5d8) Bludgeoning damage plus 22 (5d8) Cold damage, and the target has the Prone condition. *Success:* Half damage only. *Failure or Success:* The target's Speed is reduced to 0 until the end of its next turn.  
      - **3 Raging Storm.** A storm cloud fills a 60-foot-radius Sphere centred on a point the cataclysm can see within 150 feet. The cloud lasts for 1 minute or until the cataclysm uses Cataclysmic Event again. Creatures entirely in the cloud have the Blinded and Deafened conditions and can't cast spells with a Verbal component. *Dexterity Saving Throw:* DC 23, each creature that enters the cloud for the first time on a turn or starts its turn there. *Failure:* 18 (4d8) Lightning damage plus 18 (4d8) Thunder damage. *Success:* Half damage.  
      - **4 Swallowing Earth.** *Strength Saving Throw:* DC 23, each creature in a 90-foot Cube originating from a point on the ground within 150 feet. *Failure:* 18 (4d8) Bludgeoning damage plus 18 (4d8) Acid damage, and the target has the Prone condition and is buried under rubble. A buried target has the Restrained condition, has Total Cover, and is suffocating. As an action, a buried creature or another creature within 5 feet of it can make a DC 18 Strength (Athletics) check. On a successful check, the creature is no longer buried. *Success:* Half damage only.  
  - name: Control Weather
    desc: |
      The cataclysm casts the *Control Weather* spell, requiring no spell components and using Constitution as the spellcasting ability.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the elemental cataclysm can expend a use to take one of the following actions. The elemental cataclysm regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Eruption
    desc: The cataclysm makes one Elemental Burst attack.
  - name: Rumbling Movement
    desc: The cataclysm moves up to its Speed, Fly Speed, or Swim Speed without provoking Opportunity Attacks. Each creature within 5 feet of the cataclysm as it moves is targeted once by the following effect. *Constitution Saving Throw:* DC 23. *Failure:* The target has the Prone condition. *Failure or Success:* The cataclysm can't take this action again until the start of its next turn.
```
