---
type: NPC
summary: "A Calveno name at the Beffa who welcomes attempts after twenty clean years, and this year's registered mark."
sources:
 - "archive/il-gioco-delle-beffe.md"
creature: ""
---

## At a glance

- **Role.** This year's registered mark in [[Il Gioco delle Beffe]], after twenty clean years.
- **Found at.** Moretti and Sons in Calveno, through the festival season.

> [!narration] First look
> Giacomo Moretti receives your team at the step of Moretti and Sons, and his welcome arrives before his name does. He waves you through and offers the odds plainly. "Twenty years clean, and still they queue up. Show me a better try."

## Play

- **Opens them up.** An attempt with a real scheme behind it.

## Depth

### History

He has come through twenty years of the Beffa clean, and welcomes every attempt on him.

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
