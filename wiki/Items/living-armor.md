---
title: Living Armor
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Generic Variant, Very Rare (Requires Attunement).*

This hideous armour is formed from black chitin, beneath which veins pulse and red sinews glisten. To attune to this item, you must wear it for the entire attunement period, during which tendrils on the inside burrow into you.

While wearing this armour, you have a +1 bonus to Armour Class, and you have resistance to the following damage types: necrotic, poison, and psychic.

***Symbiotic Nature.*** The armour can't be removed from you while you're attuned to it, and you can't voluntarily end your attunement to it. If you're targeted by a spell that ends a curse, your attunement to the armour ends, and it detaches from you.

The armour requires fresh blood be fed to it. Immediately after you finish any long rest, you must either feed half of your remaining Hit Dice to the armor (round up) or take 1 level of exhaustion.

***Base items.*** This item variant can be applied to the following base items:

- *Breastplate* (*Living Breastplate*)
- *Chain Mail* (*Living Chain Mail*)
- *Chain Shirt* (*Living Chain Shirt*)
- *Half Plate Armour* (*Living Half Plate Armour*)
- *Hide Armour* (*Living Hide Armour*)
- *Leather Armor* (*Living Leather Armor*)
- *Padded Armor* (*Living Padded Armor*)
- *Plate Armor* (*Living Plate Armor*)
- *Ring Mail* (*Living Ring Mail*)
- *Scale Mail* (*Living Scale Mail*)
- *Spiked Armor* (*Living Spiked Armor*)
- *Splint Armor* (*Living Splint Armor*)
- *Studded Leather Armor* (*Living Studded Leather Armor*)

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
