---
type: Item
summary: "A paired sending stone that gives Perrin a private line to Nona Black-Jaw in exchange for an unrevealed favour."
sources:
 - "archive/sending-stone-nonas.md"
 - "archive/ssw-session-03.md"
---

## At a glance

- **Kind.** Wondrous item.
- **Rarity.** Common.
- **Attunement.** None recorded.
- **Changes.** Words spoken to it reach only its paired twin.
- **Held by.** [[Perrin Black-Jaw]]. [[Nona Black-Jaw]] holds the twin.

> [!narration] First look
> The grey river stone lies warm, heavier than it looks, with one face polished flat by a thumb. Its twin waits somewhere across the water.

## Play

### Properties

Speaking to this stone reaches only Nona's twin. No charges, range limits or other activation rules are established. The pair is the whole item.

### In use

Until Nona calls, the stone is silent. Her call is a job, warning or both. It cannot be retuned, and losing it does not erase the favour, Nona finds another way to collect.

## Depth

### History

Nona gave the stone to Perrin in [[Le Paludi]] for an unrevealed favour. Perrin agreed to end Dravosi attacks at The Warren as part of the exchange.

### Hidden truths

The price of the gift was never read out. Nona's first message can reveal the terms and whether the Warren agreement was the whole favour.

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
