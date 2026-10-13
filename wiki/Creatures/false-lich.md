---
title: False Lich
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: False Lich
size: Medium
type: undead
alignment: typically Neutral Evil
ac: 18
ac_class: natural armour
hp: 199
hit_dice: 21d8 + 105
modifier: 3
speed: 30 ft.
stats: [ 10, 16, 20, 25, 19, 15 ]
saves:
  - con: 12
  - int: 14
  - wis: 11
  - cha: 9
damage_immunities: necrotic; poison; psychic; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned, stunned
senses: truesight 60 ft., passive Perception 14
languages: Abyssal, Common, Draconic, Dwarvish, Elvish, Giant, Infernal, Primordial, Undercommon
cr: "21"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the false lich fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The false lich has advantage on saving throws against spells and magical effects.
actions:
  - name: Multiattack
    desc: The false lich makes two Death Rend attacks and uses Bloodcurdling Lament if available.
  - name: Death Rend
    desc: "*Melee Spell Attack:* +14 to hit, reach 5 ft., one target. *Hit:* 23 (3d10 + 7) necrotic damage."
  - name: Bloodcurdling Lament (Recharge 5–6)
    desc: The false lich emits a hideous shriek charged with malignant energy. Each creature within 30 feet of the false lich must succeed on a DC 22 Wisdom saving throw or have the frightened condition for 1 minute. While frightened in this way, a creature also has the unconscious condition. An affected creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Spellcasting
    desc: |-
      The false lich casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 22):

      **At will:** *Detect Magic*, *Fly*, *Mage Hand*, *Prestidigitation*

      **3/day each:** *Dispel Magic*, *Invisibility* (self only)

      **1/day each:** *Globe of Invulnerability*, *Hold Monster*
bonus_actions:
  - name: Soul Siphon
    desc: |-
      The false lich targets one creature it can see within 120 feet of itself. The target must make a DC 22 Charisma saving throw; if the target has the unconscious condition, it has disadvantage on this saving throw. The target takes 21 (6d6) force damage on a failed save or half as much damage on a successful one. The false lich then regains a number of hit points equal to the amount of force damage taken.

      If this damage reduces the target to 0 hit points, the target immediately dies, its body disappears, and its soul is trapped inside one of the soul gems within the false lich's skull. After 24 hours, the gem transfers the soul to the false lich's creator.

      When the false lich is reduced to 0 hit points, it is destroyed and disintegrates, leaving behind the gems. Crushing a gem releases any souls trapped within, at which point the soul's body re-forms in an unoccupied space nearest to the gem and in the same state as it was when its soul was trapped.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the false lich can expend a use to take one of the following actions. The false lich regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Spiteful Teleport
    desc: The false lich, along with anything it is wearing or carrying, teleports to an unoccupied space it can see within 60 feet of itself. It then makes one Death Rend attack if possible.
  - name: Cast a Spell (Costs 2 Actions)
    desc: The false lich uses Spellcasting.
```
