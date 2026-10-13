---
title: Starlight Apparition
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Starlight Apparition
size: Medium
type: celestial
alignment: typically Neutral Good
ac: 10
hp: 72
hit_dice: 16d8
modifier: 0
speed: 0 ft., fly 30 ft. (hover)
stats: [ 1, 11, 10, 18, 16, 16 ]
damage_resistances: acid; cold; fire; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison, radiant
condition_immunities: blinded, charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained
senses: darkvision 120 ft., passive Perception 13
languages: the languages it knew in life
cr: "5"
traits:
  - name: Astral Existence
    desc: The apparition can exist only on the Astral Plane. If it is sent to a location not on the Astral Plane, the apparition is destroyed.
  - name: Illumination
    desc: While it has at least 1 hit point, the apparition sheds bright light in a 20-foot radius and dim light for an additional 20 feet.
  - name: Incorporeal Movement
    desc: The apparition can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Unusual Nature
    desc: The apparition doesn't require air, drink, food, or sleep.
actions:
  - name: Radiant Eruption
    desc: "*Melee or Ranged Spell Attack:* +6 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 20 (5d6 + 3) radiant damage, and if the target is a creature, it must succeed on a DC 14 Wisdom saving throw or be blinded for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Possession (Recharge 6)
    desc: |-
      One Humanoid that the apparition can see within 5 feet of itself must succeed on a DC 14 Charisma saving throw or be possessed by the apparition; the apparition then disappears, and the target is incapacitated and loses control of its body. The apparition now controls the body but doesn't deprive the target of awareness. The apparition can't be targeted by any attack, spell, or other effect, and it retains its alignment, Intelligence, Wisdom, Charisma, and immunity to being charmed and frightened. It otherwise uses the possessed target's statistics, but doesn't gain access to the target's knowledge, class features, or proficiencies.

      The possession lasts until the body drops to 0 hit points, the apparition ends it as a bonus action, the body leaves the Astral Plane, or the apparition is forced out by an effect like the *dispel evil and good* spell. When the possession ends, the apparition reappears in an unoccupied space within 5 feet of the body. If it reappears in a location not on the Astral Plane, the apparition is destroyed. The target is immune to this apparition's Possession for 24 hours after succeeding on the saving throw or after the possession ends.
```
