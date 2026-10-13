---
title: Shator Demodand
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shator Demodand
size: Large
type: fiend
alignment: typically Neutral Evil
ac: 19
ac_class: natural armour
hp: 195
hit_dice: 23d10 + 69
modifier: 2
speed: 30 ft., fly 60 ft.
stats: [ 24, 15, 17, 21, 16, 20 ]
saves:
  - dex: 7
  - wis: 8
skillsaves:
  - perception: 13
  - stealth: 7
damage_resistances: cold, fire
damage_immunities: acid, poison
condition_immunities: charmed, frightened, paralysed, poisoned, restrained
senses: truesight 120 ft., passive Perception 23
languages: Abyssal, Common, Demodand, Infernal, telepathy 120 ft.
cr: "16"
traits:
  - name: Boundless Movement
    desc: The shator ignores difficult terrain, and magical effects can't reduce its speed. It can spend 5 feet of movement to automatically remove the grappled condition from itself.
  - name: Jailer (1/Day)
    desc: The shator can cast the *imprisonment* spell, requiring no material components and using Intelligence as the spellcasting ability (chaining effect only; spell save DC 18).
  - name: Liquefaction Ritual
    desc: The shator can perform a 1-minute ritual that turns all willing farastus and kelubars of its choice within 60 feet of itself into a living liquid form. Each liquefied demodand becomes enough liquid to fill a flask. A demodand's liquefaction lasts until a shator uses an action to end it or a creature opens a container holding the liquid. While liquefied in this way, a demodand has the paralysed condition despite any immunity to that condition, it has immunity to all damage, and any curse affecting it is suspended.
  - name: Magic Resistance
    desc: The shator has advantage on saving throws against spells and other magical effects.
  - name: Numbing Secretions
    desc: A creature that touches the shator or hits it with a melee attack while within 5 feet of it must succeed on a DC 17 Dexterity saving throw or have disadvantage on attack rolls and its speed halved until the end of its next turn.
actions:
  - name: Multiattack
    desc: The shator makes one Bite attack and two Enervating Trident attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 17 (3d6 + 7) piercing damage plus 26 (4d12) acid damage. If the target is a creature, it must succeed on a DC 16 Constitution saving throw or have the paralysed condition until the start of the shator's next turn."
  - name: Enervating Trident
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 18 (2d10 + 7) necrotic damage."
  - name: Inhibitory Spray (Recharge 5–6)
    desc: The shator exhales a spray of slime in a line 100 feet long and 5 feet wide. Each creature in that area must make a DC 16 Dexterity saving throw. On a failed save, a creature takes 40 (9d8) acid damage and has the paralysed condition for 1 minute. The creature repeats the saving throw at the end of each of its turns, ending the effect on itself on a success. On a successful save, a creature takes half as much damage only.
  - name: Summon Demodand (1/Day)
    desc: The shator has a 50 percent chance of summoning its choice of 1d4 farastu demodands, 1d2 kelubar demodands, or 1 shator demodand. A summoned demodand appears in an unoccupied space within 60 feet of the shator, acts as an ally of the shator, and can't summon other demodands. It remains for 1 minute, until it or the shator dies, or until the shator dismisses it as an action.
  - name: Spellcasting
    desc: |-
      The shator casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 18, +10 to hit with spell attacks):

      **At will:** *invisibility* (self only), *suggestion*

      **1/day each:** *dispel magic*, *plane shift* (to Carceri only), *scrying* (as an action)
```
