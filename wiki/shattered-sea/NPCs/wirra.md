---
title: "Wirra"
type: NPC
summary: "Mosquito humanoid and the Five Blades' precise, unsentimental medic, who charges separately and up front."
sources:
  - "archive/collab-2026-10-13-moucheron-original.md"
revealed: ""
---

## Roleplaying

- **Wants.** Agree the payment before starting medical work.
- **Voice.** Exact questions, practical instructions and brief conclusions. She states the price without softening it.
- **Opening move.** At [[the-flat-water|the Flat Water]] in [[kalowe|Kalowe]], she checks what medical work a prospective client needs. She starts businesslike.
- **Leverage.** She offers medical care alongside her service with the [[five-blades|Five Blades]]. Care takes her time and supplies and costs extra, paid up front.
- **Opens them up.** A clear account of the injury and payment ready.
- **Shuts them down.** Assuming the fighting contract includes medical work.
- **Will share.** What care she offers and its separate terms.
- **Requests.** Asked for treatment on credit: ==Wirra sets her supplies beside the patient. “Medical work is separate. Payment first.”==
- **If ignored.** She packs away the supplies reserved for that request.

## Statblock

For Wirra's fighting, use this conversion of Pointy Hat's Moucheron.

```statblock
layout: Basic 5e Layout
name: "Wirra"
size: Small
type: fey
subtype: ""
alignment: ""
ac: 16
ac_class: ""
hp: 130
hit_dice: "20d6 + 60"
modifier: 4
speed: "30 ft., fly 60 ft."
stats: [12, 19, 17, 14, 14, 13]
saves:
  - dex: 7
  - con: 6
  - wis: 5
skillsaves:
  - acrobatics: 7
  - perception: 5
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: "darkvision 60 ft., passive Perception 15"
languages: "Common, Sylvan"
cr: 8
traits:
  - name: Magic Resistance
    desc: "The moucheron has Advantage on saving throws against spells and other magical effects."
  - name: Sanguivore, Satiated
    desc: "If the moucheron hit a creature with its Stinger on its previous turn, its AC is 17 and its movement does not provoke Opportunity Attacks."
  - name: Sanguivore, Voracious
    desc: "If the moucheron did not hit a creature with its Stinger on its previous turn, it gains a +1 bonus to attack rolls and damage rolls."
actions:
  - name: Multiattack
    desc: "The moucheron makes four Fey Blade attacks. It can replace one attack with a Stinger attack."
  - name: Fey Blade
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 14 (3d6 + 4) Piercing damage."
  - name: Stinger
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 11 (2d6 + 4) Piercing damage."
bonus_actions:
  - name: Feeding Frenzy (2/Day)
    desc: "Immediately after the moucheron hits a Bloodied creature with its Stinger, it gains the benefits of both Sanguivore traits until the end of its next turn, regardless of whether its Stinger hit on its previous turn."
reactions: []
legendary_description: ""
legendary_actions: []
```

## History

Wirra is the company’s medic as well as a [[moucheron|Moucheron]] fighter. Her terms distinguish medical work from the squad’s fighting contract.
