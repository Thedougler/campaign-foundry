---
title: Elder Brain
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Aberration
size: Large
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Elder Brain
size: Large
type: aberration
subtype: mind flayer
alignment: Typically Lawful Evil
ac: 10
hp: 210
hit_dice: 20d10 + 100
modifier: 0
speed: 5 ft., swim 10 ft.
stats: [ 15, 10, 20, 21, 19, 24 ]
saves:
  - int: 10
  - wis: 9
  - cha: 12
skillsaves:
  - arcana: 10
  - deception: 12
  - insight: 14
  - intimidation: 12
  - persuasion: 12
senses: blindsight 120 ft., passive Perception 14
languages: understands Common, Deep Speech, and Undercommon but can't speak, telepathy 5 miles
cr: "14"
traits:
  - name: Creature Sense
    desc: The elder brain is aware of creatures within 5 miles of it that have an Intelligence score of 4 or higher. It knows the distance and direction to each creature, as well as each one's Intelligence score, but can't sense anything else about it. A creature protected by a *mind blank* spell, a *nondetection* spell, or similar magic can't be perceived in this manner.
  - name: Legendary Resistance (3/Day)
    desc: If the elder brain fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The elder brain has advantage on saving throws against spells and other magical effects.
  - name: Telepathic Hub
    desc: The elder brain can use its telepathy to initiate and maintain telepathic conversations with up to ten creatures at a time. The elder brain can let those creatures telepathically hear each other while connected in this way.
actions:
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +7 to hit, reach 30 ft., one target. *Hit:* 20 (4d8 + 2) bludgeoning damage. If the target is a Huge or smaller creature, it is grappled (escape DC 15) and takes 9 (1d8 + 5) psychic damage at the start of each of its turns until the grapple ends. The elder brain can have up to four targets grappled at a time."
  - name: Mind Blast (Recharge 5–6)
    desc: Creatures of the elder brain's choice within 60 feet of it must succeed on a DC 18 Intelligence saving throw or take 32 (5d10 + 5) psychic damage and be stunned for 1 minute. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Spellcasting (Psionics)
    desc: |-
      The elder brain casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *detect thoughts*, *levitate*

      **3/day:** *modify memory*

      **1/day each:** *dominate monster*, *plane shift* (self only)
bonus_actions:
  - name: Psychic Link
    desc: The elder brain targets one incapacitated creature it senses with its Creature Sense trait and establishes a psychic link with the target. Until the link ends, the elder brain can perceive everything the target senses. The target becomes aware that something is linked to its mind once it is no longer incapacitated, and the elder brain can terminate the link at any time (no action required). The target can use an action on its turn to attempt to break the link, doing so with a successful DC 18 Charisma saving throw. On a successful save, the target takes 10 (3d6) psychic damage. The link also ends if the target and the elder brain are more than 5 miles apart. The elder brain can form psychic links with up to ten creatures at a time.
  - name: Sense Thoughts
    desc: The elder brain targets a creature with which it has a psychic link. The elder brain gains insight into the target's emotional state and foremost thoughts (including worries, loves, and hates).
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the elder brain can expend a use to take one of the following actions. The elder brain regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Break Concentration
    desc: The elder brain targets one creature within 120 feet of it with which it has a psychic link. The elder brain breaks the creature's concentration on a spell it has cast. The creature also takes 2 (1d4) psychic damage per level of the spell.
  - name: Psychic Pulse
    desc: The elder brain targets one creature within 120 feet of it with which it has a psychic link. The target and enemies of the elder brain within 30 feet of target take 10 (3d6) psychic damage.
  - name: Sever Psychic Link
    desc: The elder brain targets one creature within 120 feet of it with which it has a psychic link. The elder brain ends the link, causing the creature to have disadvantage on all ability checks, attack rolls, and saving throws until the end of the creature's next turn.
  - name: Tentacle (Costs 2 Actions)
    desc: The elder brain makes one Tentacle attack.
```
