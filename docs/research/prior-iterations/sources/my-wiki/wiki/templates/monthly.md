---
type: monthly
created: <% tp.date.now("YYYY-MM-DD") %>
period: <% tp.date.now("YYYY-MM") %>
status: draft
---
# <% tp.date.now("MMMM YYYY") %>

## Month in review
### Wins

### Struggles

### Patterns I noticed

## Project status check
```dataview
TABLE status, due, area
FROM "wiki/projects"
WHERE status != "complete" AND status != "abandoned"
SORT priority ASC
```

## Areas check-in
How is each life area doing? (1-5 quick rating)
- Health: 
- Career: 
- Finance: 
- Relationships: 
- Home: 
- Growth: 

## Next month's focus
1. 
