---
type: NPC
summary: "Captured green-caste Grung labourer who traded bombing intelligence for protection."
sources:
 - "archive/felix-aho.md"
creature: "[[Commoner]]"
---

## At a glance

- **Role.** Captured Grung labourer and informant.
- **Wants.** One month of protection and survival outside the clan's kill-on-sight category.
- **Voice.** Frightened, practical, and cooperative rather than ideological.
- **Found at.** Nona Black-Jaw's Warren safehouse, guarded by Ruk.

> [!narration] First look
> A lean green Grung sits under guard, old leaves of colour on matte skin and amber eyes fixed on the door. He looks like a labourer who has decided that every answer is worth the breath it costs.

## Play

- **Opens them up.** A clear bargain for protection.
- **Shuts them down.** Threats that sound like the clan's orders.
- **Will share.** The Calveno sewer bombing plan, powder sites, and the defector kill-on-sight category.
- **Will not share.** The discarded prep identity sometimes attached to his name.
- **If pressed.** He cooperates, flees, or freezes. He is no leader or combat threat.

## Depth

### History

Felix was caught in the Calveno sewers during the bombing investigation. He revealed black-powder scaffolding, purple garrisons with red leaders, ships carrying powder, and the festival strike plan. He also told Jean-Claude that Grung defectors are a recognised kill-on-sight category.

### Hidden truths

- The older Vaka elder and organiser described in discarded preparation notes is not this Felix. The session-canon captive is the only established identity.
- He was hired for labour, not ideology, and trades information for time.

### Threads

He is a living witness in **Simone's Hunters** and the Calveno raid aftermath.

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
