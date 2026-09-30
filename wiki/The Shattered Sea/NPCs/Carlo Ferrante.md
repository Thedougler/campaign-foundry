---
type: NPC
summary: "Calveno dock foreman who led survivors to the Pantry and believes his brother died behind him."
sources:
 - "archive/carlo-ferrante.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Calveno wreck survivor and dock foreman.
- **Wants.** To carry his brother Ettore out and protect his nephew Luca.
- **Voice.** A dock foreman's short words. He counts under his breath.
- **Found at.** The Pantry, until he sees Ettore and Luca alive.

> [!narration] First look
> A tall man with a grey streak through his beard stares at the litter. His big hands open and tremble at his sides. He takes one step. “Brother,” he says.

## Play

- **Opens them up.** Thanks for leading the camp to food, or Ettore's forgiveness.
- **Shuts them down.** The Long Meadow or questions about why he never went back.
- **Will share.** The march from Spoke Ring, Renzo's guidance, and the island's protection.
- **Will not share.** That he turned back from the four when he was near them.
- **If pressed.** He covers Ettore and leaves the island as soon as his family is safe.

## Depth

### History

Carlo worked the Calveno quays as a lighter foreman and got Ettore a bridge-toll clerk's post. After the wreck he kept survivors together until Renzo's rule took over. At Spoke Ring, he followed Hinewai's voice first and led the camp to the Pantry.

### Hidden truths

- Carlo went back toward the Long Meadow, saw smoke from the lava tubes, and turned round after mistaking the terror-bird's stump form for a grass fire. He believes he abandoned Ettore.
- He leaves with Ettore, Luca, and the other Calveno survivors rather than remain at the Pantry.

### Threads

He anchors the survivor strand of **Taking on Aruhe**.

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
