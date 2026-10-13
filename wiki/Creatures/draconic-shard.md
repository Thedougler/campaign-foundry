---
title: Draconic Shard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Undead
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Draconic Shard
size: Huge
type: undead
alignment: typically Neutral
ac: 17
ac_class: deflection
hp: 168
hit_dice: 16d12 + 64
modifier: 1
speed: 0 ft., fly 80 ft. (hover)
stats: [ 1, 12, 18, 22, 18, 22 ]
saves:
  - dex: 7
  - int: 12
  - wis: 10
  - cha: 12
skillsaves:
  - arcana: 12
  - history: 12
  - perception: 16
  - stealth: 7
damage_resistances: acid; fire; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: cold, necrotic, poison, psychic
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 26
languages: Common, Draconic, telepathy 120 ft.
cr: "17"
traits:
  - name: Deflection
    desc: The shard's AC includes its Intelligence modifier.
  - name: Incorporeal Movement
    desc: The shard can move through creatures and objects as if they were difficult terrain. If it ends its turn inside an object, it takes 5 (1d10) force damage.
  - name: Legendary Resistance (3/Day)
    desc: If the shard fails a saving throw, it can choose to succeed instead.
  - name: Rejuvenation
    desc: When it drops to 0 hit points, the shard disappears and leaves a Tiny cracked gemstone in its space. The gemstone matches the kind of gem dragon it was in life and has AC 20, 15 hit points, and immunity to all damage except force. Unless the gemstone is destroyed, after 1d20 days, the gemstone dissipates and the shard re-forms, regaining all its hit points and appearing in the place the gemstone once occupied or in the nearest unoccupied space.
  - name: Unusual Nature
    desc: The shard doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The shard makes two Telekinetic Rend attacks.
  - name: Telekinetic Rend
    desc: "*Melee or Ranged Spell Attack:* +12 to hit, reach 10 ft. or range 120 ft., one target. *Hit:* 15 (2d8 + 6) force damage."
  - name: Inhabit Object
    desc: |-
      The shard disappears as it pours its psychic essence into a Medium or smaller nonsentient object it can see within 30 feet of it, magically possessing it. The object uses the shard's AC, and any damage dealt to the object applies to the shard's hit points. The shard inhabits the object until it uses an action to leave; until it is turned; until it is reduced to 0 hit points; or until an effect that ends possession, such as a *dispel evil and good* spell, is used on it. When it leaves the object, it reappears in the nearest unoccupied space.

      While inhabited, the object becomes a magic item if it wasn't already, and a Tiny cracked gemstone matching the kind of gem dragon the shard was in life appears somewhere on the object. The shard can cause the object to fly using the shard's own flying speed, use its senses, speak verbally or telepathically, cast spells, and use its legendary actions.

      If a creature wears or carries the inhabited object, the shard can grant the creature the following benefits:

      Each of the creature's attacks deals an extra 1d8 force damage on a hit.

      The creature gains resistance to psychic damage.
  - name: Psychic Crush (Recharge 5–6)
    desc: The shard unleashes a pulse of psychic power. Each creature of the shard's choice in a 60-foot-radius sphere centred on it must make a DC 20 Intelligence saving throw. On a failed save, the creature takes 55 (10d10) psychic damage and is stunned until the end of its next turn. On a successful save, the creature takes half as much damage and isn't stunned.
  - name: Spellcasting (Psionics)
    desc: |-
      The shard casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 20):

      **At will:** *detect thoughts*, *invisibility*, *telekinesis*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the draconic shard can expend a use to take one of the following actions. The draconic shard regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Rend
    desc: The shard makes one Telekinetic Rend attack.
  - name: Cast a Spell (Costs 2 Actions)
    desc: The shard uses Spellcasting.
  - name: Commanding Thought (Costs 2 Actions)
    desc: The shard targets a creature it can see within 30 feet of it. The target must succeed on a DC 20 Wisdom saving throw or be charmed until the end of its next turn. While charmed in this way, the target becomes the shard's puppet, acting and moving in accordance with its telepathic commands. While under the shard's control, the target can take only the Attack (shard chooses the target) or Dash action on its turn.
```
