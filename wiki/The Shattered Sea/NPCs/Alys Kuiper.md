---
type: NPC
summary: "Surgeon of the Uncertainty's crew since the Surety, named to the prize crew and the one who saw to the Murrat four."
sources:
 - "archive/ssw-old-faas.md"
 - "archive/ssw-session-02.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Ship's surgeon aboard [[Uncertainty]], on the books from the Surety and named to the prize crew.
- **Found at.** Aboard [[Uncertainty]], where she is needed.

> [!narration] First look
> A needle moves through bandage work in the better light below the deck, and a surgeon's kit lies open beside it with every tool in its loop. The work stops when the light is blocked, and the look that comes up asks its question before any word does.

## Play

- **Will share.** Care for whoever comes off the ship hurt.

## Depth

### History

She served aboard the HCS Surety and was named to the prize crew when the crew took the cutter. The four who came back from the [[Murrat]] shore party needing the surgeon were hers to see to.

### Hidden truths

None established.

### Threads

None established.

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
