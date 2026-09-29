declare module "@foundryvtt/foundryvtt-cli" {
	interface PackOptions {
		/** Operate on a NeDB database instead of LevelDB. */
		nedb?: boolean;
		yaml?: boolean;
		log?: boolean;
		recursive?: boolean;
		documentType?: string;
	}
	/** Packs a folder of JSON (or YAML) sources into a LevelDB compendium pack. */
	export function compilePack(src: string, dest: string, options?: PackOptions): Promise<void>;
	/** Unpacks a compendium pack into a folder of JSON (or YAML) files. */
	export function extractPack(src: string, dest: string, options?: PackOptions): Promise<void>;
}
