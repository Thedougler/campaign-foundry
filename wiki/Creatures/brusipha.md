---
title: Brusipha
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Brusipha
size: Medium
type: humanoid
subtype: minotaur, warlock
alignment: Chaotic Evil
ac: 14
ac_class: natural armour
hp: 90
hit_dice: 12d8 + 36
modifier: 0
speed: 40 ft.
stats: [ 18, 11, 16, 12, 16, 16 ]
saves:
  - wis: 5
  - cha: 5
skillsaves:
  - deception: 5
  - perception: 7
  - religion: 3
senses: darkvision 60 ft., passive Perception 17
languages: Abyssal, Common
cr: "3"
traits:
  - name: Demonic Ritual
    desc: Brusipha can spend 3 hours performing a ritual that summons 1d3 + 1 barlguras or 1 hezrou. She must sacrifice a Medium or larger living creature to Baphomet during this ritual, and the ritual can be performed only at night. The demons vanish at dawn.
  - name: Labyrinthine Recall
    desc: Brusipha can perfectly recall any path she has travelled.
actions:
  - name: Multiattack
    desc: Brusipha makes two Eldritch Blast attacks.
  - name: Eldritch Blast
    desc: "*Ranged Spell Attack:* +5 to hit, range 120 ft., one target. *Hit:* 8 (1d10 + 3) force damage."
  - name: Gore
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage plus 4 (1d8) necrotic damage. If Brusipha moved at least 10 feet straight toward the target immediately before she hit, the target takes an extra 4 (1d8) piercing damage, and if the target is a creature, it must succeed on a DC 15 Strength saving throw or be pushed up to 10 feet from Brusipha and have the prone condition."
  - name: Incite the Hunters (Recharges after a Short or Long Rest)
    desc: Brusipha allows each ally within 30 feet of herself that has the Unerring Tracker trait to make one weapon attack as a reaction against the target of that ally's Unerring Tracker.
  - name: Spellcasting
    desc: |-
      Brusipha casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *Prestidigitation*, *Speak with Animals*

      **1/day each:** *Bestow Curse*, *Command*, Crown of Madness
bonus_actions:
  - name: Unerring Tracker
    desc: Brusipha magically creates a psychic link with one creature she can see. For the next hour, Brusipha knows the current distance and direction to the target if it is on the same plane of existence. The link ends if Brusipha has the incapacitated condition or uses this ability on a different target.
reactions:
  - name: Baphomet's Blessing
    desc: When Brusipha reduces a hostile creature to 0 hit points, she gains 8 temporary hit points.
```
