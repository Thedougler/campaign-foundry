"""Laugh Highlights: rank a Session recording's laughs and align each with its Transcript lines.

The detector proposes and agents decide: each highlight is a candidate moment, with the
Transcript lines from the setup through the end of the laughter, for an agent to read and judge
as play or table talk. Run it as ``bun run cf -- transcript highlights``.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections.abc import Callable, Sequence
from dataclasses import dataclass
from pathlib import Path

import numpy as np

from .laughter import (
    AudioError,
    Burst,
    PannsModel,
    Part,
    ScanConfig,
    SoundEventModel,
    cut_clip,
    decode_audio,
    scan,
)
from .transcript import Segment, Transcript, TranscriptError, read_transcript

PROG = "bun run cf -- transcript highlights"


class UsageError(Exception):
    def __init__(self, message: str, hint: str) -> None:
        super().__init__(message)
        self.hint = hint


def clock(seconds: float) -> str:
    """Seconds to ``H:MM:SS``, or ``M:SS`` under an hour."""
    whole = max(0, round(seconds))
    hours, rest = divmod(whole, 3600)
    minutes, secs = divmod(rest, 60)
    return f"{hours}:{minutes:02d}:{secs:02d}" if hours else f"{minutes}:{secs:02d}"


@dataclass
class Span:
    """Consecutive Transcript segments from one file."""

    transcript: Path
    segments: list[Segment]

    @property
    def lines(self) -> tuple[int, int]:
        return self.segments[0].line, self.segments[-1].end_line


@dataclass
class Highlight:
    rank: int
    burst: Burst
    laugh_line: tuple[Path, int] | None
    context: list[Span]
    clip: Path | None = None


def _window(transcript: Transcript, start: float, end: float) -> list[Segment]:
    return [s for s in transcript.segments if s.end >= start and s.start <= end]


def _laugh_line(transcript: Transcript, at: float) -> int | None:
    before = [s for s in transcript.segments if s.start <= at]
    return before[-1].line if before else None


def align(
    burst: Burst, parts: Sequence[Part], transcripts: Sequence[Transcript], seconds: float
) -> tuple[tuple[Path, int] | None, list[Span]]:
    """The Transcript line the laugh starts on and the segments from ``seconds`` before the
    laugh through its laugh end.

    One Transcript is read on the session timeline. One Transcript per part is read on that
    part's own timeline, and a window that starts before its part reaches back into the tail of
    the part before.
    """
    if len(transcripts) == 1:
        only = transcripts[0]
        segments = _window(only, burst.start - seconds, burst.laugh_end)
        line = _laugh_line(only, burst.start)
        return ((only.path, line) if line else None), (
            [Span(only.path, segments)] if segments else []
        )
    index = next(i for i, p in enumerate(parts) if p.path == burst.part)
    own = transcripts[index]
    spans: list[Span] = []
    start = burst.part_start - seconds
    if start < 0 and index > 0:
        before = _window(transcripts[index - 1], parts[index - 1].duration + start, float("inf"))
        if before:
            spans.append(Span(transcripts[index - 1].path, before))
    segments = _window(own, max(0.0, start), burst.part_laugh_end)
    if segments:
        spans.append(Span(own.path, segments))
    line = _laugh_line(own, burst.part_start)
    return ((own.path, line) if line else None), spans


def _natural(path: Path) -> list[object]:
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", path.name)]


def highlights(
    audio: Sequence[Path],
    transcript_paths: Sequence[Path],
    cfg: ScanConfig,
    model: SoundEventModel,
    top: int,
    context_seconds: float,
    clip_dir: Path | None = None,
    clip_pad: float = 4.0,
    decode: Callable[[Path], np.ndarray] = decode_audio,
    log: Callable[[str], None] = lambda _: None,
) -> tuple[list[Part], list[Transcript], int, list[Highlight]]:
    """Scan the parts (in natural name order), rank the bursts and align the top ``top``."""
    paths = sorted(audio, key=_natural)
    missing = [str(p) for p in paths if not p.is_file()]
    if missing:
        raise UsageError(
            f"No such audio file: {', '.join(missing)}.", "Pass the Session's recording."
        )
    ordered = sorted(transcript_paths, key=_natural)
    if len(ordered) not in (0, 1, len(paths)):
        raise UsageError(
            f"{len(ordered)} transcripts for {len(paths)} audio parts.",
            "Pass one --transcript for the whole recording, or one per part.",
        )
    try:
        transcripts = [read_transcript(p) for p in ordered]
    except TranscriptError as error:
        raise UsageError(
            str(error), "TranscribeX exports timestamps in both markdown and CSV."
        ) from error
    parts, bursts = scan(paths, cfg, model, decode=decode, log=log)
    chosen: list[Highlight] = []
    for rank, burst in enumerate(bursts[:top], start=1):
        laugh_line, context = (
            align(burst, parts, transcripts, context_seconds) if transcripts else (None, [])
        )
        chosen.append(Highlight(rank, burst, laugh_line, context))
    if clip_dir is not None:
        clip_dir.mkdir(parents=True, exist_ok=True)
        for h in chosen:
            name = f"{h.rank:02d}_{clock(h.burst.start).replace(':', '-')}_{h.burst.part.stem}.m4a"
            cut_clip(h.burst, clip_dir / name, clip_pad)
            h.clip = clip_dir / name
            log(f"Wrote {h.clip}")
    return parts, transcripts, len(bursts), chosen


def to_json(
    parts: Sequence[Part],
    transcripts: Sequence[Transcript],
    total: int,
    chosen: Sequence[Highlight],
    cfg: ScanConfig,
    context_seconds: float,
) -> dict[str, object]:
    def seconds(value: float) -> float:
        return round(value, 2)

    return {
        "audio": [
            {
                "path": str(p.path),
                "offset_seconds": seconds(p.offset),
                "duration_seconds": seconds(p.duration),
            }
            for p in parts
        ],
        "transcripts": [
            {
                "path": str(t.path),
                "format": t.format,
                "timeline": "session" if len(transcripts) == 1 else "part",
                "segments": len(t.segments),
            }
            for t in transcripts
        ],
        "settings": {**vars(cfg), "context_seconds": context_seconds},
        "bursts": total,
        "highlights": [
            {
                "rank": h.rank,
                "start": clock(h.burst.start),
                "start_seconds": seconds(h.burst.start),
                "duration": seconds(h.burst.duration),
                "peak": round(h.burst.peak, 3),
                "intensity": round(h.burst.intensity, 3),
                "laugh_end": clock(h.burst.laugh_end),
                "laugh_end_seconds": seconds(h.burst.laugh_end),
                "part": str(h.burst.part),
                "part_start": clock(h.burst.part_start),
                "part_start_seconds": seconds(h.burst.part_start),
                "part_laugh_end": clock(h.burst.part_laugh_end),
                "part_laugh_end_seconds": seconds(h.burst.part_laugh_end),
                "laugh_line": (
                    {"transcript": str(h.laugh_line[0]), "line": h.laugh_line[1]}
                    if h.laugh_line
                    else None
                ),
                "context": [
                    {
                        "transcript": str(span.transcript),
                        "lines": list(span.lines),
                        "segments": [
                            {
                                "line": s.line,
                                "start": clock(s.start),
                                "speaker": s.speaker,
                                "text": s.text,
                            }
                            for s in span.segments
                        ],
                    }
                    for span in h.context
                ],
                "clip": str(h.clip) if h.clip else None,
            }
            for h in chosen
        ],
    }


def to_rows(
    parts: Sequence[Part],
    transcripts: Sequence[Transcript],
    total: int,
    chosen: Sequence[Highlight],
) -> str:
    rows = [f"audio\t{p.path}\t{clock(p.offset)}\t{clock(p.duration)}" for p in parts]
    timeline = "session" if len(transcripts) == 1 else "part"
    rows += [
        f"transcript\t{t.path}\t{t.format}\t{timeline}\t{len(t.segments)}" for t in transcripts
    ]
    rows.append(f"bursts\t{total}")
    for h in chosen:
        b = h.burst
        lines = (
            ",".join(
                f"{span.transcript.name}:L{span.lines[0]}-{span.lines[1]}" for span in h.context
            )
            or "-"
        )
        laugh = f"L{h.laugh_line[1]}" if h.laugh_line else "-"
        rows.append(
            f"highlight\t{h.rank:02d}\t{clock(b.start)}\t{b.duration:.1f}\t{b.peak:.2f}\t{b.intensity:.2f}"
            f"\t{clock(b.laugh_end)}\t{lines}\t{laugh}"
        )
        if h.clip:
            rows.append(f"clip\t{h.rank:02d}\t{h.clip}")
    return "\n".join(rows)


EPILOG = """\
The first run installs the model stack and downloads the PANNs checkpoint (about 330 MB) to
~/panns_data/ with wget; ffmpeg decodes the audio. Scanning runs about 60 times faster than
real time on a CPU.

