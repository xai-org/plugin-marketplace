---
name: mobela
description: Use when the user asks about their Mobela training (workouts, runs, stats, health, calendar) or wants a Mobela routine built and saved to their app.
---

# Mobela

The `mobela` MCP server reads the signed-in user's Mobela training data and can save new routines to their Routines tab in the app.

## Start here

- Call `get_user_profile` first for anything personalized. It gives experience level, available equipment, training frequency, preferred duration and `preferred_distance_unit`. Report distances in that unit.

## Which tool for which question

| The user asks about | Call |
|---|---|
| "How has my training been?", balance, consistency | `get_workout_stats`, then `get_workout_history` for detail |
| One specific workout | `get_session_details` with an `id` from history |
| Mileage, pace, weekly volume | `get_cardio_summary` |
| Strava interval or lap analysis | `get_recent_runs`, then `get_run_details` |
| Recovery, sleep, readiness, VO2 max | `get_health_summary` (check `latest_date`: device data only syncs when the app is opened) |
| What's planned this week | `get_calendar` |
| Existing routines | `get_my_templates` |

## Building a routine

1. `get_user_profile` for equipment and experience, and `get_my_templates` to avoid duplicates.
2. `get_exercise_library` with a filter every time (`muscle`, `equipment` or `category`); the library has 1000+ exercises. Make several filtered calls, one per muscle group you need.
3. Show the user the plan and confirm before saving.
4. `create_workout_template` using only `exerciseId`s returned by the library. The routine appears in the Mobela app immediately.

## Notes

- An empty `get_recent_runs` means the Strava sync is off or there are no recent runs. It does not mean the user doesn't run; check `get_cardio_summary` too.
- Only `create_workout_template` writes. Everything else is read-only.
