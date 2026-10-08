/** The remote-host seam: every host-plane operation is a shell command on the Foundry host, run over SSH. */

export interface CommandResult {
	code: number;
	stdout: string;
	stderr: string;
}

export type ExecFn = (file: string, args: string[], opts: { input?: string | Buffer }) => Promise<CommandResult>;

export interface RemoteHost {
	run(command: string, input?: string | Buffer): Promise<CommandResult>;
}

/** A host command failed remotely: carries the exact command and the remote stderr for the error message. */
export class HostCommandError extends Error {
	readonly command: string;
	readonly stderr: string;

	constructor(message: string, command: string, stderr: string) {
		super(message);
		this.command = command;
		this.stderr = stderr;
	}
}

const SSH_OPTS = ["-o", "BatchMode=yes", "-o", "ConnectTimeout=10"] as const;

/** Runs commands on the Foundry host over SSH (`ssh <target> <command>`); stdin pipes through to the remote command. */
export class SshHost implements RemoteHost {
	readonly target: string;
	private readonly exec: ExecFn;

	constructor(target: string, exec: ExecFn) {
		this.target = target;
		this.exec = exec;
	}

	run(command: string, input?: string | Buffer): Promise<CommandResult> {
		const opts: { input?: string | Buffer } = {};
		if (input !== undefined) opts.input = input;
		return this.exec("ssh", [...SSH_OPTS, this.target, command], opts);
	}
}

/** One scripted reply: commands whose text contains `match` get `reply` (a string means exit 0 with that stdout). */
export interface ScriptedReply {
	match: string;
	reply: CommandResult | string;
}

/** A RemoteHost with canned replies keyed by substring: the seam tests and the CLI (`CF_FOUNDRY_SCRIPTED`) run without SSH. */
export class ScriptedHost implements RemoteHost {
	readonly ran: string[] = [];
	readonly inputs: (string | Buffer)[] = [];
	readonly replies: ScriptedReply[];

	constructor(replies: ScriptedReply[]) {
		this.replies = replies;
	}

	async run(command: string, input?: string | Buffer): Promise<CommandResult> {
		this.ran.push(command);
		this.inputs.push(input ?? "");
		// The longest matching key wins, so a "" catch-all only answers commands nothing else matches.
		let best: ScriptedReply | null = null;
		for (const reply of this.replies) {
			if (command.includes(reply.match) && (best === null || reply.match.length > best.match.length)) best = reply;
		}
		if (best === null) throw new HostCommandError(`Scripted host has no reply for: ${command}`, command, "");
		if (typeof best.reply === "string") return { code: 0, stdout: best.reply, stderr: "" };
		return { ...best.reply };
	}
}
