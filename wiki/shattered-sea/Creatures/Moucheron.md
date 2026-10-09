---
type: Creature
summary: "A Moucheron Creature (CR 1/8) adapted from the 2024 SRD Stirge."
sources:
  - "archive/ket.md"
revealed: ""
title: ""
---

## At a glance

- **Role at the table.** Tiny flying blood-feeder.
- **Threat.** CR 1/8. It attaches to exposed creatures and drains them.
- **Tell.** Its needle mouth lowers before it dives.
- **Weak to.** A quick action that tears it free, or denying it a clear approach.
- **Used by.** [[Ket]].

> [!narration] First sight
> A pigeon-sized winged thing hangs in the air without a sound, then drops its long needle mouth toward the nearest warm wrist.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Moucheron"
size: Tiny
type: monstrosity
subtype: ""
alignment: unaligned
ac: 13
hp: 5
hit_dice: "2d4"
speed: "10 ft., fly 40 ft."
stats: [4, 16, 11, 2, 8, 6]
saves: []
skillsaves: []
senses: "darkvision 60 ft., passive Perception 9"
languages: "None"
cr: "1/8"
traits: []
actions:
  - name: Proboscis
    desc: "Melee Attack Roll: +5, reach 5 ft. Hit: 6 (1d6 + 3) Piercing damage, and the Moucheron attaches to the target. While attached, it cannot make Proboscis attacks, and the target takes 5 (2d4) Necrotic damage at the start of each of the Moucheron's turns. The Moucheron can detach itself by spending 5 feet of its movement. The target or a creature within 5 feet of it can detach the Moucheron as an action."
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

### Tactics

This is a minimal 2024 SRD flying blood-feeder adaptation because the archive gives Ket's species and behaviour but does not provide unique statistics. It dives for an exposed target, attaches, and flees when torn free.

### Outside a fight

A Moucheron roosts in warm rafters and approaches quietly. A smear of blood and tiny punctures reveal a feeding site.

## Depth

### Ecology

The Moucheron is a tiny flying blood-feeder from murrat. Its habits match the archived description of [[Ket]].

### Hidden truths

The archive's Ket record does not provide a stat block. The 2024 SRD flying blood-feeder supplies the mechanical baseline. The name and fiction are the World adaptation.

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
