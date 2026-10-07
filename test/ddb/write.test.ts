import { describe, expect, it } from "vitest";
import { DdbAuth, COBALT_TOKEN_URL } from "../../src/ddb/auth.ts";
import type { Fetcher, FetchResult } from "../../src/ddb/auth.ts";
import { loadContract } from "../../src/ddb/capture.ts";
import { DdbCaptureError } from "../../src/ddb/capture.ts";
import type { Cookie } from "../../src/ddb/session.ts";
import type { Transport } from "../../src/ddb/transport.ts";
import type { CanonicalMonster } from "../../src/ddb/verify.ts";
import {
	applyCanonicalToForm,
	applyMonsterCanonical,
	armorTypeOf,
	CREATE_MONSTER_URL,
	createMonsterCopy,
	creationHasDeleteAction,
	deleteMonster,
	decodeEntities,
	hiddenInputValue,
	monsterDeleteUrl,
	monsterEditUrl,
	multipartBody,
	parseBuilderForm,
	parseHitDice,
} from "../../src/ddb/write.ts";

/**
 * The builder form exactly as the live edit page shapes it (6833452, 2026-10-07): multiline
 * attributes, name before id before value, hashed ability names, selects with selected options,
 * a select2 multi-select, entity-escaped textarea bodies, and unpostable controls.
 */
const EDIT_PAGE = `<!DOCTYPE html>
<html><body>
<form id="search"><input name="q"></form>
<form id="monster-form" class="ddb-homebrew-create-form" enctype="multipart/form-data" method="post" action="/homebrew/creations/monsters/4000001-copy_of_blood-hawk/edit">
<input id="field-security-token" name="security-token" type="hidden" value="sec-1" />
<input id="field-authenticity-token" name="authenticity-token" type="hidden" value="auth-1" />
<input type="text"
    name="Name"
    id="field-Name"
    value="COPY_OF_Blood Hawk"
     autocomplete="off" />
<input type="text" name="armor-class" id="field-armor-class" value="12" />
<input type="text" name="armor-class-type" id="field-armor-class-type" value="" />
<input type="text" name="average-hit-points" id="field-average-hit-points" value="7" />
<input type="text" name="hit-points-die-count" id="field-hit-points-die-count" value="2" />
<select id="field-hit-points-die-value" name="hit-points-die-value">
        <option value="">—</option>
<option value="4" id="field-hit-points-die-value-d4" >d4</option>
<option value="6" selected="selected" id="field-hit-points-die-value-d6" >d6</option>
<option value="8" id="field-hit-points-die-value-d8" >d8</option>
<option value="10" id="field-hit-points-die-value-d10" >d10</option>
<option value="12" id="field-hit-points-die-value-d12" >d12</option>
</select>
<input type="text" name="hit-points-modifier" id="field-hit-points-modifier" value="0" />
<select id="field-size" name="size" data-validation-required="true">
        <option value="">—</option>
<option value="7" id="field-size-gargantuan" >Gargantuan</option>
<option value="6" id="field-size-huge" >Huge</option>
<option value="5" id="field-size-large" >Large</option>
<option value="4" id="field-size-medium" >Medium</option>
<option value="3" selected="selected" id="field-size-small" >Small</option>
<option value="2" id="field-size-tiny" >Tiny</option>
</select>
<input type="text" name="fcf1f7cb65c847b4eba6b909377e56fad" id="field-strength" value="6" />
<input type="text" name="f17eaf606a61bc7efa760878739cffadb" id="field-dexterity" value="14" />
<input type="text" name="f9945c3b5e52712f1b9c7761d1f096df9" id="field-charisma" value="5" />
<select id="field-monster-saving-throw" name="monster-saving-throw" multiple="multiple">
<option value="1" selected="selected" id="field-monster-saving-throw-str" >Str</option>
<option value="2" id="field-monster-saving-throw-dex" >Dex</option>
<option value="3" selected="selected" id="field-monster-saving-throw-con" >Con</option>
</select>
<select id="field-damage-adjustment" name="damage-adjustment" multiple="multiple">
<option value="5" id="field-damage-adjustment-fire" >Fire</option>
</select>
<textarea name="special-traits-description-wysiwyg" id="field-special-traits-description-wysiwyg">&lt;p&gt;Keen Sight.&lt;/p&gt;</textarea>
<input type="checkbox" name="legendary-actions" id="field-legendary-actions" value="1" />
<input type="checkbox" name="hide-from-public" id="field-hide-from-public" value="1" checked="checked" />
<input type="file" name="avatar" id="field-avatar" accept="image/jpeg" />
<button id="save-changes" class="button" type="submit">Save</button>
</form>
</body></html>`;

