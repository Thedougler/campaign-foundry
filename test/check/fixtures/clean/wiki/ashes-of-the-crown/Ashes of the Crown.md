---
type: Campaign
summary: "Four friends chase the last flame of the Crown."
sources: []
session_length_hours:
revealed: ""
title: "Ashes of the Crown"
---

## At a glance

- **Players.** Text.
- **Premise.** Text.
- **Party.** [[Tam Brightwater]]
- **Cadence.** Text.
- **Now.** Text.

> [!narration] The Campaign
> Crown ash still stains the chapel steps.

## Play

- **Session length.** Inherits DM Settings unless session_length_hours is set.
- **Table agreements.** Text.
- **House Rules.** [[Fire Watch]]

## Depth

Text.

### Premise

Text.

### Themes

Text.

### Direction

Text.

## Links

```base
filters:
  and:
    - file.inFolder(this.file.folder)
views:
  - type: table
    name: PCs
    filters:
      and:
        - 'note.type == "PC"'
    order:
      - file.name
      - note.summary
  - type: table
    name: Threads
    filters:
      and:
        - 'note.type == "Thread"'
    order:
      - file.name
      - note.summary
      - note.status
  - type: table
    name: Quests
    filters:
      and:
        - 'note.type == "Quest"'
    order:
      - file.name
      - note.summary
      - note.status
  - type: table
    name: Prep
    filters:
      and:
        - 'note.type == "Prep"'
    order:
      - file.name
      - note.summary
      - note.date
  - type: table
    name: Recaps
    filters:
      and:
        - 'note.type == "Recap"'
    order:
      - file.name
      - note.summary
      - note.date
```
