---
type: Prep
summary: "A storm pins the Party at the bridge."
sources: []
date: "14 Emberfall 1492"
revealed: ""
title: "Session 1 - Prep"
---

## At a glance

- **Session question.** Text.
- **Party at.** Text.
- **Length.** Text.
- **Threads in play.** Text.

## Scene Chart

1. [[Session 1 - Storm at the Crossing]] (Hook)

Opposition: ![[Bandit Captain#Statblock]]

| #   | Scene | Kind | Minutes | Threads |
| --- | ----- | ---- | ------- | ------- |
| 1   |       | Hook |         |         |

## Threads

Text.

## Opposition

Text.

## Clues

| Clue | Found in |
| ---- | -------- |
|      |          |

## Links

```base
filters:
  and:
    - file.inFolder(this.file.folder)
views:
  - type: table
    name: Scenes
    filters:
      and:
        - 'note.type == "Scene"'
    groupBy:
      property: note.kind
      direction: ASC
    order:
      - file.name
      - note.summary
  - type: table
    name: Handouts
    filters:
      and:
        - 'note.type == "Handout"'
    order:
      - file.name
      - note.summary
```
