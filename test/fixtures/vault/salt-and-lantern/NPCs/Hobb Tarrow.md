---
type: NPC
summary: "Harbor Warden of Saltwick, a tired veteran who hires the Party to keep the lighthouse lit."
sources: []
creature: "[[Bandit Captain]]"
revealed: ""
title: "Hobb Tarrow"
---

## At a glance

- **Role.** Harbor Warden, commander of the Saltwick watch, and keeper of [[Gullhook Lighthouse]] since the old keeper died.
- **Wants.** The lamp lit through the Long Ebb, and the [[Harbormaster's Ledger of Vessen]] to stay lost.
- **Voice.** Slow, dry and short. He ends most sentences by looking at the water.
- **Found at.** The Harbor Warden's office in [[Saltwick]], or in the keeper's room at [[Gullhook Lighthouse]].

> [!narration] First look
> He is a heavy man past sixty in a watch coat with the badge worn smooth. His beard is white and cut square, and his hands are scarred from rope. He stands with his weight on one leg, favouring an old wound. The room smells of pipe smoke and wet wool. "I do not have the men," he says. "I have a lamp, and I have coin."

## Play

- **Opens them up.** Practical help. He warms to anyone who fixes something without being asked.
- **Shuts them down.** Talk of Council politics, and any mention of the Compact's founders.
- **Will share.** The keeper's log, the oil count, and a list of boats that were wrecked on dark nights.
- **Will not share.** What his family name has to do with the sluice.
- **If pressed.** He admits he suspects the Council of hiding something old, and that he would rather the Party did not find it.

## Depth

### History

Hobb's family has served the harbor for nine generations. One ancestor, Corvin Tarrow, was the Compact's clerk who copied the sluice order in 271 CY. Hobb learned this from a letter left by his grandmother and burned it.

### Hidden truths

- Hobb knows the sluice was opened on purpose and does not know why. He fears the ledger because it will name his ancestor. The Party can learn this by finding the burned letter's ash in the keeper's stove, or by pressing him after they have found the ledger.
- He loaned the Party the [[Ebb Lantern]] because he believes the bell will ring again, and someone will have to go down when it does.

### Threads

- He is a target of [[Reedrunner Tithe]], which threatens the lighthouse.
- He gave the Party the quest [[Keep Gullhook Lit]] and is quietly involved in [[The Silent Bell]].

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
