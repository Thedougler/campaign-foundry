---
title: Morkoth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Aberration
size: Large
habitat:
  - Coastal
  - Underwater
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Morkoth
size: Large
type: aberration
alignment: Typically Chaotic Evil
ac: 17
ac_class: natural armour
hp: 165
hit_dice: 22d10 + 44
modifier: 2
speed: 25 ft., swim 50 ft.
stats: [ 14, 14, 14, 20, 15, 13 ]
saves:
  - dex: 6
  - int: 9
  - wis: 6
skillsaves:
  - arcana: 9
  - history: 9
  - perception: 10
  - stealth: 6
senses: blindsight 30 ft., darkvision 120 ft., passive Perception 20
languages: telepathy 120 ft.
cr: "11"
traits:
  - name: Amphibious
    desc: The morkoth can breathe air and water.
actions:
  - name: Multiattack
    desc: The morkoth makes either two Bite attacks and one Tentacles attack or three Bite attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 9 (2d6 + 2) slashing damage plus 10 (3d6) psychic damage."
  - name: Tentacles
    desc: "*Melee Weapon Attack:* +6 to hit, reach 15 ft., one target. *Hit:* 15 (3d8 + 2) bludgeoning damage, and the target is grappled (escape DC 14) if it is a Large or smaller creature. Until this grapple ends, the target is restrained and takes 15 (3d8 + 2) bludgeoning damage at the start of each of its turns, and the morkoth can't use its tentacles on another target."
  - name: Hypnosis
    desc: The morkoth projects a 30-foot cone of magical energy. Each creature in that area must make a DC 17 Wisdom saving throw. On a failed save, the creature is charmed by the morkoth for 1 minute. While charmed in this way, the target tries to get as close to the morkoth as possible, using its actions to Dash until it is within 5 feet of the morkoth. A charmed target can repeat the saving throw at the end of each of its turns and whenever it takes damage, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature has advantage on saving throws against the morkoth's Hypnosis for 24 hours.
  - name: Spellcasting
    desc: |-
      The morkoth casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 17):

      **At will:** *detect magic*, *mage hand*

      **3/day each:** *darkness*, *dimension door*, *dispel magic*, *lightning bolt*, *sending*
reactions:
  - name: Spell Reflection
    desc: If the morkoth makes a successful saving throw against a spell or a spell attack misses it, the morkoth can choose another creature (including the spellcaster) it can see within 120 feet of it. The spell targets the chosen creature instead of the morkoth. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.
```
