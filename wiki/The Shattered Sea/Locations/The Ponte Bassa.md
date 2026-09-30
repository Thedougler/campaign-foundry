---
type: Location
kind: Site
summary: "A canal-side tavern built into Calveno's main crossing, where Oleandro Fuschi serves fish broth and remembers ships."
sources:
 - "archive/ponte-bassa.md"
parent: "[[Calven and Calveno]]"
---

## At a glance

- **Draws the Party because.** Oleandro's memory is Calveno's best record of hull movements.
- **Entrance.** The tavern built into the main canal crossing.
- **Occupants.** Oleandro Fuschi.
- **Danger.** He answers direct questions but captains increasingly falsify manifests.
- **Prize.** A hot bowl, canal view and a ship's movement or the captain who knows more.

> [!narration] Entering
> The tavern is built into the bridge, with a window on canal traffic. Damp rises beneath the tiers. Hot fish stock and bread mark the room as a place to stop while boats work below.

## Play

### Areas

Canal window, bar, kitchen and Oleandro's unwritten record.

### Hazards

A visitor who presses for a free archive gets only broth. The record preserves claims, including lies, as captains give them.

### Occupants

Oleandro Fuschi pours and remembers.

### Likely actions

Ask about a ship, compare a manifest, watch from the window, or pay for a bowl while waiting for a hull.

## Depth

### History

Oleandro has kept twenty years of vessel memory without a slate. The tavern is a living archive.

### Hidden truths

The perfect archive is degrading because false manifests are more common. The tell is whether an answer gives movement or motive.

### Threads

[[Perrin and Nona]] and [[The Crown Inspection]].

## Links

```base
filters:
 and:
  - file.hasLink(this.file)
views:
 - type: table
  name: Contains
  filters:
   and:
    - parent == this
  groupBy:
   property: note.kind
   direction: ASC
  order:
   - file.name
   - note.summary
 - type: table
  name: Linked from
  filters:
   and:
    - parent != this
  groupBy:
   property: note.type
   direction: ASC
  order:
   - file.name
   - note.summary
```
