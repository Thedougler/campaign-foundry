---
type: NPC
summary: "Presumed-dead Crown privateer captain who enforced surrender aboard
  the Surety."
sources:
  - "archive/barnaby-rook.md"
  - "archive/agentic-co-dm-barnaby-rook-narration.md"
  - "archive/ssw-session-02.md"
  - "archive/ssw-session-03.md"
  - "archive/ssw-miras-blade.md"
creature: "[[Barnaby Rook (Creature)]]"
revealed: "Backstory"
title: ""
---

## At a glance

- **Role.** Crown privateer captain and boarding officer, licensed by the [[Letters of Marque]].
- **Wants.** To choke irregular captains out of the inspection corridor and punish defection.
- **Voice.** Flat commands. A quiet threat becomes lethal when disobeyed.
- **Found at.** The HCS Surety and the Crown inspection corridor. Presumed dead after falling into dark water.

> [!narration] First look
> Barnaby Rook fills the gangway ahead of you, and the deck's last light catches the brass buttons of a dark officer's coat gone salt-stiff. Stubble darkens his square jaw. A flintlock and a cutlass hang at his hips, their grips worn smooth by use. He speaks under the wind, and every word comes down flat, like orders read from a list. The crew nearest him have fallen still. As the deck rolls, one hand taps the rail once, twice. His gaze moves across the deck from one of you to the next.

## Play

- **Opens them up.** Surrender, lawful papers, and obedience to an inspection.
- **Shuts them down.** Defection, refusal, or any story that challenges Crown authority.
- **Will share.** What he needs to inspect, and what surrender requires.
- **Will not share.** The full supply chain behind his Grung poison or the Crown's orders.
- **If pressed.** He threatens to shoot turncoats, then boards or fires. Alone, his Cornered Wolf instinct makes him more dangerous.

## Depth

### History

Rook commanded the HCS Surety under the Dravosi Crown. He knowingly underpaid Geoffrey Draves, held Ket as a specimen while investigating the Five Blades, and carried Grung poison supplied through Simone Tabarnack's network. He boarded the Saltwright, but Delmar Fisk knocked him from the Surety's rigging into the water twice. Something eel-like approached and he did not resurface. He is presumed dead. [[Crissdalynn Khinriss]] lifted his admiral hat from the water with a boat hook, and Beaumont Sel kept it, saying it belonged to the captain. Earlier, he returned to the Surety with one flintlock spent after firing at Beaumont Sel.

### Hidden truths

- Rook's cabin held letters of marque, hidden gold, Mira's Blade, and twenty vials of Grung poison. The cargo and the supply trail can expose Simone's Crown connection.
- His fee ledger logs Mira's Blade as "bladed goods, unlicensed", a seizure he never registered with the Crown.
- Rupert Knighton may not yet know Rook is dead. The crew's recovered papers can bring that escalation closer.
- Rook's chart archive, found by the crew, shows he broke Imperial rules about the Drowned Maw twice and did not record what he found there. The Party finds it out by reading his charts.

### Threads

He sits in **The Crown Inspection** and **Simone's Hunters**, and his presumed death adds pressure to the Crown's search for the crew. The undecided fight the Party left at the first break rests with **[[The Rook Resolution]]**, resolved.

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
