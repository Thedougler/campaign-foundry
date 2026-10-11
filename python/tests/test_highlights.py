"""Laugh Highlights through their public interface, with a stand-in sound-event model.

The stand-in reads each frame's laughter probability straight off the audio samples, so a test
draws the laughter track it wants. Its `Giggle` column carries the laughter, `Laughter` stays
silent and `Music` is always on: a burst found where the drawn laugh is shows the laughter
family collapsed by its maximum, with every other class left out.
"""

import contextlib
import io
import json
from collections.abc import Callable
from pathlib import Path

import numpy as np
import pytest

from campaign_foundry.highlights import main
from campaign_foundry.laughter import SAMPLE_RATE

FRAME = SAMPLE_RATE // 100  # 10 ms frames, as PANNs gives


class DrawnModel:
    labels = ["Speech", "Laughter", "Giggle", "Music"]

    def framewise(self, audio: np.ndarray) -> np.ndarray:
        frames = len(audio) // FRAME
        level = audio[: frames * FRAME].reshape(frames, FRAME).mean(axis=1)
        out = np.zeros((frames, len(self.labels)), dtype=np.float32)
        out[:, 0] = 0.5
        out[:, 2] = level
        out[:, 3] = 1.0
        return out


def drawn(seconds: float, *laughs: tuple[float, float, float]) -> np.ndarray:
    """A track of ``seconds`` with each ``(start, end, level)`` laugh drawn in."""
    audio = np.zeros(int(seconds * SAMPLE_RATE), dtype=np.float32)
    for start, end, level in laughs:
        audio[int(start * SAMPLE_RATE) : int(end * SAMPLE_RATE)] = level
    return audio


def run(tmp_path: Path, tracks: dict[str, np.ndarray], *args: str) -> tuple[int, dict]:
    """Run the command over drawn parts (empty files on disk) and return its exit code and JSON."""
    for name in tracks:
        (tmp_path / name).touch()
    argv = [str(tmp_path / name) for name in tracks] + ["--json", *args]
    by_name = {tmp_path / name: audio for name, audio in tracks.items()}
    capture = Capture()
    with capture:
        code = main(argv, model=DrawnModel(), decode=lambda path: by_name[path])
    return code, (json.loads(capture.out) if code == 0 else {"stderr": capture.err})


class Capture:
    def __enter__(self) -> None:
        self._out, self._err = io.StringIO(), io.StringIO()
        self._stack = contextlib.ExitStack()
        self._stack.enter_context(contextlib.redirect_stdout(self._out))
        self._stack.enter_context(contextlib.redirect_stderr(self._err))

    def __exit__(self, *exc: object) -> None:
        self._stack.close()
        self.out, self.err = self._out.getvalue(), self._err.getvalue()


def test_ranks_the_loud_sustained_laugh_first(tmp_path: Path) -> None:
    code, out = run(tmp_path, {"s.m4a": drawn(60, (10, 12, 0.4), (30, 36, 0.8))})
    assert code == 0
    first, second = out["highlights"]
    assert first["start_seconds"] == pytest.approx(30, abs=0.3)
    assert first["duration"] == pytest.approx(6, abs=0.5)
    assert first["intensity"] > second["intensity"]
    assert second["start_seconds"] == pytest.approx(10, abs=0.3)
    assert out["bursts"] == 2


def test_merges_laughs_closer_than_the_gap_and_drops_blips(tmp_path: Path) -> None:
    track = drawn(60, (10, 11, 0.6), (11.8, 13, 0.6), (40, 40.2, 0.3))
    code, out = run(tmp_path, {"s.m4a": track})
    assert code == 0
    assert out["bursts"] == 1
    assert out["highlights"][0]["start_seconds"] == pytest.approx(10, abs=0.3)
    assert out["highlights"][0]["duration"] == pytest.approx(3, abs=0.5)


def test_laugh_end_follows_the_laughter_back_to_baseline(tmp_path: Path) -> None:
    code, out = run(tmp_path, {"s.m4a": drawn(60, (10, 12, 0.6), (12, 16, 0.05))})
    assert code == 0
    (laugh,) = out["highlights"]
    assert laugh["start_seconds"] + laugh["duration"] == pytest.approx(12, abs=0.3)
    assert laugh["laugh_end_seconds"] == pytest.approx(16, abs=0.3)


def test_parts_lie_end_to_end_in_natural_name_order(tmp_path: Path) -> None:
    tracks = {"s-part10.m4a": drawn(30, (5, 8, 0.7)), "s-part2.m4a": drawn(60, (50, 52, 0.7))}
    code, out = run(tmp_path, tracks)
    assert code == 0
    assert [Path(a["path"]).name for a in out["audio"]] == ["s-part2.m4a", "s-part10.m4a"]
    later = next(h for h in out["highlights"] if h["part"].endswith("s-part10.m4a"))
    assert later["part_start_seconds"] == pytest.approx(5, abs=0.3)
    assert later["start_seconds"] == pytest.approx(65, abs=0.3)
    assert later["laugh_end_seconds"] - later["part_laugh_end_seconds"] == pytest.approx(
        60, abs=0.01
    )


