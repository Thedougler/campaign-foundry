---
type: Location
kind: Site
summary: "A general-goods shop in Le Paludi where Jean-Claude Tabarnack bought the Silent Shortbow."
sources:
 - "archive/ssw-silent-shortbow.md"
parent: "[[Le Paludi]]"
---

## At a glance

- **Draws the Party because.** General goods change hands here, including pieces sold on by travellers just passing through.
- **Entrance.** A shopfront on the Le Paludi canal walk.
- **Occupants.** A shopkeeper.
- **Danger.** None recorded.
- **Prize.** Ordinary goods, and whatever passing traders have left behind.

> [!narration] Entering
> A shopfront opens onto the Le Paludi canal walk, close enough that water traffic passes the door. Goods arrive the way customers do, carried in by strangers who trade and go, and the shopkeeper sells them on. Ask what has come in lately. The question is an easy one here, and the answer is usually a story about someone in a hurry.

## Play

### Occupants

A shopkeeper runs the shop and sells across it.

### Likely actions

Buy or sell goods, or ask what passing traders have left lately.

## Depth

### History

[[Jean-Claude Tabarnack]] bought the [[Silent Shortbow]] here for 50 gp during Session 4. The shopkeeper said it came from someone passing through quickly, making extra coin on the sale.

### Hidden truths

Where the shop's secondhand goods come from is the shopkeeper's own account, not checked fact. A stranger passing through quickly brought the shortbow and wanted fast coin. Pressing the shopkeeper for a description, or watching for the next hurried sale, is how the Party could learn who feeds the shop.

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
