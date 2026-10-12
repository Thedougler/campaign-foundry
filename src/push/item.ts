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

const RARITIES: Record<string, string> = {
	common: "common",
	uncommon: "uncommon",
	rare: "rare",
	"very rare": "veryRare",
	legendary: "legendary",
	artifact: "artifact",
};

const RARITY_PATTERN = new RegExp(
	`\\b(${Object.keys(RARITIES)
		.sort((a, b) => b.length - a.length)
		.join("|")})\\b`,
	"i",
);

/** The opening paragraph under Properties, without its emphasis marks or final full stop. */
function classification(page: Page): string {
	const properties = page.headings.find((heading) => heading.depth === 2 && heading.text === "Properties");
	if (!properties) return "";
	for (let index = properties.index + 1; index < page.tree.children.length; index++) {
		const node = page.tree.children[index];
		if (node?.type === "heading") break;
		if (node?.type === "paragraph") {
			return page.source
				.slice(node.position?.start.offset, node.position?.end.offset)
				.trim()
				.replace(/^[*_]+|[*_.]+$/g, "")
				.trim();
		}
	}
	return "";
}

/** Picks the dnd5e Item type from its classification: equipment (wondrous items, armor), weapon, consumable, else loot. */
function itemKind(kind: string): { type: string; system: Doc } {
	const k = kind.toLowerCase();
	if (/\bweapon\b/.test(k))
		return {
			type: "weapon",
			system: { type: { value: /ranged|bow|crossbow/.test(k) ? "martialR" : "martialM", baseItem: "" } },
		};
	if (/\bshield\b/.test(k)) return { type: "equipment", system: { type: { value: "shield" } } };
	if (/\barmou?r\b/.test(k)) return { type: "equipment", system: { type: { value: "light" } } };
	if (/potion|scroll|consumable|ammunition|elixir/.test(k))
		return {
			type: "consumable",
			system: { type: { value: /potion|elixir/.test(k) ? "potion" : /scroll/.test(k) ? "scroll" : "" } },
		};
	if (/\bring\b/.test(k)) return { type: "equipment", system: { type: { value: "ring" } } };
	if (/\brod\b/.test(k)) return { type: "equipment", system: { type: { value: "rod" } } };
	if (/\bwand\b/.test(k)) return { type: "equipment", system: { type: { value: "wand" } } };
	if (/wondrous|magic item|artifact/.test(k)) return { type: "equipment", system: { type: { value: "wondrous" } } };
	return { type: "loot", system: { type: { value: "" } } };
}

/** A dnd5e Item from an Item page, with the page's rules text (not its hidden truths) as the description. */
export function buildItem(page: Page, options: ItemOptions): BuiltItem {
	const line = classification(page);
	const rarityMatch = RARITY_PATTERN.exec(line);
	const { type, system } = itemKind(line.slice(0, rarityMatch?.index));
	const rarity = RARITIES[rarityMatch?.[0].toLowerCase() ?? ""] ?? "";
	const attunement = /requires attunement/i.test(line) ? "required" : "";
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
