---
title: Jarad Vod Savo
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Jarad Vod Savo
size: Medium
type: undead
alignment: Neutral Evil
ac: 17
ac_class: natural armour
hp: 180
hit_dice: 24d8 + 72
modifier: 3
speed: 30 ft.
stats: [ 14, 16, 16, 20, 16, 15 ]
saves:
  - con: 10
  - int: 12
  - wis: 10
skillsaves:
  - arcana: 12
  - insight: 10
  - perception: 10
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: darkvision 120 ft., passive Perception 20
languages: Common, Elvish, Kraul
cr: "22"
traits:
  - name: Spellcasting
    desc: |-
      Jarad is a 14th-level Golgari spellcaster. His spellcasting ability is Intelligence (spell save DC 20, +12 to hit with spell attacks). Jarad has the following wizard spells prepared:

      **Cantrips (at will):** *acid splash*, *chill touch*, *mage hand*, *poison spray*, *prestidigitation*

      **1st level (4 slots):** *entangle*, *ray of sickness*, *sleep*

      **2nd level (3 slots):** *Melf's acid arrow*, *ray of enfeeblement*, *spider climb*, *web*

      **3rd level (3 slots):** *animate dead*, *plant growth*, *vampiric touch*

      **4th level (3 slots):** *blight*, *giant insect*, grasping vine

      **5th level (2 slots):** *cloudkill*, *insect plague*

      **6th level (1 slots):** *circle of death*, *create undead*

      **7th level (1 slots):** *finger of death*, *forcecage*
  - name: Legendary Resistance (3/Day)
    desc: If Jarad fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Jarad has advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: Jarad regains 25 hit points at the start of his turn. If he takes fire or radiant damage, this trait doesn't function at the start of his next turn. He dies only if he starts its turn with 0 hit points and doesn't regenerate.
  - name: Spore Infusion
    desc: Jarad is surrounded by a cloud of spores. As a bonus action, he can cause the spores to deal 11 (2d10) poison damage to a creature he can see within 10 feet of him.
  - name: Turn Resistance
    desc: Jarad has advantage on saving throws against any effect that turns undead.
  - name: Undead Fortitude
    desc: If damage reduces Jarad to 0 hit points, he must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, he drops to 1 hit point instead.
actions:
  - name: Multiattack
    desc: "Jarad makes two attacks: one with his Noxious Touch and one with his Staff of Svogthir. He can cast a spell with a casting time of 1 action in place of one of these attacks."
  - name: Noxious Touch
    desc: "*Melee Spell Attack:* +12 to hit, reach 5 ft., one creature. *Hit:* 28 (8d6) poison damage, and the target must succeed on a DC 20 Constitution saving throw or be poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Staff of Svogthir
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) bludgeoning damage plus 13 (3d8) poison damage and 13 (3d8) necrotic damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Jarad can expend a use to take one of the following actions. Jarad regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Cantrip
    desc: Jarad casts one of his cantrips.
  - name: Noxious Touch (Costs 2 Actions)
    desc: Jarad uses Noxious Touch.
  - name: Disrupt Life (Costs 3 Actions)
    desc: Each creature within 30 feet of Jarad must make a DC 20 Constitution saving throw, taking 35 (10d6) necrotic damage on a failed save, or half as much damage on a successful one.
```
