# Estimatiz plugin for Grok Build

Connect Grok Build to [Estimatiz](https://www.estimatiz.fr) to search French
addresses and estimate residential property values from official DVF property
sales data.

The hosted MCP exposes two tools:

- `search_addresses` resolves a French address before an estimate.
- `estimate_property` calculates a low, median and high estimate, returns the
  price per square metre and comparable sales, saves the estimate, and provides
  a shareable report URL.

## Installation

In Grok Build, open `/plugin`, search for **Estimatiz**, and install it. No
Estimatiz account, API key, OAuth flow, or other credential is required.

## Network access and data

The plugin connects only to the public Streamable HTTP MCP endpoint:

- `https://www.estimatiz.fr/api/mcp.php`

The tools receive the property details supplied for the estimate. Estimatiz
stores each generated estimate so the returned report can be shared. See the
[API documentation](https://www.estimatiz.fr/api-documentation) and
[privacy policy](https://www.estimatiz.fr/confidentialite).

Estimates are informational and do not replace an appraisal by a qualified
real-estate professional. The response includes its sources, limits, and the
shareable report URL.

## License

Proprietary. Use of the hosted MCP is governed by Estimatiz's terms and privacy
policy.
