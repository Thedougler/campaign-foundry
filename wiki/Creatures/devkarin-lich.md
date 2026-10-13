---
title: Devkarin Lich
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Devkarin Lich
size: Medium
type: undead
alignment: Neutral Evil
ac: 14
ac_class: natural armour
hp: 97
hit_dice: 15d8 + 30
modifier: 3
speed: 30 ft.
stats: [ 11, 16, 14, 19, 16, 15 ]
saves:
  - con: 7
  - int: 9
  - wis: 8
skillsaves:
  - arcana: 14
  - insight: 8
  - perception: 8
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: truesight 120 ft., passive Perception 18
languages: Common, Elvish, Kraul
cr: "14"
traits:
  - name: Spellcasting
    desc: |-
      The lich is a 14th-level Golgari spellcaster. Its spellcasting ability is Intelligence (spell save DC 17, +9 to hit with spell attacks). The lich has the following wizard spells prepared:

      **Cantrips (at will):** *acid splash*, *chill touch*, *mage hand*, *poison spray*, *prestidigitation*

      **1st level (4 slots):** *chromatic orb*, *magic missile*, *ray of sickness*

      **2nd level (3 slots):** *Melf's acid arrow*, *ray of enfeeblement*, *spider climb*, *web*

      **3rd level (3 slots):** *animate dead*, *bestow curse*, *fear*, *vampiric touch*

      **4th level (3 slots):** *blight*, *Evard's black tentacles*

      **5th level (2 slots):** *cloudkill*, *insect plague*

      **6th level (1 slots):** *circle of death*, *create undead*

      **7th level (1 slots):** *finger of death*
  - name: Legendary Resistance (3/Day)
    desc: If the lich fails a saving throw, it can choose to succeed instead.
  - name: Regeneration
    desc: The lich regains 10 hit points at the start of its turn. If the lich takes fire or radiant damage, this trait doesn't function at the start of the lich's next turn. The lich dies only if it starts its turn with 0 hit points and doesn't regenerate.
  - name: Turn Resistance
    desc: The lich has advantage on saving throws against any effect that turns undead.
  - name: Undead Fortitude
    desc: If damage reduces the lich to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the lich drops to 1 hit point instead.
actions:
  - name: Noxious Touch
    desc: "*Melee Spell Attack:* +9 to hit, reach 5 ft., one creature. *Hit:* 14 (4d6) poison damage, and the target must succeed on a DC 17 Constitution saving throw or be poisoned for 1 minute. The poisoned target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the devkarin lich can expend a use to take one of the following actions. The devkarin lich regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Cantrip
    desc: The lich casts one of its cantrips.
  - name: Noxious Touch (Costs 2 Actions)
    desc: The lich uses Noxious Touch.
  - name: Disrupt Life (Costs 3 Actions)
    desc: Each creature within 30 feet of the lich must make a DC 17 Constitution saving throw, taking 21 (6d6) necrotic damage on a failed save, or half as much damage on a successful one.
```
