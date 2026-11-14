---
name: mobivate
description: Send SMS message(s) via Mobivate.
---

# Mobivate

Send SMS using Mobivate to your contacts.

## Connect and discover

Use `vortex.mobivatebulksms.com` as the <hostname>.

Call `GET /profile` to check the connection. If authentication is required, ask the
user to connect their API key into the chat.


## Choose a workflow

| Intent | Tool |
| --- | --- |
| Send Single SMS (to single recipient) | `/send/single` |
| Send Batch SMS (to multiple recipients) | `/send/batch` |

For scheduling a message(s) add `scheduleDateTime` parameter with With ISO Formatted Date (YYYY-MM-DD hh:mm:ss)
and the timezone is in UTC.
