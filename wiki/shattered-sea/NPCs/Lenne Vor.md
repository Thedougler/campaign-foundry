---
type: NPC
summary: "Saltwright's navigator; twenty years of chart work, consulted once, quietly right about everything."
sources:
 - "archive/ssw-beaumonts-crew.md"
creature: ""
---

## At a glance

- **Role.** Navigator of the [[Saltwright]] under [[Beaumont Sel]].
- **Wants.** A course laid right once, and to be left alone with her charts.
- **Voice.** Dry, measured, sceptical. She states a fix once and does not repeat it.
- **Found at.** The [[Midchain]] run, aboard the [[Saltwright]].

> [!narration] First look
> A lean woman with silver hair cropped close to the skull stands at the stern chart table, one ink-darkened fingertip tracing a line she has clearly drawn a hundred times. She doesn't look up until she's finished. "If you've come to ask whether we'll make the passage, we will. I've run this chain under three captains. Ask something that deserves my ink."

## Play

- **Opens them up.** Ask a real navigation question, or let her walk you through a chart. Respected competence is the only courtesy she wants.
- **Shuts them down.** Second-guessing her figures or chattering to fill the silence. She stops talking and goes back to her ink.
- **Will share.** Anything in the ship's record, and what the [[Midchain]] does along any stretch of the route.
- **Will not share.** Her written opinions of the captains she has served. The record is precise, and her judgement of the living stays off the page.
- **If pressed.** "You can doubt my arithmetic if you like. Bring your own chart and we'll see whose ship is still floating at the far end."

## Depth

### History

Twenty years of chart work, and the [[Midchain]] under three captains. She consults her charts once and rarely again. She has documented everything, and she has been quietly right about all of it.

### Hidden truths

- Her charts are the true record of the Saltwright's service: she is quietly right about everything she has documented. The Party can learn it by asking to see her charts, or by noticing that she consults them once and is never wrong.

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
