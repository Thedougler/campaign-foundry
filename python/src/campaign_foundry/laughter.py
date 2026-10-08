"""Find the table's laughter in a Session's recording and rank it.

A big group laugh is almost always the aftermath of a moment worth retelling, so the loudest,
longest laughs are a shortlist of the night's highlights. The PANNs ``Cnn14_DecisionLevelMax``
sound-event model gives a framewise (about 10 ms) probability for every AudioSet class in one
pass. The laughter family (laughter, giggle, chuckle, snicker, belly laugh, baby laughter) is
collapsed to one track by taking its maximum, smoothed, cut into bursts where it crosses a
threshold, and the bursts are ranked by integrated intensity, so loud *and* sustained laughs
come first.

A recording split into parts is laid end to end on one session timeline, so each burst has a
session-global time and a time inside its own part.
"""

from __future__ import annotations

import shutil
import subprocess
from collections.abc import Callable, Sequence
from dataclasses import dataclass
from pathlib import Path
from typing import Protocol

import numpy as np

SAMPLE_RATE = 32_000  # PANNs models run at 32 kHz.
LAUGH_KEYWORDS = ("laugh", "giggle", "chuckle", "snicker", "chortle", "guffaw")

Log = Callable[[str], None]


class AudioError(RuntimeError):
    """ffmpeg is missing or could not read or cut an audio file."""


class SoundEventModel(Protocol):
    """A framewise sound-event model: one probability per frame and class."""

    labels: Sequence[str]

    def framewise(self, audio: np.ndarray) -> np.ndarray:
        """Mono float32 audio at ``SAMPLE_RATE`` to a ``(frames, classes)`` array."""
        ...


class PannsModel:
    """PANNs ``Cnn14_DecisionLevelMax`` sound-event detection.

    The first run downloads the checkpoint (about 330 MB) and the AudioSet label list to
    ``~/panns_data/`` with ``wget``.
    """

    def __init__(self, device: str = "cpu") -> None:
        from panns_inference import SoundEventDetection, labels

        self.labels = list(labels)
        self._sed = SoundEventDetection(checkpoint_path=None, device=device)

    def framewise(self, audio: np.ndarray) -> np.ndarray:
        return self._sed.inference(audio[None, :].astype(np.float32))[0]


@dataclass
class Part:
    """One audio file placed on the session timeline."""

    path: Path
    offset: float  # session-global start, seconds
    duration: float


@dataclass
class Burst:
    """A run of laughter. ``start``/``end`` are session-global seconds."""

    start: float
    end: float
    peak: float  # highest smoothed probability in the burst
    intensity: float  # area under the probability curve: loud and sustained
    part: Path
    part_start: float  # seconds into its part
    # Seconds into its part where the laughter falls back to the part's average after the
    # burst, so follow-on jokes riding the same wave fall inside it.
    part_laugh_end: float

    @property
    def duration(self) -> float:
        return self.end - self.start

    @property
    def part_offset(self) -> float:
        return self.start - self.part_start

    @property
    def laugh_end(self) -> float:
        return self.part_offset + self.part_laugh_end


@dataclass
class ScanConfig:
    threshold: float = 0.10  # smoothed laughter probability that counts as laughing
    min_len: float = 0.5  # drop bursts shorter than this, seconds
    merge_gap: float = 1.5  # join bursts closer than this, seconds
    smooth_seconds: float = 0.5  # moving-average window over the probability track
    chunk_seconds: float = 240.0  # model input length, bounding memory


def laughter_classes(labels: Sequence[str]) -> list[int]:
    """Indexes of the laughter-family classes in a model's label list."""
    ids = [i for i, label in enumerate(labels) if any(k in label.lower() for k in LAUGH_KEYWORDS)]
    if not ids:
        raise RuntimeError("The model's labels have no laughter class.")
    return ids


def laughter_track(
    model: SoundEventModel, audio: np.ndarray, chunk_seconds: float
) -> tuple[np.ndarray, np.ndarray, float]:
    """Frame times (seconds), laughter probability per frame, and the frame period.

    The model runs on ``chunk_seconds`` pieces; a tail under half a second is dropped.
    """
    ids = laughter_classes(model.labels)
    chunk = int(chunk_seconds * SAMPLE_RATE)
    times: list[np.ndarray] = []
    probs: list[np.ndarray] = []
    frame_period = 0.01
    offset = 0.0
    for c0 in range(0, len(audio), chunk):
        piece = audio[c0 : c0 + chunk]
        seconds = len(piece) / SAMPLE_RATE
        if len(piece) >= SAMPLE_RATE // 2:
            laugh = model.framewise(piece)[:, ids].max(axis=1)
            frame_period = seconds / len(laugh)
            times.append(offset + np.arange(len(laugh)) * frame_period)
            probs.append(laugh.astype(np.float64))
        offset += seconds
    if not probs:
        return np.array([]), np.array([]), frame_period
    return np.concatenate(times), np.concatenate(probs), frame_period


