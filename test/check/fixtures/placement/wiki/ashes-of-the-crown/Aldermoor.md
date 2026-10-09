---
type: World
summary: "One line."
sources: []
revealed: ""
title: "Aldermoor"
---

## At a glance

- **Tone.** Text.
- **Magic and technology.** Text.
- **Era.** Text.
- **Powers.** Text.
- **Table promise.** Text.

> [!narration] The World
> Spoken text for the table.

## Calendar

| Month | Days | Season or note |
| ----- | ---- | -------------- |
|       |      |                |

## Depth

Text.

### Cosmology

Text.

### History in brief

Text.

### Hidden truths

Text.

## Links

```base
filters:
  and:
    - file.inFolder(this.file.folder)
views:
  - type: table
    name: Regions
    filters:
      and:
        - 'note.type == "Location"'
        - 'note.kind == "Region"'
    order:
      - file.name
      - note.summary
  - type: table
    name: Campaigns
    filters:
      and:
        - 'note.type == "Campaign"'
    order:
      - file.name
      - note.summary
  - type: table
    name: House Rules
    filters:
      and:
        - 'note.type == "House Rule"'
    order:
      - file.name
      - note.summary
```
