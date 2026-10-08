---
type: NPC
aliases: [Ledger Clerk]
summary: "Leader of the Reedrunners, a former Weir Street clerk who runs the back channels of Saltwick."
sources: []
creature: "[[Bandit Captain]]"
---

## At a glance

- **Role.** Captain of [[The Reedrunners]] and the person Saltwick pays without saying so.
- **Wants.** The [[Harbormaster's Ledger of Vessen]], which would put the Harbor Council in her debt permanently.
- **Voice.** Quiet, exact and polite. She never raises her voice, and an offer once made is not repeated.
- **Found at.** The Undertow in [[Saltwick]] by day, and [[Gullhook Lighthouse]] on dark nights when the take is large.

> [!narration] First look
> She is a woman of about fifty in a clean grey coat with a ledger clerk's ink stains on two fingers. Her hair is tied back under a plain cap, and her face is pleasant and forgettable. A pistol is tucked in her belt beside a pen case. She smells of lamp oil and cloves. "You must be the ones Hobb hired," she says. "Sit down before we talk."

## Play

- **Opens them up.** Precision, and respect for a bargain. She answers direct questions with direct facts.
- **Shuts them down.** Threats, bluster, and any mention of her family name.
- **Will share.** The price of a chart of the back channels, and the names of boats that took a wreck on a dark night.
- **Will not share.** Where the oil goes, who her buyers are, and what she wants from the ledger.
- **If pressed.** She makes one offer, which is a quiet exit for the Party in exchange for looking the other way. If refused, she goes to the nearest boat and leaves.

## Depth

### History

Ilse was born Ilse Marrow on Weir Street, the daughter of a Council clerk. She kept the books for the Council until she found an entry that no one had told her about. She left, took a crew of men who owed her, and has taxed the back channels for twenty years.

### Hidden truths

- Ilse has read part of the record of Vessen in the Council's own copy-books and knows the sluice was opened on purpose. She needs the ledger to prove it, because without it she has only hearsay. The Party can learn this from her own words if they let her talk. They can also learn it from [[Tamsin Wick]], who worked for her as a child.
- She has never used the pistol on anyone. She keeps it for the sound.

### Threads

- She drives [[Reedrunner Tithe]].
- She is a pressure point on [[The Silent Bell]], because she wants the ledger and does not know [[Sable]] guards it.

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
