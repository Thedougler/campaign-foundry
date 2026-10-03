---
type: NPC
summary: "Patient tortle captain of the Saltwright and a trusted Friend of the Passage."
sources:
 - "archive/beaumont-sel.md"
 - "archive/ssw-nona-black-jaw.md"
creature: "[[Beaumont Sel (Creature)]]"
---

## At a glance

- **Role.** Captain of the Saltwright and Passage operative.
- **Wants.** To keep his passengers alive, paid, and clear of Crown trouble.
- **Voice.** Unhurried patois and short practical statements.
- **Found at.** Kalowe and the Midchain route aboard the Saltwright.

> [!narration] First look
> A wide, low tortle stands at the wheel, a mirror-bright plate fitted over a dent in a shell worn blunt by salt air. A capuchin monkey rides his shoulder, tail looped around his neck.

## Play

- **Opens them up.** Clear payment, a safe route, and practical work.
- **Shuts them down.** Reckless passengers or Crown trouble that endangers his ship.
- **Will share.** Route knowledge, a [[Truth Stone]], and the services of Bisou.
- **Will not share.** Anything that makes his passengers a target.
- **If pressed.** He says “Bisou” and sends the monkey with a potion or an alchemical item. She can also sabotage black powder.

## Depth

### History

Beaumont has run the Saltwright from Kalowe for eleven years. He pulled Crissdalynn and Delmar from the water after their fleet went down, then joined the fight when Barnaby Rook boarded. He introduced himself as a Friend of the Passage after the crew took the Surety. He passed [[Nona Black-Jaw]]'s original message to her grandson [[Perrin Black-Jaw]] aboard the Saltwright.

### Hidden truths

- The Salvaged Antheri Plate patched into his shell deflects ranged attacks. It was the reason Rook's shot failed.
- Rook's shot at Beaumont was deflected by the salvaged shell plate fitted into Beaumont's shell.
- Bisou's delivery tricks are his real weapon. She can heal an ally or trigger an alchemical item. It can also soak black powder.

### Threads

He is the crew's first Passage contact and a practical link into the Passage.

Beaumont captains the [[Saltwright]], the Party's first berth.

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
