---
type: Location
kind: Region
summary: "Hot river-cut valleys of eight-foot gold-green grass where water, cover and predators force exposed choices."
sources:
 - "archive/grasslands.md"
parent: "[[Aruhe]]"
---

## At a glance

- **Character.** Open river valleys inside Aruhe's jungle.
- **Held by.** Terror-Birds, Spiguars, Deer-Stalkers and River Otters in their niches.
- **Changing.** Calveno prints and survivors move north through the cuts.
- **Crossing.** Follow water, stay on a ridge, or choose cover in the tall grass.
- **Danger.** Razer-grass, predators and the island's taking rule.

> [!narration] Arrival
> Clear water winds through gold-green grass taller than you are. Sun shafts flash on wet stones while warm water-smell and bird calls carry along the cut. Red berries shine at the bends.

## Play

### Travel

[[Landing Bank]], [[Torn Crossing]], [[Line Bank]] and [[Slack Basin]] follow the River. [[Print Braid]], [[Spoke Ring]] and [[Star Cut]] lead into the Quiet. [[Memorial Grove]] lies beyond.

### Places worth reaching

[[Landing Bank]], [[Torn Crossing]], [[Line Bank]], [[Slack Basin]], [[Cutoff Lip]], [[Print Braid]], [[Spoke Ring]], and [[Star Cut]].

### Encounters

Terror-Birds hold shaded rims. Spiguars hunt channels. Wolfrabbits cross the grass. River Otters play in water. Deer-Stalkers use cover. Unsaid Macaws repeat thoughts.

### Rumors

Fallen fruit can be received. Living fruit, fish, trapped beasts and carried flesh are claims against Aruhe.

## Depth

### History

The grassland cuts became the open heading inland after the terraces. Old Grung bones and spent authority seals mark an earlier survey.

### Hidden truths

The hard prints north of Cutoff Lip are the Calveno trail. Only one strand at Print Braid keeps it.

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
