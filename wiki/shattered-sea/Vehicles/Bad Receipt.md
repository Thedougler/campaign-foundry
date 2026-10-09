---
type: Vehicle
summary: "A Kalowe-refit schooner that works the inspection approaches off the
  Tidefall Gate, carrying enough false registry to make a lawful captain
  hesitate."
sources:
  - "archive/ssw-central-strait.md"
  - "archive/ssw-verdant-scatter.md"
revealed: ""
title: ""
---

## At a glance

- **Kind.** A schooner, refit at [[Kalowe]].
- **Size.** Unknown.
- **Speed.** Unknown.
- **Crew.** Unknown.
- **Captain.** Unknown, but the name is the one merchants lower their voices for along the southern approach.
- **Berth.** Unknown. The refit was Kalowe work.

> [!narration] First sight
> Ask after the Bad Receipt in a Kalowe wine shop and the talk moves down the table before it answers. The answer is always about the next hull, the one that stopped for inspection and never finished it.

## Play

### Underway

She works the approaches to the Tidefall Gate, where hulls slow for inspection and wait their turn with sails slack. A ship that has slowed for the Crown's questions has already answered the only question she cares about. Her paperwork is the weapon: enough false registry to make a lawful captain hesitate before he challenges her.

## Depth

### Hidden truths

The registries contradict each other, and the contradiction is discoverable. Her entered registry at the Tidefall pier will not match the Kalowe yard's refit book.

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
