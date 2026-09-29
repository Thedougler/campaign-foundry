# Fixtures

`vault/` is the fixture World for evals and tests: one small, self-consistent Wiki (the World Lowtide and its Campaign Salt and Lantern) shaped exactly like `wiki/`. It is never part of `wiki/`, it holds only Wiki pages, and every page must pass the `check` gate, so a change to a template or to a gate rule means updating the fixture in the same commit. Evals copy it into a scratch workspace and never edit it in place.
