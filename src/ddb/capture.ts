import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DdbAuthError } from "./auth.ts";
import { DdbTransportError, request } from "./transport.ts";
import type { Transport } from "./transport.ts";

/** The placeholder that replaces every session-bearing header value in a committed capture. */
export const REDACTED = "<session>";

/** One write request observed while the DM used the homebrew editor, with its response. */
export interface CapturedRequest {
	/** POST, PUT, PATCH or DELETE. */
	method: string;
	/** The full `*.dndbeyond.com` URL as captured. */
	url: string;
	/** Header names and values; session-bearing values are `"<session>"` in committed captures. */
	headers: Record<string, string>;
	/** The request body as captured. */
	body?: string;
	/** The status the site answered at capture time. */
	status?: number;
	/** First bytes of the response, so contracts document the reply shape. */
	responsePreview?: string;
}

/** A capture file: what the browser sent while the DM performed one homebrew operation. */
export interface CaptureFile {
	kind: "cf-ddb-capture";
	version: 1;
	/** ISO timestamp of the capture session. */
	capturedAt: string;
	/** What the DM did while recording, e.g. `created one private homebrew monster`. */
	notes?: string;
	requests: CapturedRequest[];
}

/** Why a capture or contract could not be used, with the remedy the agent needs. */
export class DdbCaptureError extends Error {
	hint: string;
	constructor(message: string, hint: string) {
		super(message);
		this.hint = hint;
	}
}

/** The capture procedure, as `cf ddb --help` documents it; loader errors point here. */
export const CAPTURE_PROCEDURE =
	"Capture it first: in an omp browser session with request recording on, create and edit one private homebrew monster, " +
	"then write the *.dndbeyond.com POST/PUT/PATCH/DELETE traffic (method, url, headers, body, status, response preview) " +
	"to a cf-ddb-capture file with cookie/authorization/token/csrf header values redacted, " +
	"and commit it as src/ddb/contracts/<type>/<op>.json (see `cf ddb --help`, the Capture section)";

/** Header names whose values carry the DM's session; matched case-insensitively. */
function isSessionHeader(name: string): boolean {
	const lower = name.toLowerCase();
	return lower === "cookie" || lower === "authorization" || lower.includes("token") || lower.includes("csrf");
}

/** Form field names whose values carry the DM's session when they appear in a request body. */
const TOKEN_BODY_FIELDS = ["security-token", "authenticity-token", "request-verification-token", "verification-token"];

/** True when a captured body still holds a live token value instead of the `"<session>"` placeholder. */
export function hasUnredactedTokenBody(body: string): boolean {
	for (const field of TOKEN_BODY_FIELDS) {
		// urlencoded: `security-token=<value>` as a whole form field
		if (new RegExp(`(?:^|&)${field}=((?!${REDACTED})[^&]+)`).test(body)) return true;
		// multipart: the part whose name is the token field, value on the line after the blank line
		if (new RegExp(`name="${field}"\\s*(?:\\r?\\n)+((?!${REDACTED})[^\\r\\n]+)`).test(body)) return true;
	}
	return false;
}

/** Replaces every session-bearing header value with `"<session>"`, keeping names, so captures can be committed. */
export function redactHeaders(headers: Record<string, string>): Record<string, string> {
	const redacted: Record<string, string> = {};
	for (const [name, value] of Object.entries(headers)) {
		redacted[name] = isSessionHeader(name) ? REDACTED : value;
	}
	return redacted;
}

/** Reads a capture file, refusing anything that is not a version-1 cf-ddb-capture. */
export async function loadCapture(path: string): Promise<CaptureFile> {
	let raw: string;
	try {
		raw = await readFile(path, "utf8");
	} catch {
		throw new DdbCaptureError(`No capture file at ${path}.`, CAPTURE_PROCEDURE);
	}
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch (error) {
		throw new DdbCaptureError(`The capture file ${path} is not valid JSON: ${(error as Error).message}`, "fix the file, or re-record the capture");
	}
	const file = parsed as Partial<CaptureFile>;
	if (file.kind !== "cf-ddb-capture" || file.version !== 1) {
		throw new DdbCaptureError(`The file ${path} is not a cf-ddb-capture version 1 (kind: ${String(file.kind)}, version: ${String(file.version)}).`, CAPTURE_PROCEDURE);
	}
	if (!Array.isArray(file.requests) || file.requests.some((r) => typeof r?.method !== "string" || typeof r?.url !== "string")) {
		throw new DdbCaptureError(`The capture file ${path} holds no usable requests array.`, "each request needs a method and a url; re-record the capture");
	}
	return { kind: "cf-ddb-capture", version: 1, capturedAt: file.capturedAt ?? "", notes: file.notes, requests: file.requests };
}