const canonical: CanonicalMonster = {
	name: "cf-test Young Bloodhawk",
	size: "Medium",
	ac: "14 (natural armor)",
	hp: 39,
	hitDice: "6d8 + 12",
	stats: [14, 18, 14, 3, 16, 7],
};

describe("hiddenInputValue", () => {
	it("reads a hidden input's value whatever the attribute order", () => {
		expect(hiddenInputValue(EDIT_PAGE, "security-token")).toBe("sec-1");
		expect(hiddenInputValue('<input value="v" name="authenticity-token" type="hidden">', "authenticity-token")).toBe("v");
	});

	it("returns undefined for a name the page does not carry", () => {
		expect(hiddenInputValue(EDIT_PAGE, "no-such-token")).toBeUndefined();
	});
});

describe("decodeEntities", () => {
	it("decodes the entities DDB pages use, ampersands last", () => {
		expect(decodeEntities("&lt;p&gt;A &amp; B&quot;&#39;&#65;&#x42;&nbsp;&gt;")).toBe("<p>A & B\"'AB\u00a0>");
	});
});

describe("parseBuilderForm", () => {
	it("parses every postable control in page order and skips files, unchecked boxes and buttons", () => {
		const fields = parseBuilderForm(EDIT_PAGE);
		const names = fields.map((f) => f.name);
		expect(names).toEqual([
			"security-token",
			"authenticity-token",
			"Name",
			"armor-class",
			"armor-class-type",
			"average-hit-points",
			"hit-points-die-count",
			"hit-points-die-value",
			"hit-points-modifier",
			"size",
			"fcf1f7cb65c847b4eba6b909377e56fad",
			"f17eaf606a61bc7efa760878739cffadb",
			"f9945c3b5e52712f1b9c7761d1f096df9",
			"monster-saving-throw",
			"monster-saving-throw",
			"special-traits-description-wysiwyg",
			"hide-from-public",
		]);
		expect(fields.find((f) => f.name === "Name")).toMatchObject({ fieldId: "field-Name", value: "COPY_OF_Blood Hawk" });
		expect(fields.find((f) => f.name === "hit-points-die-value")?.value).toBe("6");
		expect(fields.find((f) => f.name === "size")?.value).toBe("3");
		expect(fields.find((f) => f.name === "monster-saving-throw")?.options).toBeUndefined();
		expect(fields.find((f) => f.name === "special-traits-description-wysiwyg")?.value).toBe("<p>Keen Sight.</p>");
		expect(fields.find((f) => f.name === "hide-from-public")?.value).toBe("1");
		expect(fields.filter((f) => f.name === "avatar")).toEqual([]);
		expect(fields.find((f) => f.name === "size")?.options?.map((o) => o.label)).toContain("Gargantuan");
	});

	it("returns nothing when the page has no builder form", () => {
		expect(parseBuilderForm("<html><body>no form here</body></html>")).toEqual([]);
	});
});

