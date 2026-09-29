#!/usr/bin/env bash
# Keeps the project-local qmd index current. Claude Code hooks call this on
# session start and after edits; it returns at once and refreshes in the background.
set -u
cd "$(dirname "$0")/.."
export PATH="/opt/homebrew/bin:$HOME/.bun/bin:$PATH"
command -v qmd >/dev/null || exit 0

# Refresh only for session start or a change under wiki/, raw/ or archive/.
input=$(cat 2>/dev/null || true)
if [ -n "$input" ] && ! grep -qE 'SessionStart|(wiki|raw|archive)/' <<<"$input"; then
  exit 0
fi

lock=.qmd/refresh.lock pending=.qmd/refresh.pending
find "$lock" -maxdepth 0 -mmin +10 -exec rmdir {} \; 2>/dev/null

run() {
  while :; do
    rm -f "$pending"
    qmd update && qmd embed
    [ -e "$pending" ] || break
  done
  rmdir "$lock"
}

if mkdir "$lock" 2>/dev/null; then
  run </dev/null >/dev/null 2>&1 &
  disown
else
  touch "$pending"
fi
exit 0
