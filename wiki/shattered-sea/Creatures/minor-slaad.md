---
type: Creature
summary: "A Minor Slaad creature (CR 1/2) used as a bruiser in The Shattered Sea."
sources:
  - "archive/minor-slaad.md"
revealed: "Session 7"
title: "Minor Slaad"
---

## At a glance

- **Role at the table.** A small bruiser that bites and claws twice a turn.
- **Threat.** CR 1/2. It climbs to its prey and bites and claws every round it stays within five feet.
- **Tell.** Skin split and gone raw, with shed flesh trailing its knuckled walk.
- **Weak to.** Fighters who hold a spear's length, beyond the five feet its bite and claw can cross.
- **Used by.** [[whip-shark|Whip Shark]] patrols the same territory.

> [!narration] First sight
> A hunched slaad pulls itself over the stone on knuckled claws, its hide raw and red where the skin has split. It drags a wet ribbon of sloughed flesh behind each step, and its head swings toward the closest sound. As it comes on, its hands end in hooked claws and its lips part over pointed teeth.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Minor Slaad"
size: Medium
type: aberration
alignment: "chaotic neutral"
ac: 13
hp: 26
hit_dice: "4d8 + 8"
speed: "30 ft., climb 20 ft."
stats: [14, 13, 14, 5, 8, 6]
damage_resistances: "acid, cold, fire, lightning, thunder"
senses: "darkvision 60 ft., passive Perception 9"
languages: "understands Slaad but can't speak"
cr: "1/2"
traits:
  - name: Magic Resistance
    desc: "The slaad has advantage on saving throws against spells and other magical effects."
actions:
  - name: Multiattack
    desc: "The slaad makes two attacks: one Bite and one Claw."
  - name: Bite
    desc: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
  - name: Claw
    desc: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage."
```

## Play

### Tactics

It closes at once and spends both attacks every round, bite then claw, while magic resistance rides out the first spell aimed its way. It gives ground when its advantage is gone or its wounds mount.

### Outside a fight

Sound leads it before sight does, its head swinging to the nearest noise, and shed skin marks the routes it walks.

## Depth

### Ecology

It troubles whatever ground it spawns onto, and Observant travellers know its signs by Wisdom (Survival), raw hide and shed flesh being hard to mistake.

[[master-kyzil|Master Kyzil]] killed the brood of five Minor Slaad that had spawned in the Mercatura crater.

### Hidden truths

An Intelligence check on a corpse finds the aberration underneath, habits and weaknesses laid open with it.

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
