import type { FetchInit, FetchResult } from "./auth.ts";
import { DdbAuthError } from "./auth.ts";
import { DdbCaptureError, loadContract } from "./capture.ts";
import { readMonster } from "./monster.ts";
import type { DdbMonsterRecord } from "./monster.ts";
import type { Transport } from "./transport.ts";
import { DdbTransportError } from "./transport.ts";
import { acNumber } from "./verify.ts";
import type { CanonicalMonster } from "./verify.ts";

/** The homebrew creations area of the site: create, builder and delete pages all live under it. */
export const CREATIONS_URL = "https://www.dndbeyond.com/homebrew/creations";

/** The create page's server-rendered form; POSTing it copies a base monster into a new homebrew one. */
export const CREATE_MONSTER_URL = `${CREATIONS_URL}/create-monster`;

/** The homebrew-monster entity type id DDB uses in its creations URLs (from the create redirect). */
export const MONSTER_ENTITY_TYPE_ID = 779871897;

/** The creation view page: server-rendered, and the only reliable post-delete oracle (see delete.json). */
export function creationViewUrl(id: number): string {
	return `${CREATIONS_URL}/view?entityTypeId=${MONSTER_ENTITY_TYPE_ID}&id=${id}`;
}

/** The delete modal URL; POSTing it with the verification token deletes the creation. */
export function monsterDeleteUrl(id: number): string {
	return `${CREATIONS_URL}/delete?entityTypeId=${MONSTER_ENTITY_TYPE_ID}&id=${id}`;
}

/** The builder's edit URL. It embeds the monster's CURRENT slug, which changes on rename. */
export function monsterEditUrl(id: number, slug: string | undefined): string {
	return `${CREATIONS_URL}/monsters/${id}${slug === undefined ? "" : `-${slug}`}/edit`;
}

/** One attribute of a tag, matched only as its own attribute (never inside `data-…` names). */
function attrOf(tag: string, name: string): string | undefined {
	return new RegExp(`(?:^|\\s)${name}\\s*=\\s*"([^"]*)"`).exec(tag)?.[1];
}

/** The HTML entities DDB's builder pages use in attribute values and textarea bodies. */
export function decodeEntities(value: string): string {
	return value
		.replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
		.replace(/&quot;/g, '"')
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&nbsp;/g, "\u00a0")
		.replace(/&amp;/g, "&");
}

/** The value of a hidden form input by name, from a page's HTML, either attribute order. */
export function hiddenInputValue(html: string, name: string): string | undefined {
	for (const tag of html.match(/<input\b[^>]*>/gi) ?? []) {
		if (attrOf(tag, "name") === name) {
			const value = attrOf(tag, "value");
			if (value !== undefined) return decodeEntities(value);
		}
	}
	return undefined;
}

/** One postable control of the builder form: its POST name, its field id, its current value. */
export interface FormField {
	/** The `name=` the form posts; DDB hashes some (the ability scores), so never derive it from the id. */
	name: string;
	/** The control's `id=`, e.g. `field-Name`; canonical overrides address controls by it. */
	fieldId?: string;
	value: string;
	/** A select's options in page order, selects only. */
	options?: { value: string; label: string }[];
}

/** The monster builder form (`<form id="monster-form">…</form>`), or undefined when the page has none. */
function builderForm(html: string): string | undefined {
	const open = /<form\b[^>]*id="monster-form"[^>]*>/i.exec(html);
	if (!open) return undefined;
	const close = html.toLowerCase().indexOf("</form>", open.index);
	return close === -1 ? undefined : html.slice(open.index, close);
}

/**
 * Parses every postable control of the builder form in page order: hidden and text inputs by their
 * `value`, checkboxes/radios only when checked, file inputs never, selects by their selected option
 * (multi-selects once per selected option), textareas by their body. Values are entity-decoded,
 * because the browser posts decoded values, not the page's escaped source.
 */
