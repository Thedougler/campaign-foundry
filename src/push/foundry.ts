/** Versions the Push targets (`docs/adr/0008-push-builds-an-adventure.md`): Foundry v14 build 367 with dnd5e 5.3.3. */
export const FOUNDRY_CORE_VERSION = "14.367";
export const DND5E_VERSION = "5.3.3";
export const FOUNDRY_MIN = "14";
export const FOUNDRY_VERIFIED = "14.367";

/** `CONST.DOCUMENT_OWNERSHIP_LEVELS`: what a user with no explicit ownership may do with a document. */
export const OWNERSHIP = { NONE: 0, LIMITED: 1, OBSERVER: 2, OWNER: 3 } as const;

/** The `_stats` block Foundry stamps on a document; `coreVersion` is required, the rest records provenance. */
export function stats(): Record<string, unknown> {
	return { coreVersion: FOUNDRY_CORE_VERSION, systemId: "dnd5e", systemVersion: DND5E_VERSION };
}

/** A plain JSON object, as it is stored in the pack. */
export type Doc = Record<string, unknown>;
