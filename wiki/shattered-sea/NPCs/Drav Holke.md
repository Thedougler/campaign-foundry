---
type: NPC
summary: "Saltwright's bosun; clipped, correct, and no interest in small talk."
sources:
 - "archive/ssw-beaumonts-crew.md"
creature: ""
---

## At a glance

- **Role.** Bosun of the [[Saltwright]], running her rigging under [[Beaumont Sel]].
- **Wants.** Every job done correctly, and to be left to do it.
- **Voice.** Clipped and practical; no small talk, strong opinions he doesn't care to discuss.
- **Found at.** The [[Midchain]] run, aboard the [[Saltwright]], usually aloft or amidships.

> [!narration] First look
> A short, broad man moves along the rigging with clipped efficiency, checking each knot without breaking stride. Sun has darkened him to leather, and a rolled cigarette rests behind one ear. He sees you looking. "Rigging's sound. Don't touch what you can't tie."

## Play

- **Opens them up.** Offer to work. Take a line, learn a knot, do it his way. Hands catch his attention where words don't.
- **Shuts them down.** Small talk, or suggesting a faster way to do something. He walks off mid-sentence and leaves you holding the coil.
- **Will share.** The state of the rig, what needs doing before weather, and how a job should be done correctly.
- **Will not share.** He keeps his view of poor workmanship to himself. Passengers never hear his strong opinions.
- **If pressed.** "You can argue with the rope if you like. It doesn't argue back." He goes back to work and the conversation is over.

## Depth

### History

Has run the [[Saltwright]]'s rigging under [[Beaumont Sel]], a jar of stank leaf in his coat pocket and the cigarette behind his ear unless he's smoking it.

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
