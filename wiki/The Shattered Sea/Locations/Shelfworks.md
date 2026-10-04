---
type: Location
kind: Site
summary: "The western dive terrace of the Drowned Maw, where salvage crews work the upper Antheri tiers above squid-dark water."
sources:
 - "archive/drowned-maw.md"
 - "archive/ssw-giant-squid.md"
parent: "[[Drowned Maw]]"
---

## At a glance

- **Draws the Party because.** Salvage staging for the whole Maw descent, and the first worked tier of the Antheri wall.
- **Entrance.** A salvage line from the Maw approach down to the dive floor on the first tier.
- **Occupants.** Contracted salvage crews, the air pumps and the hands who work them.
- **Danger.** The drop-off after dark, and the standing rule that nothing is chased below the agreed depth.
- **Prize.** Antheri salvage, and the information a working line buys.

> [!narration] Entering
> The dive floor is a cut terrace of Antheri stone partway down the wall, roped at the shelf end, with dive lines running off the edge into water your lamp quits on. Air lines cross the stone to a rack of pumps, and pump levers rise and fall in a slow thud. A hand in oilskins watches the dials and counts the divers on the lines. Worked stone runs on a short span to the last arch, and past it the shelf ends over black water. A board at the rope shows the rule, and the rule is simple. Divers stay above the depth the crews agreed.

## Play

### Areas

- **The dive floor.** Cut Antheri stone on the first tier, worked at sixty to two hundred feet, where the lines are racked and the pumps stand.
- **The shelf edge.** The shelf runs on twenty metres past the last visible Antheri arch, then drops into black water. The squid rise along this drop-off at night.
- **The air pumps.** Surface air for the dive lines, and Orvalle's post.

### Hazards

Past the agreed depth the water belongs to whatever pulled Orvalle's partner down. Lines go taut with no diver at the end, ropes part clean, and the rule exists because chasing is how it takes a second one. After dark the rise can climb as far as the dive floor itself.

### Occupants

Fathomrush stages the dives and crews the lines. [[Orvalle]] runs the air pumps and no longer dives.

### Likely actions

Sign on with a salvage crew, buy line time on the wall, hear Orvalle's once-a-season story, or ask the pumps what the drop-off has been doing lately.

## Depth

### History

The Antheri built down the wall in tiers. The Shelfworks works the first sixty to two hundred feet, with Mid-Works and Deep Works below it. A working gold rush rides on how long the depth remains safe. The standing rule dates from Orvalle's last dive. He chased something below the agreed depth, and his partner's buoy came up forty minutes later, alone.

### Hidden truths

What took Orvalle's partner is testimony, not record, and the practical answer is the [[Giant Squid]]. His account is the clue, given once to a crew each season. The Pearl wreck is at the [[Red Lady]] site in the eastern Shelfworks, below the line where Umberlee's water runs out.

### Threads

[[Drowned Maw Awakening]] and [[Bring the Pearl of Souls to Umberlee]] both run through this terrace.

## Links

It lies within the [[Drowned Maw]]. [[Orvalle]] keeps the pumps, and the [[Giant Squid]] keeps the drop-off.

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Contains
    filters:
      and:
        - parent == this
    groupBy:
      property: note.kind
      direction: ASC
    order:
      - file.name
      - note.summary
  - type: table
    name: Linked from
    filters:
      and:
        - parent != this
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
