---
type: Location
kind: Settlement
summary: "A timber fortress-market and harbour stop on the raiding-fleet trail, where route information is currency."
sources:
 - "archive/Sparhold.md"
parent: "[[Midchain]]"
---

## At a glance

- **Size.** A harbour slope and timber fortress-market on Sparhold Isle.
- **Ruled by.** A local harbour compact, with outside powers pressing for access.
- **Mood.** Practical hospitality with a lock on it.
- **Unsettled by.** The raiding-fleet trail, witness danger and possible Crown occupation.
- **Known for.** Berths, pilots, departure records and information about the taken.

> [!narration] Arrival
> Sparhold's timber walls rise before you, enclosing a market above the Teethward water. The berths smell of pitch and wet timber. Arrivals are counted here before anyone asks what brought you.

## Play

### Districts

The outer berth, work yard, meeting place and rear landing form the usable settlement. Sparhold Isle is a separate land form.

### Services

Pilots, labour, trade, protection, departure records and witness interviews are available when trust or payment opens them.

### Factions here

The harbour compact, a Grung trail party, a Passage contact and a possible Crown observer contest information.

### Local rules

Public violence closes the berth. A reciprocal question is the normal price of an answer.

### Rumors

Sparhold is a relay, not necessarily the final destination of the taken.

## Depth

### History

The settlement sits on the open-water trail from [[Uncertainty]] toward [[Aruhe]]. The local spar stand was cut down when the walls went up.

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