def smooth(scores: np.ndarray, frames: int) -> np.ndarray:
    """Centred moving average over ``frames`` frames (made odd, at most the track's length)."""
    if len(scores) == 0:
        return scores
    frames = min(max(1, frames) | 1, len(scores) - (1 - len(scores) % 2))
    if frames <= 1:
        return scores
    return np.convolve(scores, np.ones(frames) / frames, mode="same")


def find_bursts(
    times: np.ndarray, scores: np.ndarray, frame_period: float, cfg: ScanConfig, part: Part
) -> list[Burst]:
    """Group frames at or over the threshold into bursts, merge near ones, find each laugh end."""
    n = len(scores)
    runs: list[tuple[int, int]] = []
    i = 0
    while i < n:
        if scores[i] < cfg.threshold:
            i += 1
            continue
        j = i
        while j + 1 < n and scores[j + 1] >= cfg.threshold:
            j += 1
        runs.append((i, j))
        i = j + 1

    merged: list[list[int]] = []
    for i, j in runs:
        if merged and times[i] - (times[merged[-1][1]] + frame_period) <= cfg.merge_gap:
            merged[-1][1] = j
        else:
            merged.append([i, j])

    baseline = float(scores.mean()) if n else 0.0
    bursts: list[Burst] = []
    for i, j in merged:
        inside = scores[i : j + 1] >= cfg.threshold
        local_start = float(times[i])
        local_end = float(times[j]) + frame_period
        k = j
        while k + 1 < n and scores[k + 1] > baseline:
            k += 1
        burst = Burst(
            start=part.offset + local_start,
            end=part.offset + local_end,
            peak=float(scores[i : j + 1].max()),
            intensity=float(scores[i : j + 1][inside].sum() * frame_period),
            part=part.path,
            part_start=local_start,
            part_laugh_end=max(local_end, float(times[k]) + frame_period),
        )
        if burst.duration >= cfg.min_len:
            bursts.append(burst)
    return bursts


def _ffmpeg() -> str:
    found = shutil.which("ffmpeg")
    if found is None:
        raise AudioError("ffmpeg is not on PATH; install it (brew install ffmpeg).")
    return found


def decode_audio(path: Path) -> np.ndarray:
    """Any ffmpeg-readable file to mono float32 samples at ``SAMPLE_RATE``."""
    command = [_ffmpeg(), "-v", "error", "-nostdin", "-i", str(path)]
    command += ["-f", "f32le", "-ac", "1", "-ar", str(SAMPLE_RATE), "-"]
    done = subprocess.run(command, capture_output=True)
    if done.returncode != 0:
        raise AudioError(f"ffmpeg could not decode {path}: {done.stderr.decode(errors='replace')}")
    return np.frombuffer(done.stdout, dtype=np.float32).copy()


def scan(
    paths: Sequence[Path],
    cfg: ScanConfig,
    model: SoundEventModel,
    decode: Callable[[Path], np.ndarray] = decode_audio,
    log: Log = lambda _: None,
) -> tuple[list[Part], list[Burst]]:
    """Lay the parts end to end in the order given and return them with every burst, ranked."""
    parts: list[Part] = []
    bursts: list[Burst] = []
    offset = 0.0
    for path in paths:
        log(f"Decoding {path.name}")
        audio = decode(path)
        part = Part(path=path, offset=offset, duration=len(audio) / SAMPLE_RATE)
        log(f"Scoring {part.duration / 60:.1f} minutes")
        times, scores, frame_period = laughter_track(model, audio, cfg.chunk_seconds)
        scores = smooth(scores, int(cfg.smooth_seconds / frame_period))
        found = find_bursts(times, scores, frame_period, cfg, part)
        log(f"{len(found)} laughter burst(s) in {path.name}")
        parts.append(part)
        bursts.extend(found)
        offset += part.duration
    bursts.sort(key=lambda b: b.intensity, reverse=True)
    return parts, bursts


def cut_clip(burst: Burst, out: Path, pad: float) -> None:
    """Cut a burst from its part, ``pad`` seconds before it through ``pad`` past its laugh end.

    The lead-in matters: the laugh follows the moment that caused it.
    """
    start = max(0.0, burst.part_start - pad)
    seconds = max(burst.part_laugh_end, burst.part_start + burst.duration) + pad - start
    command = [_ffmpeg(), "-v", "error", "-nostdin", "-y", "-ss", f"{start:.2f}"]
    command += ["-i", str(burst.part), "-t", f"{seconds:.2f}", "-ac", "1", str(out)]
    done = subprocess.run(command, capture_output=True)
    if done.returncode != 0:
        raise AudioError(f"ffmpeg could not cut {out.name}: {done.stderr.decode(errors='replace')}")