/** Drops redacted header values: the transport's auth layer re-supplies Authorization and Cookie live. */
export function replayHeaders(captured: Record<string, string>): Record<string, string> {
	const headers: Record<string, string> = {};
	for (const [name, value] of Object.entries(captured)) {
		if (value !== REDACTED) headers[name] = value;
	}
	return headers;
}

/** What happened when one captured request was re-issued. */
export interface ReplayOutcome {
	request: { method: string; url: string };
	ok: boolean;
	/** The HTTP status, when the site answered. */
	status?: number;
	/** The parsed response payload on success. */
	response?: unknown;
	/** The failure and its remedy on a refused request. */
	message?: string;
	hint?: string;
}

/**
 * Re-issues every captured request through the transport, in capture order, with redacted headers
 * re-filled from the live session. Stops at the first refusal: a half-finished write sequence must
 * be visible, not continued blind. The outcomes say what ran; the caller decides the exit code.
 */
export async function replay(transport: Transport, capture: CaptureFile): Promise<ReplayOutcome[]> {
	const outcomes: ReplayOutcome[] = [];
	for (const captured of capture.requests) {
		const request_ = { method: captured.method, url: captured.url };
		try {
			const response = await request(transport, captured.url, {
				method: captured.method,
				headers: replayHeaders(captured.headers),
				...(captured.body === undefined ? {} : { body: captured.body }),
			});
			outcomes.push({ request: request_, ok: true, status: 200, response });
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			let hint: string | undefined;
			let status: number | undefined;
			if (error instanceof DdbTransportError) {
				hint = error.hint;
				status = error.status;
			} else if (error instanceof DdbAuthError) {
				hint = error.hint;
			}
			outcomes.push({
				request: request_,
				ok: false,
				message,
				...(hint === undefined ? {} : { hint }),
				...(status === undefined ? {} : { status }),
			});
			break;
		}
	}
	return outcomes;
}

/** Where committed write contracts live: versioned fixtures beside the adapter (ADR 0022). */
export const CONTRACTS_DIR = join(dirname(fileURLToPath(import.meta.url)), "contracts");

/**
 * Loads a committed write contract. A missing contract names the capture procedure, because the
 * write path cannot exist before the DM's recorded session produced it; a contract that still
 * holds session values is refused outright so nothing private is committed.
 */
export async function loadContractFrom(dir: string, type: string, op: string): Promise<CaptureFile> {
	const path = join(dir, type, `${op}.json`);
	let contract: CaptureFile;
	try {
		contract = await loadCapture(path);
	} catch {
		throw new DdbCaptureError(`The ${type}/${op} write contract is missing (${path}).`, CAPTURE_PROCEDURE);
	}
	for (const captured of contract.requests) {
		for (const [name, value] of Object.entries(captured.headers)) {
			if (isSessionHeader(name) && value !== REDACTED) {
				throw new DdbCaptureError(
					`The contract ${path} still holds the unredacted \`${name}\` header for ${captured.url}.`,
					"redact cookie/authorization/token/csrf header values to \"<session>\" before committing a contract",
				);
			}
		}
		if (captured.body !== undefined && hasUnredactedTokenBody(captured.body)) {
			throw new DdbCaptureError(
				`The contract ${path} still holds a live token value in the body for ${captured.url}.`,
				`redact ${TOKEN_BODY_FIELDS.join("/")} body values to "${REDACTED}" before committing a contract`,
			);
		}
	}
	return contract;
}

/** Loads a write contract from the adapter's own contracts dir. */
export function loadContract(type: string, op: string): Promise<CaptureFile> {
	return loadContractFrom(CONTRACTS_DIR, type, op);
}
