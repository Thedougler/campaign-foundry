---
type: PC
summary: "One line."
sources: []
dndbeyond_url: ""
revealed: "Backstory"
title: "Stray PC"
---


## Sheet

- **Player.** Text.
- **Class, species and level.** Text.
- **Armor Class, Hit Points and Speed.** Text.
- **Passive Perception and save DC.** Text.
- **Saving throws.** Text.

| Str | Dex | Con | Int | Wis | Cha |
| --- | --- | --- | --- | --- | --- |
|     |     |     |     |     |     |

### Features

Text.

## Spells

Text.

## Inventory

Text.

## Story

> [!narration] Portrait
> Spoken text for the table.

### Backstory

Text.

## Goals and bonds

- **Goal.** Text.
- **Bond.** Text.
- **Fear.** Text.

## Plans

Text.

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
