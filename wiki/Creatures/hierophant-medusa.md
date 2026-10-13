---
title: Hierophant Medusa
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hierophant Medusa
size: Large
type: monstrosity
alignment: Any alignment
ac: 17
ac_class: natural armour
hp: 237
hit_dice: 25d10 + 100
modifier: 5
speed: 40 ft., climb 40 ft., swim 40 ft.
stats: [ 22, 20, 18, 15, 23, 22 ]
saves:
  - con: 10
  - wis: 12
skillsaves:
  - insight: 12
  - perception: 12
  - persuasion: 12
  - religion: 8
  - stealth: 11
damage_immunities: poison
condition_immunities: charmed, frightened, petrified, poisoned
senses: passive Perception 22
languages: Common plus any three languages (Abyssal, Celestial, Druidic, or Infernal recommended)
cr: "17"
traits:
  - name: Devotion's Call (1/Day)
    desc: The medusa can cast the *Resurrection* spell, requiring no material components and using Wisdom as the spellcasting ability.
  - name: Legendary Resistance (4/Day)
    desc: If the medusa fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The medusa makes one Constrict attack, one Final Blade attack, and one Snake Hair attack. Alternatively, it makes two Wrathful Strike attacks.
  - name: Constrict
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 16 (3d6 + 6) bludgeoning damage, and if the target is a Medium or smaller creature, it has the grappled condition (escape DC 20). Until this grapple ends, the target has the restrained condition, and the medusa can't constrict another creature."
  - name: Final Blade
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 13 (2d6 + 6) slashing damage plus 21 (6d6) force damage. If the target has at least one head and the medusa rolled a 20 on the attack roll, the target is decapitated and dies if it fails a DC 20 Constitution saving throw and can't survive without that head. A target is immune to this effect if it takes none of the damage, has legendary actions, or is Huge or larger. Such a creature takes an extra 28 (8d6) force damage from the hit."
  - name: Snake Hair
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 11 (1d10 + 6) piercing damage plus 5 (1d10) poison damage."
  - name: Wrathful Strike
    desc: "*Ranged Spell Attack:* +12 to hit, range 120 ft., one creature. *Hit:* 22 (3d10 + 6) radiant damage, and the target has the blinded condition until the end of its next turn."
  - name: Spellcasting
    desc: |-
      The medusa casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 20):

      **At will:** *Light*, *Spare the Dying*, *Thaumaturgy*

      **2/day:** *Mass Cure Wounds* (cast at 8th level)

      **1/day each:** *Blade Barrier*, *Divination*, *Greater Restoration*
bonus_actions:
  - name: Petrifying Gaze (Recharge 4–6)
    desc: |-
      The medusa unleashes petrifying magic from its eyes in a 30-foot cone. Each creature in that area must make a DC 18 Constitution saving throw if it doesn't have the blinded condition. If the saving throw fails by 5 or more, the creature has the petrified condition. Otherwise, on a failed save, the creature takes 10 (3d6) force damage, begins to turn to stone, and has the restrained condition. The restrained creature must repeat the saving throw at the end of its next turn. On a failed save, it has the petrified condition, and on a successful save, the effect ends on it. The petrification lasts until the creature is freed by the *Greater Restoration* spell or other magic.

      A creature can use its reaction, if available, to shut its eyes to avoid the saving throw. If the creature does so, it has the blinded condition until the end of its next turn.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the hierophant medusa can expend a use to take one of the following actions. The hierophant medusa regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Move
    desc: The medusa moves up to its speed without provoking opportunity attacks.
  - name: Wrathful Blast (Costs 2 Actions)
    desc: The medusa makes one Wrathful Strike attack.
  - name: Final Slash (Costs 3 Actions)
    desc: The medusa makes one Final Blade attack with advantage.
```
