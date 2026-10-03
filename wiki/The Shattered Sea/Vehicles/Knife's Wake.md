---
type: Vehicle
summary: "The lowest rung of the Scatter's piracy scale, the threat that makes a single bad channel choice expensive."
sources:
 - "archive/ssw-verdant-scatter.md"
 - "archive/ssw-midchain.md"
---

## At a glance

- **Kind.** Cutter.
- **Size.** Unknown.
- **Speed.** Unknown.
- **Crew.** Unknown.
- **Captain.** Unknown.
- **Berth.** Unknown.

> [!narration] First sight
> The name comes up when a pilot talks about the reefs, not the pirates. Take the wrong channel and the mistake stops being a grounding and starts being a toll, and the pilot says so before you ask what the toll is.

## Play

### Underway

She works the Scatter's reef channels, where a hull that has committed to the wrong passage cannot turn and cannot refuse. Her price is the difference between a bad choice and an expensive one.

She can disappear through the [[Midchain]]'s channels where a frigate captain refuses to follow.

## Depth

### Hidden truths

The pilots who sell the safe channels know which channels she watches. Their fee buys the answer they will not give for free.

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
