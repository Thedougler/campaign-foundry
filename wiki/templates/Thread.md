---
title: ""
type: Thread
summary: ""
sources: []
status: ""
revealed: ""
---

%% Optional. Add `inspired_by: "<work>"` to the frontmatter only when the DM names what inspired this page. Root `AGENTS.md` **Sourcing** sets its use. %%

## State and angles

%% Give how it shows up at the table, one line per bullet. Set `status` to active, dormant or resolved. A Thread moves whether or not the Party engages. Driven by links the Faction or NPC behind it. Stands at is where it is now. Shows up as gives the signs the Party meets. Next development gives the next step with its time or trigger and its sign, and the outcome its driver gets if nobody acts. Angles gives each Angle the Party can work, with its cost and what it changes. Resolves when is the event that ends it. On a PC's journey Thread, Driven by links the PC, and Next development is what the world does around the PC if nobody acts. %%

- **Driven by.**
- **Stands at.**
- **Shows up as.**
- **Next development.**
- **Angles.**
- **Resolves when.**

## Hero's journey

%% Optional. Include it when the Thread is a PC's journey Thread: one per PC for the whole Campaign, titled "Journey of <PC name>" and written only by story-arc, after a Session, per its references/heros-journeys.md. DM only. Observed, never planned. Give a table of the stages the Session history shows, each citing the Sessions and Ledger lines that show it, then three bullets. Now is the stage the latest evidence shows and what it tests. Possibilities gives two or three situations next Session could offer, each built from a live Thread, and none says what the PC will do. Crosses links the Campaign Threads and other PCs' journey Threads it meets. %%

| Stage | Sessions | What the PC did |
| ----- | -------- | --------------- |
|       |          |                 |

- **Now.**
- **Possibilities.**
- **Crosses.**

## Origin

%% Optional. Include it when the event that started the Thread has a Recap or Lore. DM only. Give the event, linked to its Recap or Lore. %%

## Hidden truths

%% Optional. Include it when the Thread hides a truth the Party can learn. DM only. Give each truth with how the Party can learn it. %%

## Possible endings

%% Optional. Include it when the Thread can end more than one way. DM only. Write each outcome play can bring about as a condition, with the state of the World after it. A villain's plan keeps at least three live. %%

## Links

%% Optional. Include it when the DM wants this page's backlinks listed here. %%

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
