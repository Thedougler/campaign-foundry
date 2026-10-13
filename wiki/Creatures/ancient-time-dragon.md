---
title: Ancient Time Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 26
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Time Dragon
size: Gargantuan
type: dragon
alignment: typically Neutral
ac: 22
ac_class: natural armour
hp: 536
hit_dice: 29d20 + 232
modifier: 2
speed: 40 ft., climb 40 ft., fly 80 ft.
stats: [ 28, 14, 26, 27, 18, 23 ]
saves:
  - dex: 10
  - con: 16
  - wis: 12
  - cha: 14
skillsaves:
  - arcana: 16
  - history: 24
  - perception: 20
  - stealth: 18
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 30
languages: all
cr: "26"
traits:
  - name: Cycle of Rebirth
    desc: If the dragon dies, its soul coalesces into a steely egg and teleports to a random plane of existence. The egg is immune to all damage and hatches into a time dragon wyrmling after 1d100 years. The dragon retains all memories and knowledge it gained in its previous life.
  - name: Legendary Resistance (5/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks.
  - name: Rend
    desc: "*Melee Weapon Attack:* +17 to hit, reach 15 ft., one target. *Hit:* 22 (3d8 + 9) slashing damage plus 10 (3d6) force damage."
  - name: Time Breath (Recharge 5–6)
    desc: The dragon exhales a wave of shimmering light in a 90-foot cone. Nonmagical objects and vegetation in that area that aren't being worn or carried crumble to dust. Each creature in that area must make a DC 24 Constitution saving throw. On a failed save, a creature takes 52 (8d12) force damage and is magically weakened as it is desynchronized from the time stream. While the creature is in this state, attack rolls against it have advantage, it has the poisoned condition, and other creatures have resistance to all damage it deals. On a successful save, the creature takes half as much damage only. A weakened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself after it succeeds on three of these saves.
  - name: Time Gate (1/Day)
    desc: The dragon conjures a 20-foot-diameter, circular portal in the space between its horns or in an unoccupied space it can see within 30 feet of itself. The portal links to a precise location on any plane of existence at a point in time up to 8,000 years from the present, whether past or future. The portal lasts for 24 hours or until the dragon's concentration ends (as if concentrating on a spell). The portal has a front and a back on each plane where it appears. Travel through the portal is possible only by moving through its front. Anything that does so is transported to the destination, appearing in the unoccupied space nearest to the portal. Deities and other planar rulers can prevent portals created by the dragon from opening in the rulers' presence or anywhere within their domains.
reactions:
  - name: Reactive Rend
    desc: After using Legendary Resistance or in response to being hit by an attack roll, the dragon makes one Rend attack.
  - name: Slow Time
    desc: Immediately after a creature the dragon can see ends its turn, the dragon targets a creature it can see within 90 feet of itself that is weakened by its Time Breath. Until the weakened effect ends on the target, its speed becomes 0, and its speed can't increase.
  - name: Time Slip
    desc: The dragon halves the damage it takes from an attack made against it, provided it can see the attacker. The dragon can then immediately teleport, along with any equipment it is wearing or carrying, up to 60 feet to an unoccupied space it can see.
```
