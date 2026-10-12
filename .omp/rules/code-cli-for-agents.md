---
description: Load cli-for-agents before writing or changing a script or program file for this project.
condition: '\S'
scope: "tool:write(**/*.{ts,mts,js,mjs,py,sh}), tool:edit(**/*.{ts,mts,js,mjs,py,sh})"
interruptMode: never
---

This reminder follows your first script or program edit this session (source under `src/`, `scripts/`, `test/` or another code directory). When you have already read `skill://cli-for-agents` this session, carry on. Otherwise read it now (at `~/.agents/skills/cli-for-agents/SKILL.md` when `skill://` does not resolve) and bring the edit you just made into line with it before your next edit.
