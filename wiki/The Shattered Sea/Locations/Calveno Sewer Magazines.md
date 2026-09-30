---
type: Location
kind: Site
summary: "Underground powder magazines beneath Calveno where the Grung bombing operation stored supplies and held a live ritual."
sources:
 - "archive/calveno-sewer-magazines.md"
parent: "[[Calven and Calveno]]"
---

## At a glance

- **Draws the Party because.** Destroyed magazines and the collapsed chamber hold evidence of the Grung operation.
- **Entrance.** Calveno's sewer network.
- **Occupants.** No current occupants are established. Remains of Bazzoth's operation lie below.
- **Danger.** Collapsed masonry, powder residue, fire and water.
- **Prize.** Surviving evidence of the network and the collapsed primary chamber.

> [!narration] Entering
> The sewer opens into rooms built to hold powder. Barrels and scaffolding lie among fire and water damage, and farther in the primary chamber lies open beneath its collapsed ceiling.

## Play

### Areas

Room 5 and Magazine Beta are destroyed. Room 6 was surrendered. Room 8's ritual ended when Solange was consumed and Otar emerged. The Primary Chamber's ceiling collapsed and Ragnetto was destroyed. Other cardinal routes are not established.

### Hazards

Powder stores make fire dangerous. The party must preserve the destroyed state rather than reset it on return.

### Occupants

[[Bazzoth, the Steeped]] died in Room 5. [[Ruma Delacroix]] surrendered Room 6. [[Solange Barret]] worked the ritual in Room 8 with Grung Elite Warriors.

### Likely actions

Search stores, follow surviving evidence, or cross the collapse while preserving the destroyed state.

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
