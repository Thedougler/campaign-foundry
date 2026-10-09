---
type: NPC
summary: "Armless goblin animal dealer who trades Midchain names for work he
  cannot do himself."
sources:
  - "archive/zort.md"
creature: "[[Commoner]]"
revealed: "Session 8"
title: ""
---

## At a glance

- **Role.** Proprietor of Zort's Pits and Midchain animal dealer.
- **Wants.** Stock sold and cages respected. He keeps his supplier's name as trade.
- **Voice.** He speaks flatly and quickly, without repeating himself.
- **Found at.** His desk in Zort's Pits, Le Paludi.

> [!narration] First look
> An old goblin perches behind the desk with one bare foot on the wood and the other handling the tools. Iron-capped sandals replace hands, and something behind the desk growls whenever it pleases.

## Play

- **Opens them up.** Talk about animals, prices, feeding, and handling.
- **Shuts them down.** Touching a cage or asking what is in the back one.
- **Will share.** Animal stock and a Midchain supplier's name in exchange for useful work.
- **Will not share.** The back cage or a story about losing his arms.
- **If pressed.** He reminds visitors that the cages are not for touching and ends the sale.

## Depth

### History

Zort runs the animal trade in Calveno from his desk, using his feet for every task. Catarina's workshop made a prosthetic that gave him working hands again. He paid with the name [[Roka Sten]], closing that commission. Lavinia sent the crew to his pit.

### Hidden truths

- The back cage's contents are unknown. Its growl and Zort's refusal to show it are the whole canon.
- His handling sandals are both a daily necessity and a product he sells.

### Threads

He is a contact in Calveno's animal trade and the lead toward [[Roka Sten]].

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
