---
title: ""
type: Handout
summary: ""
sources: []
revealed: ""
---

%% The `summary` property gives its kind (letter, poster, player map, portrait) and the form the Players receive. %%

> [!narration] Handout text
> %% The words as the Players see them, word for word, in the document's own voice. For an image, the caption. Push sends Players only this callout and the image. %%

%% Image, if any: embed the file from the Campaign folder's attachments directly under the callout. %%

## Hand-over

%% Optional. Include it when the hand-over needs staging, the Handout has a known author or source, or it holds a false claim. DM only. Link the Scene it is handed over in and its author or source. Give how it is handed over and what the Players are likely to do with it. Mark which of its claims are true. %%

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```
