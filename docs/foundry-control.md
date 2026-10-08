# Foundry Control (issue #46)

The daemon and CLI that read and write the DM's Foundry VTT through two planes behind one typed contract. Every mutation follows the discipline below, and every live-instance change waits for DM approval. This extends ADR 0008, where Push builds the Adventure offline and the bridge handles only the live operations that are outside what an Adventure contains. The Wiki stays the source of truth: new content is routed to a campaign compendium first, and world placement is a separate explicit step.

## Architecture

```
agent ── MCP (stdio JSON-RPC) ── daemon (`cf foundry serve`)
                                   │ ToolRegistry (discipline: plan, gate, verify)
                                   ├─ host plane: SSH commands on rpi4 (status, logs, backups, installs)
                                   └─ bridge listener (WebSocket, token-authenticated, 127.0.0.1:30426)
                                          ▲
                                          └── cf-bridge module (in-world, Public API only)
                                              document/compendium/setting/macro/event tools
```

- **The daemon never writes Foundry directly.** The in-world module is the only writer, through the supported Public API (`game`, `foundry`, `fromUuid` globals). Foundry internals remain inside the module adapter, so a version bump is adapter work.
- **The module connects out** to the daemon's listener (browsers cannot listen). Only one module connection is active at a time. A second connection is refused while the first stays. Keepalive covers stale sockets. The token is sent in the query string because browsers cannot set WebSocket headers.
- **Discipline lives daemon-side** (issue #46). The module only executes what the daemon planned, gated and verified.

## The tools

`tools/list` (MCP) and `TOOL_SPECS` (`src/foundry-control/daemon/specs.ts`) come from the same table. It defines all 23 tools with the params each one takes and the plane it runs on.

| Plane | Read-only | Mutating |
|---|---|---|
| module (through the bridge) | `world.inspect`, `world.search`, `document.get`, `document.query`, `compendium.query`, `setting.get`, `events.subscribe`, `events.since` | `document.create/patch/delete/batch`, `compendium.import`, `setting.set`, `macro.run` (disciplined, DM instruction required) |
| host (over SSH) | `host.status`, `logs.query` | `host.restart`, `package.install`, `package.update`, `backup.create`, `backup.restore`, `asset.put` (DM-gated: the daemon refuses and returns the approval command) |

## Mutation discipline

Every module-plane write accepts `dry_run` (default **true**), `preconditions`, `idempotency_key`, `backup_before` and `verify_after`. The registry runs them in a fixed order:

1. Validate params against the tool's spec.
2. Plan the mutation. `document.batch` and `document.delete` force `backup_before` on, and a warning is added when the caller opted out. `document.patch` and `document.delete` warn when no preconditions were given.
3. **Dry run by default**: return the plan as a preview and call nothing. Pass `dry_run: false` to execute.
4. Idempotency: the same `idempotency_key` with the same params replays the recorded result. The same key with different params is an error, never a silent second write. Failures are never recorded.
5. Preconditions: each `{uuid, path, equals}` is read through `document.get` and deep-compared at the dot-path before anything runs.
6. `backup_before`: the host adapter takes a shutdown-aware backup. A running world refuses, per the official guidance that Foundry is shut down before Data is copied, and the refusal specifies the command `cf foundry backup create --stop --yes` for the DM.
7. Execute through the bridge.
8. `verify_after` (default true): every touched document is re-read and the changed paths compared. The result reports uuids, canonical post-write state, warnings, verification per uuid, and the backup's destination.

## DM gates

Through MCP, the daemon runs host-plane mutations **never**: each returns an `isError` result with the exact approval command. The CLI is the approval channel: every mutating subcommand prints its plan and the approval command, and exits 2 until `--yes`.

| Gate | Approval command |
|---|---|
| Stop or restart the world | `cf foundry service stop\|restart --yes` |
| Backup round-trip | `cf foundry backup create --stop --yes`, then `cf foundry backup restore <archive> --yes` |
| options.json edit | `cf foundry options set <key=value...> --yes` |
| Asset placement | `cf foundry assets put <src> <dest> --yes` |
| Foundry update | `cf foundry install update [--version <v>] --yes` |
| Module install | `cf foundry install module --zip <zip> --name cf-bridge --yes` |
| Live document writes | DM instruction per session (issue #46). Dry runs are always safe. |

Read-only commands (`status`, `logs`, `options get`, `tool host.status`, `tool logs.query`) run freely.

## The CLI

```
cf foundry status [--json]            one-screen host snapshot
cf foundry logs [--lines --since --until --grep --source]
cf foundry options get <key> | set <key=value...> [--yes]
cf foundry service start|stop|restart [--yes]
cf foundry backup create [--stop --dest] [--yes] | restore <archive> [--yes]
cf foundry assets put <src> <dest> [--yes]        (src `-` reads stdin)
cf foundry install update [--version] [--yes] | module --zip --name [--yes]
cf foundry serve [--host --port --token --idempotency]   the daemon
cf foundry tool <name> [--params <json>]                 call one tool through the registry
```

`cf foundry serve` runs the daemon: the bridge listener plus MCP on newline-delimited stdio (closing stdin stops it). Host read-only tools work without a module. Module tools answer once the world's cf-bridge module connects.

## Installing the module (needs a world)

1. The DM first creates a world. Open Foundry Setup (`http://100.84.226.53:30000` or the kiosk), install a system (dnd5e) under Game Systems, then use Create New World.
2. Pack the module from its own directory so `module.json` is at the archive root: `zip -j /tmp/cf-bridge.zip src/foundry-control/bridge/module/{module.json,main.mjs,handlers.mjs,ring.mjs}`. After approval, copy it with `scp /tmp/cf-bridge.zip nick@100.84.226.53:/home/nick/cf-bridge.zip`, then run `CF_FOUNDRY_SSH=nick@100.84.226.53 bun run cf -- foundry install module --zip /home/nick/cf-bridge.zip --name cf-bridge --yes`.
3. In the world's Module Management settings, enable Campaign Foundry Bridge. Set its URL to the daemon machine's reachable address and set its token to the daemon's (`cf foundry serve --token <secret>`). Browser HTTPS requires a `wss://` endpoint. The default loopback URL works only when the browser and daemon are on the same machine.

## Environment

| Variable | Default | Meaning |
|---|---|---|
| `CF_FOUNDRY_SSH` | `rpi4` | SSH target. This Mac has no `rpi4` alias today: use `CF_FOUNDRY_SSH=nick@100.84.226.53` (or add the alias). |
| `CF_FOUNDRY_COMPOSE` | `/home/nick/compose/foundry/compose.yaml` | Compose file on the host. |
| `CF_FOUNDRY_CONTAINER` | `foundry` | Docker container name. |
| `CF_FOUNDRY_DATA` | `/home/nick/foundry-data` | Foundry data directory on the host. |
| `CF_FOUNDRY_SCRIPTED` | unset | A JSON fixture (`{replies:[{match, stdout, code?, stderr?}]}`) answering host commands without SSH: tests and dry practice share the real code path. |
| `CF_FOUNDRY_TOKEN` | unset | Default bridge token for `serve`. |

Backups land under `/home/nick/backup-staging/foundry/` (beside the existing compose backups).

## Decisions (recorded)

1. **v14 batches are atomic.** The adapter translates each operation to the documented [DatabaseWriteOperation](https://foundryvtt.com/api/types/foundry.abstract.types.DatabaseWriteOperation.html), then calls [modifyBatch](https://foundryvtt.com/api/functions/foundry.documents.modifyBatch.html). Versions without that helper run operations in order and stop on the first failure.
2. **Host mutations are CLI-gated, never daemon-run.** The daemon's job is reading and disciplined world writes. Stopping the DM's Foundry belongs to the DM via `--yes`.
3. **Dry run is the default everywhere**: registry mutations and every mutating CLI subcommand.
4. **One module connection.** A second is refused with close 1008, and the first stays. Keepalive covers stale sockets.
5. **Token in the query string** (browsers cannot set WebSocket headers). The listener also accepts bearer and subprotocol forms.
6. **Compendium imports keep `_id`s** (`keepId: true`), matching Adventure import and ADR 0008's stable-ID rule. `document.create` into a pack keeps an id only when the source includes one.
7. **32 MiB frame cap** on the bridge. Protocol errors close with RFC 6455 codes.
8. **Backup destination unchanged** (`backup-staging/foundry`), idempotency journal optional (`serve --idempotency <path>`).

## Needs a live world to verify

The live round-trip requires a world on rpi4. Public-interface tests follow v14's documented [compendium API](https://foundryvtt.com/api/classes/foundry.documents.collections.CompendiumCollection.html) (`getIndex`, `getUuid`), [document hooks](https://foundryvtt.com/api/functions/hookEvents.createDocument.html), and [macro execution scope](https://foundryvtt.com/api/classes/foundry.documents.Macro.html#execute). Confirm creation in an Actor compendium, its UUID read-back, and event polling in that world before closing the live gate. A macro's arbitrary side effects cannot be verified automatically. Its result reports unsuccessful automatic verification and requires explicit inspection.

## Layout

- `src/foundry-control/bridge/`: the wire contract (`schema.ts`) and the mutation planner with its idempotency store (`mutations.ts`). The transport layer is the WebSocket codec, listener and client. `module/` holds the Foundry module itself: `module.json`, `main.mjs`, `handlers.mjs`, `ring.mjs`.
- `src/foundry-control/daemon/`: `specs.ts` (the tool table), `registry.ts` (the discipline enforcer), `mcp.ts` (stdio MCP).
- `src/foundry-control/host/`: SSH host adapter for status, logs, options, service, backup, assets and installs, plus `connect.ts` (env and scripted-fixture resolution).
- `src/commands/foundry.ts`: the `cf foundry` CLI.
- `test/foundry-control/`: module, bridge, registry, MCP, host and CLI tests (public seams: fake `game`/`fromUuid`/WebSocket, `ScriptedHost`, spawn runs).
