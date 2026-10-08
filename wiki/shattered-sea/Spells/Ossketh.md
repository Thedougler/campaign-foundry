---
type: Spell
summary: "A suppressed grung transmutation that sets the caster's caste colour permanently; cast before the diet finishes its work, it lodges and keeps running."
sources:
 - "archive/collab-2026-10-04-calveno-and-rattkin-bounty.md"
 - "archive/simone-tabarnack.md"
 - "archive/ozzeth-the-twiceborn.md"
---

## At a glance

- **Level and school.** 3rd-level Transmutation.
- **Casting time.** 1 minute.
- **Range.** Self.
- **Components.** V, S.
- **Duration.** Instantaneous.
- **Classes.** Sorcerer, Warlock, Wizard.

> [!narration] Casting
> A grung crouches low and hums a slow rising note, and gold light spreads outward from the joints of its limbs and lies across the colour bands on its skin. Over the minute of the rite the glow lies steady on each band, going out when the note ends and leaving the skin in the colour the rite found on it.

## Play

### Effect

When the casting ends, your current skin colour sets permanently. It no longer shifts with diet, moulting, censure or time, and later magic leaves it where it stands. The change is a completed fact the moment the rite finishes, in the manner of *Awaken*. The rite is keyed to grung physiology: any other creature casts it and the spell does nothing.

**Cast too early.** Ossketh seals a change your body has finished, and a change still under way leaves it without a target. If the diet's work sits half done, the spell cannot resolve, and the casting lodges: it remains in effect on your body as an unstable sustained transmutation, trying to seal a colour that keeps moving. *Detect Magic* reveals a spell caught mid-execution, still running, and a successful DC 14 Intelligence (Arcana) check identifies an incomplete colour-altering ritual that requires external maintenance it isn't receiving.

**Completion.** An incomplete rite completes when your body does. Once your pigmentation finishes changing and the running rite is still stable, the seal takes hold and the spell resolves as a normal casting, permanent thereafter.

**Maintenance.** While the rite runs unfinished, any creature that knows Ossketh can hold it stable, either by spending 1 minute in physical contact with the affected creature or by casting *Sending* to that creature and speaking the rite's litany.

**Destabilisation.** Left without maintenance, the rite decays slowly. Roughly once a month, one band of achieved colour fades and the running transmutation flickers visibly. If it collapses before your change completes, the rite ends. The biological change stands as your body left it, the achieved colour remains yours, and you may cast Ossketh again. While it runs, the rite is a spell in effect on you, and *Dispel Magic* can end it. A completed Ossketh is instantaneous and beyond dispelling.

**At higher levels.** The rite does one thing, and a higher slot does it no better.

### Rulings

- **Counterspell.** Only during the 1-minute casting (Constitution save). An incomplete rite lodged long ago and is no longer being cast, so there is nothing to counter.
- **Dispel Magic.** An incomplete running rite is a spell in effect, and a 3rd-level slot ends it. Magic leaves a completed casting untouched, since an instantaneous result has nothing left to undo.
- **Non-grung casters.** The rite is keyed to grung diet-pigmentation. Any other species spends the slot and gets nothing.
- **Recasting.** A completed casting has nothing left to seal, and a second rite takes no hold. A collapsed incomplete rite can be cast again like new. A body sustains one incomplete rite at a time, and a second casting while one runs simply fails, slot spent.

## Depth

### Tradition

The red-caste sages keep Ossketh. Published grung lore makes the reds a caste of scholars and magic users, and in the Sea the sages preserve the [[Gold Caste|Gold caste]]'s decrees. They hold the rite as the caste's most guarded work. Each gold sovereign sealed their own ascension with it. Elsewhere the sages suppress it, because gold open to any grung disproves a living god.

### Who knows it

The Gold caste suppresses the rite and seals the lower castes away from it. [[NPCs/Ozzeth, the Twiceborn|Ozzeth, the Twiceborn]] found it first, and his Sending sustained [[Simone Tabarnack]]'s casting until his death in the [[Calveno Sewer Magazines]]. Simone cast it on herself, and her colour sits partway to gold with the rite still running. The [[gold fruit]] her change needed grows behind the farms' fences at [[Karath]], outside her reach.

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
