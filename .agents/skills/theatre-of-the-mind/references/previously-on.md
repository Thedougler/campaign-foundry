# Previously On

The Previously On retells last Session to the Players as the next one starts. It is the story they would tell a friend who missed it: the best moments, told so the friend wishes they had been there, ending where play stopped. Past tense, the Party as "you", each PC named when they act. Only what play made true. Prep the table never reached stays out.

## Steps

1. **Find the moments.** A moment is something the table will bring up again: the shot that turned a fight, the bluff that worked too well, the line everyone repeated. The table marks its own moments with laughter, cheering, a gasp or a big roll, so search the Session's Transcript (in `raw/` during its Ingest, `archive/` after) for those reactions and read the lines before each hit:

   ```bash
   rg -n -i "laugh|haha|lol|oh my god|oh no|no way|holy|amazing|nat(ural)? ?(20|1)\b|crit" <transcript>
   ```

   Done when the list holds every big reaction with the concrete action that set it off, and every PC has at least one moment. A Transcript too thin to show reactions still gives its spoken lines; take the rest of the moments from the Recap.
2. **Rank them.** Biggest reaction first. Keep each moment as the one concrete thing that happened (he waved a torch at the ogre and set his own beard alight), never its category (he fought bravely).
3. **Tell it.** The moments get the words, and everything between them passes in a clause or drops out. Link each beat to the last by cause (so, which meant, until) or by a cut across it (but, just as). A string of standalone sentences is a chronicle. For comedy, give the setup its own sentence, then the turn, told straight. Dice and rules become what they looked like: a critical hit is a shot that went exactly where it was aimed. A line someone actually said at the table may be quoted word for word.
4. **End** inside the moment play stopped: the blade mid-reach, the water at the hatch.
5. **Check.** Run the skill's Speakable, Echo and Hard lines items, then these, quoting the block:
   - Does every moment appear as its concrete action, with more words than the routine around it?
   - Could each player retell their character's best moment from it?
   - Does each comic moment have its setup before its turn?
   - Is every roll, rule and Spell name turned into what it looked like?
   - Is the last sentence inside the stopped moment, with nothing about stopping, the night or the Session?
   - Is each person and thing called what the Players called it at the table?
