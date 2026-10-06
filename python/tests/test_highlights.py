"""Laugh Highlights through their public interface, with a stand-in sound-event model.

The stand-in reads each frame's laughter probability straight off the audio samples, so a test
draws the laughter track it wants. Its `Giggle` column carries the laughter, `Laughter` stays
silent and `Music` is always on: a burst found where the drawn laugh is shows the laughter
family collapsed by its maximum, with every other class left out.
"""

import contextlib
import io
import json
import shutil
import wave
from pathlib import Path

import numpy as np
import pytest

from campaign_foundry.highlights import main
from campaign_foundry.laughter import SAMPLE_RATE, Burst, cut_clip, decode_audio

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


MARKDOWN = """\
### Fixture Session

**DM**
00:00 - 00:20

The crab rises out of the surf.

**Perrin**
00:20 - 00:29

I cast Vicious Mockery and call it a sideways coward.

**DM**
00:29 - 00:40

It weeps and scuttles into the sea.

**Delmar**
00:40 - 00:55

Meanwhile I check the rigging.
"""

CSV = """\
ID,Start,End,Speaker,Text
1,00:00:00,00:00:20,DM,"The crab rises out of the surf."
2,00:00:20,00:00:29,Perrin,"I cast Vicious Mockery and call it a sideways coward."
3,00:00:29,00:00:40,DM,"It weeps and scuttles into the sea."
4,00:00:40,00:00:55,Delmar,"Meanwhile I check the rigging."
"""


@pytest.mark.parametrize(
    ("name", "text", "laugh_line", "lines"),
    [("s.md", MARKDOWN, 13, [8, 17]), ("s.csv", CSV, 4, [3, 4])],
)
def test_aligns_each_laugh_with_its_transcript_lines(
    tmp_path: Path, name: str, text: str, laugh_line: int, lines: list[int]
) -> None:
    transcript = tmp_path / name
    transcript.write_text(text)
    track = drawn(60, (32, 34, 0.7))
    code, out = run(
        tmp_path, {"s.m4a": track}, "--transcript", str(transcript), "--context-seconds", "10"
    )
    assert code == 0
    (laugh,) = out["highlights"]
    assert laugh["laugh_line"] == {"transcript": str(transcript), "line": laugh_line}
    (span,) = laugh["context"]
    assert span["lines"] == lines
    assert [s["speaker"] for s in span["segments"]] == ["Perrin", "DM"]
    assert out["transcripts"][0]["timeline"] == "session"


def test_per_part_transcripts_reach_back_into_the_part_before(tmp_path: Path) -> None:
    first, second = tmp_path / "s-part1.csv", tmp_path / "s-part2.csv"
    first.write_text(CSV)
    second.write_text(CSV.replace("crab rises", "gull dives"))
    tracks = {"s-part1.m4a": drawn(60), "s-part2.m4a": drawn(60, (5, 7, 0.7))}
    args = ("--transcript", str(second), "--transcript", str(first), "--context-seconds", "10")
    code, out = run(tmp_path, tracks, *args)
    assert code == 0
    (laugh,) = out["highlights"]
    assert [c["transcript"] for c in laugh["context"]] == [str(first), str(second)]
    assert laugh["context"][0]["segments"][0]["text"] == "Meanwhile I check the rigging."
    assert laugh["context"][1]["segments"][0]["text"] == "The gull dives out of the surf."
    assert laugh["laugh_line"] == {"transcript": str(second), "line": 2}


def test_transcript_count_must_match_the_recording_or_its_parts(tmp_path: Path) -> None:
    one, two = tmp_path / "a.csv", tmp_path / "b.csv"
    one.write_text(CSV)
    two.write_text(CSV)
    tracks = {"p1.m4a": drawn(5), "p2.m4a": drawn(5), "p3.m4a": drawn(5)}
    code, out = run(tmp_path, tracks, "--transcript", str(one), "--transcript", str(two))
    assert code == 2
    assert "2 transcripts for 3 audio parts" in out["stderr"]


def test_an_untimed_transcript_is_a_usage_error(tmp_path: Path) -> None:
    untimed = tmp_path / "s.md"
    untimed.write_text("### S\n\n**DM**\n\nThe crab rises.\n")
    code, out = run(tmp_path, {"s.m4a": drawn(5)}, "--transcript", str(untimed))
    assert code == 2
    assert "timestamps" in out["stderr"]


def test_missing_audio_is_a_usage_error(tmp_path: Path) -> None:
    capture = Capture()
    with capture:
        code = main([str(tmp_path / "gone.m4a")], model=DrawnModel())
    assert code == 2
    assert "No such audio file" in capture.err


@pytest.mark.skipif(shutil.which("ffmpeg") is None, reason="needs ffmpeg")
def test_decodes_audio_and_cuts_a_clip_with_ffmpeg(tmp_path: Path) -> None:
    source = tmp_path / "tone.wav"
    with wave.open(str(source), "wb") as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(16_000)
        out.writeframes((np.sin(np.arange(16_000 * 3) / 5) * 8000).astype("<i2").tobytes())
    audio = decode_audio(source)
    assert len(audio) == pytest.approx(3 * SAMPLE_RATE, rel=0.01)
    burst = Burst(
        start=1, end=1.5, peak=1, intensity=1, part=source, part_start=1, part_laugh_end=2
    )
    clip = tmp_path / "clip.m4a"
    cut_clip(burst, clip, pad=0.5)
    assert len(decode_audio(clip)) == pytest.approx(2 * SAMPLE_RATE, rel=0.1)


@pytest.mark.slow
@pytest.mark.skipif(shutil.which("ffmpeg") is None, reason="needs ffmpeg")
def test_panns_scores_a_real_recording(tmp_path: Path) -> None:
    """Loads the real model (downloads its checkpoint on first run): `pytest -m slow`."""
    from campaign_foundry.laughter import PannsModel, laughter_track

    model = PannsModel()
    times, scores, period = laughter_track(model, np.zeros(SAMPLE_RATE * 5, dtype=np.float32), 240)
    assert len(times) == len(scores) > 0
    assert period == pytest.approx(0.01, rel=0.1)
    assert float(scores.max()) < 0.1
