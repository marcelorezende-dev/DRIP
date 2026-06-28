# Connecting the DRIP library to WOCAT

The **WOCAT SLM Library** page (`WOCAT Library.html`) shows sustainable
land-management **technologies** and **approaches** pulled from the
[WOCAT Global SLM Database](https://qcat.wocat.net) via the
[QCAT API v2](https://qcat.readthedocs.io/en/latest/api/v2.html), pre-filtered to
drylands and re-rendered in DRIP's own card style and classification.

## How it works (build-time snapshot)

DRIP is a **static GitHub Pages site**, and the WOCAT API:

1. **requires an authenticated token**, and
2. is **server-to-server** (no browser CORS for `github.io`).

So we never call WOCAT from the browser. Instead, a small Node script fetches the
data **once at publish time**, writes a static `wocat-data.js`, and the page loads
that file same-origin. The token stays a secret; nothing sensitive ships to users.

```
WOCAT API v2  ──(token, server-side)──►  scripts/fetch-wocat.mjs  ──►  wocat-data.js  ──►  WOCAT Library.html
```

`wocat-data.js` currently holds **sample data** (`meta.sample: true`) so the page
is browsable today. A real sync replaces it.

## Step 1 — get a WOCAT API token

1. Register a free account at **https://qcat.wocat.net** (top-right *Login → Register*).
2. Obtain an **application token** for the API. Per the
   [API docs](https://qcat.readthedocs.io/en/latest/api/v2.html), authenticate with:
   ```bash
   curl -X POST https://qcat.wocat.net/en/api/v2/auth/login/ \
        -H 'Content-Type: application/json' \
        -d '{"email":"YOU@example.org","password":"YOUR_PASSWORD"}'
   # → {"token":"9c99bb2d2733f7bea2d20b04ac54b5e0f9fc1931"}
   ```
   That `token` value is what the sync uses.
3. If the login token does **not** grant API access (some accounts need it
   enabled), email the WOCAT secretariat (**wocat@cde.unibe.ch**) and ask for
   **QCAT API v2 access** for your account, stating it's for the FAO/GEF DSL-IP
   DRIP platform.

> Treat the token like a password. Do **not** commit it or paste it into any
> `.html`/`.js` file.

## Step 2 — store it as a GitHub Actions secret

Repo → **Settings → Secrets and variables → Actions → New repository secret**:

- **Name:** `WOCAT_API_TOKEN`
- **Value:** the token from Step 1

## Step 3 — run the sync

- **In CI:** Actions tab → **WOCAT sync** → *Run workflow*. It also runs weekly
  (Mondays 04:00 UTC) and commits `wocat-data.js` only when it changes.
- **Locally** (needs Node 18+):
  ```bash
  # bash
  WOCAT_API_TOKEN=xxxxxxxx node scripts/fetch-wocat.mjs
  ```
  ```powershell
  # PowerShell
  $env:WOCAT_API_TOKEN = "xxxxxxxx"; node scripts/fetch-wocat.mjs
  ```
  Then commit the regenerated `wocat-data.js`.

Useful flags: `--limit 50` (cap records while testing), `--dump` (print the first
raw detail response — use this to calibrate extraction, see below),
`--sample` (rewrite the placeholder sample file).

## Step 4 — calibrate the detail extraction (one-time)

The QCAT **detail** response is a deeply-nested `section → children → value` tree
whose exact question-group keys are edition-specific. `fetch-wocat.mjs` walks it
heuristically via the `KEY_HINTS` map. After your first live run:

1. Run `node scripts/fetch-wocat.mjs --dump --limit 1` and read the printed JSON.
2. Adjust `KEY_HINTS` (summary / country / measures / groups / landuse /
   degradation) and the `GROUP_CLUSTER` / `COUNTRY_BIOME` maps to match the real
   field keys and the countries/biomes you care about.
3. Re-run the full sync and commit.

## Tuning the pre-filter

In `scripts/fetch-wocat.mjs`:

- `DRYLAND_COUNTRIES` — which countries count as "drylands" (default: the DSL-IP
  footprint + reference biomes). Empty set = keep everything.
- `COUNTRY_BIOME` — country → DRIP biome tag (Caatinga / Miombo–Mopane / Global).
- `GROUP_CLUSTER` — WOCAT technology group → DRIP farm-skill-tree cluster.

These mirror the **DRIP Typologies & Classifications** reference.
