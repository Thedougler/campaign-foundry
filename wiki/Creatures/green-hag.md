---
title: Green Hag
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Fey
size: Medium
habitat:
  - Forest
  - Hill
  - Swamp
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Green Hag
size: Medium
type: fey
alignment: Neutral Evil
ac: 17
hp: 82
hit_dice: 11d8 + 33
modifier: 1
speed: 30 ft., swim 30 ft.
stats: [ 18, 12, 16, 13, 14, 14 ]
skillsaves:
  - arcana: 5
  - deception: 4
  - perception: 4
  - stealth: 3
senses: Darkvision 60 ft., passive Perception 14
languages: Common, Elvish, Sylvan
cr: "3"
traits:
  - name: Coven Magic
    desc: |
      While within 30 feet of at least two hag allies, the hag can cast one of the following spells, requiring no Material components, using the spell's normal casting time, and using Intelligence as the spellcasting ability (spell save DC 11): *Augury*, *Find Familiar*, *Identify*, *Locate Object*, *Scrying*, or *Unseen Servant*. The hag must finish a Long Rest before using this trait to cast that spell again.
  - name: Amphibious
    desc: The hag can breathe air and water.
  - name: Mimicry
    desc: The hag can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 14 Wisdom (Insight) check.
actions:
  - name: Multiattack
    desc: The hag makes two Claw attacks.
  - name: Claw
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 8 (1d8 + 4) Slashing damage plus 3 (1d6) Poison damage."
  - name: Spellcasting
    desc: |-
      The hag casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 12, +4 to hit with spell attacks):

      **At will:** *Dancing Lights*, *Disguise Self* (24-hour duration), *Invisibility* (self only, and the hag leaves no tracks while Invisible), *Minor Illusion*, *Ray of Sickness* (level 3 version)
```
