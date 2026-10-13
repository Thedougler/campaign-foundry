/**
 * D&D Beyond's public character endpoint and the slice of its payload `cfcli pull` reads.
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
	friendlySubtypeName?: string;
	bonusTypes?: number[];
}

export interface DdbSpell {
	prepared?: boolean;
	alwaysPrepared?: boolean;
	countsAsKnownSpell?: boolean;
	definition: { name: string; level: number };
}

export interface DdbLimitedUse {
	maxUses?: number;
	resetType?: number;
	statModifierUsesId?: number | null;
	operator?: number;
	useProficiencyBonus?: boolean;
	proficiencyBonusOperator?: number;
}

export interface DdbFeature {
	id?: number;
	name: string;
	requiredLevel?: number;
	hideInSheet?: boolean;
	description?: string | null;
	snippet?: string | null;
	activation?: { activationType?: number | null } | null;
	limitedUse?: DdbLimitedUse | { level: number | null; uses: number }[] | null;
}

export interface DdbClassDefinition {
	name: string;
	hitDice?: number;
	canCastSpells: boolean;
	spellCastingAbilityId: number | null;
	classFeatures?: DdbFeature[];
	spellRules?: { multiClassSpellSlotDivisor?: number; levelSpellSlots?: number[][] };
}

export interface DdbClass {
	level: number;
	definition: DdbClassDefinition;
	subclassDefinition: (DdbClassDefinition & { name: string }) | null;
	classFeatures?: {
		definition: DdbFeature;
		levelScale?: { dice?: { diceString?: string | null } | null; fixedValue?: number | null } | null;
	}[];
}

export interface DdbItem {
	id?: number;
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
		type?: string | null;
		categoryId?: number | null;
		attackType?: number | null;
		damage?: { diceString?: string | null; diceCount?: number; diceValue?: number } | null;
		damageType?: string | null;
		range?: number | null;
		longRange?: number | null;
		properties?: { name: string; notes?: string | null }[] | null;
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
	/** DDB customization ids: 1 = AC override; 28 = selected Pact of the Blade weapon (inventory id). */
	characterValues?: { typeId: number; value: number | boolean | string | null; valueId?: number | string | null }[];
	customSenses?: { senseId: number; distance: number | string | null }[];
	classes: DdbClass[];
	race: {
		fullName?: string | null;
		baseRaceName?: string | null;
		sizeId?: number;
		weightSpeeds?: { normal?: Partial<Record<"walk" | "fly" | "swim" | "climb" | "burrow", number>> | null } | null;
		racialTraits?: { definition: DdbFeature }[];
	};
	modifiers: Partial<Record<"race" | "class" | "background" | "item" | "feat" | "condition", DdbModifier[] | null>>;
	inventory: DdbItem[];
	classSpells: { spells: DdbSpell[] | null }[];
	spells: Partial<Record<"race" | "class" | "background" | "item" | "feat", DdbSpell[] | null>>;
	feats: { definition: DdbFeature }[];
	actions?: Partial<Record<"race" | "class" | "feat" | "item" | "background", DdbFeature[] | null>> | null;
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
			`Check the network and run cfcli pull --pc "${pc}" again.`,
		);
	}
	if (response.status === 403 || response.status === 404) {
		throw new DdbTransportError(
			`D&D Beyond would not share character ${id} (HTTP ${response.status}).`,
			`Set the character to public: open it on D&D Beyond, Settings, Character Privacy, Public. Then run cfcli pull --pc "${pc}". If it is already public, check that dndbeyond_url has the right id.`,
			response.status,
		);
	}
	if (!response.ok) {
		throw new DdbTransportError(
			`D&D Beyond answered HTTP ${response.status} for character ${id}.`,
			`Wait a minute and run cfcli pull --pc "${pc}" again.`,
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
