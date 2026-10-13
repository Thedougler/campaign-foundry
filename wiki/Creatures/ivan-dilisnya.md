---
title: Ivan Dilisnya
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ivan Dilisnya
size: Medium
type: humanoid
subtype: human
alignment: Lawful Evil
ac: 12
hp: 90
hit_dice: 12d8 + 36
modifier: 8
speed: 40 ft., climb 40 ft.
stats: [ 18, 14, 16, 19, 12, 15 ]
saves:
  - dex: 5
  - wis: 4
skillsaves:
  - history: 7
  - investigation: 7
  - perception: 7
senses: passive Perception 17
languages: Common
cr: "5"
traits:
  - name: Darklord Restoration
    desc: If Ivan dies, he revives with all his Hit Points in 1d10 weeks somewhere in Borca.
  - name: Legendary Resistance (2/Day, or 3/Day in Domain)
    desc: If Ivan fails a saving throw, he can choose to succeed instead.
actions:
  - name: Multiattack
    desc: Ivan makes two Foreleg attacks. He can replace one attack with a use of Deadly Contraption.
  - name: Foreleg
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 11 (2d6 + 4) Piercing damage."
  - name: Deadly Contraption
    desc: |-
      *Dexterity Saving Throw:* DC 15, one creature Ivan can see within 30 feet. *Failure:* 13 (3d8) Slashing damage. *Failure or Success:* A flailing clockwork contraption attaches to the target until the start of Ivan's next turn. If the target willingly moves 5 feet or more before then, the target takes 4 (1d8) Slashing damage.

      At the start of Ivan's next turn, the device crumbles to dust and vanishes.
legendary_description: "Legendary Action Uses: 2. Immediately after another creature's turn, Ivan can expend a use to take one of the following actions. Ivan regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Retaliate
    desc: Ivan makes one Foreleg attack.
  - name: Trapped Ground
    desc: |-
      Ivan spreads special caltrops to cover a 20-foot-square area within 5 feet of himself. The caltrops dissolve at the end of Ivan's next turn. Ivan can't take this action again until the start of his next turn.

      When the caltrops appear, each creature in the area is subjected to the following effect; a creature that enters the caltrops for the first time on a turn or ends its turn there is also subjected to this effect. *Dexterity Saving Throw:* DC 15 (a creature makes this save only once per turn). *Failure:* 9 (2d8) Piercing damage, and its Speed is reduced to 0 until the start of its next turn.
```
