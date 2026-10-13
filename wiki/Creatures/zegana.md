---
title: Zegana
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Zegana
size: Medium
type: humanoid
subtype: merfolk
alignment: Lawful Neutral
ac: 16
ac_class: natural armour
hp: 130
hit_dice: 20d8 + 40
modifier: 2
speed: 30 ft., swim 40 ft.
stats: [ 11, 14, 14, 20, 18, 16 ]
saves:
  - int: 10
  - wis: 9
skillsaves:
  - insight: 9
  - nature: 10
  - perception: 9
damage_resistances: cold, poison
senses: darkvision 60 ft., passive Perception 19
languages: Common, Elvish, Merfolk
cr: "16"
traits:
  - name: Spellcasting
    desc: |-
      Zegana is a 15th-level Simic spellcaster. Her spellcasting ability is Intelligence (spell save DC 18, +10 to hit with spell attacks). She has the following wizard spells prepared:

      **Cantrips (at will):** *acid splash*, *druidcraft*, *ray of frost*, shape water

      **1st level (4 slots):** *colour spray*, *expeditious retreat*, *fog cloud*, *shield*

      **2nd level (3 slots):** *enlarge/reduce*, *gust of wind*

      **3rd level (3 slots):** *counterspell*, *fly*, *slow*

      **4th level (3 slots):** *control water*, *ice storm*, *polymorph*

      **5th level (2 slots):** *conjure elemental*, *creation*

      **6th level (1 slots):** *move earth*, *wall of ice*

      **7th level (1 slots):** *prismatic spray*, *teleport*

      **8th level (1 slots):** *control weather*, *dominate monster*
  - name: Amphibious
    desc: Zegana can breathe air and water.
  - name: Legendary Resistance (3/Day)
    desc: If Zegana fails a saving throw, she can choose to succeed instead.
  - name: Magic Resistance
    desc: Zegana has advantage on saving throws against spells and other magical effects.
actions:
  - name: Prime Speaker's Trident
    desc: "*Melee or Ranged Weapon Attack:* +10 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 12 (2d6 + 5) piercing damage, and the trident emits a thunderous boom. Each creature in a 15-foot cube originating from the prongs of the trident must make a DC 18 Constitution saving throw. On a failed save, the creature takes 9 (2d8) thunder damage and is pushed 10 feet away from Zegana. If the creature is underwater, the damage is increased to 13 (3d8). On a successful save, the creature takes half as much damage and isn't pushed."
  - name: Deluge (Recharge 4–6)
    desc: Zegana conjures a wave of water that crashes down on an area within 120 feet of her. The area can be up to 30 feet long, up to 10 feet wide, and up to 10 feet tall. Each creature in that area must make a DC 18 Dexterity saving throw. On a failed save, a creature takes 18 (4d8) bludgeoning damage and is knocked prone. On a successful save, a creature takes half as much damage and isn't knocked prone. The water spreads out across the ground, extinguishing unprotected flames it comes in contact with, and then vanishes.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Zegana can expend a use to take one of the following actions. Zegana regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Adaptive Skin
    desc: Zegana gains resistance to one damage type of her choice-acid, fire, lightning, or thunder-until the start of her next turn.
  - name: Trident
    desc: Zegana makes one melee attack with the Prime Speaker's Trident.
  - name: Enlarge (Costs 2 Actions)
    desc: Zegana casts *enlarge/reduce* on herself, using the enlarge option, without expending a spell slot.
  - name: Deluge (Costs 3 Actions)
    desc: Zegana uses Deluge, if available.
```
