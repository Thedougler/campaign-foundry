"""Smoke test: the package imports from its installed src layout."""

import re

import campaign_foundry


def test_version_resolves_to_semver() -> None:
    assert re.fullmatch(r"\d+\.\d+\.\d+", campaign_foundry.__version__)
