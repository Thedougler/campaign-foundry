---
title: Star Spawn Larva Mage
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Aberration
size: Medium
habitat:
  - Mountain
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Star Spawn Larva Mage
size: Medium
type: aberration
alignment: Typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 168
hit_dice: 16d8 + 96
modifier: 1
speed: 30 ft.
stats: [ 17, 12, 23, 18, 12, 16 ]
saves:
  - dex: 6
  - wis: 6
  - cha: 8
skillsaves:
  - perception: 6
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: psychic
condition_immunities: charmed, frightened, paralysed, petrified, poisoned, restrained
senses: darkvision 60 ft., passive Perception 16
languages: Deep Speech
cr: "16"
traits:
  - name: Return to Worms
    desc: When the mage is reduced to 0 hit points, it breaks apart into a swarm of insects in the same space. Unless the swarm is destroyed, the mage reforms from it 24 hours later.
actions:
  - name: Multiattack
    desc: The mage makes three Slam or Eldritch Bolt attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 7 (1d8 + 3) bludgeoning damage, and the target must succeed on a DC 19 Constitution saving throw or be poisoned until the end of its next turn."
  - name: Eldritch Bolt
    desc: "*Ranged Spell Attack:* +8 to hit, range 60 ft., one target. *Hit:* 19 (3d10 + 3) force damage."
  - name: Plague of Worms (Recharge 6)
    desc: Each creature other than a star spawn within 10 feet of the mage must succeed on a DC 19 Dexterity saving throw or take 22 (5d8) necrotic damage and be blinded and restrained by masses of swarming worms. The affected creature takes 22 (5d8) necrotic damage at the start of each of the mage's turns. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Spellcasting
    desc: |-
      The mage casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *mage hand*, *message*, *minor illusion*

      **1/day:** *dominate monster*
reactions:
  - name: Feed on Weakness
    desc: When a creature within 20 feet of the mage fails a saving throw, the mage gains 10 temporary hit points.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the star spawn larva mage can expend a use to take one of the following actions. The star spawn larva mage regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Slam
    desc: The mage makes one Slam attack.
  - name: Eldritch Bolt (Costs 2 Actions)
    desc: The mage makes one Eldritch Bolt attack.
  - name: Feed (Costs 3 Actions)
    desc: Each creature restrained by the mage's Plague of Worms takes 13 (3d8) necrotic damage, and the mage gains 6 temporary hit points.
```