describe("parseHitDice and armorTypeOf", () => {
	it("splits the wiki's written dice into the builder's three fields", () => {
		expect(parseHitDice("6d8 + 12")).toEqual({ count: 6, value: 8, modifier: 12 });
		expect(parseHitDice("2d6")).toEqual({ count: 2, value: 6, modifier: 0 });
		expect(parseHitDice("2d6 + 0")).toEqual({ count: 2, value: 6, modifier: 0 });
		expect(parseHitDice("1d10-3")).toEqual({ count: 1, value: 10, modifier: -3 });
		expect(parseHitDice("bad")).toBeUndefined();
	});

	it("title-cases the armor type parenthetical", () => {
		expect(armorTypeOf("14 (natural armor)")).toBe("Natural Armor");
		expect(armorTypeOf("13 (hide armor)")).toBe("Hide Armor");
		expect(armorTypeOf("12")).toBeUndefined();
	});
});

describe("applyCanonicalToForm", () => {
	it("overrides the canonical fields by field id, hashed names included, and keeps the rest", () => {
		const fields = applyCanonicalToForm(parseBuilderForm(EDIT_PAGE), canonical);
		expect(fields.find((f) => f.fieldId === "field-Name")?.value).toBe("cf-test Young Bloodhawk");
		expect(fields.find((f) => f.fieldId === "field-size")?.value).toBe("4");
		expect(fields.find((f) => f.fieldId === "field-armor-class")?.value).toBe("14");
		expect(fields.find((f) => f.fieldId === "field-armor-class-type")?.value).toBe("Natural Armor");
		expect(fields.find((f) => f.fieldId === "field-average-hit-points")?.value).toBe("39");
		expect(fields.find((f) => f.fieldId === "field-hit-points-die-count")?.value).toBe("6");
		expect(fields.find((f) => f.fieldId === "field-hit-points-die-value")?.value).toBe("8");
		expect(fields.find((f) => f.fieldId === "field-hit-points-modifier")?.value).toBe("12");
		expect(fields.find((f) => f.fieldId === "field-strength")?.value).toBe("14");
		expect(fields.find((f) => f.fieldId === "field-charisma")?.value).toBe("7");
		expect(fields.find((f) => f.name === "security-token")?.value).toBe("sec-1");
		expect(fields.filter((f) => f.name === "monster-saving-throw").map((f) => f.value)).toEqual(["1", "3"]);
	});

	it("maps zero-modifier dice like the site records them", () => {
		const fields = applyCanonicalToForm(parseBuilderForm(EDIT_PAGE), { ...canonical, hitDice: "2d6 + 0", hp: 7 });
		expect(fields.find((f) => f.fieldId === "field-hit-points-die-count")?.value).toBe("2");
		expect(fields.find((f) => f.fieldId === "field-hit-points-die-value")?.value).toBe("6");
		expect(fields.find((f) => f.fieldId === "field-hit-points-modifier")?.value).toBe("0");
	});

	it("leaves fields the canonical monster does not carry alone", () => {
		const fields = applyCanonicalToForm(parseBuilderForm(EDIT_PAGE), { ...canonical, hp: undefined, stats: undefined });
		expect(fields.find((f) => f.fieldId === "field-average-hit-points")?.value).toBe("7");
		expect(fields.find((f) => f.fieldId === "field-strength")?.value).toBe("6");
	});

	it("refuses a size the builder does not offer, naming the options", () => {
		expect(() => applyCanonicalToForm(parseBuilderForm(EDIT_PAGE), { ...canonical, size: "Colossal" })).toThrow(DdbCaptureError);
	});

	it("refuses unparseable hit dice and short stats arrays", () => {
		expect(() => applyCanonicalToForm(parseBuilderForm(EDIT_PAGE), { ...canonical, hitDice: "lots" })).toThrow(DdbCaptureError);
		expect(() => applyCanonicalToForm(parseBuilderForm(EDIT_PAGE), { ...canonical, stats: [1, 2, 3] })).toThrow(DdbCaptureError);
	});
});

describe("multipartBody", () => {
	it("serializes the complete form the way the site's own Save does", () => {
		const body = multipartBody(
			[
				{ name: "security-token", value: "sec-1" },
				{ name: "Name", value: "cf-test Hawk" },
				{ name: "traits", value: "<p>A & B</p>\r\nline" },
			],
			"cfddb1",
		);
		expect(body).toBe(
			"--cfddb1\r\nContent-Disposition: form-data; name=\"security-token\"\r\n\r\nsec-1\r\n" +
				"--cfddb1\r\nContent-Disposition: form-data; name=\"Name\"\r\n\r\ncf-test Hawk\r\n" +
				"--cfddb1\r\nContent-Disposition: form-data; name=\"traits\"\r\n\r\n<p>A & B</p>\r\nline\r\n" +
				"--cfddb1--\r\n",
		);
	});
});

