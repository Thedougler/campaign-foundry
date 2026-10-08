---
type: NPC
summary: "Tessarine factor who turned Calveno's victory into Concordat credit."
sources:
 - "archive/iacopo-fieschi.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Tessarine Concordat factor and diplomatic functionary.
- **Wants.** To restore his credit after publicly admitting Concordat debt.
- **Voice.** Flat, careful, and contract-like. He speaks from prepared notes.
- **Found at.** His factor house, the correspondence routes of Calveno, and the [[Il Gioco delle Beffe]] marks as a first-year Tessarine entry.

> [!narration] First look
> A well-dressed factor comes down before the crowd clears, refolding a letter while he speaks. His voice is flat and careful, as though every sentence has already been entered into a contract.

## Play

- **Opens them up.** Written plans, successful work, and a reward he can formalise.
- **Shuts them down.** Unplanned demands or questions about what his house watched.
- **Will share.** Concordat process, correspondence, and the price of public recognition.
- **Will not share.** His operational details or his principal's full intentions.
- **If pressed.** He blames rules and process, then offers money or paperwork rather than force.

## Depth

### History

Iacopo runs Concordat work in Calveno through letters and money. He holds debt on six of the Seven Houses and extends credit to the rest. After the Mercatura raid he claimed Concordat debt aloud and negotiated a reward with Delmar, Crissdalynn, Catarina, and Jean-Claude, binding the crew to his interests. He paid the Defenders with trade credit, [[Casa Falier]] and a diamond ring.

### Hidden truths

- His public admission weakened his standing: the city now prices his word at a discount, and he is trying to recover it through the crew's success.
- Cosimo Verantio is his principal, reached only by correspondence.

### Threads

He is a contact for the Concordat's pressure in Calveno and the reward that followed Mercatura.

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
