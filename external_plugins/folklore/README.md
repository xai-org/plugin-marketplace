# Folklore Clinical Variant Interpretation MCP for Grok Build

ACMG/AMP germline variant classification, gene profiles, disease associations and literature.

This connection package defines one hosted Streamable HTTP MCP server:

`https://api.helena.bio/folklore/v1/mcp`

The supplied connection exposes 11 public tools without an account or API key. Clients configured separately with a Folklore Bearer API key can access 18 additional case, approved-source and report tools at the same endpoint. The configuration contains no local server command, shell hook, executable package, credential or filesystem access. It connects to the public hosted endpoint; the scientific backend is not bundled.

## Versions and tools

The connection package version is 1.0.0. The hosted Folklore MCP adapter is 2.0.0 with eleven public tools: `classify_germline_variant`, `search_variant_literature`, `get_publication_details`, `search_literature_corpus`, `get_gene_disease_associations`, `search_disease_genes`, `resolve_gene`, `get_gene_profile`, `get_gene_section` and `search_gene_literature`, plus the separate `support_helena` helper, used only when explicitly requested.

Classification accepts one public GRCh38 germline nuclear SNV or simple indel smaller than 50 bp. Keep patient, phenotype, family or private-case information and genomic files out of the public connection. Results require qualified professional review and are not patient diagnoses or treatment recommendations. Preserve source attribution, snapshot identity and unavailable outcomes in gene and disease results.

## Connection and verification

The only configured network destination is the public endpoint above. No hooks, agents, telemetry or tool allowlist are configured. A client connection sees the hosted server's advertised tools.

Metadata-only HTTPS discovery on 2 November 2026 at 21:38 UTC completed initialize (200), notifications/initialized (202) and tools/list (200), negotiating protocol 2025-11-25 and discovering all eleven tools without a next page. This verifies transport and discovery only. No scientific tools/call or Grok Build runtime installation was performed.

Setup and scope: https://folklore.helena.bio/integrations/mcp

Current server card: https://folklore.helena.bio/.well-known/mcp/server-card.json

Public adapter and contracts: https://github.com/helena-bioinformatics/folklore-mcp

## License

This connection package is Apache-2.0. That licence applies to this configuration and the public adapter and contracts; it does not make the hosted scientific backend or its datasets open source. See LICENSE.