export function parseBuilderForm(html: string): FormField[] {
	const form = builderForm(html);
	if (form === undefined) return [];
	const fields: FormField[] = [];
	const control = /<(input|select|textarea)\b/gi;
	let match: RegExpExecArray | null;
	while ((match = control.exec(form)) !== null) {
		const kind = match[1]!.toLowerCase();
		const tagEnd = form.indexOf(">", match.index);
		if (tagEnd === -1) break;
		const tag = form.slice(match.index, tagEnd + 1);
		const name = attrOf(tag, "name");
		if (name === undefined) continue;
		const fieldId = attrOf(tag, "id");
		if (kind === "input") {
			const type = (attrOf(tag, "type") ?? "text").toLowerCase();
			if (type === "file") continue;
			if (type === "checkbox" || type === "radio") {
				if (!/\bchecked\b/.test(tag)) continue;
			}
			const value = attrOf(tag, "value") ?? "";
			fields.push({ name, ...(fieldId === undefined ? {} : { fieldId }), value: decodeEntities(value) });
		} else if (kind === "select") {
			const close = form.toLowerCase().indexOf("</select>", tagEnd);
			if (close === -1) break;
			const inner = form.slice(tagEnd + 1, close);
			const options: { value: string; label: string; selected: boolean }[] = [];
			const option = /<option\b[^>]*>([\s\S]*?)<\/option>/gi;
			let chosen: RegExpExecArray | null;
			while ((chosen = option.exec(inner)) !== null) {
				const optionTag = chosen[0].slice(0, chosen[0].indexOf(">") + 1);
				options.push({
					value: attrOf(optionTag, "value") ?? "",
					label: decodeEntities(chosen[1]!.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()),
					selected: /\bselected\b/.test(optionTag),
				});
			}
			const multiple = /\bmultiple\b/i.test(tag);
			const selected = options.filter((o) => o.selected);
			// A browser posts a single select's selected option (or the placeholder when none), and a
			// multi-select once per selected option — nothing at all when none is selected.
			const current = multiple ? selected : selected.length > 0 ? [selected[0]!] : options.slice(0, 1);
			for (const option_ of current) {
				fields.push({
					name,
					...(fieldId === undefined ? {} : { fieldId }),
					value: option_.value,
					...(multiple ? {} : { options: options.map((o) => ({ value: o.value, label: o.label })) }),
				});
			}
			control.lastIndex = close;
		} else {
			const close = form.toLowerCase().indexOf("</textarea>", tagEnd);
			if (close === -1) break;
			fields.push({ name, ...(fieldId === undefined ? {} : { fieldId }), value: decodeEntities(form.slice(tagEnd + 1, close)) });
			control.lastIndex = close;
		}
	}
	return fields;
}

/** The hit dice the wiki writes, as the builder's three fields: count, die value, fixed modifier. */
export function parseHitDice(hitDice: string): { count: number; value: number; modifier: number } | undefined {
	const dice = /(\d+)\s*d\s*(\d+)\s*(?:([+-])\s*(\d+))?/i.exec(hitDice);
	if (dice === null) return undefined;
	return { count: Number(dice[1]), value: Number(dice[2]), modifier: dice[3] === undefined ? 0 : Number(`${dice[3]}${dice[4]}`) };
}

