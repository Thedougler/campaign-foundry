---
type: Creature
summary: "A hardened crew leader who fights with scimitar and pistol and knows when to leave."
sources: []
---

## At a glance

- **Role at the table.** A mobile skirmisher and leader who gives a fight a face.
- **Threat.** CR 2. Two attacks a round for about 14 damage, and 52 Hit Points to wear down.
- **Tell.** Takes the high ground and shouts orders before the first blow.
- **Weak to.** Being cut off from its crew, and a fair chance to walk away.
- **Used by.** [[Ilse Corran]] and [[Hobb Tarrow]].

> [!narration] First sight
> A lean figure in scarred studded leather stands at the back of the crowd, one hand on a scimitar and the other holding a pistol low against a thigh. The eyes never stop moving. You hear the click of a hammer, and smell wet powder and lamp oil. The one who gives the orders always keeps a wall behind them.

## Statblock

```statblock
layout: Basic 5e Layout
name: "Bandit Captain"
size: "Medium or Small"
type: "humanoid"
subtype: ""
alignment: "neutral"
ac: 15
ac_class: "studded leather armor"
hp: 52
hit_dice: "8d8 + 16"
speed: "30 ft."
stats: [15, 16, 14, 14, 11, 14]
saves:
  - strength: 4
  - dexterity: 5
  - wisdom: 2
skillsaves:
  - athletics: 4
  - deception: 4
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: ""
condition_immunities: ""
senses: "passive Perception 10"
languages: "Common, Thieves' Cant"
cr: 2
traits: []
actions:
  - name: "Multiattack"
    desc: "The bandit makes two attacks, using Scimitar and Pistol in any combination."
  - name: "Scimitar"
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Slashing damage."
  - name: "Pistol"
    desc: "*Ranged Attack Roll:* +5, range 30/90 ft. *Hit:* 8 (1d10 + 3) Piercing damage."
bonus_actions: []
reactions:
  - name: "Parry"
    desc: "*Trigger:* The bandit is hit by a melee attack roll while holding a weapon. *Response:* The bandit adds 2 to its AC against that attack, possibly causing it to miss."
legendary_description: ""
legendary_actions: []
```

## Play

### Tactics

The captain opens with the pistol from behind cover, then closes with the scimitar when a target is hurt. It uses Parry against the strongest melee attacker. It fights until half its Hit Points are gone or its crew is down, then retreats by the fastest route it has already picked.

### Outside a fight

A captain bargains. It wants a cut, a favour or a debt owed, and it can be talked down if the Party offers a way out that saves face. It keeps its word to people it respects.

## Depth

### Ecology

Captains rise from crews that value competence over cruelty. Each one has a route out of any room it enters, a boat or a back door, and it has paid someone to keep it open.

### Hidden truths

- A captain's pistol is almost always the last dry powder in the crew. Taking the pistol can end a fight sooner than taking the captain. The Party can learn this by watching how the crew looks at it.

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
