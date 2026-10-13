---
title: Hydroloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hydroloth
size: Medium
type: fiend
subtype: yugoloth
alignment: Typically Neutral Evil
ac: 15
hp: 135
hit_dice: 18d8 + 54
modifier: 5
speed: 20 ft., swim 40 ft.
stats: [ 12, 21, 16, 19, 10, 14 ]
skillsaves:
  - insight: 4
  - perception: 4
damage_vulnerabilities: fire
damage_resistances: cold; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid, poison
condition_immunities: poisoned
senses: blindsight 60 ft., darkvision 60 ft., passive Perception 14
languages: Abyssal, Infernal, telepathy 60 ft.
cr: "9"
traits:
  - name: Amphibious
    desc: The hydroloth can breathe air and water.
  - name: Magic Resistance
    desc: The hydroloth has advantage on saving throws against spells and other magical effects.
  - name: Secure Memory
    desc: The hydroloth is immune to the waters of the River Styx, as well as any effect that would steal or modify its memories or detect or read its thoughts.
  - name: Watery Advantage
    desc: While submerged in liquid, the hydroloth has advantage on attack rolls.
actions:
  - name: Multiattack
    desc: The hydroloth makes two Bite or Claw attacks. It can replace one attack with a use of Spellcasting.
  - name: Bite
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 16 (2d10 + 5) force damage plus 9 (2d10) psychic damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 14 (2d8 + 5) force damage plus 9 (2d10) psychic damage."
  - name: Steal Memory (1/Day)
    desc: The hydroloth targets one creature it can see within 60 feet of it. The target takes 14 (4d6) psychic damage, and it must make a DC 16 Intelligence saving throw. On a successful save, the target becomes immune to this hydroloth's Steal Memory for 24 hours. On a failed save, the target loses all proficiencies; it can't cast spells; it can't understand language; and if its Intelligence and Charisma scores are higher than 5, they become 5. Each time the target finishes a long rest, it can repeat the saving throw, ending the effect on itself on a success. A *greater restoration* or *remove curse* spell cast on the target ends this effect early.
  - name: Teleport
    desc: The hydroloth teleports, along with any equipment it is wearing or carrying, up to 60 feet to an unoccupied space it can see.
  - name: Spellcasting
    desc: |-
      The hydroloth casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 16):

      **At will:** *darkness*, *detect magic*, *dispel magic*, *invisibility* (self only)

      **3/day each:** *control water*, crown of madness, *fear*, *suggestion*
```
