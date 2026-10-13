---
type: Location
kind: Site
summary: "The western dive terrace of the Drowned Maw, where salvage crews work
  the upper Antheri tiers above squid-dark water."
sources:
  - "archive/drowned-maw.md"
  - "archive/ssw-giant-squid.md"
  - "archive/Episode-09-Transcript.md"
  - "archive/collab-2026-10-12-the-dead-lady-and-the-fist-debt.md"
parent: "[[drowned-maw|Drowned Maw]]"
revealed: ""
title: "Shelfworks"
---

## Areas

The Party comes here to stage its Drowned Maw descent and gain access to the first worked Antheri tier.

### The dive floor

==Salvage lines and pumps== The Maw approach connects to the dive floor by salvage line. Contracted crews work cut Antheri stone at sixty to two hundred feet, using the racked dive lines and air pumps. The agreed depth sets the limit of their work.

### The shelf edge

==The last Antheri arch== The shelf runs twenty metres past the last visible arch, then falls into black water. The drop-off is where squid rise after dark.

### The air pumps

Surface air reaches the dive lines through the pumps. [[orvalle|Orvalle]] keeps his post beside them.

### The Red Lady site

==Beyond Umberlee's claim== The real wreck of the [[red-lady|Red Lady]] lies keel-down in Shelfworks clay at the eastern edge, with the Pearl of Souls inside. Umberlee cannot raise it.

## Hazards

Past the agreed depth, a pull has taken a diver before. Lines can go taut with no diver at the end and part cleanly. After dark the squid can rise as far as the dive floor. Crews stay above the agreed depth. Chasing is how the drop-off takes a second diver.

## Occupants

[[fathomrush|Fathomrush]] stages the dives and crews the lines. [[orvalle|Orvalle]] runs the air pumps and no longer dives.

## Likely actions

The Party can sign on with a salvage crew or buy line time on the wall. Orvalle tells his account to one crew each season. The Party can also ask the pump crew what the drop-off has been doing lately.

> [!narration] Entering
> The dive floor is a terrace of cut Antheri stone partway down the wall, roped at the shelf end. Dive lines run off the edge into water the lamp cannot light. Air lines cross the stone to a rack of pumps, and their levers rise and fall in a slow thud while a hand in oilskins watches the dials and counts the crew out on the lines. Worked stone runs on to the last arch. Past it the shelf ends over black water, and a board at the rope gives the one rule. Those on the lines stay above the depth the crews agreed.

## History

The Antheri built down the wall in tiers. The Shelfworks works the first sixty to two hundred feet, with Mid-Works and Deep Works below it. A working gold rush rides on how long the depth remains safe. The standing rule dates from Orvalle's last dive. He chased something below the agreed depth, and his partner's buoy came up forty minutes later, alone.

## Hidden truths

- [[giant-squid|Giant Squid]] is the practical answer to what took Orvalle's partner. The clue is his account, which he gives to one crew each season at the air pumps: he chased something below the agreed depth, and his partner's buoy came up alone forty minutes later.
- The Pearl's wreck site is the [[red-lady|Red Lady]] in the eastern Shelfworks, beyond the line where Umberlee's claim ends. Her actual wreck holds the Pearl.

## Threads

- [[drowned-maw-awakening|Drowned Maw Awakening]]. At the Party's next visit to the Maw, the next development is their choice of what to do with its evidence: hide it or ask who benefits from the closed fissure.
- [[bring-the-pearl-of-souls-to-umberlee|Bring the Pearl of Souls to Umberlee]]. At the Party's next dive, they must decide how to answer Umberlee's price while the Pearl stays beyond her reach.

## Links

It lies within the [[drowned-maw|Drowned Maw]]. [[fathomrush|Fathomrush]] stages the dives, [[orvalle|Orvalle]] keeps the pumps, and the [[giant-squid|Giant Squid]] keeps the drop-off.

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
