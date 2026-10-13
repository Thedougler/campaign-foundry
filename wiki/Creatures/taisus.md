---
title: Taisus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 19
creature_type: Aberration
size: Huge
habitat:
  - Any
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Taisus
size: Huge
type: aberration
alignment: Chaotic Neutral
ac: 18
hp: 310
hit_dice: 27d12 + 135
modifier: 10
speed: 40 ft., fly 60 ft.
stats: [ 17, 18, 20, 25, 22, 19 ]
skillsaves:
  - arcana: 19
  - insight: 12
  - perception: 12
damage_immunities: poison
condition_immunities: charmed, frightened, grappled, paralysed, petrified, poisoned, restrained
senses: passive Perception 22
languages: all; telepathy 120 ft.
cr: "19"
traits:
  - name: Arcane Immortality
    desc: If the taisus dies, its body crumbles into glittering dust. It gains a new body after 1d10 days, reviving with all its Hit Points, unless a *Wish* spell is cast on its remains to prevent the effects of this trait. The new body appears in an unoccupied space within 5 feet of a location designated by the taisus on its creation.
  - name: Legendary Resistance (4/Day)
    desc: If the taisus fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The taisus has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The taisus makes two Brain Drain attacks.
  - name: Brain Drain
    desc: "*Melee Attack Roll:* +13, reach 20 ft. *Hit:* 20 (3d8 + 7) Force damage plus 16 (3d10) Psychic damage, and if the target is a creature with spell slots, it's subjected to the following effect. *Constitution Saving Throw:* DC 21. *Failure:* The target's highest-level unexpended spell slot is expended."
  - name: Spellcasting
    desc: |-
      The taisus casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 21):

      **At will:** *Detect Magic*, *Fireball* (level 5 version), *Invisibility*, *Mage Hand*

      **2/day each:** Jallarzi's Storm of Radiance, *Plane Shift*, *Scrying*

      **1/day each:** *Befuddlement*, *Disintegrate*
reactions:
  - name: Protective Magic
    desc: |
      The taisus casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the taisus can expend a use to take one of the following actions. The taisus regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Deadly Drain
    desc: The taisus makes a Brain Drain attack. The taisus can't take this action again until the start of its next turn.
  - name: Teleport
    desc: The taisus teleports itself or a willing creature it can see within 10 feet of itself up to 120 feet to an unoccupied space the taisus can see.
```
