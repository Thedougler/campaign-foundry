---
title: Sea Hag
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Fey
size: Medium
habitat:
  - Coastal
  - Underwater
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sea Hag
size: Medium
type: fey
alignment: Chaotic Evil
ac: 14
hp: 52
hit_dice: 7d8 + 21
modifier: 1
speed: 30 ft., swim 40 ft.
stats: [ 16, 13, 16, 12, 12, 13 ]
senses: Darkvision 60 ft., passive Perception 11
languages: Common, Giant, Primordial (Aquan)
cr: "2"
traits:
  - name: Coven Magic
    desc: |
      While within 30 feet of at least two hag allies, the hag can cast one of the following spells, requiring no Material components, using the spell's normal casting time, and using Intelligence as the spellcasting ability (spell save DC 11): *Augury*, *Find Familiar*, *Identify*, *Locate Object*, *Scrying*, or *Unseen Servant*. The hag must finish a Long Rest before using this trait to cast that spell again.
  - name: Amphibious
    desc: The hag can breathe air and water.
  - name: Vile Appearance
    desc: "*Wisdom Saving Throw:* DC 11, any Beast or Humanoid that starts its turn within 30 feet of the hag and can see the hag's true form. *Failure:* The target has the Frightened condition until the start of its next turn. *Success:* The target is immune to this hag's Vile Appearance for 24 hours."
actions:
  - name: Claw
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Slashing damage."
  - name: Death Glare (Recharge 5–6)
    desc: "*Wisdom Saving Throw:* DC 11, one Frightened creature the hag can see within 30 feet. *Failure:* If the target has 20 Hit Points or fewer, it drops to 0 Hit Points. Otherwise, the target takes 13 (3d8) Psychic damage."
  - name: Illusory Appearance
    desc: |
      The hag casts *Disguise Self*, using Constitution as the spellcasting ability (spell save DC 13). The spell's duration is 24 hours.
```
