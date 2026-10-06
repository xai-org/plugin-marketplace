# AI Applyd plugin for Grok Build

Connect Grok Build to [AI Applyd](https://aiapplyd.com), the job search app that finds roles
that fit your resume, tailors the resume and cover letter for each one, and submits the
application on the employer's own hiring system.

## Installation

In Grok Build, open `/plugin`, search for **AI Applyd**, and install.

On first connection, Grok opens the AI Applyd sign-in in your browser. Sign in with Google or an
email link. No API key is needed and nothing should be pasted into chat.

## What you get

- **MCP server** `aiapplyd` at `https://mcp.aiapplyd.com/mcp` (Streamable HTTP, OAuth 2.1 with
  PKCE and dynamic client registration).
- **Skills** that show Grok how to use the tools well:
  - `find-matching-jobs`: pull your matched jobs and skip the ones that do not fit.
  - `tailor-for-a-job`: rewrite your resume and cover letter for one posting.
  - `apply-to-a-job`: apply to a job, in auto mode or held for your review.
  - `review-and-send`: approve, reject or refine applications waiting for review.
  - `track-applications`: see where every application stands and what the employer confirmed.

Sending an application to an employer always asks you to confirm first, and it needs a paid
AI Applyd plan. Matching, resume and cover letter work, and tracking run on any account.

## Links

- Setup guide for every app: https://aiapplyd.com/mcps
- Source and manifests: https://github.com/aiapplyd/aiapplyd-mcp
- Support: ava@aiapplyd.com

## License

MIT
