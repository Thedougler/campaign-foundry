---
title: Strahd von Zarovich
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Strahd von Zarovich
size: Medium
type: undead
subtype: vampire
alignment: Lawful Evil
ac: 16
hp: 204
hit_dice: 24d8 + 96
modifier: 9
speed: 40 ft., climb 40 ft.
stats: [ 18, 18, 18, 20, 15, 18 ]
saves:
  - dex: 9
  - wis: 7
  - cha: 9
skillsaves:
  - arcana: 15
  - perception: 12
  - religion: 10
  - stealth: 14
damage_resistances: necrotic
senses: Darkvision 120 ft., passive Perception 22
languages: Abyssal, Common, Draconic, Elvish, Giant, Infernal
cr: "15"
traits:
  - name: Darklord Restoration
    desc: If Strahd dies, he revives with all his Hit Points in 1d10 weeks somewhere in Barovia.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Strahd fails a saving throw, he can choose to succeed instead.
  - name: Misty Escape
    desc: If Strahd drops to 0 Hit Points outside his resting place, he uses Shape-Shift to become mist (no action required). If he can't use Shape-Shift, he is destroyed. While Strahd has 0 Hit Points in mist form, he can't return to his vampire form, and he must reach his resting place within 2 hours or be destroyed. Once in his resting place, Strahd returns to his vampire form and has the Paralysed condition until he regains any Hit Points, and he regains 1 Hit Point after spending 1 hour there.
  - name: Spider Climb
    desc: Strahd can climb difficult surfaces, including ceilings, without making an ability check.
  - name: Vampire Weakness
    desc: |-
      Strahd has these weaknesses:

      - **Forbiddance.** Strahd can't enter a residence without an invitation from an occupant.  
      - **Running Water.** Strahd takes 20 Acid damage if he ends his turn in running water.  
      - **Stake to the Heart.** If a weapon that deals Piercing damage is driven into Strahd's heart while Strahd has the Incapacitated condition in his resting place, Strahd has the Paralysed condition until the weapon is removed.  
      - **Sunlight.** Strahd takes 20 Radiant damage if he starts his turn in sunlight. While in sunlight, he has Disadvantage on attack rolls and ability checks.  
actions:
  - name: Multiattack
    desc: Strahd makes two Death Strike attacks. He can replace one of these attacks with a use of (A) Bite or (B) Spellcasting to cast *Fireball* if available.
  - name: Death Strike
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 8 (1d8 + 4) Slashing damage plus 14 (4d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14) from one of two hands."
  - name: Bite (Bat or Vampire Form Only)
    desc: "*Constitution Saving Throw:* DC 17, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. *Failure:* 7 (1d6 + 4) Piercing damage plus 10 (3d6) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and Strahd regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage rises the following night as a Vampire Spawn under Strahd's control, unless the Humanoid is restored to life or its body is destroyed."
  - name: Spellcasting
    desc: |-
      Strahd casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *Detect Thoughts*, *Fog Cloud*, *Mage Hand*

      **2/day each:** *Animate Dead*, *Fireball*, *Gust of Wind*, *Mirror Image*, *Nondetection*

      **1/day each:** *Greater Invisibility*, *Polymorph*, *Scrying*
bonus_actions:
  - name: Shape-Shift
    desc: |-
      If Strahd isn't in sunlight or running water, he shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.), a Medium wolf (Speed 40 ft.), or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or he returns to his vampire form. Anything he is wearing transforms with him.

      While in bat or wolf form, Strahd can't speak. His game statistics, other than his size and Speed, are unchanged.

      While in mist form, Strahd can't take any actions, speak, or manipulate objects. He is weightless and can enter an enemy's space and stop there. If air can pass through a space, Strahd can do so, but he can't pass through liquid. Strahd has Resistance to all damage, except the damage he takes from sunlight.
  - name: Charm
    desc: |
      Strahd casts *Charm Person*, requiring no spell components and using the same spellcasting ability as Spellcasting. When the spell is cast this way, its duration is 24 hours, and the Charmed target is a willing recipient of Strahd's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by Strahd.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Strahd can expend a use to take one of the following actions. Strahd regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Striding Strike
    desc: Strahd moves up to half his Speed, and he makes one Death Strike attack.
  - name: Count's Command
    desc: |
      Strahd casts *Command* (level 2 version), requiring no spell components and using the same spellcasting ability as Spellcasting.
```
