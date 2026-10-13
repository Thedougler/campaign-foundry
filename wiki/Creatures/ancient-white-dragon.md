---
title: Ancient White Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 20
creature_type: Dragon
size: Gargantuan
habitat:
  - Arctic
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient White Dragon
size: Gargantuan
type: dragon
subtype: chromatic
alignment: Chaotic Evil
ac: 20
hp: 333
hit_dice: 18d20 + 144
modifier: 12
speed: 40 ft., burrow 40 ft., fly 80 ft., swim 40 ft.
stats: [ 26, 10, 26, 10, 13, 18 ]
saves:
  - dex: 6
  - wis: 7
skillsaves:
  - perception: 13
  - stealth: 6
damage_immunities: cold
senses: Blindsight 60 ft., Darkvision 120 ft., passive Perception 23
languages: Common, Draconic
cr: "20"
traits:
  - name: Ice Walk
    desc: The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, Difficult Terrain composed of ice or snow doesn't cost it extra movement.
  - name: Legendary Resistance (4/Day, or 5/Day in Lair)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +14, reach 15 ft. *Hit:* 17 (2d8 + 8) Slashing damage plus 7 (2d6) Cold damage."
  - name: Cold Breath (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 22, each creature in a 90-foot Cone. *Failure:* 63 (14d8) Cold damage. *Success:* Half damage."
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Freezing Burst
    desc: "*Constitution Saving Throw:* DC 20, each creature in a 30-foot-radius Sphere centred on a point the dragon can see within 120 feet. *Failure:* 14 (4d6) Cold damage, and the target's Speed is 0 until the end of the target's next turn. *Failure or Success:* The dragon can't take this action again until the start of its next turn."
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
  - name: Frightful Presence
    desc: |
      The dragon casts *Fear*, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18). The dragon can't take this action again until the start of its next turn.
```
