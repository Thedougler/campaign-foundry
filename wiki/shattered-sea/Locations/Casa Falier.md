---
type: Location
kind: Site
summary: "A house paid to the Defenders by Iacopo Fieschi alongside trade credit and a diamond ring."
sources:
 - "archive/agentic-co-dm-Session-08-Recap-journal.md"
 - "archive/Session-08-Recap.md"
parent: ""
---

## At a glance

- **Draws the Party because.** It is theirs, received in [[Iacopo Fieschi]]'s public payment after the [[Mercatura]] raid.
- **Entrance.**
- **Occupants.**
- **Danger.**
- **Prize.**

> [!narration] Entering
> The house called Casa Falier is yours, handed over in Fieschi's payment beside the trade credit and the ring. Step inside and see what the pay included.

## Play

The Party has not entered on record, so nothing runs here yet.

## Depth

### History

After the [[Mercatura]] raid, [[Iacopo Fieschi]] named the Tessarine Concordat's debt in public and paid it to the Defenders. The payment was the house called Casa Falier with a thousand gold pieces of trade credit and a diamond ring beside it. No account yet describes the house, inside or out.

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
