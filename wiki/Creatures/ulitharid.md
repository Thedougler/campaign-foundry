---
title: Ulitharid
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
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
name: Ulitharid
size: Large
type: aberration
subtype: mind flayer
alignment: Typically Lawful Evil
ac: 15
ac_class: breastplate
hp: 127
hit_dice: 17d10 + 14
modifier: 1
speed: 30 ft.
stats: [ 15, 12, 15, 21, 19, 21 ]
saves:
  - int: 9
  - wis: 8
  - cha: 9
skillsaves:
  - arcana: 9
  - insight: 8
  - perception: 8
  - stealth: 5
senses: darkvision 120 ft., passive Perception 18
languages: Deep Speech, Undercommon, telepathy 2 miles
cr: "9"
traits:
  - name: Creature Sense
    desc: The ulitharid is aware of the presence of creatures within 2 miles of it that have an Intelligence score of 4 or higher. It knows the distance and direction to each creature, as well as each creature's intelligence score, but can't sense anything else about it. A creature protected by a *mind blank* spell, a *nondetection* spell, or similar magic can't be perceived in this manner.
  - name: Magic Resistance
    desc: The ulitharid has advantage on saving throws against spells and other magical effects.
  - name: Psionic Hub
    desc: If an elder brain establishes a psychic link with the ulitharid, the elder brain can form a psychic link with any other creature the ulitharid can detect using its Creature Sense. Any such link ends if the creature falls outside the telepathy ranges of both the ulitharid and the elder brain. The ulitharid can maintain its psychic link with the elder brain regardless of the distance between them, so long as they are both on the same plane of existence. If the ulitharid is more than 5 miles away from the elder brain, it can end the psychic link at any time (no action required).
actions:
  - name: Tentacles
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one creature. *Hit:* 27 (4d10 + 5) psychic damage. If the target is Large or smaller, it is grappled (escape DC 14) and must succeed on a DC 17 Intelligence saving throw or be stunned until this grapple ends."
  - name: Extract Brain
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one incapacitated Humanoid grappled by the ulitharid. *Hit:* 55 (10d10) piercing damage. If this damage reduces the target to 0 hit points, the ulitharid kills the target by extracting and devouring its brain."
  - name: Mind Blast (Recharge 5–6)
    desc: The ulitharid magically emits psychic energy in a 60-foot cone. Each creature in that area must succeed on a DC 17 Intelligence saving throw or take 31 (4d12 + 5) psychic damage and be stunned for 1 minute. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Spellcasting (Psionics)
    desc: |-
      The ulitharid casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 17):

      **At will:** *detect thoughts*, *levitate*

      **1/day each:** *dominate monster*, *feeblemind*, *mass suggestion*, *plane shift* (self only), *project image*, *scrying*, *telekinesis*
```
