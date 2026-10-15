---
type: Location
kind: Settlement
summary: "A timber fortress-market and harbour stop on the raiding-fleet trail,
  where route information is currency."
sources:
  - "archive/Sparhold.md"
  - "archive/Episode-09-Transcript.md"
  - "archive/agentic-co-dm-Midchain.md"
parent: "[[sparhold-isle|Sparhold Isle]]"
revealed: "Session 9"
title: "Sparhold"
---

![[sparhold-banner.webp]]

> [!narration] Arrival
> Sparhold counts every arrival before anyone asks what brought you. Pitch and wet timber scent the berths below the market, enclosed by timber walls above the water towards the Verdant Teeth.

## Districts

Sparhold is a defended lumber town in the northern [[midchain|Midchain]], built on [[sparhold-isle|Sparhold Isle]] at the edge of the [[verdant-teeth|Verdant Teeth]]. It is the closest harbour to the Teeth, with looser access than the surrounding defended islands. The harbour slope climbs to its timber fortress-market.

The outer berth, work yard, meeting place and rear landing form the usable settlement. Practical hospitality comes with guarded access. Shipbuilding timber is sold here, and crews can hire pilots or berths. Visitors also seek departure records and information about the taken.

## Services

Pilots, labour, trade, protection, departure records and witness interviews are available when trust or payment opens them.

Logging crews cut the massive Grung trees of the Verdant Teeth for shipbuilding, risking capture and enslavement.

## Factions here

A local harbour compact rules the town. A Grung trail party, a Passage contact and a possible Crown observer contest information, while outside powers press for access. The raiding-fleet trail puts witnesses at risk, and Crown occupation remains a threat.

## Local rules

Public violence closes the berth. A reciprocal question is the normal price of an answer.

## Rumors

Sparhold is a relay, not necessarily the final destination of the taken.

## History

The settlement is on the open-water trail from [[uncertainty|Uncertainty]] toward [[aruhe|Aruhe]]. The local spar stand was cut down when the walls went up.

### Session 9: setting course

[[geoffrey-draves|Geoffrey Draves]] marked Sparhold on his map as about a day's sail from [[calven-and-calveno|Calveno]]. [[jean-claude-tabarnack|Jean-Claude]] believed the Grung fleet would bypass the town, but thought residents or sailors might have seen it pass. The Party unanimously chose to sail south for Sparhold.

## Hidden truths

A berth ledger, wake, rope fibre, tincture vessel or false cargo entry can separate a planted lead from the true departure route.

## Threads

[[perrin-and-nona|Perrin and Nona]], [[the-crown-inspection|The Crown Inspection]], and [[simones-hunters|Simone's Hunters]].

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
