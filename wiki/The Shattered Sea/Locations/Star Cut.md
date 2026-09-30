---
type: Location
kind: Site
summary: "A straight Quiet aisle beneath a slit of sky where the Calveno kept watch and the route continues toward Memorial Grove."
sources:
 - "archive/star-cut.md"
parent: "[[The Quiet]]"
---

## At a glance

- **Draws the Party because.** It is the last open sight line and straight route to the Grove.
- **Entrance.** The north spoke from [[Spoke Ring]].
- **Occupants.** Nobody now. Bloodhawks hunt the sky slit.
- **Danger.** Open sky exposes watchers. Living claims wake Vine-Lash.
- **Prize.** Fallen Giant's Guava and old watch evidence.

> [!narration] Entering
> Wet black earth runs straight beneath a slit of sky. A low fire ring and clay bowls sit beside old bedrolls, while heavy ribbed fruit hangs over roots pressed close on either side.

## Play

### Areas

Aisle, sky slit, watch fire, bedrolls, guava branches and hidden stream.

### Hazards

The forest imposes Difficult Terrain and hides anyone beyond ten feet. Bloodhawks can hunt the open slit.

### Occupants

No one now. [[Bloodhawk]]s use the gap.

### Likely actions

Climb to the sky slit, inspect the watch fire, follow the aisle to [[Memorial Grove]], or forage fallen fruit.

## Depth

### History

The Calveno used this aisle for night watch before moving their camp to Spoke Ring.

### Hidden truths

The slit is the only roof gap for a mile, making smoke and sky movement visible from far along the Quiet.

### Threads

[[Taking on Aruhe]].

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
