---
name: account-connect
description: Manage connected social accounts. Use when the user asks which accounts are connected, wants to connect a new account, or asks about posting limits and quota before a big batch.
---

# Connected Accounts

## Seeing what's connected

Call `list_accounts`, optionally filtered by client or platform. Each row shows the
platform, handle, and status. This is the source of truth for "which accounts can I
post to?" — always check it before composing for a specific account. For one account
in full — platform, handle, display name, avatar, status (including whether it needs
re-authorisation), and owning client — call `get_account`.

## Connecting a new account

Call `create_connect_invite` to mint a shareable self-connect link for the requested
platforms. The client (or the user) opens the link and connects the account
themselves through each platform's official OAuth flow — SkedCast never sees their
platform password. The link has an expiry; mention it when sharing.

## Before a big batch

Two read-only tools keep large operations safe:

- **`get_posting_limits`** — per-account anti-ban cadence. Call with a
  `socialAccountId` for one account, or omit it for every active channel plus the
  tenant bypass flag. Respect these limits when pacing a batch.
- **`get_quota`** — the adaptive quota pool: guaranteed slice, used amount, burst
  headroom, tomorrow's guarantee, and the reset clock. Read before planning any
  batch so you don't promise what the quota can't deliver.

## Notes

- Connecting accounts is done by the account owner through the invite link, not by
  the assistant — you mint the link, they complete the OAuth.
- When a publish fails, `get_post_target` reports the platform's own failure reason;
  share it verbatim rather than guessing.
