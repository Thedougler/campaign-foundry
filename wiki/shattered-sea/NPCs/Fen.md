---
type: NPC
summary: "Saltwright's ordinary sailor; young, earnest, and eight months at sea."
sources:
  - "archive/ssw-beaumonts-crew.md"
creature: ""
revealed: ""
title: ""
---

## At a glance

- **Role.** Ordinary sailor aboard the [[Saltwright]] under [[Beaumont Sel]].
- **Wants.** To be told what to do and to get it right.
- **Voice.** Earnest, a little formal about the sea and his place in it.
- **Found at.** The [[Midchain]] run, aboard the [[Saltwright]], wherever hands are short.

> [!narration] First look
> A young sailor works the deck with careful attention, a beard on his jaw that hasn't committed to arriving. He catches you watching and straightens. "Eight months I've been at sea now. Proper sea time." He seems to want your admiration.

## Play

- **Opens them up.** Ask about his eight months at sea. He will tell you everything and count it the kindest question anyone has asked him.
- **Shuts them down.** Mocking his inexperience or his beard. He finds work somewhere else on the deck and leaves you talking to his back.
- **Will share.** Whatever he has been told to tell you, plus everything he has seen and done since he signed on, in detail.
- **Will not share.** Anything critical of the captain or the crew. He would rather say nothing than say the wrong thing.
- **If pressed.** He agrees with whoever pressed him hardest, then looks miserable about it.

## Depth

### History

Seventeen or eighteen, eight months at sea, and he counts all eight of them deeply formative. He does what he is told and gets it right.

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
