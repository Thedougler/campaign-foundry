---
title: Heart Weaver's Primer
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Spellcasting Focus, Rare (Requires Attunement By a Wizard), 3 lb.*

This pristine book smells faintly of a random scent you find pleasing. When found, the book contains the following spells: *antipathy/sympathy*, *charm person*, *dominate person*, *enthral*, *hypnotic pattern*, *modify memory*, and *suggestion*. It functions as a spellbook for you.

While you are holding the book, you can use it as a spellcasting focus for your wizard spells.

The book has 3 charges, and it regains 1d3 expended charges daily at dawn. You can use the charges in the following ways while holding it:

- If you spend 1 minute studying the book, you can expend 1 charge to replace one of your prepared wizard spells with a different spell in the book. The new spell must be of the enchantment school.
- When you cast an enchantment spell, you can expend 1 charge to impose disadvantage on the first saving throw one target makes against the spell.

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
