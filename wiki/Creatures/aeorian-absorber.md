---
title: Aeorian Absorber
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aeorian Absorber
size: Large
type: monstrosity
alignment: Neutral Evil
ac: 15
ac_class: natural armour
hp: 171
hit_dice: 18d10 + 72
modifier: 4
speed: 40 ft.
stats: [ 21, 18, 18, 6, 14, 8 ]
saves:
  - wis: 6
  - cha: 3
skillsaves:
  - perception: 6
  - stealth: 8
  - survival: 6
damage_immunities: necrotic, radiant
senses: darkvision 120 ft., passive Perception 16
languages: understands Draconic but can't speak
cr: "10"
traits:
  - name: Magic Resistance
    desc: The absorber has advantage on saving throws against spells and other magical effects.
  - name: Pounce
    desc: If the absorber moves at least 20 feet straight toward a creature and then hits its claws attack on the same turn, that target must succeed on a DC 17 Strength saving throw or be knocked prone. If the target is prone, the absorber can make one bite attack against it as a bonus action.
actions:
  - name: Multiattack
    desc: "The absorber makes three attacks: one with its bite or Mind Bolt and two with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one creature. *Hit:* 10 (1d10 + 5) piercing damage plus 5 (1d10) force damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 8 (1d6 + 5) slashing damage plus 3 (1d6) force damage."
  - name: Mind Bolt
    desc: "*Ranged Spell Attack:* +8 to hit, range 120 ft., one creature. *Hit:* 22 (4d10) psychic damage."
reactions:
  - name: Tail Ray
    desc: When the absorber takes damage from a spell, the absorber takes only half the triggering damage. If the spellcaster is within 60 feet of the absorber, the absorber can force the caster to make a DC 16 Dexterity saving throw. Unless the save succeeds, the caster takes the other half of the damage.
```
