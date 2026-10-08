---
type: NPC
summary: "Delmar's most recent mate, warned by his sending stone of the Dravosi warship."
sources:
 - "archive/Episode-09-Transcript.md"
creature: ""
---

## At a glance

- **Role.** [[Delmar Fisk|Delmar]]'s most recent mate.

> [!narration] First look
> Delmar speaks her name into his sending stone and spends every word it allows. "Most recent mate, Serena... be wary of these... Dravosi... war ship."

## Play

- **Will share.** Only what fits in twenty-five words. The message is sent one way.

## Depth

### History

Delmar spent his sending stone's twenty-five words on her alone: be wary of the Dravosi warship, and of the elf who hurt the Party badly.

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
