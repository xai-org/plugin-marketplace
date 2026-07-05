# Payload Schemas

Authoritative MCP tool surface and response shapes for the audit. Field paths and enums in this file are verified live unless noted. When a field path appears in SKILL.md as `state.fields.<x>` or `apm_occurrence.<x>`, it comes from this document.

## Table of contents

1. [Three audit channels](#three-audit-channels)
2. [The Luciq MCP tool surface](#the-luciq-mcp-tool-surface)
3. [Identifiers, modes, platforms](#identifiers-modes-platforms)
4. [Crash channel: `get_occurrence_details` shape](#crash-channel-get_occurrence_details-shape)
5. [Bug channel: `bug_details` shape](#bug-channel-bug_details-shape)
6. [APM channel: `apm_*` shapes](#apm-channel-apm_-shapes)
7. [Filter naming differences across channels](#filter-naming-differences-across-channels)
8. [Operational notes](#operational-notes)

## Three audit channels

The audit can run on any combination of three channels, in this preference order for C1–C7 / S2 / P1 / C9:

```
APM  >  Bug  >  Crash
```

| Channel | Tool | Best for | Cost |
| --- | --- | --- | --- |
| **APM** | `apm_*` | C1–C7 network audit (structured per-request) | Cheapest — direct JSON |
| **Bug** | `bug_details` | C1–C7, S2, P1, C9 (logs pre-split into named archives) | Medium — one fetch + parse per archive, typed |
| **Crash** | `get_occurrence_details` | Synthetic crash itself, attributes, experiments, `C0*`, `S1`, `E*`, `A*` | Heaviest — network/breadcrumbs bundled into `compressed_logs` |

Why this preference: APM exposes per-request structured data; the bug payload splits logs into typed archives (`network_log`, `user_events`, `instabug_log`); the crash payload bundles everything into one `compressed_logs` archive that requires disambiguating parsing. Cheaper, cleaner channels first.

## The Luciq MCP tool surface

Verified against the live Luciq MCP server API. Tool names below are exact.

### Crash / hang / non-fatal path

| Tool | Purpose |
| --- | --- |
| `list_applications` | Resolve the app's `slug`, `mode`, `platform`. |
| `list_crashes` | Find recent crash groups, filterable by `current_views`, `app_versions`, `os_versions`, `devices`, `platform`, `type`, `subtype`, `date_ms`, `teams`, `status_id`. |
| `list_occurrences_tokens` | Page ULIDs within a crash group, filterable by `current_views`, `app_status`, `experiments`, `app_versions`, `os_versions`, `devices`, `date_ms`. |
| `crash_details` | Group-level metadata and a sample occurrence. |
| `crash_patterns` | Distribution by `pattern_key` (default `app_versions`). Primary for SDK-version regression diffing. |
| `get_occurrence_details` | Per-occurrence payload — crash-channel evidence. |
| `list_app_hangs` | iOS UI hangs and Android ANRs (iOS has no `ANR` crash type; ANR is Android-only). |

### Bug path

| Tool | Purpose |
| --- | --- |
| `list_bugs` | Find bug records, filterable by `app_version`, `priority_id`, `status_id`. |
| `bug_details` | Per-bug payload with split log archives. |

### APM path

| Tool | Purpose | Response shape |
| --- | --- | --- |
| `apm_list_groups` | Rank groups for the app + new SDK version (`metric: network`). Sort: `failure_rate \| latency \| apdex \| apdex_change \| occurrences \| dissat_count`. | `{ metric, groups: [{ uuid, name, key_metrics }], next_offset, total }` |
| `apm_group_view` | Per-group panels. Views: `summary \| apdex_chart \| throughput_chart \| failure_rate \| spans_table \| dimensions \| outliers`. | `{ metric, group_uuid, views: { <view_name>: { data } } }` + `ignored_views` array for views not applicable to the metric. |
| `apm_occurrence` | Per-occurrence detail by `selector: worst \| by_token \| list`. | `{ metric, group_uuid, first: { token, ... } }` for `selector: worst`. |

## Identifiers, modes, platforms

### Identifier model

- **Crash occurrence**: `(slug, mode, number, ulid)` — `state_token` in the response equals the queried `ulid`.
- **Bug**: `(slug, mode, number)` only — no ULID. The bug-side identifier `state.fields.state_number` is an integer, not a ULID.
- **APM occurrence**: `(slug, mode, metric, group_uuid | group_url[+method], token)`.

Hold the full identifier end-to-end on whichever channel; partial identifiers cross-contaminate.

### ULID structure and `max(tokens)` selection

ULIDs are time-prefixed: the first 10 base32 characters encode the millisecond timestamp at generation, the trailing 16 are random. Two consequences:

1. **Lexicographic order matches chronological order.** Plain string comparison gives the same ordering as sorting by generation time.
2. **`max(tokens)` is the freshest occurrence.** Always. No need to fetch each occurrence's metadata to compare timestamps.

This matters when `list_occurrences_tokens` (crash) or `apm_occurrence` with `selector: list` (APM) returns multiple tokens — common in shared development workspaces where multiple engineers smoke against the same workspace concurrently. The selection rule:

```
# pseudocode
tokens   = list_occurrences_tokens(...).tokens   # ordered however the API returns
selected = max(tokens)                            # lex-max == ULID-newest
detail   = get_occurrence_details(token=selected, ...)
```

Prefer this over aggregate-timestamp fields (`last_occurred_at`, `first_occurred_at`) — those are denormalized group-level rollups that can lag ingest order. The ULID's embedded timestamp is the authoritative chronology of the occurrence itself.

Bugs are addressed by integer `number`, not ULID; the rule doesn't apply on the bug channel.

### Parsing the ULID timestamp

The first 10 base32 characters encode milliseconds since the Unix epoch. Crockford's base32 alphabet — `0123456789ABCDEFGHJKMNPQRSTVWXYZ` (no I, L, O, U) — is the canonical encoding; ULIDs are case-insensitive in practice but normalize to uppercase before parsing.

```
# pseudocode
CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"

def ulid_timestamp_ms(ulid):
    ms = 0
    for c in ulid[:10].upper():
        ms = ms * 32 + CROCKFORD.index(c)
    return ms                                # milliseconds since 1970-01-01 UTC

age_seconds = (now_ms() - ulid_timestamp_ms(token)) / 1000
```

Two reasons to parse the ULID timestamp directly rather than relying on `state.fields.reported_at`:

1. **Authoritative source.** `reported_at` is a separate field that depends on when the SDK assembled the report; the ULID is set at occurrence creation and is what the audit identifies the record by.
2. **No format ambiguity.** `reported_at` is an ISO-8601 string that varies in precision and timezone representation; ULID parsing is deterministic.

This is the input to the recency check (`C0b` in `check-catalog.md`).

### Mode enum (every per-app tool)

```
alpha | beta | staging | qa | development | production
```

The rule pack's `env.dashboard_mode` must be one of these literals.

### Platform enums — three forms, no aliases

Different tools use different cases and value names. Match each tool's form exactly; querying the wrong form silently returns nothing.

| Where | Form | Values |
| --- | --- | --- |
| `list_applications.platform` (request + response) | lowercase | `ios \| android \| react_native \| flutter` |
| `list_crashes.filters.platform`, `list_app_hangs.filters.platform` | UPPERCASE | `IOS \| ANDROID \| DART \| JAVASCRIPT` |
| `apm_*.filters.platform` | lowercase, **iOS / Android only** | `ios \| android` (no `dart` or `javascript`) |

This means APM is **N/A for Flutter (DART) and React Native (JAVASCRIPT) projects** — do not probe APM for these platforms.

### Crash type enum

`list_crashes.filters.type`: platform-specific.
- Android: `CRASH`, `ANR`, `NON_FATAL`.
- iOS: `CRASH`, `OOM`, `NON_FATAL`.
- RN / Flutter: `CRASH`, `ANR`, `OOM`, `NON_FATAL`.

iOS UI hangs surface via `list_app_hangs`, **not** as a crash type.

### Non-fatal subtype enum

Only valid when `NON_FATAL` is in the type filter: `CRITICAL`, `ERROR`, `WARNING`, `INFO`.

### Crash pattern keys

`crash_patterns.pattern_key`: `app_versions | devices | oses | current_views | app_status | experiments` (default `app_versions`). All six are usable for regression diffing — `app_versions` is the primary, `oses`/`devices` answer "OS/device-specific?", `experiments` answers "cohort-specific?". Sort by `occurrences_count`, `last_seen`, `first_seen`.

## Crash channel: `get_occurrence_details` shape

Verified live against four iOS occurrences (one CRASH, one NON_FATAL, one FATAL_UI_HANG, all returning the same shape). The same payload covers CRASH, NON_FATAL, OOM, ANR (where applicable), and FATAL_UI_HANG — no type-specific branching needed.

```
{
  state: {
    fields: {
      id,                       # integer occurrence id (distinct from state_token)
      app_version,              # e.g. "1.0 (1)"
      current_view,             # top-level screen name, "N/A" when not set
      locale,                   # e.g. "en-EG"
      sdk_version,              # e.g. "19.6.1"
      density,                  # "@3x"
      screen_size,              # "402x874"
      city, country,            # geo
      reported_at,              # ISO 8601, e.g. "2026-05-12T03:29:59.000Z"
      bundle_id,                # e.g. "com.example.your-app.debug"
      email,                    # user identity; "" when not set
      memory,                   # "22.0/22.0 MB" — string, not structured
      storage,                  # "186.341/471.482 GB" — string
      duration,                 # "00:00:01" — HH:MM:SS string
      state_token,              # ULID; equals the queried ulid
      user_attributes,          # object keyed by name; {} when none set
      user_name,                # "" when not set
      app_status,               # "foreground" | "background"
      os,                       # combined "iOS 26.1" — NOT split into platform+version
      device,                   # device model string; "Simulator" on simulator
      variant_token             # opaque
    },
    logs: {
      compressed_logs: { is_empty_array: <bool>, url: <presigned-s3> },  # session log archive
      experiments:     { is_empty_array: <bool>, url: <presigned-s3> }    # experiment list
    },
    user: { email, name, uuid },
    exception_message: "<crash message>"
  }
}
```

### Critical: network log is NOT inline

Network logs, breadcrumbs, and the Luciq SDK's own log all live **inside** the `compressed_logs` archive — they are not separate inline JSON fields as `luciq-debug`'s historical examples implied. The crash-path audit for C1–C7 / S2 / P1 / C9 cannot read fields directly; it must:

1. Check `state.logs.compressed_logs.is_empty_array`. If `true`, treat as SKIP with reason "no log archive captured."
2. Fetch the `url` over HTTP. The URL is presigned (`?Expires=<epoch>&Signature=...`); no auth header needed but the URL is **time-limited** — fetch immediately on receipt, not later.
3. Decompress (the file extension is `.txt` but the body is typically gzip or similar; verify on first fetch).
4. Parse the contents (text format, line-oriented; the exact format must be codified on first parse).

When APM is available, use it — the crash-path fallback is materially heavier.

### Other shape notes

- `state.fields.user_attributes` is an object keyed by name; matches APM's `user_attributes` filter shape.
- No top-level `custom_attributes`, `user_steps`, or `breadcrumbs` field in `state.fields`. Those live inside the compressed archive or are expressed only through APM. Absence is not FAIL — it means "fetch the archive" or SKIP.
- `id` is the numeric occurrence id; `state_token` is the ULID. Distinct.
- The `os` field is a combined human-readable string ("iOS 26.1"), not a platform enum. The platform-filter values are separate (see platform enum table above).

## Bug channel: `bug_details` shape

Verified live. Structurally similar to the crash payload but with **three meaningful differences** worth special-casing:

```
{
  priority_id, status_id, tags, categories: { name, subs },
  email, number, reported_at, last_activity, title, type, team,
  session_id, attachments: { attachment: [...] },
  experiments,                                  # NULL or object at ROOT — not nested under state.logs
  state: {
    fields: {
      ... all the same fields as crash payload ...
      state_number,                             # integer, NOT a ULID
      duration                                  # bug-session duration
    },
    logs: {
      # Pre-split into typed archives — NOT unified compressed_logs
      console_log:  { is_empty_array, [url] },
      instabug_log: { is_empty_array, [url] },  # Luciq SDK's own internal log
      user_data:    { is_empty_array, [url] },
      network_log:  { is_empty_array, [url] },  # DEDICATED — direct C1-C7 evidence
      user_events:  { is_empty_array, [url] }   # breadcrumbs / user steps — S2 / P1
    }
  }
}
```

### Three differences from the crash payload

1. **`state.logs` is split into 5 named archives** instead of one `compressed_logs` bundle. Each can be `is_empty_array: true` (no `url`) or `false` (with presigned URL). Structurally cleaner for the audit — parsers don't need to disambiguate row types.

2. **`experiments` lives at the root** (sibling of `state`), not nested under `state.logs`. When no experiments are attached, the value is `null` (not `{ is_empty_array: true }`).

3. **Identifier is `state_number` (integer)**, not `state_token` (ULID). `bug_details` is addressed by `(slug, mode, number)` only; there is no fourth identifier field.

### Per-rule mapping when on the bug channel

| Rule | Bug-channel evidence |
| --- | --- |
| C1–C7 redaction / headers | `state.logs.network_log.url` (fetch + parse) |
| C8 experiments | root `experiments` value (object or `null`) |
| C9 SDK warn/error | `state.logs.instabug_log.url` (Luciq SDK's own log — directly addresses this rule) |
| S2 user steps | `state.logs.user_events.url` (fetch + parse) |
| P1 PII over user steps | `state.logs.user_events.url` (fetch + parse) |
| P2 PII over attributes | `state.fields.user_attributes` + `state.logs.user_data.url` |
| P4 identity PII | `state.user.email/name`, `state.fields.email/user_name`, top-level `email` |

## APM channel: `apm_*` shapes

### Tool surface and shared filter set

The APM filter set (shared across `apm_list_groups`, `apm_group_view`, `apm_occurrence` with minor differences per tool):

```
date_ms, platform (ios | android only),
app_version, device { operator: in|not_in, values: [...] },
os_version, country, carrier, radio,
failure_name, failure_type,
response_time_ms { gt, lt },
request_payload_size { gte, lte }, response_payload_size { gte, lte },
custom_attributes (object, keyed by attribute number 1..20),
experiment, latency_percentile,
user_attributes (object, keyed by name)
```

`apm_list_groups` additionally has: `key_metric`, `group_name`, `count`, `dissat_count`, `apdex`, `apdex_change`, `95th_percentile_ms`, `50th_percentile_ms`, `total_failure_rate`, `client_failure_rate`, `server_failure_rate`.

### Custom attributes are NUMBERED slots 1–20

Critical: APM does not address custom attributes by name. The `apm_group_view.views[].pattern_key` enum includes `custom_attribute_1` through `custom_attribute_20`. The dashboard maps each slot to a logical name; the customer's rule pack supplies the slot→name mapping (`attributes.custom.slot_map`). The skill **cannot infer this mapping** from telemetry alone — slot configuration is organization-wide.

When the slot map is empty, all `Ax*` rules SKIP with reason "custom-attribute slot mapping not configured."

### Permission model — dynamic per metric

Required permissions are derived from the `metric` parameter:
- `<metric>.list.view` for `apm_list_groups`
- `<metric>.details.view` for `apm_group_view`
- `<metric>.occurrence_details.view` for `apm_occurrence`

Today only `metric: network` exists. Future metrics (e.g. `flows`) auto-wire when added. A 403 from upstream means "missing permission `<metric>.<scope>.view`"; treat as SKIP.

### Availability — TWO independent constraints

**Account availability**: APM tools may not be GA on every account. Error semantics from the MCP layer:
- 4xx and 501 (`metric_not_implemented`) → forwarded as a tool response body (NOT raised). Inspect the JSON for `{ error: ... }`. SKIP with the reason. The skill must not `try/catch` here.
- 5xx → raises `StandardError` from the MCP layer. STOP and surface the upstream failure.

**Platform support**: APM's `filters.platform` is `ios | android` only. DART and JAVASCRIPT projects: APM channel is permanently **N/A** (not SKIP). Don't probe. Set in Phase 0 at maturity detection.

## Filter naming differences across channels

The same logical concept uses different names on different tools. Match each tool's form exactly.

| Concept | Crash filter | APM filter |
| --- | --- | --- |
| App version | `app_versions` (array) | `app_version` (array) |
| Experiment | `experiments` (array) | `experiment` (array) |
| Device | `devices` (flat array) | `device` (`{ operator, values }` object) |
| OS version | `os_versions` (array) | `os_version` (array) |
| Current view | `current_views` (array) | (not exposed in APM filter set) |

## Operational notes

### `crash_patterns` flakiness

The `crash_patterns` tool occasionally returns `MCP error -32603: Internal error` (observed live during schema verification). The behavior: retry once with a small backoff; on repeated failure, mark the regression-diff step (used in prod-canary mode) as SKIP with reason "crash_patterns upstream error" rather than blocking the report. Do not infer "no regression" from a tool failure.

### Presigned-URL freshness

All log archive URLs (`compressed_logs`, `experiments`, `network_log`, `user_events`, `console_log`, `instabug_log`, `user_data`) are signed by CloudFront with an `Expires=<epoch>` query param. Treat them as ephemeral: fetch in the same phase that received the response. Late fetches return 403 / SignatureDoesNotMatch.

## Log-archive wire formats

Verified live against fetched archives. The `.txt` file extension is misleading on every archive — the actual encoding differs by channel.

### Bug-channel archives (plain JSON)

`bug_details` archive URLs return **plain JSON arrays / objects**, no compression, served as `application/octet-stream`. Just download and `JSON.parse`.

| Archive | Top-level type | Element shape |
| --- | --- | --- |
| `network_log` | array | `{ status, response_time, method, response_headers, request?, response?, headers, log_source, date, url }` (see "Network log entry shape" below) |
| `user_events` | array | `{ event: string, params: object, timestamp: int }` (unix ms) |
| `instabug_log` | array | `{ log_message_date: int, log_message_level: "i" \| "w" \| "e" \| "v", log_message: string }` (unix ms) |
| `console_log` | array (empty in observed samples) | TBD when a non-empty sample is available |
| `user_data` | array (empty in observed samples) | TBD when a non-empty sample is available |

### Crash-channel archives (base64 + zlib)

`get_occurrence_details` archive URLs return **base64-encoded zlib-compressed JSON**. The first bytes are ASCII (the base64 alphabet), starting with `eJzt` / `eJys` / similar — the base64 prefix for zlib's `0x78 0x9C` magic header. Decode pipeline:

**Python (in-process):**

```python
import base64, zlib, json
raw = open(downloaded_file, 'rb').read().strip()
decoded = base64.b64decode(raw)        # base64 → bytes
inflated = zlib.decompress(decoded)    # zlib → bytes
data = json.loads(inflated)            # bytes → object
```

**Shell (fetch + decode in one pipe, agent-friendly):**

```bash
# Presigned URL is single-use; download to a local file first, then decode
curl -s "$PRESIGNED_URL" -o logs.txt
cat logs.txt | tr -d '\n' | base64 -d \
  | python3 -c "import sys,zlib; sys.stdout.buffer.write(zlib.decompress(sys.stdin.buffer.read()))" \
  > logs.json
```

`tr -d '\n'` strips line breaks that some servers introduce in base64 payloads. The trailing `> logs.json` writes the decompressed bytes to disk as JSON, ready for `jq` / `python -m json.tool` / further analysis.

The decompressed JSON is an **object** (not an array), with sub-archives keyed by name:

```
{
  "network_log": [...]           # same element shape as bug-channel network_log
  # other keys may appear (user_events, console_log, etc.) depending on what
  # the SDK captured for this occurrence; iterate over the object keys
}
```

So the crash-channel `compressed_logs` is the bundled equivalent of the bug-channel's separate archives. Once decoded, the element shapes match.

### Network log entry shape (canonical across channels)

```jsonc
{
  "status": 200,                              // int; HTTP status. 0 = no response (network error / timeout)
  "response_time": 35.531,                    // float ms
  "method": "GET",                            // HTTP method
  "url": "https://...",                       // full URL including query
  "date": 1778956610399,                      // unix ms
  "log_source": 1,                            // int enum (URLSession=1, observed)
  "headers": { "Authorization": "*****" },    // REQUEST headers; SDK auto-redacts sensitive
                                               //   header values to "*****"
  "response_headers": { ... },                // response headers
  "request": "..." | { ... } | <absent>,      // request body. Absent = none sent.
                                               //   Object = JSON-parsed body.
                                               //   Literal string "Request body has not been
                                               //   logged because it exceeds the maximum
                                               //   size of 10240 bytes" = SDK SIZE-TRUNCATED
                                               //   (NOT customer redaction)
  "response": { ... } | <absent>              // parsed response body
}
```

**Field names** in the actual payload are `request` and `response` (not `request_body` / `response_body`). Audit rules that target these fields must use the actual names.

**SDK auto-redaction sentinel**: the Luciq SDK automatically replaces sensitive header values with `*****` before logging. So `headers.Authorization == "*****"` means "captured, redacted by SDK." A customer-defined redaction (e.g. `<REDACTED>`) would appear in `request` / `response` bodies, NOT in headers.

**SDK size-truncation marker**: requests with bodies > 10240 bytes have their `request` field replaced with the literal string `"Request body has not been logged because it exceeds the maximum size of 10240 bytes"`. This is NOT the customer's redaction token — it means the SDK's size limit hit BEFORE the customer's redaction callback ran. The audit must distinguish: matching this string is INFO ("body bypassed customer redaction due to size"), not PASS ("redacted") and not FAIL ("leak").

**SDK self-traffic in the log**: outbound requests from the Luciq SDK to its own backend (`api.instabug.com/api/sdk/v3/...`) DO appear in the captured network log. The SDK does not self-filter by default. C7's "no SDK self-traffic" rule needs the customer's rule pack to provide an exclude list (e.g. `api.instabug.com`, `*.luciq.com`), or treat presence of such hosts as either a known-state OK or a finding to surface — customer's call.

**`IBG-*` headers are not auto-masked**: outbound SDK requests carry `IBG-APP-TOKEN`, `IBG-OS`, `IBG-SDK-VERSION`, `IBG-CUUID`, `IBG-OS-VERSION` headers. The app token (`IBG-APP-TOKEN`) is a client-side app identifier. It is not redacted to `*****` by default. If the customer wants this masked in the captured log, they add `IBG-APP-TOKEN` to `redaction.sensitive_headers`.

### What `instabug_log` actually contains

Despite the name, `instabug_log` is **NOT the SDK's internal warn/error log**. It carries application log lines that the customer's app wrote via the Luciq SDK's logging API:

```swift
Luciq.log.i("user viewed cart: 3 items, $49.99")   // level "i"
Luciq.log.w("retrying payment submission")          // level "w"
Luciq.log.e("offline: no network reachable")        // level "e"
Luciq.log.v("trace: enter computeShipping()")       // level "v"
```

Levels are single-character: `i` (info), `w` (warn), `e` (error), `v` (verbose).

**Implication for C9** ("no Luciq SDK warn/error in app log"): `instabug_log` is the wrong source. SDK-internal warnings (e.g. "Luciq: failed to intercept request", "Luciq: masking callback threw") would appear in `console_log` if the SDK captures console (when configured) or inside the crash-channel's bundled `compressed_logs` under a different sub-key. The audit should scan `console_log` on the bug channel, or grep for SDK-tagged lines inside the decoded `compressed_logs` on the crash channel — NOT scan `instabug_log` for `w` / `e` lines (those would catch the customer's own app warnings, which is a different concern).

### `is_empty_array` semantics

When an archive entry's `is_empty_array` is `true`, the entry has **no `url` field**. Always check the flag before attempting a fetch. Don't infer "data missing" from a missing `url` — `is_empty_array: true` is the documented "this archive was not produced for this occurrence" signal.

### Bug payload root vs. crash payload nesting

The bug payload has top-level fields the crash payload doesn't (`priority_id`, `status_id`, `categories`, `attachments`, `session_id`, root-level `experiments`). The crash payload nests almost everything under `state`. When writing channel-agnostic code, always check which channel the response came from before unpicking fields.
