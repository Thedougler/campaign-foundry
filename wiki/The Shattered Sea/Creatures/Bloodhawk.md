---
type: Creature
summary: "A Bloodhawk creature (CR 11) used as a skirmisher in The Shattered Sea."
sources:
 - "archive/bloodhawk.md"
---

![[Bloodhawk - Token.jpg]]

![[Bloodhawk - Portrait.jpg]]

![[Bloodhawk - Handout Art.jpg]]

## At a glance

- **Role at the table.** Skirmisher. It stoops from a height and hauls its catch into the sky.
- **Threat.** CR 11. Ten feet of reach on beak and talons, 160 feet of flight, and the stoop from overhead give it range and movement to press the Party anywhere beneath it.
- **Tell.** The shadow settles over you and the wings lock toward the same spot before the stoop.
- **Weak to.** Cover, broken ground, and anything that splits its preferred range or formation. A closed canopy spoils the stoop outright.
- **Used by.** [[Crown Squid]] patrols the same territory.

> [!narration] First sight
> A blood-red bird glides over the treetops on four wide wings, and its shadow slides across the ground toward you. It circles once overhead, and its wings tip at one stretch of ground and hold. The whole bird folds, and the hiss of its stoop builds as it drops. Talons spread beneath it, each claw a hooked sickle, and the shadow covers one of you.

## Statblock

```statblock
layout: Basic 5e Layout
name: Bloodhawk
size: Gargantuan
type: monstrosity
alignment: unaligned
ac: "15 (natural armor)"
hp: 248
hit_dice: 16d20 + 80
speed: 20 ft., fly 160 ft.
stats: [28, 18, 20, 3, 16, 9]
saves:
  - dexterity: 8
  - constitution: 9
  - wisdom: 7
skillsaves:
  - perception: 11
senses: "passive Perception 21"
languages: "none"
cr: 11
traits:
  - name: Blood-Red Vigil
    desc: "The bloodhawk has advantage on Wisdom (Perception) checks that rely on sight."
  - name: Four-Winged Lift
    desc: "The bloodhawk can grapple Gargantuan creatures. When it moves a creature it has Grappled, that creature doesn't cause the bloodhawk's movement to cost extra movement. The bloodhawk's Fly Speed is halved while it is Grappling a Gargantuan creature."
actions:
  - name: Multiattack
    desc: "The bloodhawk makes two attacks: one Serrated Beak attack and one Hook Talons attack."
  - name: Serrated Beak
    desc: "Melee Attack Roll: +13, reach 10 ft., one target. Hit: 28 (3d12 + 9) Piercing damage. If the target is Grappled by the bloodhawk, the attack deals an extra 7 (2d6) Slashing damage as the recurved teeth inside the beak saw through the held prey."
  - name: Hook Talons
    desc: "Melee Attack Roll: +13, reach 10 ft., one target. Hit: 23 (4d6 + 9) Slashing damage. If the target is a Gargantuan or smaller creature, it has the Grappled condition (escape DC 19). Until the grapple ends, the target has the Restrained condition, and the bloodhawk can't use Hook Talons against another target."
  - name: Terminal Stoop (Recharge 5–6)
    desc: "The bloodhawk flies up to its Fly Speed in a straight line toward one creature it can see at least 60 feet below it. This movement doesn't provoke Opportunity Attacks. At the end of this movement, the bloodhawk makes one Hook Talons attack against that creature with Advantage. On a hit, the attack deals an extra 27 (6d8) Bludgeoning damage from the impact. The target must then succeed on a DC 17 Constitution saving throw or have the Stunned condition until the start of the bloodhawk's next turn."
bonus_actions:
  - name: Haul Aloft
    desc: "If the bloodhawk has a creature Grappled, it flies up to half its Fly Speed without provoking Opportunity Attacks from that creature. It can release the creature at any point during this movement."
reactions:
  - name: Break Turn
    desc: "Trigger: The bloodhawk is hit by an attack it can see while flying. Response: The bloodhawk adds 3 to its AC against the triggering attack, potentially causing it to miss. If the attack misses, the bloodhawk can fly up to 30 feet without provoking Opportunity Attacks."
```

## Play

### Tactics

Open where clear sky lies above the Party, and mark the held wings that announce the Terminal Stoop before it falls. Let the Party answer with positioning, cover, or focused fire. It abandons the height when its preferred advantage is gone or it is badly wounded.

### Outside a fight

Its tracks and feeding signs warn the Party before an encounter. A shadow that circles the same stretch twice marks its territory. It holds to its own habitat. Past the terrain that gives it an advantage, it does not follow.

## Depth

### Ecology

Its range is the open air above the Shattered Sea's canopy, and its diet follows its form, whatever those four wings can haul aloft. A traveller working Wisdom (Survival) can read its signs.

### Hidden truths

A close study of its remains or its territory shows its habits, and with them its reliance on open air above. A successful relevant Intelligence check confirms them.

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
