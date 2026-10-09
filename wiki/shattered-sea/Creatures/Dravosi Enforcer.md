---
type: Creature
summary: "A Dravosi Enforcer Creature (CR 1/8) adapted from the 2024 SRD Guard."
sources:
  - "archive/corbin-knighton.md"
revealed: "Session 1"
title: ""
---

## At a glance

- **Role at the table.** Crown boarding guard.
- **Threat.** CR 1/8. A disciplined spear carrier holds a deck.
- **Tell.** The shield locks into place before the spear thrust.
- **Weak to.** Forced movement and attacks that bypass its shield line.
- **Used by.** [[Corbin Knighton]].

> [!narration] First sight
> A uniformed boarder braces a shield on the rail, spear angled over its rim as the boarding line closes.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Dravosi Enforcer"
size: Medium
type: humanoid
subtype: human
alignment: neutral
ac: 16
ac_class: chain shirt and shield
hp: 11
hit_dice: "2d8 + 2"
speed: "30 ft."
stats: [13, 12, 12, 10, 11, 10]
saves: []
skillsaves: []
senses: "passive Perception 10"
languages: "Common"
cr: "1/8"
traits: []
actions:
  - name: Spear
    desc: "Melee or Ranged Attack Roll: +3, reach 5 ft. Or range 20/60 ft. Hit: 4 (1d6 + 1) Piercing damage."
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

### Tactics

This is the 2024 SRD Guard adapted minimally as a Dravosi Crown boarder because the archive does not provide unique statistics. It forms a shield line and protects its officer. When the boarding order fails, it withdraws.

### Outside a fight

Enforcers travel in pairs and leave boot marks, rope scuffs, and Crown inspection notices around a boarded vessel.

## Depth

### Ecology

The Dravosi Enforcer is a trained humanoid serving the Crown. Its equipment and discipline come from Crown service.

### Hidden truths

The archive's [[Corbin Knighton]] record names the role but does not provide a stat block. The 2024 SRD Guard supplies the mechanical baseline.

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
