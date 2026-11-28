# PATFEE for Grok Build

PATFEE is a free calculator for international patent family costs. It estimates official fees, professional fees and renewals, compares two or three scenarios, and generates a PDF for an individual estimate. This plugin is prepared by GIG Inventions Sàrl.

The plugin connects via Streamable HTTP to `https://patfee.org/mcp`. PDF downloads are also served from `patfee.org`. PATFEE requires no credentials. The files contain one skill and one MCP configuration. [Website](https://patfee.org/?l=en) · [Privacy policy](https://patfee.org/privacy?l=en) · [Support](https://gig-inventions.com/en/contact)

From the directory containing this `patfee` folder, run the following commands in Grok Build.

```sh
grok plugin validate ./patfee
grok plugin install ./patfee --trust
grok mcp doctor patfee
```

Open a new session and try “Use PATFEE to list supported filing routes, currencies and PDF report languages.”

## License

The integration files are available under the [PATFEE Grok Build Integration License](LICENSE).
Use of the hosted PATFEE service is governed by the [PATFEE Terms of Service](https://patfee.org/terms?l=en).
