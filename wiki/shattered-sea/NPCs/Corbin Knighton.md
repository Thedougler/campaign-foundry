---
type: NPC
summary: "Crown boarder whose false report now drives a quiet hunt for the crew."
sources:
  - "archive/corbin-knighton.md"
  - "archive/Episode-09-Transcript.md"
  - "archive/session-10.md"
creature: "[[Dravosi Enforcer]]"
revealed: "Session 9"
title: ""
---

## At a glance

- **Role.** Crown boarder and commander of the HCS Ordinance.
- **Wants.** The true manifest of the merchant crew that walked off his deck.
- **Voice.** Clipped, formal, and exact. He repeats an order once.
- **Found at.** The HCS Ordinance, the Crown's courthouse on the water.

> [!narration] First look
> A broad, sun-scoured man in a grey coat crosses your deck with boarding gloves already on. He reads the manifest at arm's length like a page he intends to sign. “State your cargo and destination.”

## Play

- **Opens them up.** Matching papers, courtesy, and being addressed as an officer.
- **Shuts them down.** A story that changes between each telling or using the name Knighton as leverage.
- **Will share.** Crown inspection rules and the warrant's limits.
- **Will not share.** That he doubts his own report from the Uncertainty boarding.
- **If pressed.** He records the exchange and fights only to take the deck. He withdraws before inspection becomes slaughter.

## Depth

### History

Corbin learned formal record-keeping under the Tessarine Concordat before taking a Crown warrant. House Knighton's rank went to [[Rupert Knighton]] and its future to [[Corvin Knighton]]. Corbin got a ship and made boarding his family business.

#### Session 9: recalling the inquisitor

Corbin boarded the [[Uncertainty]] from the [[HCS Ordinance]] with [[Aleksander Malone]]. He was a young officer with duelling scars, a rapier and a bandolier of flintlocks. He introduced himself to Catarina as the new officer in charge of the knights, dispatched by [[Rupert Knighton]]. He apologised for Malone's behaviour, comparing the inquisitor to the family dog getting restless on a walk.

When Malone's interrogation escalated and Catarina imitated Umberlee's laughter, Corbin drew a flintlock on him. Corbin ordered, “You heard them. I believe them. Go. We're going to Calveno.” The Dravosi officers left the Party's ship, and the Ordinance sailed towards [[Calven and Calveno|Calveno]].

In his parting apology, Corbin said his dog needed a shorter chain or a muzzle. He asked for news of [[Shepherd Grigori]]. Corbin called him a dangerous, untrustworthy demon and blamed him for the Calveno incident.

#### Session 10: Grigori's offer

[[Shepherd Grigori]] asked the Party to wound Corbin if they encountered him again. He promised generous payment, provided Corbin survived with his mind intact and they sent word so Grigori could heal him. Grigori supplied a spell scroll for the message, which Delmar accepted. He described the proposed attack as removing the authority or the bite of one of the Dravosi's dogs. The Party didn't commit to attacking Corbin.

### Hidden truths

- Corbin accepted Delmar Fisk's merchant cover, then discovered the ship that left his deck was the HCS Surety. He has not filed the correction because a false written finding would end his career.
- Shepherd Grigori wants Corbin wounded, not broken, so a staged rescue can bind House Knighton. Corbin knows none of this.

### Threads

He drives **The Crown Inspection** and is a quiet rival hunting the crew alone.

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
