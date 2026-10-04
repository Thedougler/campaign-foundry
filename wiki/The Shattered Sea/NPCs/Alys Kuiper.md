---
type: NPC
summary: "Surgeon of the Uncertainty's crew since the Surety, named to the prize crew and the one who saw to the Murrat four."
sources:
 - "archive/ssw-old-faas.md"
 - "archive/ssw-session-02.md"
 - "archive/ssw-shepherd-grigori-island.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Ship's surgeon aboard [[Uncertainty]], on the books from the Surety and named to the prize crew.
- **Found at.** Last known ashore at [[Calven and Calveno|Calveno]] on shore leave. She left her [[Le Paludi]] boardinghouse the morning after a man called on her.

> [!narration] First look
> A needle moves through bandage work in the better light below the deck, and a surgeon's kit lies open beside it with every tool in its loop. The work stops when the light is blocked, and she looks up, asking her question before any word is spoken.

## Play

- **Will share.** Care for whoever comes off the ship hurt.

## Depth

### History

She served aboard the HCS Surety and was named to the prize crew when the crew took the cutter. The [[Murrat]] shore party returned with wounded, four of them, and they were hers to see to.

At Calveno she went ashore on shore leave and did not return to the ship. A man visited her at her [[Le Paludi]] boardinghouse, and she left the next morning. What can be found of her ends there.

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
