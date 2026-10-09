---
type: Location
kind: Settlement
summary: "A timber fortress-market and harbour stop on the raiding-fleet trail,
  where route information is currency."
sources:
  - "archive/Sparhold.md"
  - "archive/Episode-09-Transcript.md"
parent: "[[Midchain]]"
revealed: "Session 9"
title: ""
---

## At a glance

- **Size.** A defended lumber town in the northern [[Midchain]], at the edge of the [[Verdant Teeth]]. Its harbour slope leads to a timber fortress-market on Sparhold Isle.
- **Ruled by.** A local harbour compact, with outside powers pressing for access.
- **Mood.** Practical hospitality with a lock on it.
- **Unsettled by.** The raiding-fleet trail, witness danger and possible Crown occupation.
- **Known for.** Shipbuilding timber, berths and pilots. Visitors also seek departure records and information about the taken.

> [!narration] Arrival
> Sparhold counts every arrival before anyone asks what brought you. Pitch and wet timber scent the berths below the market, enclosed by timber walls above the water towards the Verdant Teeth.

## Play

### Districts

The outer berth, work yard, meeting place and rear landing form the usable settlement. Sparhold Isle is a separate land form.

### Services

Pilots, labour, trade, protection, departure records and witness interviews are available when trust or payment opens them.

Logging crews cut the massive Grung trees of the Verdant Teeth for shipbuilding, risking capture and enslavement.

### Factions here

The harbour compact, a Grung trail party, a Passage contact and a possible Crown observer contest information.

### Local rules

Public violence closes the berth. A reciprocal question is the normal price of an answer.

### Rumors

Sparhold is a relay, not necessarily the final destination of the taken.

## Depth

### History

The settlement is on the open-water trail from [[Uncertainty]] toward [[Aruhe]]. The local spar stand was cut down when the walls went up.

#### Session 9: setting course

[[Geoffrey Draves]] marked Sparhold on his map as about a day's sail from [[Calven and Calveno|Calveno]]. [[Jean-Claude Tabarnack|Jean-Claude]] believed the Grung fleet would bypass the town, but thought residents or sailors might have seen it pass. The Party unanimously chose to sail south for Sparhold.

### Hidden truths

A berth ledger, wake, rope fibre, tincture vessel or false cargo entry can separate a planted lead from the true departure route.

### Threads

[[Perrin and Nona]], [[The Crown Inspection]], and [[Simone's Hunters]].

## Links

```base
filters:
 and:
  - file.hasLink(this.file)
views:
 - type: table
  name: Contains
  filters:
   and:
    - parent == this
  groupBy:
   property: note.kind
   direction: ASC
  order:
   - file.name
   - note.summary
 - type: table
  name: Linked from
  filters:
   and:
    - parent != this
  groupBy:
   property: note.kind
   direction: ASC
  order:
   - file.name
   - note.summary
```
