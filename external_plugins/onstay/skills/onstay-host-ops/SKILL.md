---
name: onstay-host-ops
description: >-
  Operate an OnStay host account through the OnStay MCP server: inspect homes,
  check calendars and blocked dates, view and manage stays' door codes, answer
  or close guest questions waiting for the host, and teach a home's concierge
  new facts or guides. Use whenever the user asks about their OnStay properties,
  stays, door codes, blocked dates, guest conversations, or concierge knowledge.
---

# OnStay Host Operations

Use the OnStay MCP tools to inspect and manage the signed-in host's OnStay portfolio safely.

## Core Principles

1. **Resolve the home first**: Call `list_properties` when you do not yet have a
   home's UUID (`propertyId`). Never guess UUIDs.
2. **Confirm before mutating**: Tools marked destructive (`create_host_block`,
   `update_host_block`, `delete_host_block`, `reply_to_guest_escalation`,
   `acknowledge_guest_escalation`, `resolve_guest_escalation`,
   `teach_concierge`, `set_door_code`, `change_door_code_times`,
   `turn_off_door_code`, `draft_booking_reply`, `send_feedback`) change live
   property calendars, answer guest questions, update stay door codes, leave a
   reply draft in OnStay Messages (never sent), or send a report to OnStay. State the exact home, dates, or message text clearly before
   executing a change unless the host already gave exact details and asked you
   to run it.
3. **Guest anonymity**: Guest conversations in OnStay are anonymous by default.
   Do not invent or attach reservation holder names to guest conversation
   threads.
4. **Verified door codes & host controls**: `get_door_codes` shows each stay's
   code to the host, and `set_door_code`, `change_door_code_times`, and
   `turn_off_door_code` update stays' codes and access windows. Never put a
   code in an unverified chat or a guest reply unless the host asks. Locking or
   unlocking a door, thermostats, Wi-Fi passwords, reservation edits, and
   payments stay in the OnStay app (`https://onstay.ai`).
5. **Booking message replies are drafts**: when the host included booking
   messages, `draft_booking_reply` has the home's concierge write a reply to
   the guest's latest message and leaves it in OnStay Messages. It never sends.
   Tell the host the draft is waiting there for them to review and send. A
   thread on Autopilot is refused because the concierge answers it on its own.

## Common Tasks

### 1. Daily Inbox & Escalation Triage
1. Call `list_properties` and `list_guest_conversations` to find open guest
   questions waiting for the host.
2. For each conversation with an open question, call `get_guest_conversation`
   to retrieve the full transcript and each open case's `caseId` and `version`.
3. Draft a concise, warm reply for the host to review. Once confirmed:
   - Call `reply_to_guest_escalation` (passing `conversationId`, `caseId`,
     `body`, and `version`) to send the answer to the guest.
   - If the answer states a reusable property fact (for example, where beach
     towels or spare firewood are stored), offer to call `teach_concierge` so
     the home's concierge knows it next time.
   - Use `acknowledge_guest_escalation` or `resolve_guest_escalation` when an
     issue was handled offline without sending a message.

### 2. Calendar Inspection & Owner Date Blocks
1. Call `get_calendar` with `propertyId`, `dateFrom`, and `dateTo` (`YYYY-MM-DD`)
   to check stays and blocked dates before proposing or creating a block.
2. Only host-created blocks (`eventType: "host_block"`) can be added, moved, or
   removed via `create_host_block`, `update_host_block`, and
   `delete_host_block`.

### 3. Teaching the Concierge & Looking Up Knowledge
- Call `get_property_knowledge` with optional `search` terms to inspect saved
  facts and equipment guides.
- Call `teach_concierge` with `type: "text"` (`selectionText`), `type: "page"`
  (`sourceUrl`), or `type: "video"` (`youtubeUrl`) to add new house knowledge.
