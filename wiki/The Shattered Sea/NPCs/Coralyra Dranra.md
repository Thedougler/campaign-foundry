---
type: NPC
summary: "Sea elf sorcerer and bard, self-exiled from her post as Aoidos of Halythion."
sources:
 - "archive/ssw-sea-elf.md"
creature: ""
---

## At a glance

- **Role.** Sorcerer and bard of the [[Sea Elf|sea elves]]. She held the title of Aoidos at [[Halythion]] before she exiled herself.
- **Wants.**
- **Voice.**
- **Found at.**

> [!narration] First look
> Salt dries in streaks on her scales, as if she came off the water minutes ago. She stands where she can see the whole room and holds her silence like something rehearsed. "Ask someone who still sings for them."

## Play

- **Opens them up.**
- **Shuts them down.**
- **Will share.**
- **Will not share.**
- **If pressed.**

## Depth

### History

She held the Aoidos title at [[Halythion]], and then she left. The leaving is the whole of her record so far.

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
