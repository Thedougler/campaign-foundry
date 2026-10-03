---
type: Creature
summary: "A cliff scavenger of the Ashwalls whose numbers spike after a wreck, a rough tally of what the storm took."
sources:
 - "archive/ssw-ashwall-islands.md"
---

## At a glance

- **Role at the table.** Its count is intelligence. Numbers above the baseline after a crossing mean something came through the storm in pieces.
- **Tell.** More birds over the clifftops than the day before.
- **Used by.** The [[Ashwall Islands]] cliffs and high updrafts.

> [!narration] First sight
> A slow circle of dark wings turns above the cliffs where the updraft runs, and new arrivals keep joining it from the open water. None of them descend. The count is wrong for a quiet day, and the birds know something the water has not told you yet.

## Statblock

## Play

### Outside a fight

They work the clifftops and the high updrafts in numbers that spike after a wreck. Pilots read the count rather than the birds. A high one sends questions to the lee before anyone sails west.

## Depth

### Ecology

Wreckage feeds the cliffs as it feeds the water below. The vultures arrive with the tide that brings the debris, and they leave when it is gone.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
