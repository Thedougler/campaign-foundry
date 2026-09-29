---
type: Creature
summary: "Adult Red Dragon, from the SRD 5.2 monsters."
sources: []
---

## At a glance

- **Role at the table.** Text.
- **Threat.** Text.
- **Tell.** Text.
- **Weak to.** Text.
- **Used by.** Text.

> [!narration] First sight
> Spoken text for the table.

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Red Dragon
size: Huge
type: dragon
subtype: ""
alignment: chaotic evil
ac: 19
ac_class: ""
hp: 256
hit_dice: 19d12 + 133
speed: 40 ft., climb 40 ft., fly 80 ft.
stats:
  - 27
  - 10
  - 25
  - 16
  - 13
  - 23
saves:
  - dex: 6
  - wis: 7
skillsaves:
  - perception: 13
  - stealth: 6
damage_vulnerabilities: ""
damage_resistances: ""
damage_immunities: fire
condition_immunities: ""
senses: darkvision 120 ft., blindsight 60 ft., passive Perception 23
languages: Common, Draconic
cr: 17
traits:
  - name: Legendary Resistance
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
  - name: Rend
    desc: "*Melee Attack Roll:* +14, reach 10 ft. *Hit:* 13 (1d10 + 8) Slashing damage plus 5 (2d4) Fire damage."
  - name: Fire Breath
    desc: "*Dexterity Saving Throw:* DC 21, each creature in a 60-foot Cone. *Failure:* 59 (17d6) Fire damage. *Success:* Half damage."
  - name: Spellcasting
    desc: "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks):"
bonus_actions: []
reactions: []
legendary_description: ""
legendary_actions:
  - name: Commanding Presence
    desc: The dragon uses Spellcasting to cast Command (level 2 version). The dragon can’t take this action again until the start of its next turn.
  - name: Fiery Rays
    desc: The dragon uses Spellcasting to cast Scorching Ray. The dragon can’t take this action again until the start of its next turn.
  - name: Pounce
    desc: The dragon moves up to half its Speed, and it makes one Rend attack.
```

## Play

Text.

## Depth

Text.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    order:
      - file.name
```
