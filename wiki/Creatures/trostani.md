---
title: Trostani
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Fey
size: Large
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Trostani
size: Large
type: fey
alignment: Neutral Good
ac: 17
ac_class: natural armour
hp: 252
hit_dice: 24d10 + 120
modifier: 2
speed: 30 ft.
stats: [ 19, 14, 20, 16, 30, 25 ]
saves:
  - con: 11
  - wis: 16
  - cha: 13
skillsaves:
  - arcana: 9
  - insight: 16
  - nature: 9
  - perception: 16
  - persuasion: 13
condition_immunities: charmed, grappled
senses: darkvision 120 ft., passive Perception 26
languages: Common, Druidic, Elvish, Sylvan
cr: "18"
traits:
  - name: Innate Spellcasting
    desc: |-
      Trostani's innate spellcasting ability is Wisdom (spell save DC 24). She can innately cast the following spells, requiring no material components:

      **At will:** *dispel magic*, *druidcraft*

      **3/day each:** *bless*, *conjure animals*, *giant insect*, *moonbeam*, *plant growth*, *spike growth*, *suggestion*

      **1/day each:** *conjure fey*, *mass cure wounds*
  - name: Legendary Resistance (3/Day)
    desc: If Trostani fails a saving throw, she can choose to succeed instead.
  - name: Magic Resistance
    desc: Trostani has advantage on saving throws against spells and other magical effects.
  - name: Magic Weapons
    desc: Trostani's weapon attacks are magical.
  - name: Speak with Beasts and Plants
    desc: Trostani can communicate with beasts and plants as if they shared a language.
  - name: Tree Stride
    desc: Once on her turn, Trostani can use 10 feet of her movement to step magically into one living tree within her reach and emerge from a second living tree within 60 feet of the first tree, appearing in an unoccupied space within 5 feet of the second tree. Both trees must be Large or bigger.
actions:
  - name: Multiattack
    desc: "Trostani takes three actions: she uses Constrict and Touch of Order, and she casts a spell with a casting time of 1 action."
  - name: Constrict
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one creature. *Hit:* 15 (3d6 + 5) bludgeoning damage, and the target is grappled (escape DC 19). Until this grapple ends, the target is restrained. Trostani can grapple no more than three targets at a time."
  - name: Touch of Order
    desc: "*Melee Spell Attack:* +16 to hit, reach 5 ft., one creature. *Hit:* 23 (3d8 + 10) radiant damage, and Trostani can choose one magic item she can see in the target's possession. Unless it's an artifact, the item's magic is suppressed until the start of Trostani's next turn."
  - name: Wrath of Mat'Selesnya (Recharge 5–6)
    desc: Trostani conjures a momentary whirl of branches and vines at a point she can see within 60 feet of her. Each creature in a 30-foot cube on that point must make a DC 24 Dexterity saving throw, taking 21 (6d6) bludgeoning damage and 21 (6d6) slashing damage on a failed save, or half as much damage on a successful one.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Trostani can expend a use to take one of the following actions. Trostani regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Voice of Harmony
    desc: Trostani makes one melee attack, with advantage on the attack roll.
  - name: Voice of Life
    desc: Trostani bestows 20 temporary hit points on another creature she can see within 120 feet of her.
  - name: Voice of Order
    desc: Trostani casts *dispel magic*.
  - name: Chorus of the Conclave (Costs 2 Actions)
    desc: Trostani casts *suggestion*. This counts as one of her daily uses of the spell.
  - name: Awaken Grove Guardians (Costs 3 Actions)
    desc: Trostani animates one or two trees she can see within 120 feet of her, causing them to uproot themselves and become awakened trees (see the Monster Manual for their stat blocks) for 1 minute or until Trostani uses a bonus action to end the effect. These trees understand Druidic and obey Trostani's spoken commands, but can't speak. If she issues no commands to them, the trees do nothing but follow her and take the Dodge action.
```
