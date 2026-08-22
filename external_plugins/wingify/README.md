# Wingify

Optimize Digital Experiences. Official Wingify MCP server integration — connects Grok to your
Wingify (VWO) account so you can analyze experimentation performance, review behavior insights,
and manage testing campaigns directly from your agent: create and manage A/B and split URL
campaigns, create and toggle feature flags and rules, calculate sample sizes, and fetch campaign
reports and Feature Management & Experimentation (FME) metrics — all with natural-language
queries, no manual exporting or copy/pasting required.

- MCP server: `https://mcp.wingify.ai/mcp` (OAuth)
- Homepage: https://vwo.com/ai
- API docs: https://help.wingify.com/hc/en-us/articles/58792565345305-Connect-Wingify-with-AI-Tools-using-Wingify-s-MCP-Server

## Network endpoints

This plugin only connects to the Wingify-hosted MCP endpoint above. Authentication is handled via
OAuth when the connector is first used; no credentials are stored in this repo.
