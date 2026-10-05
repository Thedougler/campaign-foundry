---
type: Item
summary: "A paired sending stone that gives Perrin a private line to Nona Black-Jaw in exchange for an unrevealed favour."
sources:
 - "archive/sending-stone-nonas.md"
 - "archive/ssw-session-03.md"
 - "archive/ssw-session-04-ingest-recap.md"
 - "archive/ssw-sending-stone-nona.md"
---

## At a glance

- **Kind.** Wondrous item.
- **Rarity.** Common.
- **Attunement.** Not needed on either face of the pair.
- **Changes.** A message spoken into one face comes out of Nona's twin alone.
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

Nona gave the stone to Perrin in [[Le Paludi]] at the end of their meeting, for an unrevealed favour he accepted without hearing its terms. Perrin agreed to end Dravosi attacks at The Warren as part of the exchange. Through it she later called in that favour, with Perrin to bring his friends to her safe-house table, the blue one above all, plus any fighter among them. When Perrin reported the Grung powder under the city, she answered through the stone that Enzo and more would come, and that she would speak to him in person.

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
