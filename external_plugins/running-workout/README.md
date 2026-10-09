# Running Workout for Claude and Grok Build

Running Workout is a running coach for athletes who train with a Garmin watch. This plugin connects your assistant — Claude (Claude Code, Cowork, Claude apps) or Grok Build — to the Running Workout service so that it can read your real training data and put structured workouts straight on your watch.

## What it does

- Reads your Garmin activities and your training profile (volume, recent runs, reference paces such as maximal aerobic speed).
- Keeps track of your race goals, your constraints (available days, equipment) and your coaching notes.
- Starts and follows 5K, 10K, half-marathon and marathon training plans set up on runningworkout.fr, and reviews each week against what you actually ran.
- Builds structured running, cycling and swimming workouts from one sentence ("10 × 400 m at 95 % VMA, 1 min recovery") and schedules them on your Garmin Connect calendar, so they sync to the watch.

The assistant always asks for your confirmation before it creates, moves or deletes a workout on your calendar.

## What the plugin contains

- **A skill, `coach`**: the coaching method — read your data first, never invent a number, one question at a time, confirm before writing, weekly review.
- **A remote MCP server**: `https://www.runningworkout.fr/mcp`, operated by Running Workout. The plugin runs no local code, no script and no hook.

## Account and data

You need a free Running Workout account linked to your Garmin Connect account. The first time the assistant uses the tools, you sign in on runningworkout.fr and authorise it (OAuth 2.1). Your Garmin password is never seen by Running Workout or by the assistant.

When you ask the assistant something, the MCP server returns the data needed to answer — profile, activities, plans, workouts — to it, and writes to your Garmin Connect account only the workouts and calendar entries you ask for. Nothing is sent anywhere else by this plugin. Data is never sold, never shared for advertising and never used to train AI models. You can revoke its access at any time from your Running Workout dashboard.

- Privacy policy: https://www.runningworkout.fr/privacy-policy?lang=en
- Terms and legal notice: https://www.runningworkout.fr/legal?lang=en
- Support: https://www.runningworkout.fr/support?lang=en — nicolas@runningworkout.fr

## Install in Claude Code

```
/plugin marketplace add nicolas-ship-it-now/running-workout-plugin
/plugin install running-workout@running-workout
```

## Install in Grok Build

Listed in the Grok Build plugin marketplace as `running-workout`:

```
grok plugin install running-workout --trust
```

Then ask, for example: "Build me a plan to run a 10K in 8 weeks, 3 sessions a week."

Running Workout is a sports training tool and does not give medical advice.
