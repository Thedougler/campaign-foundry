---
title: Orthon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Fiend
size: Large
habitat:
  - Desert
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Orthon
size: Large
type: fiend
subtype: devil
alignment: Typically Lawful Evil
ac: 17
ac_class: half plate
hp: 105
hit_dice: 10d10 + 50
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 22, 16, 21, 15, 15, 16 ]
saves:
  - dex: 7
  - con: 9
  - wis: 6
skillsaves:
  - perception: 10
  - stealth: 11
  - survival: 10
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, poison
condition_immunities: charmed, exhaustion, poisoned
senses: darkvision 120 ft., truesight 30 ft., passive Perception 20
languages: Common, Infernal, telepathy 120 ft.
cr: "10"
traits:
  - name: Magic Resistance
    desc: The orthon has advantage on saving throws against spells and other magical effects.
actions:
  - name: Infernal Dagger
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 11 (2d4 + 6) force damage, and the target must make a DC 17 Constitution saving throw, taking 22 (4d10) poison damage on a failed save, or half as much damage on a successful one. On a failure, the target is poisoned for 1 minute. The poisoned target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Brass Crossbow
    desc: |-
      *Ranged Weapon Attack:* +7 to hit, range 100/400 ft., one target. *Hit:* 14 (2d10 + 3) force damage. The target also suffers one of the following effects of the orthon's choice; the orthon can't use the same effect two rounds in a row:

      - **Acid.** The target must make a DC 17 Constitution saving throw, taking an additional 17 (5d6) acid damage on a failed save, or half as much damage on a successful one.  
      - **Blindness.** The target takes 5 (1d10) radiant damage. In addition, the target and all other creatures within 20 feet of it must each make a successful DC 17 Dexterity saving throw or be blinded until the end of the orthon's next turn.  
      - **Concussion.** The target and each creature within 20 feet of it must make a DC 17 Constitution saving throw, taking 13 (2d12) thunder damage on a failed save, or half as much damage on a successful one.  
      - **Entanglement.** The target must make a successful DC 17 Dexterity saving throw or be restrained for 1 hour by strands of sticky webbing. The target can escape by taking an action to make a DC 17 Strength or Dexterity check and succeeding.  
      - **Paralysis.** The target takes 22 (4d10) lightning damage and must make a successful DC 17 Constitution saving throw or be paralysed for 1 minute. The paralysed target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.  
      - **Tracking.** For the next 24 hours, the orthon knows the direction and distance to the target, as long as it's on the same plane of existence. If the target is on a different plane, the orthon knows which one, but not the exact location there.  
bonus_actions:
  - name: Invisibility Field (Recharge 4–6)
    desc: The orthon becomes invisible. Any equipment it wears or carries is also invisible as long as the equipment is on its person. This invisibility ends immediately after it makes an attack roll or is hit by an attack roll.
reactions:
  - name: Explosive Retribution
    desc: In response to dropping to 15 hit points or fewer, the orthon explodes. All other creatures within 30 feet of it must each make a DC 17 Dexterity saving throw, taking 9 (2d8) fire damage plus 9 (2d8) thunder damage on a failed save, or half as much damage on a successful one. The orthon, its infernal dagger, and its brass crossbow are destroyed.
```
