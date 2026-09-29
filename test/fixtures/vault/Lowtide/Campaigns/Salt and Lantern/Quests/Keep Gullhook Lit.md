---
type: Quest
summary: "Keep the Gullhook lamp burning every night until the end of the coming Long Ebb."
sources: []
status: active
---

## At a glance

- **Offered by.** [[Hobb Tarrow]], Harbor Warden of [[Saltwick]].
- **Reward.** 300 gold pieces, 100 of it paid in advance, and the loan of the [[Ebb Lantern]] until the end of the Ebb.
- **Deadline.** The end of the Long Ebb, on 6 Hollowdark 412 CY.
- **Done when.** The lamp burns every night until the sixth day of the Long Ebb.
- **Failed when.** The lamp goes dark for a whole night while the Ebb is on.
- **Advances.** [[Reedrunner Tithe]].

> [!narration] The offer
> A notice hangs on the Warden's door in a careful hand. "Lamp keeper wanted. Pay in coin, meals at the Wet Lantern. Keep the light at Gullhook burning every night through the Long Ebb. Apply within." Underneath, in smaller letters, someone has added: "The last keeper died of it."

## Play

- **Leads.** [[Hobb Tarrow]], the keeper's log at [[Gullhook Lighthouse]], and the empty oil barrels.
- **Opposition.** [[The Reedrunners]], who need the lamp dark to salvage wrecks.
- **Complications.** Oil is running low. The Council has not approved a new order. Boats keep wrecking near the Mole.
- **Payoff.** The remaining 200 gold pieces, the goodwill of the Harbor Warden, and the chance to keep the Ebb Lantern if the light holds.

## Depth

### Hidden truths

- Hobb wants the lamp lit because he expects the bell to ring again on the first night of the Long Ebb and does not want the harbor dark when it does. The Party can learn this from his behavior at the lighthouse.
- The quest was never the Council's. Hobb paid for the notice from his own pay.

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
