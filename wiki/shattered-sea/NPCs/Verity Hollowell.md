---
type: NPC
summary: "The dancer who caught Geoffrey Draves mid-movement on his shore leave,
  and the reason he counts every wage."
sources:
  - "archive/ssw-geoffrey-draves.md"
creature: ""
---

## At a glance

- **Role.** A young woman who dances. The one person who ever caught Geoffrey Draves at it and did not laugh.
- **Wants.**
- **Voice.**
- **Found at.** Once, a quiet stretch of shore on a port leave. She has not been there in years.

> [!narration] First look
> She steps into your movement before you decide whether to stop, and she is already on the next count.

## Play

- **Opens them up.** Talking about dancing, or the night under open sky.
- **Shuts them down.**
- **Will share.**
- **Will not share.**
- **If pressed.**

## Depth

### History

On a shore leave years ago she caught a sailor dancing alone in mid-movement, certain that no one had ever seen him. She did not laugh. She danced with him. They spent that night dancing under open sky and came close to a first kiss before his ship's bell called him back. When he returned to the same spot at every port afterward, for years she wasn't there.

### Hidden truths

Where she went, and why, is not known. Her father was the one waiting at their spot instead.

### Threads

She is what [[Geoffrey Draves]]'s vow is for. Every wage he banks is a season of the Grand Opera Halls between him and her.

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
