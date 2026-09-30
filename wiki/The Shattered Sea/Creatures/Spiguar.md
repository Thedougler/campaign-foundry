---
type: Creature
summary: "A Spiguar creature (CR 11) used as a ambusher in The Shattered Sea."
sources:
 - "archive/spiguar.md"
---

![[Spiguar - Token.jpg]]

![[Spiguar - Token Stand.jpg]]

![[Spiguar - Reference Sheet.png]]

![[Spiguar - Portrait.jpg]]

## At a glance

- **Role at the table.** Ambusher.
- **Threat.** CR 11. Use its attack range, movement, or control to pressure the Party.
- **Tell.** Its body advertises its next attack before it commits.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation.
- **Used by.** [[Terror-Bird]] patrols the same territory.

> [!narration] First sight
> The spiguar reveals itself through a distinctive silhouette and the tell of its signature attack, making its danger clear before it strikes.

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

Open from its preferred terrain, announce the tell of its strongest option, and let the Party answer with positioning, cover, or focused fire. It retreats when its preferred advantage is gone or it is badly wounded.

### Outside a fight

Its tracks, feeding signs, and territorial behaviour warn the Party before an encounter. It acts according to its habitat and does not pursue beyond the terrain that gives it an advantage.

## Depth

### Ecology

The World is its habitat. Its diet follows its form. Observant travellers can identify its signs with Wisdom (Survival).

### Hidden truths

A careful examination of its remains or territory reveals its habits and weaknesses. A successful relevant Intelligence check confirms them.

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
