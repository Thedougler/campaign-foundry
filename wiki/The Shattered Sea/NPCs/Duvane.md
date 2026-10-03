---
type: NPC
summary: "An Ashwall repair-crew carpenter whose scorpion attack in a handhold fissure is why two hands now climb the stone."
sources:
 - "archive/ssw-ashwall-islands.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Carpenter on an Ashwall repair crew, named in the crews' talk for the attack that changed how the stone is climbed.
- **Wants.** Repair work that does not end with a claw on the forearm. The stone watched whenever hands are on it.
- **Voice.** Talks about the rock, not about the thing in it. Points at fissures rather than describing what was inside.
- **Found at.** The [[Ashwall Islands]] lee, with the repair crews.

> [!narration] First look
> A carpenter works a fouled spar in the lee with his sleeves rolled off scarred forearms. Another crewman stands on the rock above him, watching the stone face instead of the work. He looks up at the fissures overhead himself and says, "Two hands go up the stone. One works. The other watches the rock for what lives in it."

## Play

- **Opens them up.** Ask after the spar or the climbing. He will show you the crack that took his own forearm, and how deep it runs.
- **Shuts them down.** Being told to work the stone alone.
- **Will share.** The two-hands rule, and which holds run back into occupied dark.
- **Will not share.** What he did not see before both claws were on him.
- **If pressed.** He will climb up and put your hand on the fissure himself, rather than argue about it.

## Depth

### History

A giant scorpion took him in a fissure while he assessed a fouled spar. The claw crossed his forearm and the sting went through the boot, and he was two days down from the poison. He never saw it before both claws were engaged. The crews' two-hands practice grew from his attack.

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
