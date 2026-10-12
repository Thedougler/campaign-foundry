---
title: Namer's Needle
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Weapon (*Dagger*), Rare, Simple Weapon, Melee Weapon, 1 lb.*

1d4 Piercing

Finesse, Light, Thrown (20/60 ft.)

Mastery:  Nick

You gain a +1 bonus to attack rolls and damage rolls made with this magic weapon.

***Identify Target.*** When you hit a creature with an attack roll using this weapon, you can compel the target to reveal its identity. The target makes a DC 15 Wisdom saving throw. On a failed save, the target says or signs its name clearly and emphatically. On a successful save, the target is immune to this effect for the next 24 hours. If the creature can't speak or sign a language, it automatically succeeds on the save.

***Named Target.*** When you hit a creature with an attack roll using this weapon, you can say or sign the target's name clearly and emphatically to turn the hit into a Critical Hit. Once this property is used, it can't be used again until the next dawn.

***Finesse.*** When making an attack with a Finesse weapon, use your choice of your Strength or Dexterity modifier for the attack and damage rolls. You must use the same modifier for both rolls.

***Light.*** When you take the Attack action on your turn and attack with a Light weapon, you can make one extra attack as a Bonus Action later on the same turn. That extra attack must be made with a different Light weapon, and you don't add your ability modifier to the extra attack's damage unless that modifier is negative. For example, you can attack with a *Shortsword* in one hand and a *Dagger* in the other using the Attack action and a Bonus Action, but you don't add your Strength or Dexterity modifier to the damage roll of the Bonus Action unless that modifier is negative.

***Thrown.*** If a weapon has the Thrown property, you can throw the weapon to make a ranged attack, and you can draw that weapon as part of the attack. If the weapon is a Melee weapon, use the same ability modifier for the attack and damage rolls that you use for a melee attack with that weapon.

***Mastery: Nick.*** When you make the extra attack of the Light property, you can make it as part of the Attack action instead of as a Bonus Action. You can make this extra attack only once per turn.

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
