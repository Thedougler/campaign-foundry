---
type: NPC
summary: "A Shelfworks air-pump hand who stopped diving after the drop-off took his partner, and rations the telling to once a season."
sources:
 - "archive/ssw-giant-squid.md"
creature: ""
---

## At a glance

- **Role.** Air-pump hand on the [[Shelfworks]] dive floor, salvager no longer.
- **Wants.** To keep the pumps running and crews inside the agreed depth, because what he saw below the Shelfworks should take no one else.
- **Voice.** Rationed. One story per crew, once per season, and not again.
- **Found at.** The air pumps at the [[Shelfworks]].

> [!narration] First look
> At the pump rack on the [[Shelfworks]] dive floor a man works the air levers in slow rhythm and keeps his eyes on the gauges. His oilskins are patched for work and none of it is diving gear. He counts the divers out along the lines and counts them back, and only then does he look up. "One story a season. If your crew has heard it, you have heard it."

## Play

- **Opens them up.** Ask him about the air pumps or the Shelfworks in general and he answers readily, steady hands and plain words.
- **Shuts them down.** Suggest diving past the agreed depth, or joke about lost partners and vanished buoys, and he turns back to his gauges and says nothing.
- **Will share.** The story, once per crew, once per season, and nothing that says what pulled. The rule on the board and why it is written.
- **Will not share.** He does not name his partner or go past the one account. The lost knife stays out of the story.
- **If pressed.** He stops talking and puts you back to work at the pumps. The [[Giant Squid]] is the camp's word for it, and he will not say the camp is wrong.

## Depth

### History

Orvalle dove the Shelfworks wall until the day he chased something below the agreed depth. He came back up without his partner's line and missing a knife, and described a body wider than the archway he was working through, a limb the length of a boarding pike, and a pull. His partner's buoy rose forty minutes later, alone. He works the air pumps now and does not dive.

### Hidden truths

The record on what took his partner is testimony only. The crews hold to the [[Giant Squid]] as the practical answer because the names that would not need a squid are worse.

### Threads

His telling sits inside [[Drowned Maw Awakening]], one of its open questions about what moves in the deep water.

## Links

Post, the [[Shelfworks]] air pumps. The thing his testimony names, the [[Giant Squid]].

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
