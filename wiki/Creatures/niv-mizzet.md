---
title: Niv-Mizzet
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 26
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Niv-Mizzet
size: Gargantuan
type: dragon
alignment: Chaotic Neutral
ac: 22
ac_class: natural armour
hp: 370
hit_dice: 19d20 + 171
modifier: 2
speed: 40 ft., climb 30 ft., fly 80 ft.
stats: [ 29, 14, 29, 30, 17, 25 ]
saves:
  - con: 17
  - int: 18
  - wis: 11
skillsaves:
  - arcana: 18
  - insight: 11
  - perception: 11
damage_resistances: cold, psychic, thunder
damage_immunities: fire, lightning
condition_immunities: charmed
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 21
languages: Common, Draconic
cr: "26"
traits:
  - name: Spellcasting
    desc: |-
      Niv-Mizzet is a 20th-level Izzet spellcaster. His spellcasting ability is Intelligence (spell save DC 26, +18 to hit with spell attacks). He has the following wizard spells prepared:

      **Cantrips (at will):** *fire bolt*, *light*, *prestidigitation*, *ray of frost*, *shocking grasp*

      **1st level (4 slots):** *detect magic*, *magic missile*, *shield*, *thunderwave*, *unseen servant*

      **2nd level (3 slots):** *blur*, *enlarge/reduce*, *flaming sphere*, *hold person*, *scorching ray*

      **3rd level (3 slots):** *counterspell*, *fireball*, *lightning bolt*, *slow*

      **4th level (3 slots):** *confusion*, *dimension door*, *fabricate*

      **5th level (2 slots):** *conjure elemental*, *polymorph*, *wall of fire*, *wall of force*

      **6th level (1 slots):** *chain lightning*, *disintegrate*, *true seeing*

      **7th level (1 slots):** *project image*, *reverse gravity*, *teleport*

      **8th level (1 slots):** *control weather*, *maze*, *power word stun*

      **9th level (1 slots):** *prismatic wall*
  - name: Legendary Resistance (3/Day)
    desc: If Niv-Mizzet fails a saving throw, he can choose to succeed instead.
  - name: Locus of the Firemind
    desc: Niv-Mizzet can maintain concentration on two different spells at the same time. In addition, he has advantage on saving throws to maintain concentration on spells.
  - name: Magic Resistance
    desc: Niv-Mizzet has advantage on saving throws against spells and other magical effects.
  - name: Master Chemister
    desc: When Niv-Mizzet casts a spell that deals damage, he can change the spell's damage to cold, fire, force, lightning, or thunder.
actions:
  - name: Multiattack
    desc: "Niv-Mizzet makes three attacks: one with his bite and two with his claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +17 to hit, reach 15 ft., one target. *Hit:* 18 (2d8 + 9) piercing damage plus 14 (4d6) fire damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +17 to hit, reach 10 ft., one target. *Hit:* 14 (2d4 + 9) slashing damage."
  - name: Tail
    desc: "*Melee Weapon Attack:* +17 to hit, reach 20 ft., one target. *Hit:* 16 (2d6 + 9) bludgeoning damage."
  - name: Fire Breath (Recharge 5–6)
    desc: Niv-Mizzet exhales fire in a 90-foot cone. Each creature in that area must make a DC 25 Dexterity saving throw, taking 91 (26d6) fire damage on a failed save, or half as much damage on a successful one.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Niv-Mizzet can expend a use to take one of the following actions. Niv-Mizzet regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Cantrip
    desc: Niv-Mizzet casts one of his cantrips.
  - name: Tail Attack
    desc: Niv-Mizzet makes a tail attack.
  - name: Wing Attack (Costs 2 Actions)
    desc: Niv-Mizzet beats his wings. Each creature within 15 feet of him must succeed on a DC 25 Dexterity saving throw or take 14 (2d4 + 9) bludgeoning damage and be knocked prone. Niv-Mizzet can then fly up to half his flying speed.
  - name: Dracogenius (Costs 3 Actions)
    desc: Niv-Mizzet regains a spell slot of 3rd level or lower.
```
