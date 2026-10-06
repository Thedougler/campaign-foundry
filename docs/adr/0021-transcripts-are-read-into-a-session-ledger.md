# Transcripts are read into a Session Ledger

A TranscribeX Transcript runs 2 to 8 hours of the DM and four Players: about 45,000 words for Session 11. Its speaker labels are a diarizer's guesses. One block can merge several voices, a DM ruling can sit under a Player's label, and an unknown label such as `Speaker 1` can hold the DM and Players at once. Fantasy names come out misheard (Spidewar for Spiguar, John Clawd for Jean-Claude). TranscribeX also writes an AI summary beside it, which mixes in other-table lore and plans that never happened. Handing the whole file to the writing agent spent its context on table talk and let label and summary errors reach the Recap: the Session 11 Recap had the Spiguar pounce on the wrong PC.

Decision:

- **Ledger first.** The writing agent never reads a raw Transcript whole. `cf transcript chunks` cuts it on block ends, and `transcript-reader` subagents on a flash model read one chunk each into a line-cited Session Ledger. Ingest merges the chunks, verifies flagged ranges with further reader dispatches, and keeps the Ledger in `archive/` beside the Transcript. The Wiki is written from the Ledger, and `sources` still cite the Transcript.
- **Labels are hints.** A speaker label is judged per block from content: who narrates, who declares a PC's action, who answers a call for a roll. An actor that cannot be settled is flagged, and an unresolved flag keeps its claim out of the Wiki.
- **The summary is an index.** The Transcript Summary lists candidate events that Ingest checks against the Ledger. It is never evidence, and its action items and open questions are plans.
- **Mishearings go to the TranscribeX Dictionary.** `transcribex-dictionary.csv` at the repo root, committed, maps each misheard form to its Canon spelling; `cf transcript dictionary` appends to it and the DM imports it into TranscribeX. A mishearing never becomes a Wiki alias or a cspell word.
- **English words are written disabled.** A single-word source that is an English word (Crystalline) is written with `Enabled` 0, so a global replacement cannot rewrite ordinary speech; the DM enables it in TranscribeX if wanted.
