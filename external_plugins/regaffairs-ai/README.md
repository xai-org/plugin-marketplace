# RegAffairs AI plugin for Grok Build

Connect Grok Build to [RegAffairs AI](https://regaffairsai.com): cited answers over
regulator-published data for chemical, food, pharma, EHS, cosmetic, biocide, pesticide
and textile compliance work. Every result carries the source document's title, date and
a link to the stored document, so each claim can be checked.

## Installation

In Grok Build, open `/plugin`, search for **RegAffairs AI**, and install.

On first connection, Grok opens the RegAffairs AI sign-in in your browser. Sign in with a
RegAffairs AI account and approve access. No API key is needed and nothing should be
pasted into chat.

## What you get

- **MCP server** `regaffairs-ai` at `https://mcp.regaffairsai.com/mcp` (Streamable HTTP, OAuth 2.1).

### Tools

| Area | Tools |
|---|---|
| Full answers | `regaffairs_ask_question`, `regaffairs_get_answer_status` |
| Search and coverage | `regaffairs_search_regulations`, `regaffairs_list_covered_regulations` |
| Chemicals | `regaffairs_check_chemical_substance`, `regaffairs_get_ghs_hazard_classification`, `regaffairs_get_workplace_exposure_limits` |
| Food | `regaffairs_check_food_additive_or_ingredient`, `regaffairs_check_food_label_and_allergens` |
| Cosmetics | `regaffairs_check_cosmetic_ingredient` |
| Pesticides and biocides | `regaffairs_check_pesticide_approval_and_mrl`, `regaffairs_check_biocide_active_substance` |
| Pharma and devices | `regaffairs_find_pharma_gmp_and_ich_guidance`, `regaffairs_check_drug_or_device_approval` |
| Textiles | `regaffairs_check_textile_restricted_substances` |

Every tool carries MCP annotations. The lookup tools are read-only.
`regaffairs_ask_question` runs the RegAffairs AI agent, saves the question to your
RegAffairs AI history and counts on your plan.

## Example prompts

- "Is bisphenol A (CAS 80-05-7) on the REACH SVHC Candidate List, and what does REACH Annex XVII restrict for it?"
- "Give the harmonised CLP classification of formaldehyde: hazard statements, pictograms and signal word for my SDS."
- "Is titanium dioxide (E171) still authorised as a food additive in the EU? Cite the regulation that changed it."
- "Can salicylic acid go in an EU leave-on cosmetic? Give the Annex III limits and conditions for each product type."

## Authentication and network

The plugin connects only to RegAffairs AI hosts. Authentication is OAuth 2.1
authorization code with PKCE (S256) and dynamic client registration; Grok handles the flow.

Network endpoints:

- `https://mcp.regaffairsai.com/mcp`: hosted MCP (Streamable HTTP)
- `https://mcp.regaffairsai.com/.well-known/oauth-protected-resource`: resource metadata
- `https://regaffairsai.com/.well-known/oauth-authorization-server`: authorization server metadata
- `https://regaffairsai.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 + DCR
- `https://regaffairsai.com` and `https://clerk.regaffairsai.com`: human sign-in and consent screen

Credentials: a RegAffairs AI account. The access token (scope `regaffairs.read`) is sent
as `Authorization: Bearer` on `/mcp`. The plugin stores no API key and requests no
filesystem or shell access. Answers are research, not legal advice.

Docs: https://regaffairsai.com/docs/mcp. Support: hello@regaffairsai.com.

## License

MIT for the files in this plugin. Use of the hosted service is governed by the
[RegAffairs AI terms](https://regaffairsai.com/termsofservice) and
[privacy policy](https://regaffairsai.com/privacypolicy).
