# Canon has two tiers: revealed pages are fixed, unrevealed pages are draft

Agents treated every Wiki fact as equally fixed. They preserved a never-played NPC's backstory as carefully as a scene the Party lived through, so prep built new pages instead of reshaping unused ones. The DM's rule: everything new is an unrevealed draft until it comes up at the table, and after that every change to it must be narratively additive. Content from a character's backstory or a player-facing primer is Canon at once and may only build on what is present.

Decision:

- **Draft and fixed.** Unrevealed pages are draft Canon: true until changed, and an agent may freely reflavour them or reuse them elsewhere. Once revealed, a page is fixed Canon. A later change builds only on what is present, adding depth, history, consequences or new facts without contradicting or retconning anything already revealed. The precedence in `CONTEXT.md` **Canon** (the DM, then the Wiki, then Raw) stands. Inside the Wiki, fixed Canon takes precedence over draft Canon. `draft` leaves the **Canon** term's _Avoid_ list, since the word is now a tier's name.
- **Recording, not deciding.** `revealed` records what already happened. What the Players held before play began, from a PC's backstory or a player-facing primer, gives `"Backstory"`, and anything else takes the first Session where its subject came up at the table in any way. The one rule covers pre-play content without an exception.
- **One property.** Every page has `revealed: "Backstory"`, `revealed: "Session N"` or `revealed: ""` while unrevealed. `"Backstory"` counts as earlier than any Session.
- **One meaning.** `CONTEXT.md` **Revealed** defines the tiers and the property.
- **One writer.** Ingest sets `revealed` from the PC pages, the primers and the Session records, and moves it only to an earlier value. A page made for a subject that has already come up at the table (a lint stub, a design skill's page) takes that value too. Skills that design or reshape pages read it.

The template layer reads required keys from the templates. Every existing page fails `missing-key` until a backfill sets `revealed` from the PC pages, the primers, Session Recaps and Ledgers.
