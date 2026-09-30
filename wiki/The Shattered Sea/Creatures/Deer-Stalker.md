---
type: Creature
summary: "A Deer-Stalker creature (CR 8) used as a ambusher in The Shattered Sea."
sources:
 - "archive/deer-stalker.md"
---

![[Deer-Stalker - Token.png]]

![[Deer-Stalker - Reference Sheet.png]]

![[Deer-Stalker - Portrait.jpg]]

![[Deer-Stalker - Portrait 3.jpg]]

![[Deer-Stalker - Portrait 2.jpg]]

![[Deer-Stalker - Portrait 1.jpg]]

## At a glance

- **Role at the table.** Ambusher.
- **Threat.** CR 8. Use its attack range, movement, or control to pressure the Party.
- **Tell.** Its body advertises its next attack before it commits.
- **Weak to.** Cover, terrain, and breaking its preferred range or formation.
- **Used by.** [[River Otter]] patrols the same territory.

> [!narration] First sight
> The deer-stalker reveals itself through a distinctive silhouette and the tell of its signature attack, making its danger clear before it strikes.

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

Open from its preferred terrain, announce the tell of its strongest option, and let the Party answer with positioning, cover, or focused fire. It retreats when its preferred advantage is gone or it is badly wounded.

### Outside a fight

Its tracks, feeding signs, and territorial behaviour warn the Party before an encounter. It acts according to its habitat and does not pursue beyond the terrain that gives it an advantage.

## Depth

### Ecology

The World is its habitat. Its diet follows its form. Observant travellers can identify its signs with Wisdom (Survival).

### Hidden truths

A careful examination of its remains or territory reveals its habits and weaknesses. A successful relevant Intelligence check confirms them.

## Links

Related page, [[River Otter]].

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
