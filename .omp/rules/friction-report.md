---
description: Load friction-report when writing or routing `Gap:` and `Friction:` report lines.
condition: '(?m)^\s*(?:[-*]\s+)?(?:\*\*)?(?:Gap|Friction):'
scope: "text"
interruptMode: never
---

Before you write a friction report or act on `Gap:` and `Friction:` lines, read `skill://friction-report` and follow it. Acting on lines includes triaging those a subagent returned and starting a friction-started `skill://dogfood` run.
If you already read that skill this session, carry on.
