---
type: NPC
summary: "Presumed-dead Crown privateer captain who enforced surrender aboard the Surety."
sources:
 - "archive/barnaby-rook.md"
creature: "[[Barnaby Rook (Creature)]]"
---

## At a glance

- **Role.** Crown privateer captain and boarding officer, licensed by the [[Letters of Marque]].
- **Wants.** To choke irregular captains out of the inspection corridor and punish defection.
- **Voice.** Flat commands. A quiet threat becomes lethal when disobeyed.
- **Found at.** The HCS Surety and the Crown inspection corridor. Presumed dead after falling into dark water.

> [!narration] First look
> A Crown coat gone salt-stiff hangs from a hard privateer captain. He speaks in flat statements, each one a command, with his weapon ready and his threat almost administrative.

## Play

- **Opens them up.** Surrender, lawful papers, and obedience to an inspection.
- **Shuts them down.** Defection, refusal, or any story that challenges Crown authority.
- **Will share.** What he needs to inspect, and what surrender requires.
- **Will not share.** The full supply chain behind his Grung poison or the Crown's orders.
- **If pressed.** He threatens to shoot turncoats, then boards or fires. Alone, his Cornered Wolf instinct makes him more dangerous.

## Depth

### History

Rook commanded the HCS Surety under the Dravosi Crown. He knowingly underpaid Geoffrey Draves, held Ket as a specimen while investigating the Five Blades, and carried Grung poison supplied through Simone Tabarnack's network. He boarded the Saltwright, but Delmar Fisk knocked him from the Surety's rigging into the water twice. Something eel-like approached and he did not resurface. He is presumed dead. Earlier, he returned to the Surety with one flintlock spent after firing at Beaumont Sel.

### Hidden truths

- Rook's cabin held letters of marque, hidden gold, Mira's Blade, and twenty vials of Grung poison. The cargo and the supply trail can expose Simone's Crown connection.
- Rupert Knighton may not yet know Rook is dead. The crew's recovered papers can bring that escalation closer.

### Threads

He sits in **The Crown Inspection** and **Simone's Hunters**, and his presumed death adds pressure to the Crown's search for the crew.

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
