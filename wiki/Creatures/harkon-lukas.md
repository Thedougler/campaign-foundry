---
title: Harkon Lukas
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Harkon Lukas
size: Medium
type: monstrosity
subtype: lycanthrope
alignment: Chaotic Evil
ac: 15
hp: 187
hit_dice: 22d8 + 88
modifier: 14
speed: 30 ft., 40 ft. (hybrid form only), 50 ft. (dire wolf form only)
stats: [ 21, 18, 19, 14, 16, 19 ]
saves:
  - con: 9
  - wis: 8
skillsaves:
  - perception: 8
  - performance: 9
  - stealth: 9
condition_immunities: charmed, frightened
gear:
  - viol
senses: Darkvision 120 ft., passive Perception 18
languages: Common (can't speak in dire wolf form)
cr: "14"
traits:
  - name: Blood Frenzy
    desc: Harkon has Advantage on attack rolls against any creature that doesn't have all its Hit Points.
  - name: Darklord Restoration
    desc: If Harkon dies, he revives with all his Hit Points in 1d10 weeks somewhere in Kartakass.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Harkon fails a saving throw, he can choose to succeed instead.
  - name: Regeneration
    desc: Harkon gains 10 Hit Points at the start of each of his turns if he has at least 1 Hit Point. If Harkon takes Radiant damage, this trait doesn't function at the start of his next turn.
actions:
  - name: Multiattack
    desc: Harkon makes two Swipe attacks. He can replace one attack with (A) Bite or (B) Enthralling Performance.
  - name: Bite (Dire Wolf or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +10, reach 5 ft. *Hit:* 14 (2d8 + 5) Piercing damage plus 14 (4d6) Necrotic damage. If the target is a Humanoid, it is subjected to the following effect: *Constitution Saving Throw:* DC 17. *Failure:* The target is cursed. If the cursed target drops to 0 Hit Points, it instead becomes a Werewolf under the DM's control and has 50 Hit Points. The curse can't be removed until Harkon dies. *Success:* The target is immune to Harkon's curse for 24 hours."
  - name: Swipe (Dire Wolf or Hybrid Form Only)
    desc: "*Melee Attack Roll:* +10, reach 5 ft. *Hit:* 16 (2d10 + 5) Slashing damage. If the target is a Medium or smaller creature, it has the Prone condition."
  - name: Enthralling Performance (Humanoid Form Only)
    desc: "*Wisdom Saving Throw:* DC 17, each creature in a 30-foot Emanation originating from Harkon. *Failure:* The target has the Charmed condition for 1 hour or until it takes damage."
bonus_actions:
  - name: Shape-Shift
    desc: Harkon shape-shifts into a Large dire wolf-humanoid hybrid or a Large dire wolf, or he returns to his true humanoid form. His game statistics, other than his size, are the same in each form. Any equipment he is wearing or carrying isn't transformed.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Harkon can expend a use to take one of the following actions. Harkon regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Crushing Insult
    desc: Harkon uses Shape-Shift to return to his humanoid form, then uses the following effect. *Wisdom Saving Throw:* DC 17, each creature of Harkon's choice that he can see within 30 feet of himself (creatures Charmed by Harkon automatically fail this save). *Failure:* 16 (3d10) Psychic damage. *Failure or Success:* Harkon can't take this action again until the start of his next turn.
  - name: Pounce
    desc: Harkon moves up to half his Speed and makes one Swipe attack.
  - name: Surprise Bite
    desc: Harkon uses Shape-Shift to turn into his hybrid or dire wolf form and then makes one Bite attack. Harkon can't take this action again until the start of his next turn.
```
