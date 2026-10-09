---
type: Location
kind: Region
summary: "The permanent western storm belt between the Scatter and the colonial
  homelands: a three-week crossing that loses one hull in three and prices every
  mistake."
sources:
  - "archive/ssw-galewall.md"
  - "archive/ssw-ashwall-islands.md"
  - "archive/agentic-co-dm-Galewall.md"
parent: ""
revealed: "Backstory"
title: "Galewall"
---

## At a glance

- **Character.** A wall of weather that can be crossed. It does not bar the way. It changes the price of every mistake.
- **Held by.** The Ashwall pilot families' practice, the weather offices, and the survival records of crews who have done it ([[ashwall-islands|Ashwall Islands]]).
- **Changing.** White-fire accounts keep arriving in the lee, and experienced pilots now treat moving storm-light as a warning in a class of its own.
- **Crossing.** About three weeks with an experienced pilot and a hull that has done it before. One loss in three is the accepted rate, and the trade pays a premium to the pilot who loses fewer.
- **Danger.** The storm first. Then the wreck-fed predators and the recovery-lane piracy that live on what the storm leaves.

> [!narration] Arrival
> Ahead of you a dark band lies along the horizon and will not break apart as you run toward it. Chop arrives long before the weather does. The wind builds in stages, and the water turns cold under the hull. What looked like one wall of cloud resolves into grey and slate-blue weather stacked on itself, with storm systems working inside it without pause. Behind you, the charted sea keeps its last calm.

## Play

### Travel

There is one road through, so the choice that matters is preparation, not route.

- **Seasoned run.** An experienced pilot and a hull that has done it before make the crossing in about three weeks, for a fee priced to the risk. The trade between the Scatter and the colonial homelands runs on these crossings.
- **Cheap run.** A lesser pilot or an untried hull saves the fee and takes the one-in-three. The name-boards in the western shrines are mostly this run's accounting.

Reading the wind's stages is the pilot's craft. Judging how far the boundary lies and how long before the first storm system reaches the hull is DC 15 Wisdom (Survival). A failure meets the first system under full canvas, and the split sails and rigging damage cost days running before the weather.

The white-fire drill is the one pilots who have crossed insist on: storm-light that moves is a different warning from ordinary lightning. Shorten sail, clear the mast line, and get metal off the hands on deck before it crosses ([[arclight-phoenix|Arclight Phoenix]]).

### Places

- [[ashwall-islands|Ashwall Islands]], the last solid ground outbound and the only repair water on the run.
- [[the-galewall-runners-drop|The Galewall Runner's Drop]], a legendary colonial-era privateer cache on the Ashwalls.

### Encounters

1. Storm-light gathers ahead of the ship instead of above it and crosses the mast line in a bird-shape. Shorten sail and clear the rigging before it does ([[arclight-phoenix|Arclight Phoenix]]).
2. A wake holds station off a damaged hull near the lee ([[giant-shark|Giant Shark]]).
3. A killer whale pod follows the boats for hours, circling more than striking ([[killer-whale|Killer Whale]]).
4. A shadow with no cloud behind it crosses the canvas above the spires ([[roc|Roc]]).
5. A helpful sail closes on a weather-beaten convoy. On this water the rescue can be the boarding ([[velvet-noose|Velvet Noose]] is the nightmare version).
6. A hull off a shrine's name-board limps into the lee short-handed. The survivors sell their account of the crossing for work and passage.

### Rumors

- "The light that moves is not lightning." True enough that pilots log it as its own warning now. Investigate: read the burn patterns on hulls in the [[ashwall-lee|Ashwall Lee]]. They run along contact points, not down from a strike.
- "The wall is kept by something alive." Pilot lore says so, and pilot lore out here is practical before it is theory. Investigate: the oldest Ashwall families' logbooks mark lateral vent-fire westward before Galewall activity rises.
- "Lose fewer than one in three and your fee doubles." The trade talks in exactly those terms. Investigate: ask any western [[crown-islands|Crown Islands]] harbour what a crossing pilot costs, and why.

## Depth

### History

The crossing is older than the trade that runs it, and no record says how long pilots have worked the wall. Every port shrine on the western [[crown-islands|Crown Islands]] keeps a board with names on it. The colonial era left caches on the Ashwalls, the kind crews still hunt for ([[the-galewall-runners-drop|The Galewall Runner's Drop]]).

### Hidden truths

The pilots' belief that the wall is sustained by [[arclight-phoenix|Arclight Phoenix]] activity is substantially true. The white-fire accounts agree in the useful places. Burns ran along contact points instead of down from one strike. Iron fittings came away with enough magnetism to pull nails from a workbench, and the survivors describe a bird-shape crossing the mast line. That agreement is why moving storm-light is logged as its own warning.

### Threads

The active Threads do not reach the western water. The Crown's inspections and the Maw's pull all draw east. The Galewall is beyond every charted debt.

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
