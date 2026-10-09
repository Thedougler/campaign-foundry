---
title: ""
type: NPC
summary: ""
sources: []
creature: ""
revealed: ""
---

## At a glance

%% Give the DM a ten-second read, one line per bullet. Wants is an outcome the next Scene or Session can reach. Voice gives word choice, rhythm and a habit. Found at links the Location. The `creature` property links the Creature page with their statistics, and the statblock belongs on that page. %%

- **Role.**
- **Wants.**
- **Voice.**
- **Found at.**

> [!narration] First look
> %% Spoken, second person. Open on a first read and the one feature a Player would use to describe them. Then show what they are doing and give their first line. Keep secrets and their tells for Depth. %%

## Play

%% Write how a meeting runs, one line per bullet, each from this person's own wants and limits. An incidental NPC keeps only the bullets its Scene uses. Opening move gives where they are and what they are doing, with their starting Attitude. Will share and Will not share set what they know beside what is true. Requests gives each likely ask with its answer, its price and what it changes. If pressed gives the sourced Influence roll, or why a request is automatic. Invitations ties a returning NPC to a PC's own Goals, bonds or Plans, one line per PC it touches. %%

- **Opening move.**
- **Opens them up.**
- **Shuts them down.**
- **Will share.**
- **Will not share.**
- **Requests.**
- **If pressed.**
- **If ignored.**
- **Invitations.**

## Quotes

%% Optional. Include it when the DM, a Transcript or a source gives lines this person said. Give each line word for word as a blockquote, then one short line of context: when, to whom and why. The lines show how this person talks, and agents copy the voice (diction, rhythm, register and habits) in new lines of their own. DM only, so the context may hold secrets. %%

## Depth

%% DM only. Give the past behind them and the things they hide, at the scale the NPC is used. %%

### History

%% Give the events behind their want and their limit. Link the Locations, Factions and people involved. %%

### Hidden truths

%% Give each secret with who it is kept from and why. Add what exposure costs, its visible tell, and three distinct ways the Party can learn it. %%

### Plan

%% Use this for a villain with no active Campaign. Give each step a trigger, a sign, a cost and a fallback. Mark the point where the Party can interrupt it. In a Campaign the plan belongs on a Thread, linked under Threads. %%

### Threads

%% Link each Thread they drive or sit in, with their part in it. %%

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
