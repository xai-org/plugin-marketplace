# SearchApi plugin for Grok Build

Connect Grok Build to [SearchApi](https://www.searchapi.io), a real-time SERP API that
returns search results as structured JSON. Search Google (web, Maps, Shopping, Flights,
Hotels, News, Scholar, Images, Jobs, Trends), Bing, YouTube, Amazon and 100+ other
engines through the hosted SearchApi MCP server, one tool per engine.

## Installation

In Grok Build, open `/plugin`, search for **SearchApi**, and install.

On first connection, Grok opens the SearchApi sign-in in your browser. Authorize with the
SearchApi account you want Grok to search with and pick the MCP integration to use. No
API key is needed and nothing should be pasted into chat.

## What you get

- **MCP server** `searchapi` at `https://www.searchapi.io/mcp` (Streamable HTTP, OAuth 2.1).
- **Skill** `searchapi`: how to pick the right engine tool, how to localize a search
  (`gl`, `hl`, `location`), how to page through results, and what the response fields mean.

### Tools

One tool per engine or endpoint, around 185 at the time of writing. The main groups:

| Area | Tools (examples) |
|---|---|
| Google | Google (web search), Google Search Light, Google AI Mode, Google Images, Google Reverse Image, Google Lens, Google News, Google Scholar (plus Case Law, Cases, Courts), Google Jobs, Google Jobs Listing, Google Patents, Google Product, Google Shopping, Google Local, Google Local Services, Google Events, Google Trends, Google Finance, Google Books, Google Play, Google Rank Tracking, Google Ads |
| Google Maps and travel | Google Maps Search, Place, Reviews, Photos, Directions, Autocomplete; Google Flights (One Way, Round Trip, Calendars, Deals); Google Hotels, Price Calendar, Property; Google Vacation Rentals; Google Travel Explore |
| Other search engines | Bing Search, Bing News, Bing Shopping, Bing Maps; DuckDuckGo; Yahoo; Baidu News; Naver News |
| Video and social | YouTube Search, Video, Transcript, Channel, Trending Shorts; TikTok (Search, Video, Profile, Comments, Transcript, Ads); Instagram; Reddit; Pinterest; LinkedIn (Jobs, People, Ads) |
| Shopping | Amazon (Search, Product, Offers, Deals, Author, Store); eBay; Walmart; Best Buy; Home Depot; Flipkart; Lazada; AliExpress; Steam |
| Travel and places | Airbnb, Booking.com, Expedia, Kayak, Skyscanner, Tripadvisor, Apple Maps, Yellow Pages |
| Jobs, reviews, real estate | Indeed, ZipRecruiter, Glassdoor, Trustpilot, Capterra, Reviews.io, Zillow, Realtor, Redfin |
| Developer and AI | GitHub (Search, Repository, Profile, Trending), Apple Appstore, Google Play, ChatGPT, Gemini |

Full list with example prompts: https://www.searchapi.io/integrations/mcp#tools

## Example prompts

- "Search Google for the latest Rust 2.0 release notes and summarize the top results."
- "What are the top 10 results on Google for 'best espresso machine' in Germany, in German?"
- "Find the newest Google News stories about the Fed rate decision."
- "Look up the Google Scholar citations for 'Attention Is All You Need'."
- "Get the transcript of this YouTube video and give me the key points."
- "Compare the Amazon price and rating of these three ASINs."

## Authentication and network

The plugin connects only to `https://www.searchapi.io`. Authentication is OAuth 2.1
authorization code with PKCE and dynamic client registration; Grok handles the flow.

Network endpoints:

- `https://www.searchapi.io/mcp`: hosted MCP (Streamable HTTP)
- `https://www.searchapi.io/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 + DCR
- `https://www.searchapi.io/.well-known/oauth-authorization-server`, `/.well-known/oauth-protected-resource/mcp`: discovery metadata

Credentials: a SearchApi account. The MCP server exchanges the grant for a token scoped
to one MCP integration in that account and expects it as `Authorization: Bearer` on
`/mcp`. The plugin stores no API key and requests no filesystem or shell access. Each
tool call counts as one SearchApi API request against the account's plan.

## Token authentication

Clients without OAuth support can send a static MCP token from the
[MCP integrations dashboard](https://www.searchapi.io/mcp_integrations) in an
`X-MCP-Token` header instead. This plugin uses OAuth on purpose; see
[the MCP docs](https://www.searchapi.io/integrations/mcp) for the token setup.

## License

MIT for the files in this plugin. Use of the hosted MCP server is governed by the
[SearchApi terms](https://www.searchapi.io/legal/terms) and
[privacy policy](https://www.searchapi.io/legal/privacy).
