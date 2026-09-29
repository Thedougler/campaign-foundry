---
type: Location
kind: Region
summary: "A flat salt marsh cut by tidal channels, where the ground is mud, reeds and standing water."
sources: []
parent: ""
---

## At a glance

- **Character.** Silver flats, reed beds and channels that change course after every storm. The horizon is the same in every direction.
- **Held by.** No one. [[Saltwick]] collects the tolls, [[Reedholt]] keeps the ferries and [[The Reedrunners]] keep the back channels.
- **Changing.** The sea has begun to draw out early. Boatmen report a bell ringing under the water. See [[The Silent Bell]].
- **Crossing.** Saltwick to Reedholt is a day by ferry or two days on foot along the causeway. Off the routes, ground is [[Bog Ground]].
- **Danger.** Bog Ground, fast tides and [[Mire Drowner]] creatures under the boards.

> [!narration] Arrival
> The road ends at a post with a bell on it, and past the post there is only water and reeds. The air tastes of salt and rot, and the light comes up off the mud as much as down from the sky. Far out, a single stilt house stands with one lamp lit in its window. A heron watches you from a channel edge and does not move.

## Play

### Travel

Two routes cross the Brack. The causeway from [[Saltwick]] to [[Reedholt]] takes two days on foot and is safe except when a spring tide covers the low stretch, which costs half a day. The ferry takes one day and costs 5 silver pieces a head, but the boats belong to Reedholt families and [[The Reedrunners]] take a tithe from each. Off both routes the ground is [[Bog Ground]] and travel is at half speed.

### Places worth reaching

- [[Saltwick]], the port and seat of the Harbor Council.
- [[Reedholt]], a stilt village where the ferries tie up.
- [[Crookback Sluice]], the great gate that holds the sea out of the fields.

### Encounters

| d6  | Encounter                                                                                  |
| --- | ------------------------------------------------------------------------------------------ |
| 1   | A Reedrunner skiff with two [[Goblin Warrior]] hands, collecting a tithe from a fisherman. |
| 2   | A stretch of [[Bog Ground]] that was firm last week.                                       |
| 3   | A [[Mire Drowner]] lying in a channel edge, waiting for something to wade past.            |
| 4   | A ferry with [[Pell Rushlight]] at the pole, happy to talk for the price of a meal.        |
| 5   | Salt gatherers who will trade news and warn of a bad channel.                              |
| 6   | Nothing. A long quiet hour and the far sound of a bell.                                    |

### Rumors

- A bell rings under the water on still nights, a week before each Long Ebb.
- The Reedrunners will sell a chart of the back channels, but the price is a favor.
- The sluice at Crookback groans when the wind is from the east.

## Depth

### History

The Brack was farmland until 271 CY, when the river city of Vessen flooded. The water that drowned the city never fully drained, and the fields around it went back to marsh within a generation. The full account is in [[The Drowning of Vessen]].

### Hidden truths

- The marsh is not spreading by accident. Each year the tide reaches a little further because [[Crookback Sluice]] no longer closes fully. The Party can see this in the silt lines on the sluice piers.

### Threads

- [[The Silent Bell]] and [[The Failing Sluice]] both start here.
- [[Reedrunner Tithe]] is enforced along every ferry route.

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
