---
type: weekly
created: <% tp.date.now("YYYY-MM-DD") %>
period: <% tp.date.now("YYYY-[W]WW") %>
status: draft
---
# Week <% tp.date.now("WW, YYYY") %>

## Review
### What went well?

### What didn't go well?

### What do I want to change?

## Incomplete tasks from this week
```dataview
TASK FROM "wiki/daily"
WHERE !completed
AND file.name >= "<% tp.date.now("YYYY-MM-DD", -6) %>"
AND file.name <= "<% tp.date.now("YYYY-MM-DD") %>"
```

## Next week's priorities
1. 
2. 
3. 
