---
type: Location
kind: Settlement
summary: "A walled port at the edge of the Brack, ruled by a Harbor Council and quietly taxed by smugglers."
sources: []
parent: "[[The Brack]]"
---

## At a glance

- **Size.** About 2,000 people, the only town in the Brack.
- **Ruled by.** The five-seat Harbor Council. [[Pell Rushlight]] is Harbor Warden and commands the watch.
- **Mood.** Busy by day and shuttered by dusk. People prefer not to see what happens on the piers at night.
- **Unsettled by.** The lamp at [[Gullhook Lighthouse]] keeps going dark, and boats keep running aground on the mud banks.
- **Known for.** Salt, smoked eel and the tall white lighthouse.

> [!narration] Arrival
> Saltwick rises out of the flats as a low wall of grey brick with the lighthouse standing at the end of a long stone mole. Gulls wheel over the fish market. You can smell smoke from the eel sheds before you see the gate. Lamp hooks hang under the eaves of the roofs, and none of them is lit yet.

## Play

### Districts

- **The Mole.** A stone arm that shelters the harbor, with the lighthouse at its tip.
- **Pier Row.** Warehouses, chandlers and the eel sheds. Loud by day and empty after dark.
- **Weir Street.** Houses of the guild families and the Council hall, clean and watched.
- **The Undertow.** Cheap lodging along the back channel, where [[The Reedrunners]] drink.

### Services

- **The Wet Lantern.** An inn on Pier Row. Rooms cost 5 silver pieces a night, and the landlady sells news at the same price.
- **Harbor Warden's office.** [[Hobb Tarrow]] keeps hours here, hires help and pays bounties.
- **Ferry stairs.** Boats leave for [[Reedholt]] at first light.
- **Temple of Mother Ebb.** A small shrine to [[Mother Ebb]] with a healer who treats marsh fever.

### Factions here

- The Harbor Council, which rules the town and does little else.
- [[The Reedrunners]], who run the back channels and take a tithe from most trade.

### Local rules

- No open flame on the piers after dark, except the harbor lamps.
- Arms must be peace-tied inside the Weir Street gate.
- Anyone who finds a wreck must report it to the Harbor Warden within a day.

### Rumors

- The lighthouse keeper died in the spring, and the lamp has failed on the dark of every moon since.
- The Council has a ledger it does not want opened.
- Ilse Corran is not from the Undertow. She is from the Weir Street families.

## Depth

### History

Saltwick was a fishing village until the Compact chose it as the seat of the sluice trade in 12 CY. It grew fat on the tolls. Vessen was its rival upriver until 271 CY, and Saltwick took most of the Vessen trade afterward. See [[The Drowning of Vessen]].

### Hidden truths

- Several Council families descend from the men who signed the order to open the sluice. They do not know everything, but they suspect it. The Party can learn this from [[Hobb Tarrow]], whose ancestor was the clerk who copied the order.

### Threads

- [[Reedrunner Tithe]] is strongest here.
- [[The Silent Bell]] draws the Party toward the Council's hidden ledger.

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
