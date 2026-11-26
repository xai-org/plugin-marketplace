# SpecProof

Published by **VidOpt LLC**. Contact: **vidoptdev@gmail.com**.

Search indexed 3GPP, IETF, and MPEG standards and retrieve supporting source
passages. SpecProof provides keyword and semantic retrieval, document discovery,
normative requirement lookup, indexed-version comparisons, and reference graphs.
Coverage depends on the live index. A missing result does not establish that a
requirement is absent from a standard.

## Connect

Install SpecProof from the Grok Build plugin marketplace when the listing becomes
available, then complete the host's OAuth connection to SpecProof. Sign in and
allow access on the first-party SpecProof authorization page. An active SpecProof
account with available query quota is required. Subscriptions are purchased on
the SpecProof website; this plugin does not take payments.

The declared remote MCP endpoint is `https://mcp.specproof.ai/mcp`, using HTTP
transport. OAuth discovery, registration, consent, token exchange, and revocation
use `https://mcp.specproof.ai`. Credentials are entered only on SpecProof's HTTPS
sign-in page and managed through the host's OAuth flow. No API keys, passwords,
client secrets, local commands, lifecycle hooks, or installation scripts are
included. Revoke the dedicated connector credential through API Keys in the
SpecProof account portal.

Tool requests and retrieved source material pass through the hosted SpecProof
service. Test generation uses a server-side model provider with the selected
public normative requirement and its surrounding source clause; no model API key
is needed in the client. Generated tests are drafts with implementation fixtures,
not executed tests or compliance certifications.

## Try it

- Find up to three indexed TS 23.501 passages containing registration. Show the
  filenames and clause labels.
- How does QUIC control stream and connection flow-control limits? Retrieve the
  supporting RFC 9000 text and cite its clauses.
- Compare the latest two indexed versions of TS 23.501 and show normative changes.
- Which standards collections are currently indexed, and how many documents and
  chunks are available?

The standards-research skill explains source checking, version limitations,
equation preservation, and the tool argument formats. The tools cannot modify
the corpus, publish amendments to standards bodies, or issue binding legal
certifications. Extraction page numbers are chunk positions, so cite verified
clauses rather than treating them as printed pagination.

## Links and license

[Website](https://specproof.ai), [documentation](https://docs.specproof.ai/),
[support](https://specproof.ai/support/), [privacy](https://specproof.ai/privacy/),
and [terms](https://specproof.ai/terms/).

The plugin manifests and workflow instructions are MIT licensed. The hosted
service, standards corpus, and existing SpecProof brand assets retain their
existing rights and terms. This source bundle contains no hosted server code,
standards corpus, credentials, or private account data.
