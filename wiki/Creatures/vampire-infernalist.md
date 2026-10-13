---
title: Vampire Infernalist
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Undead
size: Small or Medium
habitat:
  - Planar (Nine Hells)
  - Underdark
  - Urban
sourcebooks:
  - Astarion's Book of Hungers
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vampire Infernalist
size: Small or Medium
type: undead
subtype: wizard
alignment: Lawful Evil
ac: 16
hp: 172
hit_dice: 23d8 + 69
modifier: 13
speed: 40 ft., fly 40 ft.
stats: [ 19, 16, 17, 20, 16, 18 ]
saves:
  - con: 8
  - int: 10
skillsaves:
  - arcana: 10
  - perception: 8
  - religion: 10
  - stealth: 8
damage_resistances: fire, necrotic, poison
condition_immunities: poisoned
gear:
  - orb
senses: Darkvision 120 ft. (unimpeded by magical Darkness), passive Perception 18
languages: Common, Infernal
cr: "14"
traits:
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the vampire fails a saving throw, it can choose to succeed instead.
  - name: Misty Escape
    desc: |-
      If the vampire drops to 0 Hit Points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.

      While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralysed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.
  - name: Vampire Weakness
    desc: |-
      The vampire has these weaknesses:

      - **Forbiddance.** The vampire can't enter a residence without an invitation from an occupant.  
      - **Running Water.** The vampire takes 20 Acid damage if it ends its turn in running water.  
      - **Stake to the Heart.** If a weapon that deals Piercing damage is driven into the vampire's heart while the vampire has the Incapacitated condition in its resting place, the vampire has the Paralysed condition until the weapon is removed.  
      - **Sunlight.** The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.  
actions:
  - name: Multiattack (Vampire Form Only)
    desc: The vampire makes two Hellfire Claw attacks and uses Bite.
  - name: Hellfire Claw (Vampire Form Only)
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 13 (2d8 + 4) Slashing damage plus 10 (3d6) Fire damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 17) from one of two claws."
  - name: Bite (Imp or Vampire Form Only)
    desc: "*Constitution Saving Throw:* DC 18, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. *Failure:* 6 (1d4 + 4) Piercing damage plus 16 (3d10) Necrotic damage and the creature loses its highest-level available spell slot (if any). The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control."
  - name: Spellcasting
    desc: |-
      The vampire casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Dispel Magic*, *Fireball* (level 4 version), *Mage Hand*, *Prestidigitation*

      **2/day:** *Scrying*

      **1/day:** *Wall of Fire*
bonus_actions:
  - name: Shape-Shift
    desc: |-
      If the vampire isn't in sunlight or running water, it shape-shifts into a Tiny imp (Speed 20 ft., Fly Speed 40 ft.), or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.

      While in imp form, the vampire's game statistics, other than its size and Speed, are unchanged.

      While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the vampire infernalist can expend a use to take one of the following actions. The vampire infernalist regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Hellfire Strike
    desc: The vampire moves up to half its Speed, and it makes one Hellfire Claw attack.
  - name: Infernal Majesty
    desc: "*Charisma Saving Throw:* DC 17, each creature in a 20-foot Emanation originating from the vampire. *Failure:* 9 (2d8) Psychic damage, and the target has the Frightened condition until the start of its next turn. *Success:* Half damage only. *Failure or Success:* The vampire can't take this action again until the start of its next turn."
  - name: Teleport
    desc: The vampire teleports up to 30 feet to an unoccupied space it can see.
```
