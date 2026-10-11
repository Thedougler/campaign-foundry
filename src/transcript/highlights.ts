import { readBlocks, splitLines } from "./read.ts";

/** One timestamped speaker block as the Python laugh detector consumes it: where it sits in the file and when it was spoken. */
export interface TranscriptSegment {
	/** 1-based file line the segment's label sits on. */
	line: number;
	/** 1-based file line the segment ends on. */
	endLine: number;
	/** Seconds into the recording the segment starts and ends. */
	start: number;
	end: number;
	speaker: string;
	text: string;
}

/** A parsed Transcript handed to `python -m campaign_foundry.highlights`: the export's path as given, and only its timestamped blocks. */
export interface HighlightsPayload {
	path: string;
	format: "markdown" | "csv";
	segments: TranscriptSegment[];
}

/** Reads one TranscribeX export into the detector's payload. Blocks without a timestamp are skipped: the detector aligns by seconds. */
export function highlightsPayload(path: string, text: string): HighlightsPayload {
	const { format, blocks } = readBlocks(splitLines(text));
	const segments = blocks.flatMap((block) =>
		block.from === undefined || block.to === undefined
			? []
			: [
					{
						line: block.start,
						endLine: block.end,
						start: block.from,
						end: block.to,
						speaker: block.label,
						text: block.text,
					},
				],
	);
	return { path, format, segments };
}
