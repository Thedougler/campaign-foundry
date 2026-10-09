---
type: Location
kind: Site
summary: "Lavinia Sordi's Le Paludi shop for grey-market cursed and unusual goods."
sources:
  - "archive/ssw-nightmantle.md"
parent: "[[Le Paludi]]"
revealed: ""
title: ""
---

## At a glance

- **Draws the Party because.** A risky source of magic goods, where [[Lavinia Sordi]] sells what other shops will not touch.
- **Entrance.**
- **Occupants.** [[Lavinia Sordi]].
- **Danger.** The stock, sold as ordinary goods. The [[Nightmantle]] left this shop as a Cloak of Protection and played as a cursed Cloak of Displacement.
- **Prize.** Unusual wares at grey-market prices, and Lavinia's account of where each piece has been.

> [!narration] Entering
> Lavinia Sordi's racks fill the shop, unusual goods mixed among the ordinary, every price in plain sight. She lets you handle whatever you like and names her figures without hurry. Ask what a piece did to its last owner, and she answers in the same tone she uses for the price.

## Play

### Occupants

[[Lavinia Sordi]] runs the shop alone and sells across her racks.

### Likely actions

Browse the racks or bring stock in. Ask about an object's history and accept its risk, and she opens up. Press her for safety instead, and she names the curse and its price, then leaves the choice with you.

## Depth

### History

The shop is where Lavinia sells unusual and cursed goods. The [[Nightmantle]] hung on her rack listed at 120 gp on the grey market as a standard Cloak of Protection. [[Crissdalynn Khinriss]] paid 900 gp for it in Session 8, and play showed a cursed Cloak of Displacement.

### Hidden truths

The mislabelled stock is the shop's quiet trade. Lavinia's warnings stay jokes until a buyer presses her, and a piece's curse is often plain only after the sale.

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
