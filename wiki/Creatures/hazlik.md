---
title: Hazlik
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hazlik
size: Medium
type: humanoid
subtype: human, wizard
alignment: Chaotic Evil
ac: 16
hp: 154
hit_dice: 28d8 + 28
modifier: 13
speed: 30 ft.
stats: [ 10, 16, 12, 20, 15, 16 ]
saves:
  - int: 10
  - wis: 7
skillsaves:
  - arcana: 10
  - history: 10
  - perception: 7
damage_immunities: psychic
condition_immunities: charmed
gear:
  - quarterstaff
senses: passive Perception 17
languages: Abyssal, Common, Draconic, Giant, Infernal, Undercommon
cr: "14"
traits:
  - name: Darklord Restoration
    desc: If Hazlik dies, he revives with all his Hit Points in 1d10 weeks somewhere in Hazlan.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Hazlik fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Hazlik has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Hazlik makes three Arcane Burst attacks.
  - name: Arcane Burst
    desc: "*Melee or Ranged Attack Roll:* +10, reach 5 ft. or range 150 ft. *Hit:* 21 (3d10 + 5) Force damage."
  - name: Spellcasting
    desc: |-
      Hazlik casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 18):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Disguise Self*, *Invisibility*, *Light*, *Mage Armour* (included in AC), *Mage Hand*, *Prestidigitation*

      **2/day each:** *Fly*, *Lightning Bolt* (level 5 version)

      **1/day each:** *Cone of Cold*, *Mind Blank* (cast before combat), *Scrying*, *Teleport*
bonus_actions:
  - name: Wild Magic Surge
    desc: |-
      Hazlik manifests one of the following magic surges, targeting a creature he can see within 120 feet. While Bloodied, Hazlik manifests two surges (roll 1d4; reroll if Hazlik has already used that surge during this turn):

      - **1 Misty Movement.** Hazlik can teleport the target up to 30 feet to an unoccupied space he can see on a surface or liquid large enough to support the target.  
      - **2 Eye Blight.** *Constitution Saving Throw:* DC 18. *Failure:* The target has the Blinded condition until the end of its next turn.  
      - **3 Mind Flare.** *Intelligence Saving Throw:* DC 18. *Failure:* 13 (2d12) Psychic damage, and the target can't take the Magic action until the end of its next turn.  
      - **4 Implode.** *Dexterity Saving Throw:* DC 18. *Failure:* The target takes 10 (3d6) Force damage. *Failure or Success:* Each creature within 5 feet of the target takes 10 (3d6) Force damage.  
reactions:
  - name: Protective Magic (3/Day)
    desc: |
      Hazlik casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Hazlik can expend a use to take one of the following actions. Hazlik regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Arcane Strike
    desc: Hazlik makes one Arcane Burst attack.
  - name: Arcane Teleport
    desc: Hazlik teleports up to 60 feet to an unoccupied space he can see, and each creature within 10 feet of the space he left takes 11 (2d10) Force damage. Hazlik can't take this action again until the start of his next turn.
```
