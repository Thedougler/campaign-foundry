---
title: Baernaloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Baernaloth
size: Large
type: fiend
subtype: yugoloth
alignment: typically Neutral Evil
ac: 17
ac_class: natural armour
hp: 256
hit_dice: 27d10 + 108
modifier: 2
speed: 40 ft.
stats: [ 19, 14, 18, 22, 16, 21 ]
saves:
  - con: 10
  - wis: 9
skillsaves:
  - arcana: 12
  - insight: 9
  - perception: 9
damage_resistances: cold; fire; lightning; necrotic; psychic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid, poison
condition_immunities: charmed, frightened, poisoned
senses: truesight 120 ft., passive Perception 19
languages: all, telepathy 120 ft.
cr: "17"
traits:
  - name: Legendary Resistance (4/Day)
    desc: If the baernaloth fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The baernaloth has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The baernaloth makes one Anguishing Bite attack and one Claw attack. It can also use Teleport.
  - name: Anguishing Bite
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 9 (1d10 + 4) piercing damage plus 10 (3d6) psychic damage. If the target is a creature, it can't regain hit points until the start of the baernaloth's next turn."
  - name: Claw
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage plus 17 (5d6) necrotic damage."
  - name: Miasma of Discord (Recharge 5–6)
    desc: The baernaloth exhales gray vapours that coalesce at a point it can see within 120 feet of itself. The vapours fill a 20-foot-radius sphere centred on that point, then vanish. Each non-yugoloth creature in that area must make a DC 19 Wisdom saving throw. On a failed save, the creature takes 35 (10d6) psychic damage and has the charmed condition until the end of its next turn. A creature charmed in this way treats its allies as foes, and the colours of its body and equipment become shades of gray. On a successful save, the creature takes half as much damage only.
  - name: Summon Yugoloth (1/Day)
    desc: The baernaloth has a 50 percent chance of summoning its choice of 1d4 mezzoloths, 1 arcanaloth, or 1 baernaloth (the mezzoloth and arcanaloth appear in the Monster Manual). A summoned yugoloth appears in an unoccupied space within 60 feet of the baernaloth, acts as an ally of the baernaloth, and can't summon other yugoloths. It remains for 1 minute, until it or the baernaloth dies, or until the baernaloth dismisses it as an action.
  - name: Teleport
    desc: The baernaloth teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see.
  - name: Spellcasting
    desc: |-
      The baernaloth casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 20):

      **At will:** *detect thoughts*, *phantasmal force*, *suggestion*

      **1/day each:** *cloudkill*, *plane shift* (self only), *scrying* (as an action)
reactions:
  - name: Afflict Despair
    desc: When a creature that the baernaloth can see within 60 feet of itself hits with an attack roll or succeeds on a saving throw, the baernaloth forces the creature to reroll the d20 and use the new result.
  - name: Inescapable Pain
    desc: When the baernaloth is damaged by another creature, that creature must make a DC 19 Constitution saving throw, taking 14 (4d6) necrotic damage on a failed save, or half as much damage on a successful one.
```
