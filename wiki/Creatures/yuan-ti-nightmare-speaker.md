---
title: Yuan-ti Nightmare Speaker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Monstrosity
size: Medium
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
name: Yuan-ti Nightmare Speaker
size: Medium
type: monstrosity
subtype: warlock
alignment: Typically Neutral Evil
ac: 14
ac_class: natural armour
hp: 71
hit_dice: 13d8 + 13
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 13, 14, 12, 16 ]
saves:
  - wis: 3
  - cha: 5
skillsaves:
  - deception: 5
  - stealth: 4
damage_immunities: poison
condition_immunities: poisoned
gear:
  - scimitar
senses: darkvision 120 ft., passive Perception 11
languages: Abyssal, Common, Draconic
cr: "4"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the yuan-ti's darkvision.
  - name: Magic Resistance
    desc: The yuan-ti has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The yuan-ti makes one Constrict attack and one Scimitar attack, or it makes two Spectral Fangs attacks.
  - name: Constrict
    desc: "*Melee Weapon Attack:* +5 to hit, reach 10 ft., one target. *Hit:* 10 (2d6 + 3) bludgeoning damage, and the target is grappled (escape DC 14) if it is a Large or smaller creature. Until this grapple ends, the target is restrained. The yuan-ti can constrict only one creature at a time."
  - name: Scimitar (Yuan-ti Form Only)
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage."
  - name: Spectral Fangs
    desc: "*Ranged Spell Attack:* +5 to hit, range 120 ft., one target. *Hit:* 16 (3d8 + 3) necrotic damage."
  - name: Invoke Nightmare (Recharges after a Short or Long Rest)
    desc: |-
      The yuan-ti taps into the nightmares of one creature it can see within 60 feet of it and creates an illusory, immobile manifestation of the creature's deepest fears, visible only to that creature.

      The target must make a DC 13 Intelligence saving throw. On a failed save, the target takes 22 (4d10) psychic damage and is frightened of the manifestation, believing it to be real. The yuan-ti must concentrate to maintain the illusion (as if concentrating on a spell), which lasts for up to 1 minute and can't be harmed. The target can repeat the saving throw at the end of each of its turns, ending the illusion on a success or taking 11 (2d10) psychic damage on a failure.
  - name: Spellcasting (Yuan-ti Form Only)
    desc: |-
      The yuan-ti casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *animal friendship* (snakes only), *mage hand*, *message*, *prestidigitation*

      **3/day:** *suggestion*

      **2/day each:** *darkness*, *fear*
bonus_actions:
  - name: Change Shape
    desc: The yuan-ti transforms into a Medium snake or back into its true form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. If it dies, it stays in its current form.
```
