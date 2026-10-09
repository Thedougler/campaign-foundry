---
type: NPC
summary: "The goblin tally-keeper of Reedholt, who records every boat and remembers where the old ledger lies."
sources: []
creature: "[[Goblin Warrior]]"
revealed: ""
title: ""
---

## At a glance

- **Role.** Tally-keeper of [[Reedholt]], keeper of the boat tally and of the village's old records.
- **Wants.** The village left in peace, and the names of the Vessen dead read aloud at the next Long Ebb.
- **Voice.** Soft and careful. He repeats a number before he answers a question.
- **Found at.** The tally house in [[Reedholt]].

> [!narration] First look
> He is small and grey-eared, with round spectacles mended at one hinge. Ink covers both hands to the wrist. He sits on the tally house steps cutting notches in a stick with a small knife, and counts under his breath. The stick smells of cedar. "Forty-one boats since dawn," he says. "One of them was not on my list."

## Play

- **Opens them up.** A number, a date, or a name that matches his records.
- **Shuts them down.** Guesses and rumors. He will not repeat something he cannot count.
- **Will share.** Any boat record from the last thirty years, and channel charts.
- **Will not share.** Where the Vessen ledger is, until he trusts the Party.
- **If pressed.** He says only that the ledger is "where the bell hangs" and asks the Party to be careful.

## Depth

### History

Nib inherited the tally house from his grandmother, who kept a second set of sticks for the names of the Vessen dead. She told him one thing about the ledger before she died: the harbormaster hid it in the bell loft of the chapel.

### Hidden truths

- Nib holds the only complete list of the drowned of Vessen, cut in tally-sticks. It names 3,912 people. The Party can see the sticks in the tally house cellar once he trusts them.
- He has been sending the moot warnings about the Reedrunners' boats for years, in the form of tallies. See [[Pell Rushlight]].

### Threads

- He gives the Party the route to the ledger in [[Session 2 - Nib's Tally]].
- He is part of [[The Silent Bell]] and of [[Reedrunner Tithe]].

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
