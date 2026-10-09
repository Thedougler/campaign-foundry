---
type: Location
kind: Site
summary: "A three-storey Concordat house on the Shelf that turns trade, salvage
  and mail into signed terms."
sources:
  - "archive/ssw-tessarine-trade-house.md"
parent: "[[calders-tooth-and-port-tidefall|Calder's Tooth and Port Tidefall]]"
revealed: ""
title: "Tessarine Trade House"
---

## At a glance

- **Draws the Party because.** An open salvage contract sits on file for any qualified party with a vessel.
- **Entrance.** A counter behind a partition on the ground floor, and a stair up to the mail rooms.
- **Occupants.** A clerk at the counter and couriers in and out through the day.
- **Danger.** The paper itself. A signature at this counter binds the signer to Tessarine terms.
- **Prize.** The salvage contract, or Concordat credit, sealed mail and legal cover for a crew willing to sign.

> [!narration] Entering
> Pale stone rises three storeys on the Shelf. A blue-triangle pennant hangs above the door. Ink and cedar oil greet you before the counter does, past four chairs lined against the wall and a stair climbing at the back. Behind the partition, a clerk looks up and, without a word, slides a bound appointment book across the wood. Its next open slot is the day after tomorrow.

## Play

### Areas

The ground floor is one room. Chairs line the wall for those waiting, four in all, and the appointment book and the house ledger lie on the counter. The stair at the back climbs to the sealed mail rooms and the brokerage office, where courier mail is sealed for dispatch and the paperwork of the bonded-hold treaty is kept.

### Occupants

- A clerk behind the partition.

### Likely actions

Book an appointment and wait out the slot. Ask after the open salvage contract. Licence a trade, broker a salvage claim, or send sealed mail under Concordat cover.

## Depth

### History

The house has licensed trade, brokered salvage and sent couriers from the Shelf since the [[tessarine-concordat|Tessarine Concordat]] took the port's bonded trade.

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
