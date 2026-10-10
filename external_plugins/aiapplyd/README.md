# AI Applyd plugin for Grok Build

Find jobs matched to your resume, tailor each application, and apply on the employer's own hiring site from Grok Build. AI Applyd supports 34 hiring systems, including Workday, Greenhouse, Lever and Ashby. Send automatically or hold applications for your review and approval. Track each application and the employer confirmation it receives.

## Connect your account

Open `/plugin` in Grok Build and find AI Applyd in the marketplace. The connector opens AI Applyd sign-in in your browser. Sign in with Google or an email link. Do not paste passwords, API keys or access tokens into chat.

The plugin connects to `https://mcp.aiapplyd.com/mcp` over Streamable HTTP with OAuth 2.1, PKCE and dynamic client registration. The only service domains are `aiapplyd.com` and `mcp.aiapplyd.com`. Setup guides for compatible clients are at https://aiapplyd.com/mcps.

## Ten workflow skills

- `setup-job-search`: add your resume, set job preferences and check account readiness.
- `find-matching-jobs`: read matched roles, save or skip them and refine your search.
- `tailor-for-a-job`: compare your resume with a role and prepare tailored application documents.
- `write-cover-letter`: write a letter from your saved resume-builder document or revise an existing application's letter.
- `prepare-for-interview`: practise role-specific questions, answer guidance and STAR examples.
- `translate-resume`: translate a saved resume-builder document for another language.
- `build-resume-document`: create a private editable draft to finish and export in the resume builder.
- `apply-to-a-job`: submit an application or prepare it for review.
- `review-and-send`: inspect prepared documents, request changes and approve applications you want to send.
- `track-applications`: read status, employer confirmations and your remaining allowance.

The hosted server exposes 17 tools. These skills guide their use without running hooks, shell scripts or bundled executable code.

## Account access and actions

Connect an AI Applyd account to use its saved resume, preferences and application history. Account reads do not generate AI content. AI generation uses the account's AI token balance and action limits. Sending an application uses its application allowance.

Applying sends the user's information to an employer. The skills require clear authorization for the named jobs and distinguish automatic sending from review mode. Review mode holds the application until the user approves it. A submit click is not employer confirmation; report only the evidence returned by AI Applyd.

## Release and support

This package matches the ten skills in [AI Applyd 1.8.4](https://github.com/aiapplyd/aiapplyd-mcp/releases/tag/v1.8.4). Source: https://github.com/aiapplyd/aiapplyd-mcp. Support: https://aiapplyd.com/support.

MIT licensed.
