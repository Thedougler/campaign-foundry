---
title: Asteria
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Asteria
size: Medium
type: humanoid
subtype: human, paladin
alignment: Chaotic Good
ac: 18
ac_class: breastplate, shield
hp: 195
hit_dice: 26d8 + 78
modifier: 5
speed: 30 ft., fly 30 ft. (winged boots)
stats: [ 12, 21, 17, 15, 11, 20 ]
saves:
  - dex: 11
  - con: 9
  - wis: 6
  - cha: 11
skillsaves:
  - acrobatics: 11
  - arcana: 14
  - investigation: 8
  - perception: 12
  - persuasion: 11
  - survival: 6
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: passive Perception 22
languages: Common, Druidic
cr: "18"
traits:
  - name: Guardian Aura
    desc: Whenever a creature of Asteria's choice within 30 feet of her makes a saving throw, Asteria can give the creature advantage on the saving throw (no action required). This trait doesn't function if Asteria has the incapacitated condition.
  - name: Legendary Resistance (3/Day)
    desc: If Asteria fails a saving throw, she can choose to succeed instead.
  - name: Special Equipment
    desc: Asteria wears Winged Boots, which grant her a flying speed (included in her statistics). She also carries one half of a pair of Sending Stones; the other half of the pair is held by Euryale.
actions:
  - name: Multiattack
    desc: Asteria makes two Radiant Blade attacks and uses Bursting Benediction.
  - name: Radiant Blade
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 9 (1d8 + 5) slashing damage plus 13 (3d8) radiant damage."
  - name: Bursting Benediction
    desc: Asteria causes a burst of magical energy to envelop one creature she can see within 60 feet of herself. The target must make a DC 19 Dexterity saving throw, taking 40 (9d8) force damage on a failed save, or half as much damage on a successful one. Asteria or another creature that she can see within 60 feet of herself then regains 10 hit points.
  - name: Spellcasting
    desc: |-
      Asteria casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 19):

      **At will:** *Guidance*, *Light*, *Thaumaturgy*

      **2/day each:** *Bless*, *Freedom of Movement*, *Greater Restoration*, *Plane Shift* (self only), *Protection from Evil and Good*, *Revivify*
bonus_actions:
  - name: Empowering Aegis (Recharge 4–6)
    desc: Asteria summons a spectral version of her shield, which orbits and bolsters one creature of Asteria's choice that she can see within 60 feet of herself. The spectral shield lasts until the start of Asteria's next turn. While the shield is orbiting the creature, the creature has half cover, is immune to the frightened condition, and makes weapon attack rolls with advantage.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Asteria can expend a use to take one of the following actions. Asteria regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Brazen Strike
    desc: Asteria makes one Radiant Blade attack.
  - name: Nimble Sprint
    desc: Asteria moves up to her speed. This movement doesn't provoke opportunity attacks.
  - name: Cast a Spell (Costs 2 Actions)
    desc: Asteria uses Spellcasting.
```
