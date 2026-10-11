/**
 * D&D Beyond's public character endpoint and the slice of its payload `cf pull` reads.
 * The envelope and error conventions are the transport's (`src/ddb/transport.ts`): one vocabulary for one vendor.
 * See docs/research/dndbeyond-character-endpoint.md for how the endpoint and shape were verified.
 */

import { DdbTransportError, unwrapEnvelope } from "../ddb/transport.ts";

export const CHARACTER_ENDPOINT = "https://character-service.dndbeyond.com/character/v5/character";

/** A modifier granted by a race, class, background, feat or item. `value` and `fixedValue` are usually equal. */
export interface DdbModifier {
	type: string;
	subType: string;
	value: number | null;
	fixedValue: number | null;
	statId: number | null;
	restriction: string | null;
	dice: unknown;
	componentId: number;
	requiresAttunement?: boolean;
}

export interface DdbSpell {
	prepared?: boolean;
	alwaysPrepared?: boolean;
	countsAsKnownSpell?: boolean;
	definition: { name: string; level: number };
}

export interface DdbClassDefinition {
	name: string;
	canCastSpells: boolean;
	spellCastingAbilityId: number | null;
	classFeatures?: { name: string; requiredLevel: number }[];
	spellRules?: { multiClassSpellSlotDivisor?: number; levelSpellSlots?: number[][] };
}

export interface DdbClass {
	level: number;
	definition: DdbClassDefinition;
	subclassDefinition: (DdbClassDefinition & { name: string }) | null;
}

export interface DdbItem {
	quantity: number;
	equipped: boolean;
	isAttuned: boolean;
	definition: {
		id: number;
		name: string;
		magic?: boolean;
		rarity?: string | null;
		canAttune?: boolean;
		isConsumable?: boolean;
		filterType?: string | null;
		armorClass?: number | null;
		armorTypeId?: number | null;
		grantedModifiers?: DdbModifier[];
	};
}

export interface DdbCharacter {
	id: number;
	name: string;
	username?: string;
	stats: { id: number; value: number | null }[];
	bonusStats: { id: number; value: number | null }[];
	overrideStats: { id: number; value: number | null }[];
	baseHitPoints: number | null;
	bonusHitPoints: number | null;
	overrideHitPoints: number | null;
	classes: DdbClass[];
	race: {
		fullName?: string | null;
		baseRaceName?: string | null;
		weightSpeeds?: { normal?: Partial<Record<"walk" | "fly" | "swim" | "climb" | "burrow", number>> | null } | null;
		racialTraits?: { definition: { name: string; hideInSheet?: boolean } }[];
	};
	modifiers: Partial<Record<"race" | "class" | "background" | "item" | "feat" | "condition", DdbModifier[] | null>>;
	inventory: DdbItem[];
	classSpells: { spells: DdbSpell[] | null }[];
	spells: Partial<Record<"race" | "class" | "background" | "item" | "feat", DdbSpell[] | null>>;
	feats: { definition: { name: string } }[];
	currencies?: Partial<Record<"pp" | "gp" | "ep" | "sp" | "cp", number>> | null;
}

/** The numeric character id from a `dndbeyond.com/characters/<id>` (or `/profile/<user>/characters/<id>`) link. */
export function characterIdFromUrl(url: string): string | undefined {
	return /dndbeyond\.com\/(?:profile\/[^/]+\/)?characters\/(\d+)/i.exec(url)?.[1];
}

/** A minimal HTTP response, as the pull's fake fetches answer: the seam tests inject fakes through. */
export interface FetchResponse {
	status: number;
	ok: boolean;
	json(): Promise<unknown>;
}

export type FetchLike = (url: string, init?: { headers?: Record<string, string> }) => Promise<FetchResponse>;

/**
 * Fetches one public character over direct HTTP (no auth, no browser fallback; ADR 0022 is the write path).
 * Throws `DdbTransportError` with the fix when the link is wrong or D&D Beyond refuses; the caller names the PC.
 */
export async function fetchCharacter(pc: string, url: string, fetcher: FetchLike): Promise<DdbCharacter> {
	const id = characterIdFromUrl(url);
	if (id === undefined) {
		throw new DdbTransportError(
			`dndbeyond_url "${url}" is not a character link.`,
			`Set it to https://www.dndbeyond.com/characters/<id>.`,
		);
	}
	let response: FetchResponse;
	try {
		response = await fetcher(`${CHARACTER_ENDPOINT}/${id}`, {
			headers: { accept: "application/json", "user-agent": "campaign-foundry-cf-pull" },
		});
	} catch (error) {
		throw new DdbTransportError(
			`could not reach D&D Beyond (${(error as Error).message}).`,
			`Check the network and run cf pull --pc "${pc}" again.`,
		);
	}
	if (response.status === 403 || response.status === 404) {
		throw new DdbTransportError(
			`D&D Beyond would not share character ${id} (HTTP ${response.status}).`,
			`Set the character to public: open it on D&D Beyond, Settings, Character Privacy, Public. Then run cf pull --pc "${pc}". If it is already public, check that dndbeyond_url has the right id.`,
			response.status,
		);
	}
	if (!response.ok) {
		throw new DdbTransportError(
			`D&D Beyond answered HTTP ${response.status} for character ${id}.`,
			`Wait a minute and run cf pull --pc "${pc}" again.`,
			response.status,
		);
	}
	const character = unwrapEnvelope(await response.json()) as DdbCharacter | null;
	if (character === null || typeof character !== "object") {
		throw new DdbTransportError(
			`D&D Beyond returned no character for ${id}.`,
			"Check the link and that the character is public.",
		);
	}
	return character;
}
