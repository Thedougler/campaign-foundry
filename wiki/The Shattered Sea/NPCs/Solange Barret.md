---
type: NPC
summary: "Red-caste Grung ritual specialist whose circle summoned Otar beneath Mercatura."
sources:
 - "archive/solange-barret.md"
creature: "[[Solange Barret (Creature)]]"
---

## At a glance

- **Role.** Red-caste ritual specialist and warlock under Simone Tabarnack.
- **Wants.** To complete the summoning circle and prove her craft indispensable.
- **Voice.** Flat and certain. She speaks only when the work requires it.
- **Found at.** The Primary Chamber of the Calveno Sewer Magazines. Consumed by Otar.

> [!narration] First look
> A small red Grung kneels over a chalked circle, hands stained with limestone, charcoal, and something iridescent. She does not look up. “The circle is an invitation.”

## Play

- **Opens them up.** Respect for precise ritual work.
- **Shuts them down.** Breaking the circle or interrupting her chant.
- **Will share.** Her name and caste if captured before the blast.
- **Will not share.** The activation word or the circle's origin.
- **If pressed.** She keeps chanting. If the circle breaks she detonates and escapes. Otherwise, Otar takes her.

## Depth

### History

Solange left seminary to become a demolitions engineer. She alone could run Simone's summoning circle and learned binding shapes from her patron, le courant. Ozzeth protected her while the party reached the Primary Chamber. She finished the ritual after his death and Otar emerged through her body.

### Hidden truths

- Solange's ritual techniques were not created by the Grung. She alone knows the circle's activation code.
- If she escaped, she would report Jean-Claude's aid to Simone. Because the ritual completed, nobody remained to report it.

### Threads

She was the ritual hinge of **Simone's Hunters** and the summoning that released Otar.

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
