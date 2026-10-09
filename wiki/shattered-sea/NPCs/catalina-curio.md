---
type: NPC
summary: "Keeper of Kat's Curios, holding Delmar Fisk's whip-shark barb under
  appraisal."
sources:
  - "archive/ssw-whip-shark-barb.md"
creature: ""
revealed: ""
title: "Catalina Curio"
---

## At a glance

- **Role.** Keeper of [[kats-curios|Kat's Curios]] and appraiser of what the sea brings in.
- **Found at.** [[kats-curios|Kat's Curios]].

> [!narration] First look
> Behind the counter of Kat's Curios, the keeper bends close over her lamp and turns the whip-shark's barb a fraction at a time, reading its bone. When the door moves she looks up, and the valuation she owes is still in her eyes, not yet on paper.

## Play

- **Will share.** A valuation or a use for the [[whip-shark-barb|Whip-Shark Barb]] once her appraisal settles.

## Depth

### History

[[delmar-fisk|Delmar Fisk]] left the [[whip-shark-barb|Whip-Shark Barb]] with her for appraisal, and she has promised a valuation or a use to follow.

### Hidden truths

None are recorded.

### Threads

None are recorded.

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
