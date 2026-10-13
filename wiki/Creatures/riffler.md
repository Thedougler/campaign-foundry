---
title: Riffler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Fey
size: Small
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Riffler
size: Small
type: fey
alignment: typically Chaotic Neutral
ac: 15
ac_class: natural armour
hp: 90
hit_dice: 20d6 + 20
modifier: 3
speed: 30 ft., burrow 20 ft.
stats: [ 8, 16, 12, 11, 15, 17 ]
saves:
  - dex: 6
  - cha: 6
skillsaves:
  - arcana: 6
  - insight: 5
  - sleight of hand: 9
  - stealth: 6
damage_resistances: necrotic, radiant
senses: darkvision 60 ft., passive Perception 12
languages: Common, Sylvan
cr: "5"
traits:
  - name: Card Sense
    desc: The riffler can smell the presence of magical cards, including Decks of Many Things and other magical decks, within 1 mile of itself. It knows the direction to any such cards in that range. Effects that protect a target from divination magic block this sense.
  - name: Riffling Step
    desc: The riffler can burrow through any nonmagical material that isn't iron, shuffling the substance through which the riffler moves aside like cards to form a tunnel that closes behind the riffler.
actions:
  - name: Multiattack
    desc: The riffler makes two Spectral Card attacks.
  - name: Spectral Card
    desc: "*Melee or Ranged Spell Attack:* +6 to hit, reach 5 ft. or range 60 ft., one target. *Hit:* 8 (1d10 + 3) force damage plus 5 (1d10) damage that is radiant if the d10 roll is an even number and necrotic if it's odd."
  - name: Card Spray (Recharge 5–6)
    desc: The riffler magically unleashes a spray of spectral cards in a 30-foot cone. Each creature in that area must make a DC 14 Dexterity saving throw. On a failed save, a creature takes 27 (5d10) force damage and has the restrained condition for 1 minute as cards bind it. On a successful save, a creature takes half as much damage only. A restrained creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Plane Shift
    desc: The riffler casts the *Plane Shift* spell targeting only itself, requiring no material components and using Charisma as the spellcasting ability.
reactions:
  - name: Shuffle Destiny
    desc: When a creature the riffler can see within 30 feet of itself makes an ability check, an attack roll, or a saving throw, the riffler can magically force that creature to roll a d6 and either add the number rolled to the total or subtract it from the total (riffler's choice), potentially changing the outcome.
```
