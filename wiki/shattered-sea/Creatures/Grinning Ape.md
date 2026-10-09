---
type: Creature
summary: "A watching face of the Old Gardens canopy, almost human and not quite,
  split by an unnaturally wide grin."
sources:
  - "archive/session-10.md"
revealed: "Session 10"
title: ""
---

## At a glance

- **Role at the table.** A distance watcher. It shadows a hunt from the shade and slides in when a pack closes on prey. The moment something larger stirs, it runs.
- **Threat.** Unmeasured. It fights nothing on record, and the one the Party saw fled the larger hunter that came its way.
- **Tell.** The grin, a wide split across an almost-human, ape-like face.

> [!narration] First sight
> A face looks back at you from the shade beyond the last terrace, and it keeps on looking as you move. The features sit close to a man's on something ape-like, and the wide grin splits it nearly past each ear. It holds its perch among the trunks and watches you work the fruit bushes.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Grinning Ape"
size: Medium
type: beast
alignment: unaligned
ac: 12
hp: 19
hit_dice: "3d8 + 6"
speed: "30 ft., climb 30 ft."
stats: [16, 14, 14, 6, 12, 7]
skillsaves:
  - athletics: 5
  - perception: 3
senses: "passive Perception 13"
languages: "none"
cr: 0.5
traits: []
actions:
  - name: "Multiattack"
    desc: "The grinning ape makes two Fist attacks."
  - name: "Fist"
    desc: "Melee Attack Roll: +5, reach 5 ft., one target. Hit: 6 (1d6 + 3) Bludgeoning damage."
  - name: "Rock"
    desc: "Ranged Attack Roll: +5, range 25/50 ft., one target. Hit: 6 (1d6 + 3) Bludgeoning damage."
bonus_actions: []
reactions: []
```

## Play

### Tactics

It holds back from a fight and reads it from the shade. When a pack closes on prey it converges with them, as one did behind the wolfrabbits that swarmed a hidden Party member, and it breaks off the instant something larger begins moving its way.

### Outside a fight

It patrols the [[Old Gardens]] canopy in troops of three to five. It watches from the shade past the fruit terraces, holding still long enough that only a deliberate scan turns it up.

## Depth

### Ecology

The species lives in troops of three to five through the [[Old Gardens]] canopy and shares its terraces with [[Wolfrabbit]] packs.

### History

In Session 10, as the Party searched the fruit terraces of the [[Old Gardens]] on [[Aruhe]], a face watched them from deeper shade past the terraces. It was almost human and not quite, ape-like, with a wide grin split unnaturally far, and it held its spot while they worked. When wolfrabbits converged on the spot where Jean-Claude had hidden, it converged with them, and when three groups of trees began to shake with something large pushing through, it ran.

## Links

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
