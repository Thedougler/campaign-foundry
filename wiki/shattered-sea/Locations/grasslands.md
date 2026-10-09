---
type: Location
kind: Region
summary: "Hot river-cut valleys of eight-foot gold-green grass where water,
  cover and predators force exposed choices."
sources:
  - "archive/grasslands.md"
parent: "[[aruhe|Aruhe]]"
revealed: ""
title: "Grasslands"
---

![[Grasslands - Portrait.jpg]]

![[Grasslands - Handout Art.jpg]]

## At a glance

- **Character.** Open river valleys inside Aruhe's jungle.
- **Held by.** Terror-Birds, Spiguar, Deer-Stalkers and River Otters in their niches.
- **Changing.** Calveno prints and survivors move north through the cuts.
- **Crossing.** Follow water, stay on a ridge, or choose cover in the tall grass.
- **Danger.** Razer-grass, predators and the island's taking rule.

> [!narration] Arrival
> Clear water winds through gold-green grass taller than you are. Sun shafts flash on wet stones, and a warm smell of water hangs in the cut under the bird calls. Red berries shine at the bends.

## Play

### Travel

[[landing-bank|Landing Bank]], [[torn-crossing|Torn Crossing]], [[line-bank|Line Bank]] and [[slack-basin|Slack Basin]] follow the River. [[print-braid|Print Braid]], [[spoke-ring|Spoke Ring]] and [[star-cut|Star Cut]] lead into the Quiet. [[memorial-grove|Memorial Grove]] lies beyond.

### Places

Along the River. [[landing-bank|Landing Bank]], [[line-bank|Line Bank]], [[torn-crossing|Torn Crossing]] and [[slack-basin|Slack Basin]]. North through [[cutoff-lip|Cutoff Lip]], the Quiet side holds [[print-braid|Print Braid]], [[star-cut|Star Cut]] and [[spoke-ring|Spoke Ring]].

### Encounters

Terror-Birds hold shaded rims. Spiguar hunt channels. Wolfrabbits cross the grass. River Otters play in water. Deer-Stalkers use cover. Unsaid Macaws say back the thoughts they hear.

### Rumors

Fallen fruit can be received. Living fruit, fish, trapped beasts and carried flesh are claims against Aruhe.

## Depth

### History

The grassland cuts became the open heading inland after the terraces. Old Grung bones and spent authority seals mark an earlier survey.

### Hidden truths

The hard prints north of Cutoff Lip are the Calveno trail. Only one strand at Print Braid keeps it.

### Threads

Fallen fruit is safe to receive, anything living taken is a claim under [[taking-on-aruhe|Taking on Aruhe]], and the Party's rescue obligation to [[perrin-and-nona|Perrin and Nona]] holds while it crosses the island.

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
