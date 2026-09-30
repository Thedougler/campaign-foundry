---
type: Location
kind: Site
summary: "A braid of packed paths along the Quiet's edge where only one strand carries the Calveno trail north."
sources:
 - "archive/print-braid.md"
parent: "[[Grasslands]]"
---

![[Print Braid - Handout Art.jpg]]

## At a glance

- **Draws the Party because.** It is the point where the survivor trail can be lost.
- **Entrance.** North from [[Cutoff Lip]] along the forest edge.
- **Occupants.** An Unsaid Macaw and Deer-Stalkers.
- **Danger.** Wandering alone into a wood fork draws a Deer-Stalker.
- **Prize.** The hard strand, fallen Guava and Ghost Plum.

> [!narration] Entering
> Packed paths knot through man-high grass beside dark forest. One strand is hard with footprints. Thinner forks enter hanging roots where fruit bows and every sound drops into shade.

## Play

### Areas

The inland strand, grass, wet cobble fire ring and wood forks.

### Hazards

Grass and roots are Difficult Terrain. The forest hides beyond ten feet. The Deer-Stalker breaks off when two or more follow.

### Occupants

An [[Unsaid Macaw]] repeats heard words. [[Deer-Stalker]]s work the edge.

### Likely actions

Follow the hard strand to [[Spoke Ring]], inspect the abandoned fire, or forage fallen fruit without disturbing living growth.

## Depth

### History

The Calveno camp stacked the cobbles on its first night, then followed the hard strand north.

### Hidden truths

The macaw's stretched echo is not a voice in the forest. The absence of human prints in forks identifies the wrong routes.

### Threads

[[Taking on Aruhe]] and [[Perrin and Nona]].

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