Parts lay end to end in natural name order (part2 before part10). One --transcript is read on the
session timeline; one per part is read on each part's own timeline. A Transcript is a timestamped
TranscribeX export, markdown or CSV, told apart by its own lines.

Output (tab-separated):
  audio       <path>  <session offset>  <duration>
  transcript  <path>  <markdown|csv>  <session|part>  <segments>
  bursts      <every burst found>
  highlight   <rank>  <session time>  <seconds>  <peak>  <intensity>  <laugh end>
              <file>:L<a>-<b> (context lines)  L<laugh line>
  clip        <rank>  <path>                     with --clip-dir
--json prints {audio, transcripts, settings, bursts, highlights[]}; each highlight carries its
times, the laugh's Transcript line and the context segments with their lines.

Exit codes:
  0  ranked    1  ffmpeg or the model failed    2  usage error (missing file, untimed transcript)

Examples:
  bun run cf -- transcript highlights rec.m4a --transcript raw/session-12.md
  bun run cf -- transcript highlights s12-part*.m4a --transcript raw/s12.csv --json > h.json
  bun run cf -- transcript highlights rec.m4a --top 7 --clip-dir /tmp/s12-clips"""


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog=PROG,
        description="Rank a Session recording's laughs and align them with its Transcript.",
        epilog=EPILOG,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    p.add_argument("audio", nargs="+", type=Path, help="the recording, or its parts")
    p.add_argument(
        "--transcript",
        action="append",
        type=Path,
        default=[],
        metavar="PATH",
        help="timestamped TranscribeX export (markdown or CSV): once, or once per part",
    )
    p.add_argument("--top", type=int, default=20, help="highlights to align and print (default 20)")
    p.add_argument("--json", action="store_true", help="print JSON instead of tab-separated rows")
    p.add_argument(
        "--context-seconds", type=float, default=60.0, help="Transcript before each laugh (60)"
    )
    p.add_argument("--clip-dir", type=Path, help="cut each highlight to an .m4a clip here")
    p.add_argument(
        "--clip-pad", type=float, default=4.0, help="seconds before and after each clip (4)"
    )
    p.add_argument(
        "--threshold", type=float, default=0.10, help="laughter probability to count (0.10)"
    )
    p.add_argument(
        "--min-len", type=float, default=0.5, help="drop bursts shorter than this, s (0.5)"
    )
    p.add_argument(
        "--merge-gap", type=float, default=1.5, help="join bursts closer than this, s (1.5)"
    )
    p.add_argument("--smooth", type=float, default=0.5, help="smoothing window, s (0.5)")
    p.add_argument("--chunk", type=float, default=240.0, help="model input length, s (240)")
    p.add_argument("--device", default="cpu", choices=["cpu", "cuda"], help="model device (cpu)")
    return p


def main(
    argv: Sequence[str] | None = None,
    model: SoundEventModel | None = None,
    decode: Callable[[Path], np.ndarray] = decode_audio,
) -> int:
    args = build_parser().parse_args(argv)
    cfg = ScanConfig(
        threshold=args.threshold,
        min_len=args.min_len,
        merge_gap=args.merge_gap,
        smooth_seconds=args.smooth,
        chunk_seconds=args.chunk,
    )

    def log(message: str) -> None:
        print(message, file=sys.stderr)

    try:
        parts, transcripts, total, chosen = highlights(
            args.audio,
            args.transcript,
            cfg,
            model if model is not None else _LazyPanns(args.device, log),
            top=args.top,
            context_seconds=args.context_seconds,
            clip_dir=args.clip_dir,
            clip_pad=args.clip_pad,
            decode=decode,
            log=log,
        )
    except UsageError as error:
        print(f"Error: {error}\n  {error.hint}", file=sys.stderr)
        return 2
    except AudioError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1
    if args.json:
        print(
            json.dumps(
                to_json(parts, transcripts, total, chosen, cfg, args.context_seconds), indent=2
            )
        )
    else:
        print(to_rows(parts, transcripts, total, chosen))
    return 0


class _LazyPanns:
    """Loads PANNs on first use, so usage errors surface before the model download."""

    def __init__(self, device: str, log: Callable[[str], None]) -> None:
        self._device = device
        self._log = log
        self._model: PannsModel | None = None

    def _load(self) -> PannsModel:
        if self._model is None:
            self._log("Loading PANNs Cnn14_DecisionLevelMax")
            self._model = PannsModel(self._device)
        return self._model

    @property
    def labels(self) -> Sequence[str]:
        return self._load().labels

    def framewise(self, audio: np.ndarray) -> np.ndarray:
        return self._load().framewise(audio)


if __name__ == "__main__":
    raise SystemExit(main())
