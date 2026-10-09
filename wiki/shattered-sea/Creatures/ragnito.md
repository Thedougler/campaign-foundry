---
type: Creature
summary: "Catarina Da'Virelli's spider-like construct, run on a reskinned 2024
  SRD Giant Spider stat block."
sources:
  - "archive/catarina-davirelli.md"
  - "archive/Episode-09-Transcript.md"
  - "archive/Episode-09-Transcript.ledger.md"
  - "archive/Session 06 - Recap.md"
revealed: "Session 5"
title: "Ragnito"
---

## At a glance

- **Role at the table.** [[catarina-davirelli|Catarina Da'Virelli]]'s construct companion and deck deterrent, a cannon mount on spider legs.
- **Threat.** CR 1 on the reskinned Giant Spider numbers. On the voyage it stared down three panicked captives until the intimidation took.
- **Tell.** A giant spider unfolding from a doorway, and the long stare it fixes on whoever Catarina sets it against.
- **Weak to.** None are recorded.
- **Used by.** [[catarina-davirelli|Catarina Da'Virelli]].

> [!narration] First sight
> A giant spider unfolds through a doorway, a cannon riding its back. It stops at Catarina's shoulder with its legs clicking, and it stares at whatever she sets it against.

## Statblock

```statblock
layout: Basic 5e Layout
name: Ragnito
size: "Large"
type: "construct"
subtype: ""
alignment: "unaligned"
ac: 14
ac_class: ""
hp: 26
hit_dice: "4d10 + 4"
speed: "30 ft., climb 30 ft."
stats: [14, 16, 12, 2, 11, 4]
saves: []
skillsaves:
  - perception: 4
  - stealth: 7
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: "darkvision 60 ft., passive Perception 14"
languages: ""
cr: 1
traits:
  - name: Spider Climb
    desc: "Ragnito climbs difficult surfaces, including along ceilings, without needing to make an ability check."
  - name: Web Walker
    desc: "Ragnito ignores movement restrictions caused by webs, and it knows the location of any other creature in contact with the same web."
actions:
  - name: Bite
    desc: "Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage plus 7 (2d6) Poison damage."
  - name: Web
    desc: "Dexterity Saving Throw: DC 13, one creature Ragnito can see within 60 feet. Failure: The target has the Restrained condition until the web is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Poison and Psychic damage)."
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions: []
```

## Play

It stares down whoever Catarina sets it against, then holds still as a deck presence while she works, and nobody but her touches its controls. In a fight it bites, and its webbing pins one target at a time.

## Depth

### History

The Session 6 record states that Ragnito was destroyed in the primary chamber of the [[calveno-sewer-magazines|Calveno Sewer Magazines]] when its ceiling came down, and that Catarina fought beside the Party until it fell. The Session 9 record states that she met the voyage's troubles with Ragnito, her spider-like construct, refitted as a cannon mount, staring down captives and standing watch on deck with its controls reserved to her. Both statements stand as recorded, and no record says how the destroyed construct and the voyage construct relate.

### Hidden truths

The stat block is the 2024 SRD Giant Spider reskinned: every number and rule is the published one, and the type is recorded as construct to fit the World. The cannon mount is the fiction behind the same published bite. No source gives different numbers for Ragnito.

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
