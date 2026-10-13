---
title: Fomorian Warlock of the Dark
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fomorian Warlock of the Dark
size: Huge
type: giant
alignment: Any alignment
ac: 15
ac_class: natural armour
hp: 207
hit_dice: 18d12 + 90
modifier: 1
speed: 30 ft.
stats: [ 23, 13, 20, 9, 14, 18 ]
saves:
  - wis: 6
  - cha: 8
skillsaves:
  - arcana: 3
  - perception: 6
  - stealth: 5
gear:
  - greatclub
senses: darkvision 120 ft., passive Perception 16
languages: Giant, Undercommon
cr: "12"
traits:
  - name: Blood Rune
    desc: |-
      The fomorian has a blood rune inscribed on an effigy or some other object in its possession. While holding or wearing the object bearing the rune, the giant can use its Corrupting Hex action and Poisoning Rebuke reaction.

      The object bearing the blood rune has AC 15; 30 hit points; and immunity to necrotic, poison, and psychic damage. The object regains all its hit points at the end of every turn, but it turns to dust if reduced to 0 hit points or when the fomorian dies. If the rune is destroyed, the fomorian can inscribe a blood rune on an object in its possession when it finishes a short or long rest.
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the fomorian's darkvision.
  - name: Legendary Resistance (3/Day)
    desc: If the fomorian fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The fomorian makes three Greatclub attacks. If the fomorian has its blood rune, it can replace one of these attacks with a use of Corrupting Hex.
  - name: Greatclub
    desc: "*Melee Weapon Attack:* +10 to hit, reach 15 ft., one target. *Hit:* 19 (3d8 + 6) bludgeoning damage plus 7 (2d6) necrotic damage."
  - name: Corrupting Hex (Requires Blood Rune)
    desc: The fomorian targets one creature it can see within 60 feet of itself. The target must succeed on a DC 16 Charisma saving throw or take 27 (6d8) necrotic damage and become cursed for 24 hours. While cursed this way, the target's speed is reduced by half, and if it tries to cast a spell, it must first succeed on a DC 16 Intelligence check or the spell fails and is wasted.
  - name: Eldritch Burst
    desc: Magical energy explodes in a 20-foot-radius sphere centred on a point the fomorian can see within 120 feet of itself. Each creature in that area must make a DC 16 Dexterity saving throw. On a failed save, a creature takes 32 (5d12) force damage and has the prone condition. On a successful save, a creature takes half as much damage only.
  - name: Spellcasting
    desc: |-
      The fomorian casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *detect magic*, *levitate*, *mage hand*, *prestidigitation*

      **1/day each:** *detect thoughts*, *suggestion*, *telekinesis*
bonus_actions:
  - name: Creeping Gloom (Recharge 6)
    desc: The fomorian momentarily conjures grasping darkness in a 30-foot-radius sphere centred on a point it can see within 120 feet of itself. Each creature in that area must succeed on a DC 16 Constitution saving throw or take 11 (2d10) necrotic damage and have the blinded condition until the end of its next turn.
reactions:
  - name: Poisoning Rebuke (Requires Blood Rune)
    desc: In response to being damaged by a creature the fomorian can see within 60 feet of itself, the fomorian forces that creature to make a DC 16 Constitution saving throw; on a failed save, the creature has the poisoned condition until the end of its next turn.
```