/** The fake transport pattern from capture.test.ts, with the page/form routes the write layer needs. */
const cookies: Cookie[] = [
	{ name: "CobaltSession", value: "cobalt-1", domain: ".dndbeyond.com" },
	{ name: "RequestVerificationToken", value: "rvt-1", domain: ".dndbeyond.com" },
];

interface Recorded {
	url: string;
	init?: { method?: string; headers?: Record<string, string>; body?: string; redirect?: string };
}

function transportOver(
	routes: (url: string, init?: { method?: string; body?: string }) => FetchResult | undefined,
	sessionCookies: Cookie[] = cookies,
): { transport: Transport; calls: Recorded[] } {
	const calls: Recorded[] = [];
	const fetcher: Fetcher = async (url, init) => {
		calls.push({ url, init });
		return routes(url, init) ?? { status: 404, ok: false, text: async () => "{}" };
	};
	const auth = new DdbAuth({ cookies: sessionCookies, savedAt: "" }, (url) =>
		url === COBALT_TOKEN_URL
			? Promise.resolve({ status: 200, ok: true, text: async () => JSON.stringify({ token: "bearer-1", ttl: 300 }) })
			: Promise.resolve({ status: 404, ok: false, text: async () => "{}" }),
	);
	return { transport: { fetch: fetcher, auth }, calls };
}

const CREATE_PAGE = `<input id="field-security-token" name="security-token" type="hidden" value="sec-9" />
<input id="field-authenticity-token" name="authenticity-token" type="hidden" value="auth-9" />`;

const baseRecord = {
	id: 16810,
	name: "Blood Hawk",
	sizeId: 3,
	armorClass: 12,
	isHomebrew: false,
	homebrewStatus: 0,
	typeId: 2,
	url: "https://www.dndbeyond.com/monsters/16810-blood-hawk",
};

const homebrewRecord = {
	id: 4000001,
	name: "COPY_OF_Blood Hawk",
	sizeId: 3,
	armorClass: 12,
	isHomebrew: true,
	homebrewStatus: 0,
	typeId: 2,
	url: "https://www.dndbeyond.com/monsters/4000001-copy_of_blood-hawk",
};

