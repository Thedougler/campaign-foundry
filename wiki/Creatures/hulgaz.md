---
title: Hulgaz
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hulgaz
size: Large
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 17
ac_class: natural armour
hp: 190
hit_dice: 20d10 + 80
modifier: 0
speed: 30 ft., fly 30 ft. (hover)
stats: [ 17, 10, 18, 14, 15, 20 ]
saves:
  - wis: 7
  - cha: 10
skillsaves:
  - deception: 10
  - insight: 7
  - perception: 7
  - persuasion: 10
damage_resistances: acid; cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, poison
condition_immunities: charmed, poisoned
senses: truesight 120 ft., passive Perception 17
languages: Abyssal, Common, telepathy 120 ft.
cr: "14"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Hulgaz fails a saving throw, she can choose to succeed instead.
  - name: Magic Resistance
    desc: Hulgaz has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Hulgaz makes two Claw attacks and one Intoxicating Sting attack.
  - name: Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 12 (2d8 + 3) slashing damage."
  - name: Intoxicating Sting
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one creature. *Hit:* 8 (1d10 + 3) piercing damage plus 10 (3d6) poison damage, and the target must succeed on a DC 17 Wisdom saving throw or have the charmed condition until the start of Hulgaz's next turn."
  - name: Brimstone Vapour (Recharge 5–6)
    desc: Hulgaz exhales a 30-foot cone of noxious, scorching-hot vapour. Each creature in that area must succeed on a DC 17 Constitution saving throw or have the poisoned condition for 1 minute. While poisoned in this way, a creature takes 31 (7d8) fire damage at the start of each of its turns and has disadvantage on Wisdom saving throws. A target can repeat the Constitution saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Spellcasting
    desc: |-
      Hulgaz casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 18):

      **At will:** *Charm Person*

      **2/day each:** *Dispel Magic*, *Fog Cloud*

      **1/day:** *Teleport*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Hulgaz can expend a use to take one of the following actions. Hulgaz regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Attack
    desc: Hulgaz makes one Claw attack.
  - name: Charm
    desc: Hulgaz uses Spellcasting to cast *Charm Person*.
  - name: Curdle Heart (Costs 2 Actions)
    desc: Hulgaz sours the good feelings of her charmed victims. She chooses any number of creatures she can see who are charmed by her. Each target takes 17 (5d6) psychic damage as the charmed condition applied by Hulgaz ends on it.
```