# The fixture export's four blocks, as cf parses them (src/transcript/read.ts): markdown numbers a
# block's lines every 5 (label, span, blank, text, blank); CSV puts the header on line 1, a row on
# each line after.
ROWS = [
    ("DM", 0, 20, "The crab rises out of the surf."),
    ("Perrin", 20, 29, "I cast Vicious Mockery and call it a sideways coward."),
    ("DM", 29, 40, "It weeps and scuttles into the sea."),
    ("Delmar", 40, 55, "Meanwhile I check the rigging."),
]


def payload(path: Path, segments: list[tuple[int, int, float, float, str, str]], fmt: str) -> Path:
    """A parsed Transcript as cf hands it over.

    Each segment is ``(line, end line, start s, end s, speaker, text)``.
    """
    file = path.with_suffix(".payload.json")
    file.write_text(
        json.dumps(
            {
                "path": str(path),
                "format": fmt,
                "segments": [
                    {
                        "line": line,
                        "endLine": end_line,
                        "start": start,
                        "end": end,
                        "speaker": speaker,
                        "text": text,
                    }
                    for line, end_line, start, end, speaker, text in segments
                ],
            }
        )
    )
    return file


def markdown_payload(path: Path, first_text: str = ROWS[0][3]) -> Path:
    return payload(
        path,
        [
            (3 + 5 * i, 7 + 5 * i, start, end, speaker, first_text if i == 0 else text)
            for i, (speaker, start, end, text) in enumerate(ROWS)
        ],
        "markdown",
    )


def csv_payload(path: Path, first_text: str = ROWS[0][3]) -> Path:
    return payload(
        path,
        [
            (2 + i, 2 + i, start, end, speaker, first_text if i == 0 else text)
            for i, (speaker, start, end, text) in enumerate(ROWS)
        ],
        "csv",
    )


@pytest.mark.parametrize(
    ("make", "name", "laugh_line", "lines"),
    [(markdown_payload, "s.md", 13, [8, 17]), (csv_payload, "s.csv", 4, [3, 4])],
)
def test_aligns_each_laugh_with_its_transcript_lines(
    tmp_path: Path, make: Callable[[Path], Path], name: str, laugh_line: int, lines: list[int]
) -> None:
    transcript = make(tmp_path / name)
    track = drawn(60, (32, 34, 0.7))
    code, out = run(
        tmp_path, {"s.m4a": track}, "--transcript", str(transcript), "--context-seconds", "10"
    )
    assert code == 0
    (laugh,) = out["highlights"]
    assert laugh["laugh_line"] == {"transcript": str(tmp_path / name), "line": laugh_line}
    (span,) = laugh["context"]
    assert span["lines"] == lines
    assert [s["speaker"] for s in span["segments"]] == ["Perrin", "DM"]
    assert out["transcripts"][0]["timeline"] == "session"


def test_per_part_transcripts_reach_back_into_the_part_before(tmp_path: Path) -> None:
    first, second = tmp_path / "s-part1.csv", tmp_path / "s-part2.csv"
    tracks = {"s-part1.m4a": drawn(60), "s-part2.m4a": drawn(60, (5, 7, 0.7))}
    args = (
        "--transcript",
        str(csv_payload(second, "The gull dives out of the surf.")),
        "--transcript",
        str(csv_payload(first)),
        "--context-seconds",
        "10",
    )
    code, out = run(tmp_path, tracks, *args)
    assert code == 0
    (laugh,) = out["highlights"]
    assert [c["transcript"] for c in laugh["context"]] == [str(first), str(second)]
    assert laugh["context"][0]["segments"][0]["text"] == "Meanwhile I check the rigging."
    assert laugh["context"][1]["segments"][0]["text"] == "The gull dives out of the surf."
    assert laugh["laugh_line"] == {"transcript": str(second), "line": 2}


def test_transcript_count_must_match_the_recording_or_its_parts(tmp_path: Path) -> None:
    one, two = csv_payload(tmp_path / "a.csv"), csv_payload(tmp_path / "b.csv")
    tracks = {"p1.m4a": drawn(5), "p2.m4a": drawn(5), "p3.m4a": drawn(5)}
    code, out = run(tmp_path, tracks, "--transcript", str(one), "--transcript", str(two))
    assert code == 2
    assert "2 transcripts for 3 audio parts" in out["stderr"]


def test_missing_audio_is_a_usage_error(tmp_path: Path) -> None:
    capture = Capture()
    with capture:
        code = main([str(tmp_path / "gone.m4a")], model=DrawnModel())
    assert code == 2
    assert "No such audio file" in capture.err
