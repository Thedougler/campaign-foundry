/** Bad invocation or setup: unknown layer, missing path, a linter that is not installed. The CLI exits 2 with `message` and `hint`. */
export class UsageError extends Error {
	hint: string;
	constructor(message: string, hint: string) {
		super(message);
		this.hint = hint;
	}
}
