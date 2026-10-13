---
title: Mother Lorinda
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Fey
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mother Lorinda
size: Medium
type: fey
alignment: Neutral Evil
ac: 18
hp: 105
hit_dice: 14d8 + 42
modifier: 7
speed: 30 ft., swim 30 ft.
stats: [ 18, 13, 16, 13, 17, 15 ]
saves:
  - str: 7
  - dex: 4
  - con: 6
  - wis: 6
skillsaves:
  - arcana: 7
  - deception: 5
  - perception: 6
  - stealth: 4
senses: Darkvision 60 ft., passive Perception 16
languages: Common, Elvish, Sylvan
cr: "8"
traits:
  - name: Amphibious
    desc: Lorinda can breathe air and water.
  - name: Darklord Restoration
    desc: If Lorinda dies, she revives with all her Hit Points in 1d10 weeks somewhere in Tepest.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Lorinda fails a saving throw, she can choose to succeed instead.
  - name: Mimicry
    desc: Lorinda can mimic noises and animal sounds. A creature that hears the mimicry can tell it is an imitation only with a successful DC 15 Wisdom (Insight) check.
actions:
  - name: Multiattack
    desc: Lorinda makes two Mother's Brand attacks.
  - name: Mother's Brand
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 8 (1d8 + 4) Bludgeoning damage plus 5 (1d10) Fire damage."
  - name: Spellcasting
    desc: |-
      Lorinda casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 14, +6 to hit with spell attacks):

      **At will:** *Charm Person*, *Dancing Lights*, *Disguise Self* (24-hour duration), *Invisibility* (self only, and Lorinda leaves no tracks while Invisible), *Minor Illusion*, *Ray of Sickness* (level 3 version)

      **1/day each:** *Augury*, *Blight*, *Plant Growth*, *Scrying*, *Unseen Servant*
bonus_actions:
  - name: Mother's Visage (1/Day)
    desc: |-
      Lorinda shape-shifts into Mother, a deity revered by the people of Tepest, for 8 hours. Her game statistics are the same in each form. Any equipment she is wearing or carrying isn't transformed.

      While in the form of Mother, Lorinda can use Spellcasting to cast *Charm Person* as a Bonus Action.

      Lorinda reverts to her true form if she drops to 50 Hit Points or fewer.

      When Lorinda reverts to her true form, each creature in a 30-foot Emanation originating from Lorinda is subjected to the following effect. *Wisdom Saving Throw:* DC 14 (the target succeeds automatically if it is a Construct or an Undead). *Failure:* The target has the Frightened condition for 1 minute. While Frightened, the target has Disadvantage on saving throws.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the mother lorinda can expend a use to take one of the following actions. The mother lorinda regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Brand
    desc: Lorinda teleports to an unoccupied space she can see within 30 feet and can make one Mother's Brand attack.
  - name: Overwhelming Presence
    desc: |
      Lorinda casts *Slow*, using the same spellcasting ability as Spellcasting. Lorinda can't take this action again until the start of her next turn.
```
