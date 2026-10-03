---
type: Creature
summary: "A Wolfrabbit creature (CR 4) used as a skirmisher in The Shattered Sea."
sources:
 - "archive/wolfrabbit.md"
---

![[Wolfrabbit - Token.jpg]]

![[Wolfrabbit - Reference Sheet.jpg]]

![[Wolfrabbit - Portrait.jpg]]

![[Wolfrabbit - Portrait 2.jpg]]

## At a glance

- **Role at the table.** A hit-and-run hunter that bounds in, rakes, and is gone before the Party turns.
- **Threat.** CR 4 apiece, and a pack of them rends any target one of them knocks down.
- **Tell.** Each spring gathers from a low crouch, and a Party that watches the crouch reads every leap.
- **Weak to.** Terrain that denies it a thirty-foot run, and spacing that keeps a fallen Party member beyond five feet of another wolfrabbit.
- **Used by.** [[Young Bloodhawk]] patrols the same territory.

> [!narration] First sight
> The wolfrabbit crosses open ground in two bounds, and each landing swings the raking claws almost before its feet touch down. It gathers low before every spring, so you can read each leap before it comes. When one of them falls bleeding, the pack closes on the scent and the frenzy starts there.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Wolfrabbit"
size: Medium
type: monstrosity
alignment: unaligned
ac: "15 (natural armor)"
hp: 60
hit_dice: "8d8 + 24"
speed: "50 ft."
stats: [20, 20, 16, 4, 16, 6]
skillsaves:
  - perception: 5
  - stealth: 7
senses: "darkvision 60 ft., passive Perception 15"
languages: "none"
cr: 4
traits:
  - name: "Standing Leap"
    desc: "The wolfrabbit can long jump up to 30 feet and high jump up to 15 feet, with or without a running start."
  - name: "Pack Rend"
    desc: "Once per turn when the wolfrabbit hits a Prone creature with its Bite, the attack deals an extra 5 (1d10) Piercing damage if another wolfrabbit is within 5 feet of the target."
  - name: "Blood-Scented"
    desc: "The wolfrabbit has Advantage on Wisdom (Perception) checks that rely on smell to locate a creature that doesn't have all its Hit Points."
actions:
  - name: "Multiattack"
    desc: "The wolfrabbit makes two attacks: one with its Bite and one with its Raking Claws."
  - name: "Bite"
    desc: "Melee Attack Roll: +7, reach 5 ft., one target. Hit: 14 (2d8 + 5) Piercing damage."
  - name: "Raking Claws"
    desc: "Melee Attack Roll: +7, reach 5 ft., one target. Hit: 12 (2d6 + 5) Slashing damage."
  - name: "Pouncing Bound"
    desc: "The wolfrabbit jumps up to 30 feet, without needing a running start, to an unoccupied space it can see, then makes one Raking Claws attack against one creature within 5 feet of where it lands. If it moved at least 20 feet straight toward the target and the attack hits, the target must succeed on a DC 15 Strength saving throw or have the Prone condition. On a successful save, the wolfrabbit can move up to 10 feet without provoking Opportunity Attacks from the target."
bonus_actions:
  - name: "Devour the Pack"
    desc: "The wolfrabbit tears into the corpse of another wolfrabbit within 5 feet that died since the end of its previous turn. A corpse can be targeted only once by this bonus action. The wolfrabbit gains 10 temporary Hit Points and enters a frenzy until the end of its next turn. During the frenzy, its Speed increases by 10 feet and its Bite deals an extra 3 (1d6) Piercing damage."
reactions:
  - name: "Frenzy Toward the Fallen"
    desc: "Trigger: Another wolfrabbit the wolfrabbit can see within 30 feet drops to 0 Hit Points. Response: The wolfrabbit moves up to 15 feet toward that creature's space without provoking Opportunity Attacks."
```

## Play

### Tactics

Each one opens from beyond thirty feet, springs, and rakes as it lands, putting its target on the ground for the pack to rend. The low crouch is the telegraph, and terrain, cover, and focused fire answer it before the pack closes a ring. When one falls the rest converge on the body, and the fight breaks off only when the pack is bled thin.

### Outside a fight

A pack's torn carcasses, eaten where they fell, tell sharp travellers that hunters hold this ground, and any bleeding wound draws their noses. It works its own beat and does not trail prey beyond it.

## Depth

### Ecology

A pack hunter of the World's open ground, it eats what its teeth take, and a tracker following its prints rolls Wisdom (Survival).

### Hidden truths

Bones at a kill site tell its habits, and an Intelligence check of the right sort confirms what becomes of a wolfrabbit its own pack brings down: it is eaten where it lies.

## Links

Related page, [[Young Bloodhawk]].

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
