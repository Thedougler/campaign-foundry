---
title: Speaking Stone
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Very Rare.*

The key to long-distance, virtually instantaneous communication across Khorvaire is House Sivis's network of message stations. Each station contains at least one speaking stone, which is carved from a Siberys dragonshard and inscribed with arcane symbols that uniquely identify it. If you're a gnome with the Mark of Scribing, you can touch the stone and use an action to cast the *sending* spell from it. The target is any other speaking stone whose location or unique sequence of symbols you know. A creature within 5 feet of the stone hears the message as if they were the target.

In a Sivis message station, a gnome is always on duty by the speaking stone, listening for messages that might come in and transcribing them for delivery to their intended recipients.

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
