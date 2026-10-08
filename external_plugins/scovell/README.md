# Scovell by Rotunda

Connect your assistant to [Scovell](https://scovell.rotundahq.com) for sanctions,
politically exposed person (PEP) and adverse-media screening, with records for
human review and filing. An approved Scovell account is required for connector
access; account permissions and usage limits apply.

## Connect

Once this submission is accepted, install Scovell from the Grok plugin marketplace.
Until then, add the hosted MCP directly:

`https://scovell.rotundahq.com/mcp`

In Grok Bot, ask it to add that URL. Open the connection card, sign in to Scovell,
choose **Approve connection**, then return to Grok Bot. Do not paste passwords,
verification codes or access tokens into chat.

For a first check, ask: "Use Scovell to show my recent screenings."
The owner has tested custom-connector sign-in and a company screening in Grok Bot.
Marketplace installation remains subject to this submission's review.

## Tools

- `screen_name`: screen a person or company, with available identifying details.
- `screen_batch`: screen multiple subjects within the account's limits.
- `get_screening`: retrieve a saved screening and its candidate matches.
- `list_screenings`: retrieve screening history available to the account.
- `record_disposition`: save a true-match or false-positive decision and rationale.

Results are candidate matches, not identity confirmations or clearance. Review
the sources and identifying details before making or recording a match decision.
Screening tools create records; the disposition tool changes the stored review
decision. These operations should reflect the user's request and judgement.

## Authentication, network and data

This package contains only metadata and a hosted MCP configuration. It has no
local executable, install script, hooks, environment-variable requirements or
filesystem access. It does not contain API keys or other credentials.

- `https://scovell.rotundahq.com/mcp`: Streamable HTTP MCP endpoint.
- `https://scovell.rotundahq.com/.well-known/oauth-protected-resource` and
  `/.well-known/oauth-authorization-server`: OAuth discovery.
- `https://scovell.rotundahq.com/oauth/register`, `/oauth/authorize` and
  `/oauth/token`: public-client registration, approval and token exchange using
  OAuth with PKCE S256. The client stores the resulting credentials.
- `https://scovell.rotundahq.com/connect/`: browser approval page. Scovell sign-in
  uses Firebase Authentication for the `scovell-screening` project, including
  `scovell-screening.firebaseapp.com`, `identitytoolkit.googleapis.com` and
  `securetoken.googleapis.com`. The page calls Scovell account endpoints under
  `https://europe-west2-scovell-screening.cloudfunctions.net`.

Names, identifiers and review decisions supplied to tools are sent to Scovell and
stored in account-scoped screening records. Adverse-media requests may use
external news/search and AI services. Do not submit information you are not
authorised to process. See the [terms](https://scovell.rotundahq.com/terms/) and
[privacy page](https://scovell.rotundahq.com/privacy/); the privacy page is
currently explicitly marked as a pilot placeholder pending a complete notice.

Product and support: [Rotunda](https://rotundahq.com), scovell@rotundahq.com.

## License

Proprietary. See [LICENSE](LICENSE) for permission to distribute this connector
package in the marketplace. The hosted service remains governed by Scovell's
terms; this package does not publish or license its private application source.
