import type { Transport } from "./transport.ts";
import { request } from "./transport.ts";

/** monster-service serves official and homebrew monsters; reads need no login, homebrew visibility needs one. */
export const MONSTER_SERVICE = "https://monster-service.dndbeyond.com";

/** The slice of monster-service's MonsterObject that verify compares against the canonical monster. */
export interface DdbMonsterRecord {
	id: number;
	name: string;
	sizeId: number;
	armorClass: number;
	armorClassDescription?: string;
	averageHitPoints?: number;
	hitPointDice?: { diceCount: number; diceValue: number; diceMultiplier: number; fixedValue: number; diceString: string };
	stats?: { statId: number; name: string; value: number }[];
	challengeRatingId?: number;
	isHomebrew: boolean;
	homebrewStatus: number;
	url?: string;
	/** The monster's type as the create form's `monster-type` value (live: Blood Hawk Beast = 2). */
	typeId?: number;
}

interface MonsterGetEnvelope {
	data?: DdbMonsterRecord | null;
}

interface MonsterSearchEnvelope {
	data?: DdbMonsterRecord[];
}

export function monsterUrl(id: number): string {
	return `${MONSTER_SERVICE}/v1/Monster/${id}`;
}

/** Homebrew-inclusive name search; `showHomebrew=t` is what makes the DM's private monsters visible. */
export function homebrewSearchUrl(name: string): string {
	return `${MONSTER_SERVICE}/v1/Monster?search=${encodeURIComponent(name)}&skip=0&take=20&showHomebrew=t`;
}

/** Reads one monster by id. A private homebrew monster needs the DM's session; official reads need no login. */
export async function readMonster(transport: Transport, id: number): Promise<DdbMonsterRecord | undefined> {
	const payload = await request<MonsterGetEnvelope>(transport, monsterUrl(id), { method: "GET" });
	return payload.data ?? undefined;
}

/** Finds a homebrew monster by exact name (case-insensitive) among the account's visible monsters. */
export async function findHomebrewMonster(transport: Transport, name: string): Promise<DdbMonsterRecord | undefined> {
	const payload = await request<MonsterSearchEnvelope>(transport, homebrewSearchUrl(name), { method: "GET" });
	const wanted = name.trim().toLowerCase();
	return (payload.data ?? []).find((m) => m.name.trim().toLowerCase() === wanted);
}
