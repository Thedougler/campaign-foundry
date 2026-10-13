---
title: Lazav
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lazav
size: Medium
type: monstrosity
subtype: shapechanger
alignment: Neutral Evil
ac: 18
ac_class: natural armour
hp: 204
hit_dice: 24d8 + 96
modifier: 7
speed: 40 ft.
stats: [ 16, 24, 18, 22, 20, 22 ]
saves:
  - dex: 13
  - int: 12
  - wis: 11
  - cha: 12
skillsaves:
  - deception: 18
  - insight: 11
  - perception: 11
  - stealth: 19
damage_resistances: necrotic, psychic
damage_immunities: poison
condition_immunities: charmed, frightened, poisoned
gear:
  - shortsword
senses: darkvision 120 ft., passive Perception 21
languages: Common, Thieves' cant
cr: "17"
traits:
  - name: Innate Spellcasting
    desc: |-
      Lazav's innate spellcasting ability is Intelligence (spell save DC 20). He can innately cast the following spells, requiring no material components:

      **At will:** *detect thoughts*, encode thoughts (see chapter 2), *freedom of movement*, *vicious mockery* (4d4 psychic damage)

      **3/day each:** *blur*, *confusion*, *mirror image*

      **1/day each:** *modify memory*, *Rary's telepathic bond*
  - name: Elusive
    desc: No attack roll has advantage against Lazav unless he is incapacitated.
  - name: Legendary Resistance (3/Day)
    desc: If Lazav fails a saving throw, he can choose to succeed instead.
  - name: Shapechanger Savant
    desc: Lazav can use a bonus action to polymorph into a Small or Medium humanoid he has seen. His statistics, other than his size, are the same in each form. Any equipment he is wearing or carrying isn't transformed.
  - name: Psychic Defences
    desc: Unless Lazav is incapacitated, he is immune to magic that allows other creatures to read his thoughts, determine whether he is lying, know his alignment, or know his creature type. Creatures can telepathically communicate with Lazav only if he allows it.
actions:
  - name: Multiattack
    desc: Lazav makes three shortsword attacks.
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +13 to hit, reach 5 ft., one target. *Hit:* 10 (1d6 + 7) piercing damage plus 10 (3d6) psychic damage, and the target has disadvantage on the next attack roll it makes before Lazav's next turn."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Lazav can expend a use to take one of the following actions. Lazav regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Attack
    desc: Lazav makes a weapon attack.
  - name: Cast a Spell (Costs 2 Actions)
    desc: Lazav casts one of his innate spells.
  - name: Shifting Nightmare (Costs 3 Actions)
    desc: "Lazav rapidly takes the form of several nightmarish creatures, lashing out at all nearby. Each creature within 10 feet of Lazav must succeed on a DC 21 Dexterity saving throw or take 18 (4d8) damage of a type chosen by Lazav: acid, cold, fire, lightning, or necrotic."
```
