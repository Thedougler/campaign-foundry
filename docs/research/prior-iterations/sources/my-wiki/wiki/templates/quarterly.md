---
type: quarterly
created: <% tp.date.now("YYYY-MM-DD") %>
period: <% tp.date.now("YYYY-[Q]Q") %>
status: draft
---
# <% tp.date.now("[Q]Q YYYY") %>

## Quarter in review
### Goals I set → what actually happened

### Biggest lesson

### What I'm avoiding (be honest)

## Projects completed
```dataview
TABLE status, area
FROM "wiki/projects"
WHERE status = "complete"
AND file.cday >= date("<% tp.date.now("YYYY-MM-DD", -90) %>")
```

## Next quarter goals
1. 
2. 
3. 
