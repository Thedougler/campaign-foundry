---
type: Location
kind: Site
summary: "A Velo Quarter curio shop where Prospero Morsani sells rare objects together with the stories of those who lost them."
sources:
 - "archive/cabinet-of-morsani.md"
parent: "[[Calven and Calveno]]"
---

## At a glance

- **Draws the Party because.** Unusual gear and honest provenance are available.
- **Entrance.** A lantern-marked door in the Velo Quarter.
- **Occupants.** Prospero Morsani, wearing thirty-one rings.
- **Danger.** A story that does not hold up stops the conversation. The locked case has its own demand.
- **Prize.** The Compass of the Drowned, trick arrows and an object's true history.

> [!narration] Entering
> A lantern marks the door. Shelves fill the room and continue farther than its walls suggest. Brass polish hangs over something older, and a locked case waits behind the counter.

## Play

### Areas

Lantern door, deep shelves, ringed counter and locked case.

### Hazards

Prospero refuses objects whose history does not hold up. The social cost is lost access, not combat.

### Occupants

Prospero Morsani is the occupant.

### Likely actions

Offer an object, ask its provenance, buy unusual gear, or bring the story that completes the thirty-second ring.

## Depth

### History

The shop gathers objects from estates and corpses, preserving the reason each owner could not keep them.

### Hidden truths

Prospero distributes objects to the right hands. Each ring holds a prior owner's story, while the locked case lacks its piece.

### Threads

[[Perrin and Nona]].

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
