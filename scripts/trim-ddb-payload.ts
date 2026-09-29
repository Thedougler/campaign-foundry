#!/usr/bin/env node
// Trims a D&D Beyond character response into a committable test fixture.
//   node scripts/trim-ddb-payload.ts <response.json> <out.json> <fake-id> <fake-name>
// It keeps the shape `cf pull` reads and drops prose (descriptions, snippets), images, notes, the account and
// campaign the character belongs to, and anything else personal. The character id and name are replaced.
import { readFileSync, writeFileSync } from "node:fs";

const [input, output, fakeId, fakeName] = process.argv.slice(2);
if (!input || !output || !fakeId || !fakeName) {
	process.stderr.write("usage: node scripts/trim-ddb-payload.ts <response.json> <out.json> <fake-id> <fake-name>\n");
	process.exit(2);
}

/** Top-level fields that identify the player or hold free text the sheet never reads. */
const DROP_TOP = new Set([
	"username", "userId", "readonlyUrl", "campaign", "campaignSetting", "notes", "traits", "decorations", "actions",
	"customActions", "creatures", "socialName", "faith", "age", "eyes", "hair", "skin", "height", "weight", "gender",
	"dateModified", "providedFrom", "canEdit", "isAssignedToPlayer", "activeSourceCategories", "characterValues",
	"options", "configuration", "preferences", "customItems", "customSenses", "customDefenseAdjustments", "lifestyle",
]);
/** Fields dropped at any depth: prose and images. */
const DROP_DEEP = new Set([
	"description", "snippet", "longDescription", "shortDescription", "avatarUrl", "largeAvatarUrl", "portraitAvatarUrl",
	"iconAvatarUrl", "desktopCardBackgroundAvatarUrl", "mobileCardBackgroundAvatarUrl", "detailsBackgroundAvatarUrl",
	"desktopCardForegroundAvatarUrl", "mobileCardForegroundAvatarUrl", "detailsForegroundAvatarUrl",
	"mobileCardBannerAvatarUrl", "desktopCardBannerAvatarUrl", "iconicGearAvatarUrl", "tagline", "cardDescription",
	"highlights", "classFantasy", "iconicGear", "subclassTagline", "subclassFlavorText", "cardEyebrow", "cardHeading",
	"equipmentDescription", "moreDetailsUrl", "summary", "attunementDescription", "additionalDescription", "prerequisite",
	"tags", "avatarUrls", "sourceDescription", "primaryAbilities", "wealthDice", "complexity", "color",
]);

function trim(value: unknown, depth: number): unknown {
	if (Array.isArray(value)) return value.map((v) => trim(v, depth + 1));
	if (value && typeof value === "object") {
		const out: Record<string, unknown> = {};
		for (const [k, v] of Object.entries(value)) {
			if (depth === 0 && DROP_TOP.has(k)) continue;
			if (DROP_DEEP.has(k)) continue;
			out[k] = trim(v, depth + 1);
		}
		return out;
	}
	return value;
}

const response = JSON.parse(readFileSync(input, "utf8")) as { data: Record<string, unknown> } & Record<string, unknown>;
const data = trim(response.data, 0) as Record<string, unknown>;
data.id = Number(fakeId);
data.name = fakeName;
const realId = String(response.data.id);
const text = JSON.stringify({ ...response, data })
	.replaceAll(realId, fakeId)
	.replace(/"[^"]*dndbeyond\.com\/avatars\/[^"]*"/g, '""');
writeFileSync(output, `${text}\n`);
process.stdout.write(`${output}: ${(text.length / 1024).toFixed(0)} KiB\n`);
