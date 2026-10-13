---
title: Juiblex
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Juiblex
size: Huge
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 18
ac_class: natural armour
hp: 350
hit_dice: 28d12 + 168
modifier: 0
speed: 30 ft., climb 30 ft.
stats: [ 24, 10, 23, 20, 20, 16 ]
saves:
  - dex: 7
  - con: 13
  - wis: 12
skillsaves:
  - perception: 12
damage_resistances: cold, fire, lightning
damage_immunities: acid; poison; bludgeoning, piercing, slashing that is nonmagical
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained, stunned, unconscious
senses: truesight 120 ft., passive Perception 22
languages: all, telepathy 120 ft.
cr: "23"
traits:
  - name: Foul
    desc: Any creature other than an Ooze that starts its turn within 10 feet of Juiblex must succeed on a DC 21 Constitution saving throw or be poisoned until the start of the creature's next turn.
  - name: Legendary Resistance (3/Day)
    desc: If Juiblex fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: Juiblex has advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: Juiblex regains 20 hit points at the start of its turn. If it takes fire or radiant damage, this trait doesn't function at the start of its next turn. Juiblex dies only if it starts its turn with 0 hit points and doesn't regenerate.
  - name: Spider Climb
    desc: Juiblex can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: Juiblex makes three Acid Lash attacks.
  - name: Acid Lash
    desc: "*Melee or Ranged Weapon Attack:* +14 to hit, reach 10 ft. or range 60/120 ft., one target. *Hit:* 21 (4d6 + 7) acid damage. Any creature killed by this attack is drawn into Juiblex's body, where the corpse is dissolved after 1 minute."
  - name: Eject Slime (Recharge 5–6)
    desc: Juiblex spews out a corrosive slime, targeting one creature that it can see within 60 feet of it. The target must succeed on a DC 21 Dexterity saving throw or take 55 (10d10) acid damage. Unless the target avoids taking all of this damage, any metal armour worn by the target takes a permanent −1 penalty to the AC it offers, and any metal weapon the target is carrying or wearing takes a permanent −1 penalty to damage rolls. The penalty worsens each time a target is subjected to this effect. If the penalty on an object drops to −5, the object is destroyed. The penalty on an object can be removed by the *mending* spell.
  - name: Spellcasting
    desc: |-
      Juiblex casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 20):

      **At will:** *detect magic*

      **3/day each:** *contagion*, *gaseous form*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Juiblex can expend a use to take one of the following actions. Juiblex regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Attack
    desc: Juiblex makes one Acid Lash attack.
  - name: Corrupting Touch (Costs 2 Actions)
    desc: "*Melee Weapon Attack:* +14 to hit, reach 10 ft., one creature. *Hit:* 21 (4d6 + 7) poison damage, and the target is slimed. Until the slime is scraped off with an action, the target is poisoned, and any creature, other than an Ooze, is poisoned while within 10 feet of the target."
```
