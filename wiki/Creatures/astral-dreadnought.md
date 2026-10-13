---
title: Astral Dreadnought
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 21
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Astral Dreadnought
size: Gargantuan
type: monstrosity
subtype: titan
alignment: Unaligned
ac: 20
ac_class: natural armour
hp: 297
hit_dice: 17d20 + 119
modifier: -2
speed: 15 ft., fly 80 ft. (hover)
stats: [ 28, 7, 25, 5, 14, 18 ]
saves:
  - dex: 5
  - wis: 9
skillsaves:
  - perception: 9
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned, prone, stunned
senses: darkvision 120 ft., passive Perception 19
cr: "21"
traits:
  - name: Antimagic Cone
    desc: The dreadnought's eye creates an area of antimagic, as in the *antimagic field* spell, in a 150-foot cone. At the start of each of its turns, it decides which way the cone faces. The cone doesn't function while the eye is closed or while the dreadnought is blinded.
  - name: Astral Entity
    desc: The dreadnought can't leave the Astral Plane, nor can it be banished or otherwise transported out of that plane.
  - name: Demiplanar Donjon
    desc: Anything the dreadnought swallows is transported to a demiplane that can be entered by no other means except a *wish* spell or the dreadnought's Bite and Donjon Visit. A creature can leave the demiplane only by using magic that enables planar travel, such as the *plane shift* spell. The demiplane resembles a stone cave roughly 1,000 feet in diameter with a ceiling 100 feet high. Like a stomach, it contains the remains of past meals. The dreadnought can't be harmed from within the demiplane. If the dreadnought dies, the demiplane disappears, and everything inside it appears around the dreadnought's corpse. The demiplane is otherwise indestructible.
  - name: Legendary Resistance (3/Day)
    desc: If the dreadnought fails a saving throw, it can choose to succeed instead.
  - name: Sever Silver Cord
    desc: If the dreadnought scores a critical hit against a creature travelling by means of the *astral projection* spell, the dreadnought can cut the target's silver cord instead of dealing damage.
  - name: Unusual Nature
    desc: The dreadnought doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The dreadnought makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +16 to hit, reach 10 ft., one target. *Hit:* 36 (5d10 + 9) force damage. If the target is a Huge or smaller creature and this damage reduces it to 0 hit points or it is incapacitated, the dreadnought swallows it. The swallowed target, along with everything it is wearing and carrying, appears in an unoccupied space on the floor of the Demiplanar Donjon."
  - name: Claw
    desc: "*Melee Weapon Attack:* +16 to hit, reach 20 ft., one target. *Hit:* 19 (3d6 + 9) force damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the astral dreadnought can expend a use to take one of the following actions. The astral dreadnought regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Claw
    desc: The dreadnought makes one Claw attack.
  - name: Donjon Visit (Costs 2 Actions)
    desc: One Huge or smaller creature that the dreadnought can see within 60 feet of it must succeed on a DC 19 Charisma saving throw or be teleported to an unoccupied space on the floor of the Demiplanar Donjon. At the end of the target's next turn, it reappears in the space it left or in the nearest unoccupied space if that space is occupied.
  - name: Psychic Projection (Costs 3 Actions)
    desc: Each creature within 60 feet of the dreadnought must make a DC 19 Wisdom saving throw, taking 26 (4d10 + 4) psychic damage on a failed save, or half as much damage on a successful one.
```
