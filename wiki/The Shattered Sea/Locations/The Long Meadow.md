---
type: Location
kind: Site
summary: "The one Quiet grass cut where the roof breaks open. Two Terror-Birds own its halves, and the four survivors once trapped below the skylight are out with the Party."
sources:
 - "archive/the-long-meadow.md"
 - "archive/session-12-full.md"
parent: "[[The Quiet]]"
---

## At a glance

- **Draws the Party because.** It is the shortest trail to the Burnt Road and Pantry.
- **Entrance.** Fruit-pile trail from Quiet forest.
- **Occupants.** South and North Terror-Birds hold opposite rims.
- **Danger.** Open ground draws a straight charge. A skylight drops forty feet.
- **Prize.** Routes onward. The survivors below the smoking skylight left with the Party in Session 12.

> [!narration] Entering
> A half-mile strip of short grass opens beneath the sky. Tall grass walls both edges. A deep channel and glittering white blades divide the gap, while mossy stumps wait at each end.

## Play

### Areas

The Gap, bird rims, tall grass, channel, smoking skylight, Razer-Grass stand and feeding circles.

### Hazards

Terror-Birds charge straight lines. Tall grass, deep water and Razer-Grass end a hunt. Crossing the channel can sweep a body downstream.

### Occupants

A [[Terror-Bird]] on each rim. The skylight ledge below stands empty since the Party ferried the survivors out.

### Likely actions

Read the meadow, cross through cover and the stand, or go around at an hour's cost.

## Depth

### History

The South Bird drove four survivors into the skylight nineteen days ago. In Session 12 the Party ferried all four out through the pit and travelled the lava tubes below instead of crossing the Gap.

### Hidden truths

One half belongs to each bird, and neither will enter tall grass, deep channel or Razer-Grass. The Gap is the safe puzzle, not a straight sprint.

### Threads

This cut joins [[Taking on Aruhe]] and [[Perrin and Nona]] through its two Terror-Bird halves and the skylight rescue that emptied its ledge.

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
