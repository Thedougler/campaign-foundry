---
type: Location
kind: Site
summary: "A still turquoise pool owned by an otter family, where Matteo's camp and a bloody Calveno trail mark the route into the Quiet."
sources:
 - "archive/river-slack-basin.md"
parent: "[[The River]]"
---

![[Slack Basin - Handout Art.jpg]]

## At a glance

- **Draws the Party because.** It holds the survivor trail and a marked warning.
- **Entrance.** River route above the whitewater lip.
- **Occupants.** Matteo Scola and a River Otter family.
- **Danger.** Gear in the pool is a claim. Otters turn play into a hunt when crossed.
- **Prize.** The Calveno trail to [[Cutoff Lip]] and evidence of Dario's death.

> [!narration] Entering
> A clear pool sits behind pale stone while the River roars beyond, and a cane stands in a red smear. Prints climb into hanging roots. A pack and torn sleeve hang in the water without drifting.

## Play

### Areas

Camp bank, still pool, cane and smear, pack and sleeve, grass wall and treeline.

### Hazards

A creature in the water at the end of a round becomes an otter toy. Pulling gear from the pool marks the taker until dawn.

### Occupants

[[Matteo Scola]] and three adult [[River Otter]]s.

### Likely actions

Read prints, speak to Matteo, avoid fishing, retrieve gear only at a cost, or follow the trail north.

## Depth

### History

Dario Fumagalli drowned here nineteen days ago while fishing. Renzo planted the cane as a warning. Survivors climbed inland.

### Hidden truths

The otters keep the pack and sleeve as toys, not treasure. The dozen boot and barefoot prints lead to Cutoff Lip.

### Threads

[[Taking on Aruhe]], [[Perrin and Nona]].

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
