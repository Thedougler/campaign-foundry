---
type: NPC
summary: "Seller of cursed goods who named Osset a second time."
sources:
  - "archive/lavinia-sordi.md"
  - "archive/ssw-nightmantle.md"
  - "archive/Episode-09-Transcript.md"
creature: "[[commoner|Commoner]]"
revealed: "Session 8"
title: "Lavinia Sordi"
---

## At a glance

- **Role.** Seller and contact for unusual or cursed goods.
- **Wants.** To sell dangerous stock without surrendering control of what she knows.
- **Voice.** Attentive, dry, and always counting the curse before the price.
- **Found at.** [[la-cenere|La Cenere]] in [[le-paludi|Le Paludi]].

> [!narration] First look
> A younger, angular woman watches you with the stillness of someone who has handled objects other people fear. She waits for you to ask what the item costs, like a seller who counts the curse before she quotes a price.

## Play

- **Opens them up.** Asking about an object's history and accepting its risk.
- **Shuts them down.** Treating cursed stock as harmless or demanding clean safety.
- **Will share.** What she knows about Nightmantle and the name Osset.
- **Will not share.** A clean promise that the goods are safe, or speculation about her workplace.
- **If pressed.** She names the curse and its price, then makes the buyer choose.

## Depth

### History

Lavinia sells unusual and cursed goods at [[la-cenere|La Cenere]]. She sold Nightmantle and named Osset a second time, linking traces to the Sentinel schism.

Delmar holds a sending stone paired to hers, and the Party counted her among the stone's contacts in Session 9. By his account, he called on her during the hour before the [[uncertainty|Uncertainty]] sailed, and the romantic meeting went comically badly: he turned out the tender, swooning admirer instead of what she had expected. Afterwards he wiped her from his stone's returning contacts, saying, "now I have a burner crystal," and sent his warning of the coming Dravosi warship to [[serena|Serena]] instead.

### Hidden truths

- She knows enough about Nightmantle and Osset to connect dangerous objects with older power, but the source establishes no larger allegiance.
- Dravosi prison records and the Sentinel schism are pressure points, not established parts of her past.

### Threads

She is a contact in the investigation around Osset and the faction order.

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
