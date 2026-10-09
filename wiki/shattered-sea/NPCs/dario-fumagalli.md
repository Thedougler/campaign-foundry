---
type: NPC
summary: "Calveno sailor who drowned fishing the Slack Basin pool nineteen days
  before the Party's arrival."
sources:
  - "archive/river-slack-basin.md"
creature: ""
revealed: ""
title: "Dario Fumagalli"
---

## At a glance

- **Role.** Calveno sailor, drowned nineteen days before the Party's arrival.
- **Found at.** [[slack-basin|Slack Basin]], as a bloodstain and a planted walking stick.

> [!narration] First look
> A walking stick stands upright in a dried red stain at the pool's edge, nineteen days after the fisher who owned it went under.

## Play

He drowned before the Party could meet him. The survivors' accounts and [[renzo-canale|Renzo Canale]]'s planted cane are what remain to find.

## Depth

### History

A Calveno sailor of the wreck, he waded into the still pool at [[slack-basin|Slack Basin]] to fish nineteen days ago. The [[river-otter|River Otter]]s played with him until he drowned, and [[renzo-canale|Renzo Canale]] planted the walking stick in the blood smear as a warning before the camp moved inland.

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
