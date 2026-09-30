---
type: NPC
summary: "Seller of cursed goods who named Osset a second time."
sources:
  - "archive/lavinia-sordi.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Seller and contact for unusual or cursed goods.
- **Wants.** To sell dangerous stock without surrendering control of what she knows.
- **Voice.** Attentive, dry, and always counting the curse before the price.
- **Found at.** La Cenere in Le Paludi.

> [!narration] First look
> A younger, angular woman watches you with the stillness of someone who has handled objects other people fear. She sounds like a seller waiting for you to ask what the item costs after the curse is counted.

## Play

- **Opens them up.** A buyer who asks about an object's history and accepts its risk.
- **Shuts them down.** Treating cursed stock as harmless or demanding clean safety.
- **Will share.** What she knows about Nightmantle and the name Osset.
- **Will not share.** A clean promise that the goods are safe, or speculation about her workplace.
- **If pressed.** She names the curse and its price, then makes the buyer choose.

## Depth

### History

Lavinia sells unusual and cursed goods at La Cenere. She sold Nightmantle and named Osset a second time, linking traces to the Sentinel schism.

### Hidden truths

- She knows enough about Nightmantle and Osset to connect dangerous objects with older power, but the source establishes no larger allegiance.
- Dravosi prison records and the Sentinel schism are pressure points, not established parts of her past.

### Threads

She is a contact in the investigation around Osset and the Countless order.

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
