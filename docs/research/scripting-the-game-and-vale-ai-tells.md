# Scripting the Game and Vale ai-tells

## 1. RTG "Scripting the Game"

**Summary.** RTG is R. Talsorian Games (Cyberpunk's publisher). "Scripting the Game" is a short free game-aid PDF: a plotting method built on a **Beat Chart**. It is a pacing and sequencing tool, so it complements Lazy DM prep rather than replacing it. Identification is high confidence (exact title, RTG's own download), though that the user means it is an inference.

**Origin.** The text is a chapter from *Dream Park: The Roleplaying Game* (1992). RTG re-released it in 2020 (v1.2, OCR errors fixed). Credit line: "By Mike Pondsmith, with concepts provided by Flint Dille."

**Method, in the author's wording.**
- "Each Beat Chart has five parts, or Beats: the Hook, the Development, the Cliffhanger, the Climax, and the Resolution."
- Three rules: (1) "The story always begins with a Hook." (2) "The story always ends on a Climax, followed by a Resolution." (3) Developments and Cliffhangers alternate; "you will never have two Cliffhangers or two Developments in a row."
- Developments are "non-action Beats" (clues, revelations, conversations). Cliffhangers "are always action scenes."
- Pacing: "1 BEAT = 1/2 HOUR OF REAL WORLD TIME." Hook, Climax and Resolution take 1.5 hours; divide the rest among Developments and Cliffhangers. A six-hour night leaves 4.5 hours.
- An action-heavy Hook is followed by a Development; a cerebral Hook by a Cliffhanger.
- Process: "Grab a scrap of paper," number the Beats, then fill each from the catalog ("A Few Good Beats").

**A scripted session document** is a numbered list of typed Beats, each with a one-line premise (see its "MY BEAT CHART" example). The catalog gives named options per type:
- Hooks: Kidnapped, Discovery, Crisis, Looming Threat.
- Cliffhangers: Confrontation, Ambush, Dogfight.
- Developments: Retreat, Sabotage!, Foreshadowing, Turnabout!.
- Climaxes: Final Revelation, Final Battle.
- Resolutions: Happy Ending, Villain Escapes, Greater Threat.

**Versus Lazy DM.** The eight steps are: Review the Characters; Create a Strong Start; Outline Potential Scenes; Define Secrets and Clues; Develop Fantastic Locations; Outline Important NPCs; Choose Relevant Monsters; Select Treasure and Magic Item Rewards. Lazy DM prep produces a pool of loose material. The Beat Chart orders and paces it. My inference: step 2 maps to the Hook, step 3 to the Development and Cliffhanger slots, and step 4 feeds Developments. Neither source mentions the other.

**Not confirmed.** No other candidate found. `perchance.org/scripting-the-game` (a generator named for RTG's document, per a search snippet) returned 403 and is unread.

**Sources**
- https://rtalsoriangames.com/wp-content/uploads/2020/05/RTG-ScriptingtheGamev1.2.pdf
- https://rtalsoriangames.com/2020/05/29/bringing-back-the-beat/
- https://slyflourish.com/eight_steps_2023.html

## 2. Vale "ai-tells"

**Summary.** The package is `ai-tells`, by tbhb (Tony Burns). It is MIT licensed, and its latest release is v1.37.0 (2026-09-15). A second, unrelated package exists in the Vale catalog: `AiTells` by krishnasunkam. tbhb's is the one named "ai-tells" and is the likely match.

**Install** (from the README):
```ini
StylesPath = styles
MinAlertLevel = suggestion
Packages = ai-tells
[*.md]
BasedOnStyles = ai-tells
```
Then run `vale sync`. The bare name resolves through Vale's package catalog to `https://github.com/tbhb/vale-ai-tells/releases/latest/download/ai-tells.zip`. To pin, use the `v1.37.0` release URL.

**Contents.** These are three separate packages:
- `ai-tells`: 137 rule files, all defaulting to `error`. It targets technical documentation and is less useful for creative writing. Examples: `AbsoluteAssertions`, `AIAdjectiveNounPairs` ("holistic approach"), `AICompoundPhrases` ("rich tapestry"), `AnnouncementHeadings`.
- `ai-tells-commits`: 15 commit-message rules. It is not in the catalog, so install it by release URL (append it to `Packages =` with a `\` continuation).
- `ai-tells-experimental`: 18 opt-in structural rules, with separate steps in `EXPERIMENTAL.md`.

**Vale version.** No minimum version is stated in the README, release notes or package files. Compatibility with 3.23.0 is untested.

**Discrepancy.** `vale --version` on this machine reports **3.13.0**, not 3.23.0 as the user stated.

**Alternative.** krishnasunkam's `AiTells` is a smaller, separate package: `Packages = https://github.com/krishnasunkam/vale-ai-tells/releases/latest/download/AiTells.zip`.

**Sources**
- https://github.com/tbhb/vale-ai-tells (README, releases)
- https://raw.githubusercontent.com/errata-ai/packages/master/library.json (Vale catalog entries)
- https://github.com/krishnasunkam/vale-ai-tells
