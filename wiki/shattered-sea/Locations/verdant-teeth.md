---
type: Location
kind: Region
summary: "The Grung Clans' closed island cluster: sanctioned beach trade
  outward, interiors forbidden to outsiders."
sources:
  - "archive/ssw-grung.md"
  - "archive/ssw-midchain.md"
  - "archive/collab-2026-10-04-grung-gold-caste-gods.md"
  - "archive/Episode-09-Transcript.md"
  - "archive/agentic-co-dm-Midchain.md"
parent: "[[midchain|Midchain]]"
revealed: "Session 10"
title: "Verdant Teeth"
---

![[verdant-teeth-banner.webp]]

> [!narration] Arrival
> The beach is as far as the sand goes. Traders anchor offshore and wait while blue-caste grung meet them at the waterline. Out past the treeline, rainforest closes over whatever lies inland.

## Travel

Five country-sized rainforest islands form a closed southern Midchain cluster. A boat can cross between facing shores in hours, while walking through an island's interior takes weeks. Sanctioned contact happens on the beach, and the interior takes no visitors. The [[grung-clans|Grung Clans]] treat the treeline as a border. Outsiders meet blue-caste traders at the waterline or, more rarely, farther out in the [[midchain|Midchain]].

## Places

- [[karath|Karath]], the eastern Tooth, with its reef gaps, hatcheries, captive pens and near channel to Aruhe.
- [[sparhold|Sparhold]], a defended lumber town at the cluster's edge. Its crews risk capture and enslavement cutting the massive Grung trees for shipbuilding.

## Powers

The [[grung-clans|Grung Clans]] control the beaches, reef approaches and closed interiors. Their failing water power drives a captive pipeline towards Karath, while scouting parties range beyond the sanctioned trading beaches.

## Travel events

1. A blue-caste trade party at the waterline.
2. A grung scouting party working the coast.
3. A [[grung-creature|Grung (Creature)]] patrol in the shallows.
4. A [[grung-elite-warrior|Grung Elite Warrior]] guarding a route inland.
5. Captives moved under guard toward Karath.
6. A gold-caste presence no one addresses directly.

## Rumors

Free grung avoid Aruhe, and compelled ones are sent there. The clans trade toxin to the Crown through intermediaries.

## History

The clans control five rainforest islands as one closed system of canopy routes, pools, flooded cuts and beaches. Their shrinking maritime power drives the raids, toxin exports and fighting-age levy that feed the pipeline toward Karath.

## Hidden truths

The clans' colour marks give social information without proving permanent ancestry or rank. The sages preserve the rule of the [[gold-caste|Gold Caste]], mortal grung who claim godhood for themselves.

## Threads

[[bring-the-pearl-of-souls-to-umberlee|Bring the Pearl of Souls to Umberlee]] intersects the clans' routes.

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
      property: note.type
      direction: ASC
      order:
        - file.name
        - note.summary
```
