---
title: Yuan-ti Anathema
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Monstrosity
size: Huge
habitat:
  - Desert
  - Forest
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yuan-ti Anathema
size: Huge
type: monstrosity
alignment: Typically Neutral Evil
ac: 16
ac_class: natural armour
hp: 189
hit_dice: 18d12 + 72
modifier: 1
speed: 40 ft., climb 40 ft., swim 40 ft.
stats: [ 23, 13, 19, 19, 17, 20 ]
skillsaves:
  - perception: 11
  - stealth: 5
damage_resistances: acid, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: blindsight 30 ft., darkvision 60 ft., passive Perception 21
languages: Abyssal, Common, Draconic
cr: "12"
traits:
  - name: Magic Resistance
    desc: The anathema has advantage on saving throws against spells and other magical effects.
  - name: Ophidiophobia Aura
    desc: Any creature of the anathema's choice, other than a snake or a yuan-ti, that starts its turn within 30 feet of the anathema must succeed on a DC 17 Wisdom saving throw or become frightened of snakes and yuan-ti. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a target's saving throw is successful or the effect ends for it, the target is immune to this anathema's aura for the next 24 hours.
  - name: Six Heads
    desc: The anathema has advantage on saves against being blinded, charmed, deafened, frightened, stunned, or knocked unconscious.
actions:
  - name: Multiattack (Anathema Form Only)
    desc: The anathema makes two Claw attacks and one Flurry of Bites attack.
  - name: Claw (Anathema Form Only)
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 13 (2d6 + 6) slashing damage."
  - name: Flurry of Bites (Anathema Form Only)
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one creature. *Hit:* 27 (6d6 + 6) piercing damage plus 14 (4d6) poison damage."
  - name: Constrict (Snake Form Only)
    desc: "*Melee Weapon Attack:* +10 to hit, reach 15 ft., one Large or smaller creature. *Hit:* 16 (3d6 + 6) bludgeoning damage plus 7 (2d6) acid damage, and the target is grappled (escape DC 16). Until this grapple ends, the target is restrained, and it takes 16 (3d6 + 6) bludgeoning damage plus 7 (2d6) acid damage at the start of each of its turns. The anathema can constrict only one creature at a time."
  - name: Spellcasting (Anathema Form Only)
    desc: |-
      The anathema casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *animal friendship* (snakes only)

      **3/day each:** *darkness*, *entangle*, *fear*, *polymorph*, *suggestion*
bonus_actions:
  - name: Change Shape
    desc: The anathema transforms into a Huge constrictor snake or back into its true form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```
