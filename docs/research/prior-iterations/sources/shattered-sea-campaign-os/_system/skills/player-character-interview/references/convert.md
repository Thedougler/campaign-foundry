# Convert an NPC to a PC

Rare. A player claims someone who already exists as
`world/npc.<slug>.md`.

## Order

1. **Confirm identity.** Same person? If no, pick a different name
   or treat them as a new PC.
2. **Hybrid interview.** Show what the npc page already states,
   mapped onto the 20 by topic. Ask only gaps. Where the player
   contradicts the npc page, ask which wins — the player may
   override; this skill does not silently.
3. **Then convert.** Set `kind: pc` and `id: pc.<slug>`, move
   `world/npc.<slug>.md` → `campaign/pc.<slug>.md`, patch every
   `[[npc.<slug>]]` to `[[pc.<slug>]]`. One person.
4. **Rewrite onto the pc template.** Gravity-first headings. Keep
   surviving npc facts. Surviving answers plus new ones become the
   first Interview round.

Convert is the last step, not the first. The npc page stays
established world truth until the player has answered.
