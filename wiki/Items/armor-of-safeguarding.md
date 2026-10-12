---
title: Armor of Safeguarding
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Very Rare (Requires Attunement).*

Set in the center of this armour's chest is a citrine engraved with the shield rune.

While wearing this armour, your hit point maximum increases by an amount equal to 10 + your level.

***Invoking the Rune.*** As an action, you can invoke the armour's rune to cast the *beacon of hope* spell with it; the spell has a duration of 1 minute and doesn't require concentration. Once the rune has been invoked, it can't be invoked again until the next dawn.

***Base items.*** This item variant can be applied to the following base items:

- *Chain Mail* (*Chain Mail of Safeguarding*)
- *Plate Armour* (*Plate Armour of Safeguarding*)
- *Ring Mail* (*Ring Mail of Safeguarding*)
- *Splint Armour* (*Splint Armour of Safeguarding*)

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
