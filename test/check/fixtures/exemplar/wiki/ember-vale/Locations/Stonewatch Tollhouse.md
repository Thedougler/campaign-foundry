---
type: Location
kind: Site
summary: "A toll bar and gatehouse on the north road."
sources: []
parent: ""
revealed: ""
title: "Stonewatch Tollhouse"
---

## At a glance

- **Draws the Party because.** The road north passes through its gate, and the ledger lists what the road costs.
- **Entrance.** The cart gate under the lamp rod, barred from within an hour before dusk.
- **Occupants.** [[Oswyn Arlott]] and [[Sela Marren]].
- **Danger.** The kiln road at night, where the watch no longer walks.
- **Prize.** The toll ledger, and the second key to the coin box.

> [!narration] Entering
> The bar across the gate is at chest height, and the bell rope hangs beside it.

## Play

### Areas

The gatehouse passage runs twenty feet from the bars to the yard, its ceiling twenty feet high, the lamp rod fixed twelve feet up. A walled yard behind it holds a bench under a lean-to, where the ledger sits chained open, and a stair to the toll keeper's room above.

### Hazards

The drop bar goes across the gate on a rope from the wall walk, and the rope's end hooks at the stair head. A pulled rope brings the bar down across shins at chest height. Cut the rope's end before pushing the gate, or ask [[Oswyn Arlott]] to unhook it himself for a civil word.

### Occupants

[[Oswyn Arlott]] keeps the gate and the wall walk, and wants his winter pay. [[Sela Marren]] keeps the bench and the book, and wants the surveyor to read it whole.

### Likely actions

A bed above the tollhouse costs two silver and a story of the road north. A look at the ledger costs a courteous word and a seat at the bench. The bell rope buys the yard at once, and changes how both of them stand.

## Depth

### History

The tollhouse was raised on kiln money, when the kilns still paid for a watch.

### Hidden truths

The winter columns of the ledger are written by a different hand, one that enters nothing for the northbound night wagons.

### Threads

Text.

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
