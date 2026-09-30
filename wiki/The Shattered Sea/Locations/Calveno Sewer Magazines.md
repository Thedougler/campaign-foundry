---
type: Location
kind: Site
summary: "Underground powder magazines beneath Calveno where the Grung bombing operation stored supplies and held a live ritual."
sources:
 - "archive/calveno-sewer-magazines.md"
parent: "[[Calven and Calveno]]"
---

## At a glance

- **Draws the Party because.** Powder infrastructure and a live ritual remain below the city.
- **Entrance.** Calveno's sewer network.
- **Occupants.** Solange Barret, Grung guards and evidence of Bazzoth's operation.
- **Danger.** Powder, fire, water and an unfinished ritual.
- **Prize.** Destroyed supplies, prisoners, and knowledge of the network.

> [!narration] Entering
> The sewer opens into rooms built to hold powder. Barrels and scaffolding fill the chambers. Fire and water have damaged the route, and farther in a ritual continues under guard.

## Play

### Areas

Room 5 and Magazine Beta are destroyed. Room 6 was surrendered. Room 8 remains contested after the Primary Chamber's ceiling collapsed and Ragnetto was destroyed. Other cardinal routes are not established.

### Hazards

Powder stores make fire dangerous. The party must preserve the destroyed state rather than reset it on return.

### Occupants

[[Bazzoth, the Steeped]] died in Room 5. [[Ruma Delacroix]] surrendered Room 6. [[Solange Barret]] worked the ritual in Room 8 with Grung Elite Warriors.

### Likely actions

Search stores, push toward Room 8, destroy powder, take prisoners or interrupt the ritual.

## Depth

### History

The Session 05 raid destroyed Magazine Beta and reached Solange's ritual after the party passed through the sewer route.

### Hidden truths

The ritual's purpose and remaining layout are not established. The magazines are supply infrastructure behind the Grung threat.

### Threads

[[Simone's Hunters]] and [[The Crown Inspection]].

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