describe("createMonsterCopy", () => {
	it("fetches fresh page tokens and posts the captured urlencoded create body", async () => {
		const { transport, calls } = transportOver((url, init) => {
			if (url === "https://monster-service.dndbeyond.com/v1/Monster/16810") return { status: 200, ok: true, text: async () => JSON.stringify({ data: baseRecord }) };
			if (url === CREATE_MONSTER_URL && (init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => CREATE_PAGE };
			if (url === CREATE_MONSTER_URL) {
				return { status: 302, ok: false, text: async () => "", headers: { get: (name: string) => (name.toLowerCase() === "location" ? "/homebrew/creations/edit?entityTypeId=779871897&id=4000002" : null) } };
			}
			return undefined;
		});
		const created = await createMonsterCopy(transport, 16810);
		expect(created).toEqual({ id: 4000002, location: "/homebrew/creations/edit?entityTypeId=779871897&id=4000002" });
		const post = calls.find((c) => c.init?.method === "POST");
		expect(post?.init?.headers?.["Content-Type"]).toBe("application/x-www-form-urlencoded");
		expect(post?.init?.redirect).toBe("manual");
		expect(post?.init?.body).toBe("security-token=sec-9&authenticity-token=auth-9&monster-type=2&monster=16810");
		expect(post?.init?.headers?.Cookie).toContain("CobaltSession=cobalt-1");
	});

	it("refuses to create from a base monster monster-service does not know", async () => {
		const { transport } = transportOver((url) =>
			url === "https://monster-service.dndbeyond.com/v1/Monster/999" ? { status: 200, ok: true, text: async () => JSON.stringify({ data: null }) } : undefined,
		);
		const error = await createMonsterCopy(transport, 999).catch((e: unknown) => e);
		expect(error).toBeInstanceOf(Error);
		expect((error as Error).message).toMatch(/999/);
	});

	it("names the stale contract when the page stops carrying tokens", async () => {
		const { transport } = transportOver((url, init) => {
			if (url.includes("monster-service")) return { status: 200, ok: true, text: async () => JSON.stringify({ data: baseRecord }) };
			if ((init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => "<html>no tokens</html>" };
			return undefined;
		});
		const error = await createMonsterCopy(transport, 16810).catch((e: unknown) => e);
		expect(error).toBeInstanceOf(DdbCaptureError);
		expect((error as DdbCaptureError).hint).toMatch(/re-capture/);
	});

	it("fails loudly when the create POST no longer redirects", async () => {
		const { transport } = transportOver((url, init) => {
			if (url.includes("monster-service")) return { status: 200, ok: true, text: async () => JSON.stringify({ data: baseRecord }) };
			if ((init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => CREATE_PAGE };
			return { status: 200, ok: true, text: async () => "form re-render" };
		});
		const error = await createMonsterCopy(transport, 16810).catch((e: unknown) => e);
		expect((error as Error).message).toMatch(/HTTP 200/);
	});
});

describe("applyMonsterCanonical", () => {
	it("posts the complete parsed form with canonical overrides to the current-slug edit URL", async () => {
		const { transport, calls } = transportOver((url, init) => {
			if (url === "https://monster-service.dndbeyond.com/v1/Monster/4000001") return { status: 200, ok: true, text: async () => JSON.stringify({ data: homebrewRecord }) };
			if (url.endsWith("/edit") && (init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => EDIT_PAGE };
			if (url.endsWith("/edit")) return { status: 303, ok: false, text: async () => "" };
			return undefined;
		});
		const result = await applyMonsterCanonical(transport, 4000001, canonical);
		expect(result.status).toBe(303);
		const editUrl = monsterEditUrl(4000001, "copy_of_blood-hawk");
		const get = calls.find((c) => c.url === editUrl && (c.init?.method ?? "GET") === "GET");
		const post = calls.find((c) => c.url === editUrl && c.init?.method === "POST");
		expect(get).toBeDefined();
		expect(post?.init?.headers?.["Content-Type"]).toMatch(/^multipart\/form-data; boundary=----cfddb/);
		expect(post?.init?.redirect).toBe("manual");
		const body = post?.init?.body ?? "";
		expect(body).toContain('name="security-token"\r\n\r\nsec-1');
		expect(body).toContain('name="Name"\r\n\r\ncf-test Young Bloodhawk');
		expect(body).toContain('name="size"\r\n\r\n4');
		expect(body).toContain('name="armor-class"\r\n\r\n14');
		expect(body).toContain('name="armor-class-type"\r\n\r\nNatural Armor');
		expect(body).toContain('name="hit-points-die-value"\r\n\r\n8');
		expect(body).toContain('name="hit-points-modifier"\r\n\r\n12');
		expect(body).toContain('name="fcf1f7cb65c847b4eba6b909377e56fad"\r\n\r\n14');
		expect(body).toContain('name="monster-saving-throw"\r\n\r\n1');
		expect(body).toContain('name="special-traits-description-wysiwyg"\r\n\r\n<p>Keen Sight.</p>');
		expect(body).not.toContain('name="avatar"');
		expect(body).not.toContain('name="legendary-actions"');
	});

	it("refuses to write an official monster", async () => {
		const { transport } = transportOver((url) => (url.includes("monster-service") ? { status: 200, ok: true, text: async () => JSON.stringify({ data: baseRecord }) } : undefined));
		const error = await applyMonsterCanonical(transport, 16810, canonical).catch((e: unknown) => e);
		expect(error).toBeInstanceOf(DdbCaptureError);
		expect((error as DdbCaptureError).message).toMatch(/not homebrew/);
	});
});

describe("deleteMonster and creationHasDeleteAction", () => {
	const VIEW_WITH_ACTIONS = `<a class="modal-link homebrew-creation-actions-item homebrew-creation-actions-item-delete" data-title="Delete Content" href="/homebrew/creations/delete?entityTypeId=779871897&id=4000001">Delete</a>`;

	it("checks the creation page, opens the modal and posts the verification cookie as the token", async () => {
		const { transport, calls } = transportOver((url, init) => {
			if (url.includes("/homebrew/creations/view")) return { status: 200, ok: true, text: async () => VIEW_WITH_ACTIONS };
			if (url.includes("/homebrew/creations/delete") && (init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => `<div class="ddb-modal">Are you sure?</div>` };
			if (url.includes("/homebrew/creations/delete")) return { status: 200, ok: true, text: async () => "" };
			return undefined;
		});
		await deleteMonster(transport, 4000001);
		const post = calls.find((c) => c.url === monsterDeleteUrl(4000001) && c.init?.method === "POST");
		expect(post?.init?.body).toBe("request-verification-token=rvt-1");
		expect(post?.init?.headers?.["X-Requested-With"]).toBe("XMLHttpRequest");
	});

	it("refuses an id whose creation page offers no delete action", async () => {
		const { transport } = transportOver((url) => (url.includes("/homebrew/creations/view") ? { status: 200, ok: true, text: async () => "<html>shell page</html>" } : undefined));
		const error = await deleteMonster(transport, 4000001).catch((e: unknown) => e);
		expect(error).toBeInstanceOf(DdbCaptureError);
		expect((error as DdbCaptureError).message).toMatch(/no delete action/);
	});

	it("answers false after deletion: the creation page no longer offers the action", async () => {
		const { transport } = transportOver((url) => (url.includes("/homebrew/creations/view") ? { status: 200, ok: true, text: async () => "<html>shell page</html>" } : undefined));
		expect(await creationHasDeleteAction(transport, 4000001)).toBe(false);
	});

	it("names the missing verification cookie with the re-save remedy", async () => {
		const noVerificationCookie = cookies.filter((c) => c.name !== "RequestVerificationToken");
		const { transport } = transportOver((url, init) => {
			if (url.includes("/homebrew/creations/view")) return { status: 200, ok: true, text: async () => VIEW_WITH_ACTIONS };
			if (url.includes("/homebrew/creations/delete") && (init?.method ?? "GET") === "GET") return { status: 200, ok: true, text: async () => `<div class="ddb-modal">Are you sure?</div>` };
			return undefined;
		}, noVerificationCookie);
		const error = await deleteMonster(transport, 4000001).catch((e: unknown) => e);
		expect((error as Error).message).toMatch(/RequestVerificationToken/);
	});
});

describe("committed contracts stay in lockstep with the adapter", () => {
	it("create.json matches the create URL and body field names", async () => {
		const contract = await loadContract("monster", "create");
		expect(contract.requests[0]?.url).toBe(CREATE_MONSTER_URL);
		const body = contract.requests[0]?.body ?? "";
		for (const field of ["security-token=<session>", "authenticity-token=<session>", "monster-type=", "monster="]) expect(body).toContain(field);
	});

	it("update.json matches the edit URL shape of the captured monster", async () => {
		const contract = await loadContract("monster", "update");
		expect(contract.requests[0]?.url).toBe(monsterEditUrl(6833448, "copy_of_blood-hawk"));
		expect(contract.requests[0]?.body).toContain("security-token");
	});

	it("delete.json matches the delete URL of the captured monster and the token body", async () => {
		const contract = await loadContract("monster", "delete");
		expect(contract.requests.map((r) => r.url)).toEqual([monsterDeleteUrl(6833448), monsterDeleteUrl(6833448)]);
		expect(contract.requests[1]?.body).toBe("request-verification-token=<session>");
	});
});
