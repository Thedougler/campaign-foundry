"""Read a timestamped TranscribeX Transcript, telling its export format apart by looking.

TranscribeX exports a Transcript in two shapes, and either can carry timestamps:

- Markdown: a ``###`` title, then blocks that each start with a ``**Label**`` line. With
  timestamps on, the line after the label holds the block's span, ``MM:SS - MM:SS`` under an
  hour and ``HH:MM:SS - HH:MM:SS`` past it.
- CSV: the header ``ID,Start,End,Speaker,Text``, then one row per block.

Each segment keeps the file line it starts on, so alignment output cites the same line numbers
the Session Ledger cites.
"""

from __future__ import annotations

import csv
import io
import re
from dataclasses import dataclass
from pathlib import Path

_HEADING = re.compile(r"^\*\*([^*\n]+)\*\*\s*$")
_TIME = r"\d{1,2}(?::\d{2}){1,2}(?:[.,]\d+)?"
_SPAN = re.compile(rf"^\s*({_TIME})\s*-\s*({_TIME})\s*$")
_CSV_COLUMNS = ("Start", "End", "Speaker", "Text")


class TranscriptError(ValueError):
    """The file is not a timestamped TranscribeX Transcript."""


@dataclass(frozen=True)
class Segment:
    """One speaker block: where it starts in the file and when it was spoken (seconds)."""

    line: int
    end_line: int
    start: float
    end: float
    speaker: str
    text: str


@dataclass(frozen=True)
class Transcript:
    path: Path
    format: str  # "markdown" or "csv"
    segments: list[Segment]


def parse_time(value: str) -> float:
    """``H:MM:SS``, ``MM:SS`` or plain seconds (a ``,`` or ``.`` fraction allowed) to seconds."""
    parts = [float(p.replace(",", ".")) for p in value.strip().split(":")]
    seconds = 0.0
    for part in parts:
        seconds = seconds * 60 + part
    return seconds


def read_transcript(path: Path) -> Transcript:
    """Read a markdown or CSV TranscribeX export, whichever the file's own lines show it to be."""
    try:
        text = path.read_text(encoding="utf-8-sig")
    except OSError as error:
        raise TranscriptError(f"Cannot read {path}: {error.strerror}.") from error
    first = next((line for line in text.splitlines() if line.strip()), "")
    header = [cell.strip() for cell in first.split(",")]
    if all(column in header for column in _CSV_COLUMNS):
        segments, fmt = _csv_segments(text), "csv"
    else:
        segments, fmt = _markdown_segments(text, path), "markdown"
    if not segments:
        raise TranscriptError(
            f"{path} has no timestamped speaker blocks: export it from TranscribeX with "
            "timestamps on, as markdown or CSV."
        )
    return Transcript(path=path, format=fmt, segments=segments)


def _csv_segments(text: str) -> list[Segment]:
    reader = csv.DictReader(io.StringIO(text))
    reader.fieldnames  # noqa: B018 - reads the header row, so line_num counts from it
    segments: list[Segment] = []
    line = reader.line_num + 1
    for row in reader:
        end_line = reader.line_num
        try:
            start, end = parse_time(row["Start"] or ""), parse_time(row["End"] or "")
        except ValueError, KeyError:
            line = end_line + 1
            continue
        segments.append(
            Segment(
                line=line,
                end_line=end_line,
                start=start,
                end=end,
                speaker=(row.get("Speaker") or "").strip(),
                text=(row.get("Text") or "").strip(),
            )
        )
        line = end_line + 1
    return segments


def _markdown_segments(text: str, path: Path) -> list[Segment]:
    lines = text.splitlines()
    headings = [
        (i, m.group(1).strip()) for i, line in enumerate(lines) if (m := _HEADING.match(line))
    ]
    if not headings:
        raise TranscriptError(
            f"{path} is not a TranscribeX Transcript: no **Label** speaker blocks "
            "and no ID,Start,End,Speaker,Text header."
        )
    segments: list[Segment] = []
    for n, (i, speaker) in enumerate(headings):
        stop = headings[n + 1][0] if n + 1 < len(headings) else len(lines)
        body = [line.strip() for line in lines[i + 1 : stop] if line.strip()]
        span = _SPAN.match(body[0]) if body else None
        if span is None:
            continue
        segments.append(
            Segment(
                line=i + 1,
                end_line=stop,
                start=parse_time(span.group(1)),
                end=parse_time(span.group(2)),
                speaker=speaker,
                text=" ".join(body[1:]),
            )
        )
    return segments
