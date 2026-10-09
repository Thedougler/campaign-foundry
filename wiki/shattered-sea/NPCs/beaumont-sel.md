---
type: NPC
summary: "Patient tortle captain of the Saltwright and a trusted Friend of the Passage."
sources:
  - "archive/beaumont-sel.md"
  - "archive/ssw-nona-black-jaw.md"
  - "archive/ssw-session-01.md"
  - "archive/ssw-session-02.md"
  - "archive/ssw-beaumonts-crew.md"
creature: "[[beaumont-sel-creature|Beaumont Sel (Creature)]]"
revealed: "Backstory"
title: "Beaumont Sel"
---

## At a glance

- **Role.** Captain of the Saltwright and Passage operative.
- **Wants.** To keep his passengers alive, paid, and clear of Crown trouble.
- **Voice.** Unhurried patois and short practical statements.
- **Found at.** Kalowe and the Midchain route aboard the Saltwright.

> [!narration] First look
> A broad, low-slung tortle holds the wheel, and a plate polished to a shine covers a dent in his salt-blunted shell. A capuchin monkey rides his shoulder, tail looped around his neck.

## Play

- **Opens them up.** Clear payment, a safe route, and practical work.
- **Shuts them down.** Reckless passengers or Crown trouble that endangers his ship.
- **Will share.** Route knowledge, a [[truth-stone|Truth Stone]], and the services of Bisou.
- **Will not share.** Anything that makes his passengers a target.
- **If pressed.** He says “Bisou” and sends the monkey with a potion or an alchemical item. She can also sabotage black powder.

## Depth

### History

Beaumont has run the Saltwright from Kalowe for eleven years, worked by the hired hands of [[beaumonts-crew|Beaumont's Crew]]. He pulled Crissdalynn and Delmar from the water after their fleet went down, then joined the fight when Barnaby Rook boarded. He introduced himself as a Friend of the Passage after the crew took the Surety. He passed [[nona-black-jaw|Nona Black-Jaw]]'s original message to her grandson [[perrin-black-jaw|Perrin Black-Jaw]] aboard the Saltwright. When the prize parted from him at dawn, he warned of weather toward [[calven-and-calveno|Calveno]] and said he could be found in [[kalowe|Kalowe]] when he was off route. He kept the admiral hat [[crissdalynn-khinriss|Crissdalynn Khinriss]] had fished from the water, saying it belonged to the captain, and treated Bisou's stolen coins as fair business.

### Hidden truths

- The Salvaged Antheri Plate patched into his shell deflects ranged attacks. It was the reason Rook's shot failed.
- Rook's shot at Beaumont was deflected by the salvaged shell plate fitted into Beaumont's shell.
- Bisou's delivery tricks are his real weapon. She can heal an ally or trigger an alchemical item. It can also soak black powder.

### Threads

He is the crew's first Passage contact and a practical link into the Passage.

Beaumont captains the [[saltwright|Saltwright]], the Party's first berth.

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
