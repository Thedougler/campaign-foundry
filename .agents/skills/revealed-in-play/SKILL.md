---
name: revealed-in-play
description: Sets the `revealed` frontmatter of every Wiki page whose subject came up at the table. Use whenever you read a Session Transcript, Session Ledger, Recap or notes on a played Session, a PC's backstory or a player-facing primer.
---

# Revealed in play

`revealed` records when a page's subject first came up at the table. `CONTEXT.md` **Revealed** defines its values.

## Steps

1. **Read the record** you were given. Its value is `"Session N"` for the Session it records, or `"Backstory"` for a PC's backstory or a player-facing primer given before the first Session. The values run `"Backstory"`, then `"Session 1"`, `"Session 2"` and onwards. Done when you know the value.
2. **Settle what's set.** List every page's value in one call with `bun run cf -- revealed --campaign "<Campaign>"`. Each page whose value is the record's or earlier is settled, and so is every PC page. Settled pages stay out of every later step. Done when you have the settled list.
3. **List the subjects** the record names or shows. A subject named by epithet only is resolved by reading the pages the record links, until you know which subject the record means. The record itself and every page of the Session it records (its Prep, Scenes, Recap and Previously On) take the value too. Done when every name in the record and every page of that Session is on the list or settled.
4. **Find each page** with `bun run cf -- find "<name>" "<name>" …`, which matches filenames, titles and aliases and prints each page's `revealed`, and search page content with the `grep` tool or QMD (`.omp/AGENTS.md` § Wiki access) only for a name it doesn't match. Done when each subject has its page, or neither search found one.
5. **Set the value.** Edit only the `revealed:` line, and add it as the last frontmatter line where it's missing. Then read each page's check (`skill://lint` § Commands, **Page check**, which the edit hook returns) and repair any finding on that line. Done when every found page has the record's value.
6. **Return** each page set, with its old and new value, and each subject without a page. Done when every listed subject appears in the return.
