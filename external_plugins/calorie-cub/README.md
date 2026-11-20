# Calorie Cub for Grok

Calorie Cub is a food diary by Intuico Digital, LLC. Connect your own account to search foods, log meals, check calories and macros, save private recipes, manage favorites, and record weight and goals. Nutrition information is not medical advice.

## Connect

This package declares the hosted Streamable HTTP MCP server at https://mcp.caloriecub.com/mcp. On first connect, sign in with Apple or Google and approve the requested scopes. OAuth 2.1 uses PKCE and dynamic client registration. No local executable, dependency installation, hook, telemetry, or bundled credential is required.

Read access uses `diary:read`. Optional writes use `diary:write`, `library:write`, and `goals:write`. Free plans have read-only access after beta; Pro enables writes. During beta, all accounts have Pro limits. Daily and per-minute quotas apply. Disconnect the app in Calorie Cub Settings to revoke its access immediately.

Try: “What did I eat on October 29, 2026?”, “Search for banana”, or “Show my calorie and protein goals.” Confirm quantities and servings before logging, and confirm deletions or goal changes. All account tools act only on the connected user's account.

## Network and privacy

MCP requests go to `https://mcp.caloriecub.com/mcp`; OAuth discovery, account sign-in, and consent use `https://caloriecub.com/api/auth` and pages on `https://caloriecub.com`. No additional service or local file access is needed. The MCP tools access food logs, recipes, goals, profile preferences, and body-weight entries within the granted scopes. They cannot purchase subscriptions or delete an account.

[Authentication and API docs](https://caloriecub.com/auth.md) · [Privacy](https://caloriecub.com/privacy) · [Terms](https://caloriecub.com/terms) · Support: aj@intuicodigital.com

Copyright 2026 Intuico Digital, LLC. All rights reserved.
