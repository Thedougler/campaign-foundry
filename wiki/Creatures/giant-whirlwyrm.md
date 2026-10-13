---
title: Giant Whirlwyrm
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - Turn of Fortune's Wheel
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Giant Whirlwyrm
size: Huge
type: monstrosity
alignment: Neutral Evil
ac: 17
ac_class: natural armour
hp: 168
hit_dice: 16d12 + 64
modifier: 3
speed: 50 ft., swim 60 ft.
stats: [ 23, 16, 18, 7, 14, 12 ]
skillsaves:
  - perception: 6
  - stealth: 7
damage_immunities: lightning
senses: darkvision 90 ft., passive Perception 16
languages: Draconic
cr: "11"
actions:
  - name: Multiattack
    desc: "The whirlwyrm makes two attacks: one with its bite and one to constrict."
  - name: Bite
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 22 (3d10 + 6) piercing damage."
  - name: Constrict
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one Large or smaller creature. *Hit:* 17 (2d10 + 6) bludgeoning damage plus 17 (2d10 + 6) slashing damage. The target is grappled (escape DC 16) if the whirlwyrm isn't already constricting a creature, and the target is restrained until this grapple ends."
  - name: Thunder Breath (Recharge 5–6)
    desc: The whirlwyrm exhales a line of thunder that is 20 feet long and 5 feet wide. Each creature in that line must make a DC 16 Dexterity saving throw, taking 66 (12d10) thunder damage on a failed save, or half as much damage on a successful one.
  - name: Swallow
    desc: |-
      The whirlwyrm makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is also swallowed, and the grapple ends. While swallowed, the target is blinded and restrained, it has total cover against attacks and other effects outside the whirlwyrm, and it takes 21 (6d6) acid damage at the start of each of the whirlwyrm's turns. A whirlwyrm can have only one creature swallowed at a time.

      If the whirlwyrm takes 30 damage or more on a single turn from the swallowed creature, the whirlwyrm must succeed on a DC 14 Constitution saving throw at the end of that turn or regurgitate the creature, which falls prone in a space within 10 feet of the whirlwyrm. If the whirlwyrm dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 15 feet of movement, exiting prone.
```
