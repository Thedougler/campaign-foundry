---
type: Creature
summary: "A Deer-Stalker creature (CR 8) used as a ambusher in The Shattered Sea."
sources:
  - "archive/deer-stalker.md"
revealed: ""
title: "Deer-Stalker"
---

![[Deer-Stalker - Token.png]]

![[Deer-Stalker - Reference Sheet.png]]

![[Deer-Stalker - Portrait.jpg]]

![[Deer-Stalker - Portrait 3.jpg]]

![[Deer-Stalker - Portrait 2.jpg]]

![[Deer-Stalker - Portrait 1.jpg]]

## At a glance

- **Role at the table.** Ambusher. It waits in dim shade for one creature, and the lunge drags its catch toward the dark.
- **Threat.** CR 8. Three claws a turn at a 10-foot reach, and a grapple that ends in a drag toward deeper foliage, give its movement its teeth.
- **Tell.** The whole body winds up where all can watch it. Weight rocks back, a breath before the lunge.
- **Weak to.** Ground without shade. Open light strips its approach, and standing shoulder to shoulder denies it a target with no ally near.
- **Used by.** [[river-otter|River Otter]] patrols the same territory.

> [!narration] First sight
> The deer-stalker stalks out of dim shade, and the last stretch closes in one low strike with claws already spread. It rocks its weight back first. The whole body coils in plain view before the lunge comes. One claw snags a limb, and the drag begins, back toward deeper foliage. Pressed hard, it gives ground toward the dark.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Deer-Stalker"
size: Large
type: monstrosity
alignment: unaligned
ac: "16 (natural armor)"
hp: 110
hit_dice: "13d10 + 39"
speed: "40 ft., climb 20 ft."
stats: [16, 20, 16, 6, 18, 6]
saves:
  - dexterity: 8
  - wisdom: 7
skillsaves:
  - Stealth: 8
  - Perception: 7
  - Survival: 7
senses: "darkvision 120 ft., passive Perception 17"
languages: "none"
cr: 8
traits:
  - name: Assassinate
    desc: "During its first turn, the deer-stalker has Advantage on attack rolls against creatures that haven't taken a turn. Once per turn, when it hits a creature that has no conscious ally within 10 feet of it, the attack deals an extra 10 (3d6) damage."
  - name: Evasion
    desc: "If the deer-stalker is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage on a successful save and half on a failed one. It can't use this trait if it has the Incapacitated condition."
actions:
  - name: Multiattack
    desc: "The deer-stalker makes three Claw attacks."
  - name: Claw
    desc: "Melee Attack Roll: +8, reach 10 feet, one target. Hit: 14 (2d8 + 5) Slashing damage. If the target is Medium or smaller and the deer-stalker isn't grappling another creature, the target has the Grappled condition (escape DC 16)."
  - name: Lunge and Drag
    desc: "The deer-stalker moves up to its Speed and makes one Claw attack against a creature it can reach. On a hit, if the target has the Grappled condition, the deer-stalker can move up to half its Speed while carrying it; this movement doesn't provoke Opportunity Attacks from that target."
bonus_actions:
  - name: Cunning Action
    desc: "The deer-stalker takes the Dash or Disengage action."
reactions:
  - name: Break Contact
    desc: "Trigger: The deer-stalker is hit by an attack while at least two hostile creatures are within 30 feet of it. Response: The deer-stalker moves up to half its Speed toward dim light, darkness, or natural foliage without provoking Opportunity Attacks."
```

## Play

### Tactics

Open from deep shade at the Party's flank and show the winding body before the first lunge. The Party drags the fight into open light and keeps close together. Focused fire then ends the ambush. It backs away into deeper shade once its ambush is spent or it is badly hurt.

### Outside a fight

Tracks between the trees, drag marks running back into the foliage, and kills left in the deepest shade warn the Party before an encounter. It keeps to its own dim range and does not pursue past the leaves that hide it.

## Depth

### Ecology

It haunts the dim mid-storey of the Shattered Sea's woods and eats what it can drag away alone. A traveller working Wisdom (Survival) reads its sign in the drag marks that end under cover.

### Hidden truths

A close look at its territory shows the pattern of its ambushes, a target apart from its allies on a shaded path, and with the pattern its weaknesses. One Intelligence check bears both out.

## Links

Related page, [[river-otter|River Otter]].

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
