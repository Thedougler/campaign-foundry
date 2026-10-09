---
type: Creature
summary: "Ghost, from the SRD 5.2 monsters."
sources: []
revealed: ""
title: "Ghost"
---

## At a glance

- **Role at the table.** Text.
- **Threat.** Text.
- **Tell.** Text.
- **Weak to.** Text.
- **Used by.** Text.

> [!narration] First sight
> Spoken text for the table.

## Statblock

```statblock
layout: Basic 5e Layout
name: Ghost
size: Medium
type: undead
subtype: ""
alignment: neutral
ac: 11
ac_class: ""
hp: 45
hit_dice: 10d8
speed: 5 ft., fly 40 ft., hover true
stats:
  - 7
  - 13
  - 10
  - 10
  - 12
  - 17
saves: []
skillsaves: []
damage_vulnerabilities: ""
damage_resistances: acid, bludgeoning, cold, fire, lightning, piercing, slashing, thunder
damage_immunities: necrotic, poison
condition_immunities: Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
senses: darkvision 60 ft., passive Perception 11
languages: Common plus one other language
cr: 4
traits:
  - name: Ethereal Sight
    desc: The ghost can see 60 feet into the Ethereal Plane when it is on the Material Plane.
  - name: Incorporeal Movement
    desc: The ghost can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
actions:
  - name: Multiattack
    desc: The ghost makes two Withering Touch attacks.
  - name: Withering Touch
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 19 (3d10 + 3) Necrotic damage."
  - name: Etherealness
    desc: The ghost casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The ghost is visible on the Material Plane while on the Border Ethereal and vice versa, but it can’t affect or be affected by anything on the other plane.
  - name: Horrific Visage
    desc: "*Wisdom Saving Throw:* DC 13, each creature in a 60-foot Cone that can see the ghost and isn’t an Undead. *Failure:* 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the ghost’s next turn. *Success:* The target is immune to this ghost’s Horrific Visage for 24 hours."
  - name: Possession
    desc: "*Charisma Saving Throw:* DC 13, one Humanoid the ghost can see within 5 feet. *Failure:* The target is possessed by the ghost; the ghost disappears, and the target has the Incapacitated condition and loses control of its body. The ghost now controls the body, but the target retains awareness. The ghost can’t be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The ghost’s game statistics are the same, except it uses the possessed target’s Speed, as well as the target’s Strength, Dexterity, and Constitution modifiers. The possession lasts until the body drops to 0 Hit Points or the ghost leaves as a Bonus Action. When the possession ends, the ghost appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost’s Possession for 24 hours. *Success:* The target is immune to this ghost’s Possession for 24 hours."
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

Text.

## Depth

Text.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    order:
      - file.name
```
