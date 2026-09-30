---
type: Creature
summary: "A Young Bloodhawk creature (CR 2) used as a skirmisher in The Shattered Sea."
sources:
 - "archive/young-bloodhawk.md"
---

## At a glance

- **Role at the table.** Skirmisher.
- **Threat.** CR 2. Use its attack range, movement, or control to pressure the Party.
- **Tell.** Its body advertises its next attack before it commits.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation.
- **Used by.** [[Commoner]] patrols the same territory.

> [!narration] First sight
> The young bloodhawk reveals itself through a distinctive silhouette and the tell of its signature attack, making its danger clear before it strikes.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Young Bloodhawk"
size: Medium
type: monstrosity
alignment: unaligned
ac: "14 (natural armor)"
hp: 39
hit_dice: "6d8 + 12"
speed: "20 ft., fly 80 ft."
stats: [14, 18, 14, 3, 16, 7]
saves:
  - dexterity: 6
  - wisdom: 5
skillsaves:
  - perception: 5
senses: "passive Perception 15"
languages: "none"
cr: 2
traits:
  - name: Blood-Red Vigil
    desc: "The young bloodhawk has Advantage on Wisdom (Perception) checks that rely on sight."
  - name: Flyby
    desc: "The young bloodhawk doesn't provoke Opportunity Attacks when it flies out of an enemy's reach."
actions:
  - name: Multiattack
    desc: "The young bloodhawk makes two attacks, using Beak or Talon in any combination."
  - name: Beak
    desc: "Melee Attack Roll: +6, reach 5 ft.. Hit: 8 (1d8 + 4) Piercing damage."
  - name: Talon
    desc: "Melee Attack Roll: +6, reach 5 ft.. Hit: 7 (1d6 + 4) Slashing damage."
  - name: Flush Dive (Recharge 5–6)
    desc: "The young bloodhawk flies up to its Fly Speed in a straight line at one flying creature it can see and makes one Beak attack against it. Hit: the target is driven 30 feet straight down. If that brings it to the ground or another solid surface, it takes 7 (2d6) Bludgeoning damage and has the Prone condition."
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

Related page, [[Commoner]].

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
