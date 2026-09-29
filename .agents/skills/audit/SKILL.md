---
name: audit
description: Silent Wiki upkeep for the rot the gate can't see (contradictions between pages, stale claims about the present, duplicate pages), fixed by Canon precedence and logged, never asked about. Use after every Ingest over the pages it touched, when the DM asks to audit or tidy the Wiki, or when a page is found saying something another page contradicts.
---

# Audit

The gate checks each page's form; the audit checks that the pages agree with each other and with what has happened since. It fixes what it finds without asking (ADR 0003): the DM owns the facts, and Canon precedence decides which fact stands.

**Precedence.** What the DM says (to the Agent, or at the table as a Transcript records it), then what the Wiki says, then Raw. Events move the Wiki forward rather than contradict it: a Recap in which an NPC dies makes "is alive" stale, not disputed.

## Steps

1. **Scope.** After an Ingest: every page it touched, plus the pages they link and the pages that link to them. On request: the pages the DM names with the same neighbours, or the whole Wiki. Records stay outside the scope as evidence: Recaps, Previously Ons, and the Prep and Scene pages of Sessions already played (they record what was planned and what the table said). So do `hot.md`, `index.md` and `log.md`: Ingest and Prep rewrite `hot.md` after the audit, and scripts write the others. Done when the page list is written down.
2. **Claims.** From each page in scope, list the claims that can go stale or conflict: who holds what, who leads, where someone is, alive or dead, allegiance, a Thread's or Quest's status, dates, counts, and anything stated as true now. Keep each with its page and line.
3. **Compare.** For each subject in the claims (a person, place, Item, Thread), gather every claim about it: its own page, each page in scope, and every other page qmd finds mentioning it. Two claims that can't both be true now are a **contradiction**. A present-tense claim that a later event (a Recap, a Transcript, the DM's words) has overtaken is **stale**. Two pages about one thing under different names are a **duplicate**. Read each subject's own page line by line against the latest event about it. Done when every subject is compared, and a search for each fixed subject's name finds no claim left that the fix contradicts.
4. **Decide** each finding by precedence. Between Wiki pages with no event to settle it, the subject's own page wins over a mention elsewhere, and the claim with a `sources` trail or a later log entry wins over one without. When nothing settles it, keep the subject's own page and say so in the fix's log title.
5. **Fix** each, surgically:
   - **Stale or losing claim:** rewrite just that statement to the current truth, summary included where it states it, saying no more than the evidence does (no date, count or detail it lacks). The past stays as history in the past tense ("rang the bell until she gave up the ledger").
   - **A fact told on two pages:** it stays on the subject's own page and the other page links to it.
   - **Duplicate:** merge into the page more links point to, keeping every fact from both, retarget every link to it, and delete the other.
   - A statement inside a `[!narration]` callout that has gone stale goes to `theatre-of-the-mind` to be rewritten.
6. **Record** each fix as its own log entry, titled with what changed and why: `pnpm cf log --world <World> --op audit --title "Sable no longer rings the bell (Session 2 - Recap)" --page Sable --page "The Drowned Chapel"`. Then run `pnpm check` over every touched page until it passes, and `pnpm cf index`.
7. **Report** to the DM: one short line per subject fixed. The report asks nothing.

## Done

- Every subject in scope was compared across all its mentions.
- Every contradiction, stale claim and duplicate found is fixed by precedence, with the past kept as history.
- Each fix has its own `audit` log entry naming the reason.
- `pnpm check` passes over every touched page, and the report asks the DM no questions.