/** DDB writes armor types capitalized (`Natural Armor`); the wiki statblock writes lowercase. */
export function armorTypeOf(ac: string): string | undefined {
	const parenthetical = /\(([^)]*)\)/.exec(ac)?.[1]?.trim();
	if (parenthetical === undefined || parenthetical === "") return undefined;
	return parenthetical.split(/\s+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function selectValueFor(field: FormField, label: string): string {
	const wanted = label.replace(/\s+/g, " ").trim().toLowerCase();
	const option = field.options?.find((o) => o.label.toLowerCase() === wanted);
	if (option === undefined) {
		const labels = (field.options ?? []).map((o) => o.label).join(", ");
		throw new DdbCaptureError(`Cannot map "${label}" onto the builder's ${field.fieldId ?? field.name} options (${labels || "none"}).`, "the canonical value must be one the builder's own page offers");
	}
	return option.value;
}

/**
 * Overrides the canonical monster's fields on a parsed builder form, returning the new field list.
 * Unmapped sizes or dice are errors, not silent skips: a wrong write must stay visible. Fields the
 * canonical monster does not carry (no hp, no stats) keep the page's own values.
 */
export function applyCanonicalToForm(fields: FormField[], canonical: CanonicalMonster): FormField[] {
	const out = fields.map((field) => ({ ...field }));
	const byId = new Map(out.filter((f) => f.fieldId !== undefined).map((f) => [f.fieldId!, f]));
	const set = (fieldId: string, value: string): void => {
		const field = byId.get(fieldId);
		if (field !== undefined) field.value = value;
	};
	set("field-Name", canonical.name);
	const size = byId.get("field-size");
	if (size !== undefined) size.value = selectValueFor(size, canonical.size);
	const ac = acNumber(canonical.ac);
	if (ac !== undefined) set("field-armor-class", ac);
	set("field-armor-class-type", armorTypeOf(canonical.ac) ?? "");
	if (canonical.hp !== undefined) set("field-average-hit-points", String(canonical.hp));
	const dice = parseHitDice(canonical.hitDice);
	if (dice === undefined) {
		throw new DdbCaptureError(`Cannot parse the canonical hit dice "${canonical.hitDice}".`, 'hit dice look like "6d8 + 12" or "2d6"');
	}
	set("field-hit-points-die-count", String(dice.count));
	const dieValue = byId.get("field-hit-points-die-value");
	if (dieValue !== undefined) dieValue.value = selectValueFor(dieValue, `d${dice.value}`);
	set("field-hit-points-modifier", String(dice.modifier));
	const abilities = ["field-strength", "field-dexterity", "field-constitution", "field-intelligence", "field-wisdom", "field-charisma"];
	if (canonical.stats !== undefined) {
		if (canonical.stats.length !== 6) throw new DdbCaptureError("The canonical monster does not carry exactly six stats.", "stats is Str Dex Con Int Wis Cha, e.g. [14, 18, 14, 3, 16, 7]");
		abilities.forEach((fieldId, i) => set(fieldId, String(canonical.stats![i]!)));
	}
	return out;
}

/** Serializes the field list as a complete multipart/form-data body with the given boundary. */
export function multipartBody(fields: FormField[], boundary: string): string {
	const parts = fields.map((field) => `--${boundary}\r\nContent-Disposition: form-data; name="${field.name}"\r\n\r\n${field.value}\r\n`);
	return `${parts.join("")}--${boundary}--\r\n`;
}

/** Direct HTTP with the browser-context fallback on 403/429, mirroring request()'s transport order for non-JSON pages and forms. */
async function fetchThrough(transport: Transport, url: string, init: FetchInit): Promise<FetchResult> {
	let response = await transport.fetch(url, init);
	if ((response.status === 403 || response.status === 429) && transport.browserFetch !== undefined) {
		response = await transport.browserFetch(url, { method: init.method ?? "GET", headers: init.headers ?? {}, ...(init.body === undefined ? {} : { body: init.body }) });
	}
	return response;
}

/** Page-auth headers for one site URL, with per-call overrides applied last. */
async function authedHeaders(transport: Transport, url: string, overrides: Record<string, string>): Promise<Record<string, string>> {
	return { ...(await transport.auth.headers(url)), Accept: "text/html,application/xhtml+xml", ...overrides };
}

/** What the create POST produced: the new monster's id and its location header. */
export interface CreatedMonster {
	id: number;
	location: string;
}

/**
 * Copies a base monster into a new private homebrew monster, exactly like the site's own create form:
 * fresh page tokens, `monster-type` from the base monster's monster-service typeId, and the 302
 * Location carrying the new id. Only runs when the committed create contract exists (ADR 0022).
 */
export async function createMonsterCopy(transport: Transport, baseMonsterId: number): Promise<CreatedMonster> {
	await loadContract("monster", "create");
	const base = await readMonster(transport, baseMonsterId);
	if (base === undefined) {
		throw new DdbTransportError(`Base monster ${baseMonsterId} was not found on monster-service.`, "pass the numeric id of the monster to copy, e.g. --from 16810");
	}
	const page = await fetchThrough(transport, CREATE_MONSTER_URL, { method: "GET", headers: await authedHeaders(transport, CREATE_MONSTER_URL, {}) });
	if (!page.ok) throw new DdbTransportError(`The create page answered HTTP ${page.status}.`, "the stored session may be stale; cf ddb --help has the Authentication steps", page.status);
	const html = await page.text();
	const securityToken = hiddenInputValue(html, "security-token");
	const authenticityToken = hiddenInputValue(html, "authenticity-token");
	if (securityToken === undefined || authenticityToken === undefined) {
		throw new DdbCaptureError("The create page no longer carries its security-token/authenticity-token hidden inputs.", "the create contract is stale; re-capture it (src/ddb/contracts/monster/create.json has the procedure)");
	}
	const body = new URLSearchParams({
		"security-token": securityToken,
		"authenticity-token": authenticityToken,
		"monster-type": String(base.typeId ?? 2),
		monster: String(baseMonsterId),
	}).toString();
	const response = await fetchThrough(transport, CREATE_MONSTER_URL, {
		method: "POST",
		headers: await authedHeaders(transport, CREATE_MONSTER_URL, { "Content-Type": "application/x-www-form-urlencoded" }),
		body,
		redirect: "manual",
	});
	if (response.status !== 302 && response.status !== 303) {
		throw new DdbTransportError(`The create POST answered HTTP ${response.status}, not the captured 302.`, "the contract may be stale; re-capture it (docs/adr/0022)", response.status);
	}
	const location = response.headers?.get("location") ?? "";
	const id = Number(/(?:[?&]id=)(\d+)/.exec(location)?.[1]);
	if (!Number.isInteger(id) || id <= 0) {
		throw new DdbCaptureError(`The create redirect carried no monster id (Location: ${location || "(none)"}).`, "the create contract is stale; re-capture it");
	}
	return { id, location };
}

/** The slug half of a monster's URL (`…/monsters/6833452-copy_of_blood-hawk`), which the edit URL embeds. */
export function slugOf(record: DdbMonsterRecord): string | undefined {
	return /monsters\/\d+-([a-z0-9_-]+)/i.exec(record.url ?? "")?.[1];
}

/**
 * Saves the canonical monster onto the homebrew monster's builder form: parses the live edit page's
 * every field, overrides the canonical ones, and posts the complete form as multipart, the way the
 * site's own Save does. Only runs when the committed update contract exists (ADR 0022).
 */
export async function applyMonsterCanonical(transport: Transport, id: number, canonical: CanonicalMonster): Promise<{ status: number; fields: number }> {
	await loadContract("monster", "update");
	const record = await readMonster(transport, id);
	if (record === undefined) throw new DdbTransportError(`Monster ${id} was not found on monster-service.`, "pass the D&D Beyond id of the homebrew monster");
	if (!record.isHomebrew) throw new DdbCaptureError(`Monster ${id} is not homebrew; the adapter never writes official content.`, "pass the id of the DM's own homebrew monster");
	const editUrl = monsterEditUrl(id, slugOf(record));
	const page = await fetchThrough(transport, editUrl, { method: "GET", headers: await authedHeaders(transport, editUrl, {}) });
	if (!page.ok) throw new DdbTransportError(`The edit page for monster ${id} answered HTTP ${page.status}.`, "the monster may be deleted, or the update contract is stale", page.status);
	const html = await page.text();
	const fields = parseBuilderForm(html);
	if (fields.length === 0) {
		throw new DdbCaptureError(`The edit page for monster ${id} did not render the builder form.`, "the update contract is stale; re-capture it (src/ddb/contracts/monster/update.json has the procedure)");
	}
	const posted = applyCanonicalToForm(fields, canonical);
	const boundary = `----cfddb${Math.random().toString(16).slice(2)}`;
	const response = await fetchThrough(transport, editUrl, {
		method: "POST",
		headers: await authedHeaders(transport, editUrl, { "Content-Type": `multipart/form-data; boundary=${boundary}` }),
		body: multipartBody(posted, boundary),
		redirect: "manual",
	});
	if (response.status !== 302 && response.status !== 303) {
		throw new DdbTransportError(`The save POST answered HTTP ${response.status}, not the captured 303.`, "a form field may have failed validation; re-check the canonical monster, or re-capture the contract", response.status);
	}
	return { status: response.status, fields: posted.length };
}

/** True when the creation view page still offers the delete action: the reliable exists/Deleted oracle. */
export async function creationHasDeleteAction(transport: Transport, id: number): Promise<boolean> {
	const url = creationViewUrl(id);
	const page = await fetchThrough(transport, url, { method: "GET", headers: await authedHeaders(transport, url, {}) });
	if (!page.ok) throw new DdbTransportError(`The creation page for monster ${id} answered HTTP ${page.status}.`, "check the id, or the stored session", page.status);
	return (await page.text()).includes("homebrew-creation-actions-item-delete");
}

/**
 * Deletes one homebrew monster through the site's own confirmation flow: the modal GET, then the
 * ajax POST carrying the RequestVerificationToken cookie's value. Only runs when the committed
 * delete contract exists (ADR 0022).
 */
export async function deleteMonster(transport: Transport, id: number): Promise<void> {
	await loadContract("monster", "delete");
	if (!(await creationHasDeleteAction(transport, id))) {
		throw new DdbCaptureError(`Monster ${id} has no delete action on its creation page.`, "it is already deleted, not the DM's homebrew, or not a monster id");
	}
	const url = monsterDeleteUrl(id);
	const modalHeaders = { Accept: "*/*", "X-Requested-With": "XMLHttpRequest" };
	const modal = await fetchThrough(transport, url, { method: "GET", headers: await authedHeaders(transport, url, modalHeaders) });
	if (!modal.ok) throw new DdbTransportError(`The delete modal for monster ${id} answered HTTP ${modal.status}.`, "the delete contract may be stale; re-capture it", modal.status);
	const token = transport.auth.cookieValue("RequestVerificationToken");
	if (token === undefined) {
		throw new DdbAuthError("The stored session has no RequestVerificationToken cookie.", "re-save the session from a logged-in browser tab (cf ddb --help, the Authentication section)");
	}
	const response = await fetchThrough(transport, url, {
		method: "POST",
		headers: await authedHeaders(transport, url, { ...modalHeaders, "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }),
		body: new URLSearchParams({ "request-verification-token": token }).toString(),
	});
	if (response.status !== 200) {
		throw new DdbTransportError(`The delete POST for monster ${id} answered HTTP ${response.status}.`, "the delete contract may be stale; re-capture it", response.status);
	}
}
