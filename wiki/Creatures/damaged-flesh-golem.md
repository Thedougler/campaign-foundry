---
title: Damaged Flesh Golem
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Damaged Flesh Golem
size: Medium
type: construct
alignment: Neutral
ac: 9
hp: 5
hit_dice: 11d8 + 44
modifier: -1
speed: 30 ft.
stats: [ 19, 9, 18, 6, 10, 5 ]
damage_immunities: lightning; poison; bludgeoning, piercing, slashing from nonmagical attacks that aren't adamantine
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 10
languages: understands the languages of its creator but can't speak
cr: "1"
traits:
  - name: Berserk
    desc: |-
      Whenever the golem starts its turn with 40 hit points or fewer, roll a d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object, with preference for an object smaller than itself. Once the golem goes berserk, it continues to do so until it is destroyed or regains all its hit points.

      The golem's creator, if within 60 feet of the berserk golem, can try to calm it by speaking firmly and persuasively. The golem must be able to hear its creator, who must take an action to make a DC 15 Charisma (Persuasion) check. If the check succeeds, the golem ceases being berserk. If it takes damage while still at 40 hit points or fewer, the golem might go berserk again.
  - name: Aversion of Fire
    desc: If the golem takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn.
  - name: Immutable Form
    desc: The golem is immune to any spell or effect that would alter its form.
  - name: Lightning Absorption
    desc: Whenever the golem is subjected to lightning damage, it takes no damage and instead regains a number of hit points equal to the lightning damage dealt.
  - name: Magic Resistance
    desc: The golem has advantage on saving throws against spells and other magical effects.
  - name: Magic Weapons
    desc: The golem's weapon attacks are magical.
actions:
  - name: Slam
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) bludgeoning damage."
```
