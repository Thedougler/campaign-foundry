---
type: Creature
summary: "A small, quick fey skirmisher that hits harder with advantage and disappears after."
sources: []
revealed: ""
title: ""
---

## At a glance

- **Role at the table.** A cheap skirmisher that fights in numbers and escapes when hurt.
- **Threat.** CR 1/4. One attack a round, 10 Hit Points, and a bonus action to get away.
- **Tell.** Always looks for a flank or a hiding place before attacking.
- **Weak to.** Being caught in the open with no cover to reach.
- **Used by.** [[Pell Rushlight]], [[Nib Ashwater]] and the hired hands of [[The Reedrunners]].

> [!narration] First sight
> The figure is child-sized, with long ears, yellow eyes and a leather cap tied under the chin. It carries a curved blade and a small round shield, and keeps low behind cover. You hear the rustle of reeds, and smell smoke and wet wool. When it grins there are too many teeth.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Goblin Warrior"
size: "Small"
type: "fey"
subtype: "goblinoid"
alignment: "chaotic neutral"
ac: 15
ac_class: "leather armor, shield"
hp: 10
hit_dice: "3d6"
speed: "30 ft."
stats: [8, 15, 10, 10, 8, 8]
saves: []
skillsaves:
  - stealth: 6
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: "darkvision 60 ft., passive Perception 9"
languages: "Common, Goblin"
cr: 1/4
traits: []
actions:
  - name: "Scimitar"
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Slashing damage, plus 2 (1d4) Slashing damage if the attack roll had Advantage."
  - name: "Shortbow"
    desc: "*Ranged Attack Roll:* +4, range 80/320 ft. *Hit:* 5 (1d6 + 2) Piercing damage, plus 2 (1d4) Piercing damage if the attack roll had Advantage."
bonus_actions:
  - name: "Nimble Escape"
    desc: "The goblin takes the Disengage or Hide action."
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

### Tactics

Goblin warriors attack from hiding so their first strike has Advantage, then use Nimble Escape to Hide again. In a group they focus one target. They break and run when half of them are down.

### Outside a fight

Goblins in Lowtide are ferrymen, tally-keepers, and hired hands. They trade in favours and keep count of debts to the day. A goblin who has been treated fairly will remember it for years.

## Depth

### Ecology

The marsh goblins came to the Brack after the flood, drawn by the empty boats and the untended stilt houses. They now form a large part of the working population of [[Reedholt]] and [[Saltwick]].

### Hidden truths

- Many goblin families keep tally-sticks that record the names of the drowned, passed from parent to child. The Party can learn about them from [[Nib Ashwater]].

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
