---
type: NPC
summary: "Injured Calveno survivor trapped in a lava tube with his son and two companions."
sources:
 - "archive/ettore-ferrante.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Wreck survivor and bridge-toll clerk.
- **Wants.** To avoid being left behind and see his brother Carlo again.
- **Voice.** Exact, polite, and apologetic. “It is arithmetic” means hopeless.
- **Found at.** The lava-tube ledge beneath the smoking skylight, where his splinted leg holds him.

> [!narration] First look
> A heavy man lies against the black rock with his left leg in a splint. He tries to rise, then sags back and lifts a hand in apology. “Forgive me. I would stand, but the leg disagrees.”

## Play

- **Opens them up.** A promise that the party will carry him.
- **Shuts them down.** Mentioning the woman in the woods.
- **Will share.** Why the birds drove them underground and that Carlo walked toward the voice.
- **Will not share.** How badly the broken leg hurts or how much he blames himself.
- **If pressed.** He sends the party away with Luca rather than slow them down.

## Depth

### History

Ettore was a Calveno bridge-toll clerk. His left shin broke while he, Luca, Piero, and Gianni fled a terror-bird into the lava tubes. He believes Carlo walked to his death at Spoke Ring.

### Hidden truths

- Ettore believes he is the reason the others remain trapped, but the party is the only reason any of them can leave.
- Until healed, his commoner statistics are reduced to 4 HP and Speed 0. He cannot stand.

### Threads

He is a survivor in **Taking on Aruhe** and the centre of Carlo's reunion.

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
