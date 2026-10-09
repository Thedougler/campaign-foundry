---
type: Creature
summary: "A Grung Elite Warrior creature (CR 2) used as a warrior in The Shattered Sea."
sources:
  - "archive/grung-elite-warrior.md"
revealed: "Session 5"
title: ""
---

## At a glance

- **Role at the table.** Warrior.
- **Threat.** CR 2. Poison rides both its dagger and its shortbow, and the Mesmerizing Chirr can hold a whole trail still.
- **Tell.** The throat swells, the chirr rises, and the legs bend before each leap.
- **Weak to.** Cover spoils the bow's aim, and the chirr touches nothing that cannot hear it, so step inside both and it must leap.
- **Used by.** [[Minor Slaad]] patrols the same territory.

> [!narration] First sight
> The grung elite warrior steps out along the branch, a small frog-bodied fighter with a dagger in one fist and a shortbow slung across its back. Its throat swells and a chirr rolls out over the trail, rising as its legs bend for a leap. When it springs, it crosses half the gap at a bound, dagger leading.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Grung Elite Warrior"
size: Small
type: humanoid
subtype: grung
alignment: Typically Lawful Evil
ac: 13
hp: 49
hit_dice: 9d6 + 18
speed: "25 ft., climb 25 ft."
stats: [7, 16, 15, 10, 11, 12]
saves:
  - dexterity: 5
skillsaves:
  - athletics: 2
  - perception: 2
  - stealth: 5
  - survival: 2
damage_immunities: "poison"
condition_immunities: "poisoned"
senses: "passive Perception 12"
languages: "Grung"
cr: "2"
traits:
  - name: "Amphibious"
    desc: "The grung can breathe air and water."
  - name: "Poisonous Skin"
    desc: "Any creature that grapples the grung or otherwise comes into direct contact with the grung's skin must succeed on a DC 12 Constitution saving throw or become poisoned for 1 minute. A poisoned creature no longer in direct contact with the grung can repeat the saving throw at the end of each of its turns, ending the effect on a success."
  - name: "Standing Leap"
    desc: "The grung's long jump is up to 25 feet and its high jump is up to 15 feet, with or without a running start."
actions:
  - name: "Multiattack"
    desc: "The grung makes two attacks with its dagger or shortbow."
  - name: "Dagger"
    desc: "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. Or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage plus 5 (2d4) poison damage."
  - name: "Shortbow"
    desc: "Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 6 (1d6 + 3) piercing damage plus 5 (2d4) poison damage."
  - name: "Mesmerizing Chirr (Recharge 6)"
    desc: "The grung makes a chirring noise to which grung are immune. Each humanoid or beast within 15 feet of the grung that can hear it must succeed on a DC 12 Wisdom saving throw or be stunned until the end of the grung's next turn."
```

## Play

### Tactics

Open from the branches above the trail, where the shortbow and the 25-foot leap both serve, and let the swelling throat announce the chirr. The Party meets it with positioning, cover, or focused fire. It springs away through the canopy once the leap no longer serves or its wounds mount.

### Outside a fight

Small tracks along the branches, a chirr answered from deeper canopy, and poison-tipped arrows warn the Party before an encounter. It ranges its own trees and does not drop to ground that leaves it exposed.

## Depth

### Ecology

It lives in the branches above the Shattered Sea's waterways, and its diet follows what its form catches there. A traveller working Wisdom (Survival) reads its sign on the bark and at the water below.

### Hidden truths

Careful examination of its haunts shows the habits of its patrols, and with them its weaknesses. A successful relevant Intelligence check confirms the routes its patrols walk, and through them the failings of both bow and chirr.

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
