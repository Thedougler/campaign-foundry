---
title: Drow Matron Mother
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 20
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Drow Matron Mother
size: Medium
type: humanoid
subtype: cleric, Drow elf
alignment: Typically Neutral Evil
ac: 17
ac_class: half plate
hp: 247
hit_dice: 33d8 + 99
modifier: 4
speed: 30 ft.
stats: [ 12, 18, 16, 17, 21, 22 ]
saves:
  - con: 9
  - wis: 11
  - cha: 12
skillsaves:
  - insight: 11
  - perception: 11
  - religion: 9
  - stealth: 10
condition_immunities: charmed, frightened, poisoned
senses: darkvision 120 ft., passive Perception 21
languages: Elvish, Undercommon
cr: "20"
traits:
  - name: Fey Ancestry
    desc: The drow has advantage on saving throws against being charmed, and magic can't put the drow to sleep.
  - name: Special Equipment
    desc: The drow wields a tentacle rod.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The drow makes two Demon Staff attacks or one Demon Staff attack and three Tentacle Rod attacks.
  - name: Demon Staff
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) bludgeoning damage, or 8 (1d8 + 4) bludgeoning damage if used with two hands, plus 14 (4d6) psychic damage. The target must succeed on a DC 19 Wisdom saving throw or become frightened of the drow for 1 minute. The frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Tentacle Rod
    desc: "*Melee Weapon Attack:* +9 to hit, reach 15 ft., one creature. *Hit:* 3 (1d6) bludgeoning damage. If the target is hit three times by the rod on one turn, the target must succeed on a DC 15 Constitution saving throw or suffer the following effects for 1 minute: the target's speed is halved, it has disadvantage on Dexterity saving throws, and it can't use reactions. Moreover, on each of its turns, it can take either an action or a bonus action, but not both. At the end of each of its turns, it can repeat the saving throw, ending the effect on itself on a success."
  - name: Divine Flame (2/Day)
    desc: A 10-foot-radius, 40-foot-high column of divine fire sprouts in an area up to 120 feet away from the drow. Each creature in the column must make a DC 20 Dexterity saving throw, taking 14 (4d6) fire damage and 14 (4d6) radiant damage on a failed save, or half as much damage on a successful one.
  - name: Spellcasting
    desc: |-
      The drow casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 20):

      **At will:** *command*, *dancing lights*, *detect magic*, *thaumaturgy*

      **2/day each:** *banishment*, *blade barrier*, *cure wounds*, *hold person*, *plane shift*, *silence*

      **1/day each:** *clairvoyance*, *darkness*, *detect thoughts*, *dispel magic*, *faerie fire*, *gate*, *levitate* (self only), *suggestion*
bonus_actions:
  - name: Lolth's Fickle Favour
    desc: The drow bestows the Spider Queen's blessing on one ally she can see within 30 feet of her. The ally takes 7 (2d6) psychic damage but has advantage on the next attack roll it makes before the end of its next turn.
  - name: Summon Servant (1/Day)
    desc: The drow magically summons a glabrezu or a yochlol. The summoned creature appears in an unoccupied space within 60 feet of its summoner, acts as an ally of its summoner, and can't summon other demons. It remains for 10 minutes, until it or its summoner dies, or until its summoner dismisses it as an action.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the drow matron mother can expend a use to take one of the following actions. The drow matron mother regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Compel Demon
    desc: An allied demon within 30 feet of the drow uses its reaction to make one attack against a target of the drow's choice that she can see.
  - name: Demon Staff
    desc: The drow makes one Demon Staff attack.
  - name: Cast a Spell (Costs 2 Actions)
    desc: The drow uses Spellcasting.
```
