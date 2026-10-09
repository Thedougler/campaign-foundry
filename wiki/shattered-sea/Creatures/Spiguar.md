---
type: Creature
summary: "A Spiguar creature (CR 11) used as a ambusher in The Shattered Sea."
sources:
  - "archive/session-11-transcript-archived-version.md"
  - "archive/spiguar.md"
revealed: "Session 11"
title: ""
---

![[Spiguar - Token.jpg]]

![[Spiguar - Token Stand.jpg]]

![[Spiguar - Reference Sheet.png]]

![[Spiguar - Portrait.jpg]]

## At a glance

- **Role at the table.** An ambusher that erases its own trail through the grass.
- **Threat.** CR 11, cloaked in standing grass until the pounce comes down.
- **Tell.** A line of bowing grass that travels against the wind.
- **Weak to.** Bare ground, which costs it the grass mantle and the silent step together.
- **Used by.** [[Terror-Bird]] patrols the same territory.

> [!narration] First sight
> Ahead of you a travelling line bows through the grass, its green stalks standing up again behind it. Sabre teeth surface for one stride. The line swings toward you, and the spiguar gathers itself beneath the grass and launches, landing claws first so its catch tips over. From there the fight goes to the grass, closed stalks hiding where the spiguar drags its prize.

## Statblock

```statblock
layout: Basic 5e Layout
name: Spiguar
size: Large
type: monstrosity
alignment: unaligned
ac: "17 (natural armor)"
hp: 178
hit_dice: "17d10 + 85"
speed: "60 ft."
stats: [22, 18, 20, 4, 16, 10]
saves:
  - dexterity: 8
  - constitution: 9
  - wisdom: 7
skillsaves:
  - athletics: 10
  - perception: 7
  - stealth: 12
  - survival: 7
senses: "darkvision 60 ft., passive Perception 17"
languages: "none"
cr: 11
traits:
  - name: "Grass Mantle"
    desc: "In tall grass, brush, or similar vegetation, the spiguar has advantage on Dexterity (Stealth) checks and can take the Hide action as a bonus action. While motionless in such terrain, creatures more than 10 feet away have disadvantage on Wisdom (Perception) checks made to spot it."
  - name: "Reed-Silent Step"
    desc: "The spiguar ignores Difficult Terrain caused by grass, brush, and nonmagical plants. When it moves through tall grass at half speed or slower, it does not leave an obvious crushed trail."
  - name: "Pounce"
    desc: "If the spiguar moves at least 20 feet straight toward a creature and then hits it with a Claw attack on the same turn, the target takes an extra 10 (3d6) slashing damage. If the target is a creature, it must succeed on a DC 18 Strength saving throw or have the Prone condition. If the target is knocked prone, the spiguar can make one Saber Bite attack against it as a bonus action."
actions:
  - name: "Multiattack"
    desc: "The spiguar makes three attacks: one with its Saber Bite and two with its Claws."
  - name: "Saber Bite"
    desc: "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 19 (2d10 + 8) piercing damage. If the target is Large or smaller, it has the Grappled condition (escape DC 18). Until this grapple ends, the spiguar can't use Saber Bite on another target."
  - name: "Claw"
    desc: "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 17 (2d8 + 8) slashing damage."
bonus_actions:
  - name: "Drag Through Grass"
    desc: "The spiguar moves up to half its speed, dragging one creature Grappled by it. This movement ignores Difficult Terrain caused by grass and brush and does not provoke opportunity attacks from the Grappled creature."
  - name: "Cloaking Crouch"
    desc: "The spiguar takes the Hide action."
```

## Play

### Tactics

It stalks its quarry through the tall grass and pounces, the fall bringing the sabre bite down on a prone target, and the drag follows, the grappled body hauled deep into the green. Pressed into the open it drops into a cloaking crouch, and it gives ground back toward the grass.

### Outside a fight

At a walk it parts the grass and lets it rise behind it, and a crushed streak of running is the sign that warns the Party one is near. The one that ambushed the Party near River Slack Basin took a burning blunderbuss round in the shoulder, carried Perrin Black-Jaw north on its back, and left bloodied, refusing the razor-grass patch where something else waited.

## Depth

### Ecology

Tall grass and brush are its hunting ground, and Observant travellers read its comings and goings with Wisdom (Survival).

### Hidden truths

A motionless spiguar in standing grass is hard to spot past ten feet, and an Intelligence check hands the searchers that trick, turning their eyes toward the still patch.

## Links

Related page, [[Terror-Bird]].

```base
filters:
 and:
  - file.hasLink(this.file)
views:
 - type: table
  name: Linked from
  groupBy:
   property: note.type
   direction: ASC
  order:
   - file.name
   - note.summary
```
