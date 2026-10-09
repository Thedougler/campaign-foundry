---
type: Item
summary: "The hidden record of Vessen's harbormaster, which proves the Compact ordered the sluice opened."
sources: []
revealed: ""
title: "Harbormaster's Ledger of Vessen"
---

## At a glance

- **Kind.** Notable mundane object, a bound ledger of waxed paper.
- **Rarity.** None.
- **Attunement.** None.
- **Changes.** Whether the Party can prove the Compact drowned Vessen on purpose.
- **Held by.** The Party. [[Odalys Ferro]] carries it, taken from the bell loft of [[The Drowned Chapel]].

> [!narration] First look
> The book is the size of two hands, bound in green oilcloth gone black at the edges. The pages are thick and stiff with wax, and the ink has faded to brown. It smells of candle smoke and damp. A strip of red cord marks a page near the end, and on the cover, in a clerk's neat hand, is one word, "Vessen."

## Play

### Properties

The ledger has 210 pages of harbor records in the old Vessen script. Reading it takes 1 hour, and a creature that reads Common can follow the script with a successful DC 12 Intelligence (History) check.

### In use

The last marked entry, dated 3 Blackwater 271 CY, records a sealed notice from the Compact telling the harbormaster to hold every Vessen boat at anchor on 6 Blackwater and to tell no one why. A copy of the Compact's order to open the gates of [[Crookback Sluice]] on that day was sent in the same packet by mistake, and the harbormaster copied it in. A creature that reads both learns that the Compact ordered the flood. The book can be destroyed by fire or long soaking, and it can be shown to witnesses as proof.

## Depth

### History

The harbormaster of Vessen kept the ledger for thirty years. On 3 Blackwater 271 CY he received the Compact's notice and the order sent with it, copied both into the ledger, and hid the book in the bell loft of [[The Drowned Chapel]]. He did not live to retrieve it.

### Hidden truths

- The order in the ledger is signed by the Compact's clerk, Corvin Tarrow, the ancestor of [[Hobb Tarrow]]. The Party can learn this by reading the signature and comparing it to the name on Hobb's badge.
- [[Ilse Corran]] and [[The Reedrunners]] want the ledger to blackmail the Harbor Council, and will act as soon as they learn it has been found.

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
