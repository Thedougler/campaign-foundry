---
type: NPC
summary: "Master of the Countless and former Sentinel Osset, seeking the Soul Incarnate transformation through Crissdalynn."
sources:
  - "archive/talon-vantyrus.md"
creature: "[[Talon Vantyrus]]"
---

## At a glance

- **Role.** Master of the order and the party's unseen rival.
- **Wants.** The Soul Incarnate transformation technique hidden behind Crissdalynn's Long Sight.
- **Voice.** Composed, quiet, and precise. Inevitability is his enemy.
- **Found at.** Midchain routes. He has not yet appeared openly.

> [!narration] First look
> Feathers the colour of old snow cover an aged snowy-owl aarakocra. He watches without blinking, a thin blade at his hip and a crystal top turning in his hand. One wing folds tighter, the only warning before he acts.

## Play

- **Opens them up.** A plea that stops immediate harm or an argument that accepts action's cost.
- **Shuts them down.** Patience, doctrine, tradition, or interrogation.
- **Will share.** His doctrine: knowledge creates responsibility.
- **Will not share.** His original name, Skarn's standing, or his route to Crissdalynn.
- **If pressed.** He leaves or makes a decision for the party, interrupting rather than trading blows.

## Depth

### History

Once Osset, Vantyrus broke from the Sentinels because they recorded deaths without preventing them. He built his order on complete action without record, using intermediaries and one-job blades. He taught Kyzil before their schism and now teaches Skarn under the Rule of Two.

### Hidden truths

- Osset is Talon Vantyrus. Kyzil believes his old master died decades ago.
- He sent Skarn for the Fate Spinner to read Kyzil's teaching and reach the Soul Incarnate technique. His Long Sight weakens before sacrifice, irrational action, and deliberate chaos.

### Threads

He drives **Drowned Maw Awakening**, the **Rule of Two**, and the order's hunt for the Soul Incarnate.

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
