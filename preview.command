#!/bin/zsh

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${1:-8848}"
URL="http://localhost:${PORT}/"

if curl --silent --fail "$URL" >/dev/null 2>&1; then
  open -a "Google Chrome" "$URL"
  exit 0
fi

cd "$PROJECT_DIR/web"
python3 -m http.server "$PORT" --bind 127.0.0.1 &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

for _ in {1..50}; do
  if curl --silent --fail "$URL" >/dev/null 2>&1; then
    open -a "Google Chrome" "$URL"
    echo "Podgląd mapy działa pod adresem: $URL"
    echo "Zamknięcie tego okna zatrzyma serwer podglądu."
    wait "$SERVER_PID"
    exit 0
  fi
  sleep 0.1
done

echo "Nie udało się uruchomić podglądu pod adresem: $URL" >&2
exit 1
