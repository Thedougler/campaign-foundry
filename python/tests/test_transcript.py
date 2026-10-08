"""A timestamped TranscribeX export reads the same as markdown or CSV, told apart by looking."""

from pathlib import Path

import pytest

from campaign_foundry.transcript import TranscriptError, parse_time, read_transcript

MARKDOWN = """\
### Fixture Session

**DM**
00:00 - 00:20

The ropes creak as the ship turns.

**Perrin**
59:58 - 01:00:03

I cast Vicious Mockery
at the crab.

**Speaker 1**
01:00:03 - 01:00:04

Ha!
"""

CSV = """\
ID,Start,End,Speaker,Text
1,00:00:00,00:00:20,DM,"The ropes creak as the ship turns."
2,00:59:58,01:00:03,Perrin,"I cast Vicious Mockery, ""loudly"", at the crab."
3,01:00:03,01:00:04,Speaker 1,"Ha!"
"""


def write(tmp_path: Path, name: str, text: str) -> Path:
    path = tmp_path / name
    path.write_text(text)
    return path


def test_markdown_export(tmp_path: Path) -> None:
    transcript = read_transcript(write(tmp_path, "s.md", MARKDOWN))
    assert transcript.format == "markdown"
    assert [(s.line, s.speaker, s.start, s.end) for s in transcript.segments] == [
        (3, "DM", 0, 20),
        (8, "Perrin", 3598, 3603),
        (14, "Speaker 1", 3603, 3604),
    ]
    assert transcript.segments[1].text == "I cast Vicious Mockery at the crab."
    assert transcript.segments[1].end_line == 13


def test_csv_export_is_told_apart_by_its_header_not_its_name(tmp_path: Path) -> None:
    transcript = read_transcript(write(tmp_path, "s.md", CSV))
    assert transcript.format == "csv"
    assert [(s.line, s.speaker, s.start) for s in transcript.segments] == [
        (2, "DM", 0),
        (3, "Perrin", 3598),
        (4, "Speaker 1", 3603),
    ]
    assert transcript.segments[1].text == 'I cast Vicious Mockery, "loudly", at the crab.'


def test_markdown_without_timestamps_is_refused(tmp_path: Path) -> None:
    untimed = "### S\n\n**DM**\n\nThe ropes creak.\n\n**Perrin**\n\nI duck.\n"
    with pytest.raises(TranscriptError, match="no timestamped speaker blocks"):
        read_transcript(write(tmp_path, "s.md", untimed))


def test_a_file_without_speaker_blocks_is_refused(tmp_path: Path) -> None:
    with pytest.raises(TranscriptError, match="not a TranscribeX Transcript"):
        read_transcript(write(tmp_path, "notes.md", "# Notes\n\nNothing here.\n"))


@pytest.mark.parametrize(
    ("value", "seconds"),
    [("00:42", 42), ("1:02:03", 3723), ("00:00:01,500", 1.5), ("12.25", 12.25)],
)
def test_parse_time(value: str, seconds: float) -> None:
    assert parse_time(value) == seconds
