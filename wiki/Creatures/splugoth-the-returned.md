---
title: Splugoth the Returned
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Small
habitat: []
sourcebooks:
  - Acquisitions Incorporated
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Splugoth the Returned
size: Small
type: humanoid
subtype: goblinoid
alignment: Neutral Evil
ac: 15
ac_class: natural armour
hp: 27
hit_dice: 6d6 + 6
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 12, 14, 11, 10 ]
saves:
  - int: 4
  - wis: 2
skillsaves:
  - stealth: 6
gear:
  - dagger
senses: darkvision 60 ft., passive Perception 10
languages: Common, Draconic, Elvish, Goblin
cr: "2"
traits:
  - name: Defensive Advantage
    desc: As long as two or more of Splugoth's allies are within 5 feet of him and are not incapacitated, attack rolls against him are made with disadvantage.
  - name: Nimble Escape
    desc: Splugoth can take the Disengage or Hide action as a bonus action on each of his turns.
  - name: Touch of Madness
    desc: Splugoth has advantage on saving throws against being charmed or frightened.
actions:
  - name: Multiattack
    desc: Splugoth makes two attacks with his dagger.
  - name: Dagger
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) slashing damage."
  - name: Word From Beyond (1/Day)
    desc: Splugoth remembers and repeats aloud a few words from a place he entered while walking back from the next world to this one. Each creature of his choice within 30 feet of him that can hear him must succeed on a DC 12 Wisdom saving throw or be stunned until the end of its next turn.
reactions:
  - name: Absorb Attack
    desc: When a creature Splugoth can see hits him with a melee weapon attack, the weapon snags on a pocket of residual resurrectional energy and is caught fast. The attack is negated and the weapon cannot be used until the creature succeeds on a DC 12 Strength (Athletics) check as an action to pull it out of Splugoth. Natural weapons can have their attacks negated by this feature, but can then be retracted automatically at the end of the attacking creature's turn.
```
