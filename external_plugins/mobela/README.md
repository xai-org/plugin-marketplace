# Mobela

[Mobela](https://mobela.app) is a training app for strength, running and everyday movement. This plugin connects Grok Build to the hosted Mobela MCP server, so you can ask about your own training and have Grok build routines that show up right away in the Mobela app.

## What it ships

- **MCP server**: `mobela` (HTTP, `https://mobela.app/mcp`), hosted by Mobela
- **Skill**: `mobela`, with guidance on which tool to use for common training questions

## Tools

| Tool | Access | What it returns |
|---|---|---|
| `get_user_profile` | read | Experience level, equipment, frequency, preferred duration, units |
| `get_workout_history` | read | Recent sessions with exercises, duration, RPE |
| `get_workout_stats` | read | Aggregates: sessions, volume, muscle groups, streaks |
| `get_session_details` | read | One session in full: laps, pace, HR zones |
| `get_exercise_library` | read | Filtered exercises (by muscle, equipment, category) |
| `get_my_templates` | read | The user's saved routines |
| `get_recent_runs` | read | Strava-synced runs (if the user enabled the sync) |
| `get_run_details` | read | Full Strava detail for one run: laps, splits |
| `get_cardio_summary` | read | Run/ride/walk volume and weekly totals |
| `get_health_summary` | read | Steps, resting HR, sleep, calories, VO2 max |
| `get_calendar` | read | Planned workouts and to-dos per day |
| `create_workout_template` | write | Saves a new routine to the user's Routines tab |

`create_workout_template` is the only write tool. It adds a routine and never edits or deletes existing data.

## Setup

Install the plugin. On first use, Grok opens a browser to sign in with your Mobela account (OAuth 2.1 + PKCE with dynamic client registration). No API key is needed.

## Network endpoints and credentials

- **Endpoint:** `https://mobela.app/mcp` plus the OAuth routes under `https://mobela.app/mcp/*` and `https://mobela.app/.well-known/*`. Nothing else.
- **Credentials:** an OAuth access token issued after you sign in. Tokens are scoped to your account, stored hashed server-side, and all data access runs under database row-level security for that user.
- The plugin has no hooks, no scripts, and no local code. It runs nothing on your machine.

## Support

Docs: [mobela.app/ai](https://mobela.app/ai) · Contact: admin@mobela.app

## License

Proprietary. © Mobela Inc.
