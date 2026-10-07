---
type: Creature
summary: "A Dravosi Crown boarding alchemist who deployed Grung toxin across the Saltwright's gangplank and died to her own redirected cloud."
sources:
 - "archive/ssw-session-01.md"
 - "archive/ssw-the-canister.md"
---

## At a glance

- **Role at the table.** Crown boarding specialist who answers a failing boarding with Grung toxin gas.
- **Threat.** CR 1/4 behind a weak dagger. The danger is the cloud, not the thrower.
- **Tell.** A hand goes to the bandolier and unhooks an iron canister before anything is thrown.
- **Weak to.** Her own cloud. Wind that catches it puts it back where it came from.
- **Used by.** [[Barnaby Rook]].

> [!narration] First sight
> She keeps to the cutter's rail, well clear of blades, with a stencilled bandolier riding hip to shoulder. When the boarding turns, she draws an iron canister from the bandolier, pulls its wired pin one-handed, and throws.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Dravosi Alchemist"
size: Medium
type: humanoid
subtype: human
alignment: neutral
ac: 12
ac_class: leather armor
hp: 11
hit_dice: "2d8 + 2"
speed: "30 ft."
stats: [10, 14, 12, 14, 10, 11]
saves: []
skillsaves: []
senses: "passive Perception 10"
languages: "Common"
cr: "1/4"
traits:
  - name: Toxin Bandolier
    desc: "The alchemist's bandolier holds iron canisters of Grung toxin concentrate; how many remain is not established."
actions:
  - name: Dagger
    desc: "Melee Attack Roll: +4, reach 5 ft. Hit: 4 (1d4 + 2) Piercing damage."
  - name: Toxic Canister
    desc: "The alchemist throws an iron canister from her bandolier to a point she can see within 60 feet, where it shatters into a 10-foot-radius Sphere of yellow-green gas. The gas is Heavily Obscured and lingers for 1 minute or until a strong wind (such as the one created by the Gust of Wind spell) disperses it or moves it 10 feet in the wind's direction. Each creature in the gas when it appears and at the start of each of its turns while in the gas makes a DC 12 Constitution saving throw. Failure: 4 (1d8) Poison damage, and the creature has the Poisoned condition until the start of its next turn. Success: Half damage only. A creature makes this save only once per turn."
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

### Tactics

She holds back behind the boarding line and spends the canister across the gap between vessels, blanketing the enemy deck while her side disengages, though she cannot choose where the cloud drifts. On the Saltwright's gangplank a gust caught it and returned it, and she went down in it.

### Outside a fight

She travels with Crown boarding crews as the answer to unwinnable decks. The bandolier is standard kit, and the Party saw it only across a gangplank.

## Depth

### Ecology

The Crown issues its boarding alchemists ordnance manufactured from Grung hunting toxin concentrate, supplied through [[Simone Tabarnack]]'s network.

### History

She boarded the [[Saltwright]] with [[Barnaby Rook]]'s crew in Session 1 and died to the cloud she threw, blown back across the planks by [[Crissdalynn Khinriss]]'s gust.

### Hidden truths

- The preparation in her canisters was Simone's batch. [[Jean-Claude Tabarnack]] recognised it at the gangplank and said nothing (**[[The Canister]]**). The Party can learn it by examining the [[Alchemist's Bandolier|bandolier]] or pressing Jean-Claude on what he knew.

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
