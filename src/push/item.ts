import type { Page } from "../vault/types.ts";
import { OWNERSHIP, stats } from "./foundry.ts";
import type { Doc } from "./foundry.ts";
import { foundryId } from "./ids.ts";
import { renderMarkdown } from "./markdown.ts";
import type { RenderContext } from "./markdown.ts";

export interface ItemOptions {
	/** The Campaign folder the document belongs to; it seeds the ID. */
	campaign: string;
	render: RenderContext;
}

export interface BuiltItem {
	data: Doc;
}

const RARITIES: Record<string, string> = { common: "common", uncommon: "uncommon", rare: "rare", "very rare": "veryRare", legendary: "legendary", artifact: "artifact" };

/** The text after `**Label.**` in the page's at-a-glance bullets, or "". */
function glance(page: Page, label: string): string {
	const match = new RegExp(`^- \\*\\*${label}\\.\\*\\*\\s*(.*)$`, "im").exec(page.source);
	return (match?.[1] ?? "").trim();
}

/** Picks the dnd5e Item type for a page from its `**Kind.**` line: equipment (wondrous items, armor), weapon, consumable, else loot. */
function itemKind(kind: string): { type: string; system: Doc } {
	const k = kind.toLowerCase();
	if (/\bweapon\b/.test(k)) return { type: "weapon", system: { type: { value: /ranged|bow|crossbow/.test(k) ? "martialR" : "martialM", baseItem: "" } } };
	if (/\bshield\b/.test(k)) return { type: "equipment", system: { type: { value: "shield" } } };
	if (/\barmou?r\b/.test(k)) return { type: "equipment", system: { type: { value: "light" } } };
	if (/potion|scroll|consumable|ammunition|elixir/.test(k)) return { type: "consumable", system: { type: { value: /potion|elixir/.test(k) ? "potion" : /scroll/.test(k) ? "scroll" : "" } } };
	if (/\bring\b/.test(k)) return { type: "equipment", system: { type: { value: "ring" } } };
	if (/\brod\b/.test(k)) return { type: "equipment", system: { type: { value: "rod" } } };
	if (/\bwand\b/.test(k)) return { type: "equipment", system: { type: { value: "wand" } } };
	if (/wondrous|magic item|artifact/.test(k)) return { type: "equipment", system: { type: { value: "wondrous" } } };
	return { type: "loot", system: { type: { value: "" } } };
}

/** A dnd5e Item from an Item page, with the page's rules text (not its hidden truths) as the description. */
export function buildItem(page: Page, options: ItemOptions): BuiltItem {
	const { type, system } = itemKind(glance(page, "Kind"));
	const rarity = RARITIES[glance(page, "Rarity").toLowerCase().replace(/\.$/, "")] ?? "";
	const attunement = /^(none|no)\b/i.test(glance(page, "Attunement")) || glance(page, "Attunement") === "" ? "" : /optional/i.test(glance(page, "Attunement")) ? "optional" : "required";
	const description = renderMarkdown(page, options.render, { omit: ["Depth"] });
	const data: Doc = {
		_id: foundryId(options.campaign, page.path),
		name: page.name,
		type,
		img: "icons/svg/item-bag.svg",
		folder: null,
		sort: 0,
		effects: [],
		flags: {},
		ownership: { default: OWNERSHIP.NONE },
		_stats: stats(),
		system: {
			...system,
			description: { value: description, chat: "" },
			rarity,
			// Loot has no attunement in the dnd5e data model.
			...(type === "loot" ? {} : { attunement }),
			identified: true,
			quantity: 1,
			source: { rules: "2024", book: "Campaign Foundry" },
		},
	};
	return { data };
}
