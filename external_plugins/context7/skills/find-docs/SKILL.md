---
name: find-docs
description: >-
  Retrieves up-to-date documentation, API references, and code examples for any
  developer technology. Use this skill whenever the user asks about a specific
  library, framework, SDK, CLI tool, or cloud service — even for well-known ones
  like React, Next.js, Prisma, Express, Tailwind, Django, or Spring Boot. Your
  training data may not reflect recent API changes or version updates.

  Always use for: API syntax questions, configuration options, version migration
  issues, "how do I" questions mentioning a library name, debugging that involves
  library-specific behavior, setup instructions, and CLI tool usage.

  Use even when you think you know the answer — do not rely on training data
  for API details, signatures, or configuration options as they are frequently
  outdated. Always verify against current docs. Prefer this over web search for
  library documentation and API details.
---

# Documentation Lookup

Retrieve current documentation and code examples for any library using the Context7 MCP tools.

## Workflow

Two-step process: resolve the library name to an ID, then query docs with that ID.

```text
# Step 1: Resolve library ID
resolve-library-id({
  "libraryName": "<name>",
  "query": "<what to look up>"
})

# Step 2: Query documentation
query-docs({
  "libraryId": "<libraryId>",
  "query": "<what to look up>"
})
```

You MUST call `resolve-library-id` first to obtain a valid library ID UNLESS the user explicitly provides a library ID in the format `/org/project` or `/org/project/version`.

IMPORTANT: Do not call either tool more than 3 times per question. If you cannot find what you need after 3 attempts, use the best result you have.

## Step 1: Resolve a Library

`resolve-library-id` resolves a package or product name to a Context7-compatible library ID and returns matching libraries.

```text
resolve-library-id({
  "libraryName": "React",
  "query": "How to clean up useEffect with async operations"
})

resolve-library-id({
  "libraryName": "Next.js",
  "query": "How to set up app router with middleware"
})

resolve-library-id({
  "libraryName": "Prisma",
  "query": "How to define one-to-many relations with cascade delete"
})
```

Use the official library name with proper punctuation (e.g., "Next.js" not "nextjs", "Customer.io" not "customerio", "Three.js" not "threejs"). If results look wrong, try alternate spellings such as `next.js` before changing the query.

Always pass a `query` argument — it is required and directly affects result ranking. Use the user's intent to form the query, which helps disambiguate when multiple libraries share a similar name. Do not include any sensitive or confidential information such as API keys, passwords, credentials, personal data, or proprietary code in your query.

### Result fields

Each result includes:

- **Library ID** — Context7-compatible identifier (format: `/org/project`)
- **Name** — Library or package name
- **Description** — Short summary
- **Code Snippets** — Number of available code examples
- **Source Reputation** — Authority indicator (High, Medium, Low, or Unknown)
- **Benchmark Score** — Quality indicator (100 is the highest score)
- **Versions** — List of versions if available. Use one of those versions if the user provides a version in their query. The format is `/org/project/version`.

### Selection process

1. Analyze the query to understand what library or package the user is looking for
2. Select the most relevant match based on:
   - Name similarity to the query (exact matches prioritized)
   - Description relevance to the query's intent
   - Documentation coverage (prioritize libraries with higher Code Snippet counts)
   - Source reputation (consider libraries with High or Medium reputation more authoritative)
   - Benchmark score (higher is better, 100 is the maximum)
3. If multiple good matches exist, acknowledge this but proceed with the most relevant one
4. If no good matches exist, clearly state this and suggest query refinements
5. For ambiguous queries, request clarification before proceeding with a best-guess match

### Version-specific IDs

If the user mentions a specific version, use a version-specific library ID:

```text
# General (latest indexed)
query-docs({
  "libraryId": "/vercel/next.js",
  "query": "How to set up app router"
})

# Version-specific
query-docs({
  "libraryId": "/vercel/next.js/v14.3.0-canary.87",
  "query": "How to set up app router"
})
```

The available versions are listed in the `resolve-library-id` output. Use the closest match to what the user specified.

## Step 2: Query Documentation

`query-docs` retrieves up-to-date documentation and code examples for the resolved library.

```text
query-docs({
  "libraryId": "/facebook/react",
  "query": "How to clean up useEffect with async operations"
})

query-docs({
  "libraryId": "/vercel/next.js",
  "query": "How to add authentication middleware to app router"
})

query-docs({
  "libraryId": "/prisma/prisma",
  "query": "How to define one-to-many relations with cascade delete"
})
```

### Writing good queries

The query directly affects the quality of results. Be specific and include relevant details, but keep each query to one topic — if the question spans multiple distinct concepts, make a separate `query-docs` call per concept instead of combining them, unless the question is about how the concepts interact. Do not include any sensitive or confidential information such as API keys, passwords, credentials, personal data, or proprietary code in your query.

| Quality | Example |
|---------|---------|
| Good | `"How to set up authentication with JWT in Express.js"` |
| Good | `"React useEffect cleanup function with async operations"` |
| Bad (too vague) | `"auth"` |
| Bad (too vague) | `"hooks"` |
| Bad (too broad) | `"routing and auth and caching in Next.js"` |

Describe what to look up in the library's documentation, rather than the task to complete — vague one-word queries return generic results, and multi-topic queries dilute ranking and return shallow results for each topic.

The output contains two types of content: **code snippets** (titled, with language-tagged blocks) and **info snippets** (prose explanations with breadcrumb context).

## Authentication

The Context7 MCP server uses OAuth. Grok opens the browser-based authorization flow when authentication is required and stores the resulting token for subsequent sessions.

## Error Handling

If a tool call fails because authentication is required, complete Grok's Context7 OAuth flow and retry it.

If a tool call fails with a quota error ("Monthly quota reached" or "quota exceeded"):

1. Inform the user their Context7 quota is exhausted
2. Suggest they check their Context7 account or plan at `https://context7.com/dashboard`
3. If they cannot continue, answer from training knowledge and clearly note it may be outdated

Do not silently fall back to training data — always tell the user why Context7 was not used.

## Common Mistakes

- Library IDs require a `/` prefix — `/facebook/react` not `facebook/react`
- Always call `resolve-library-id` first — `query-docs` requires a valid Context7 library ID
- Use descriptive queries, not single words — `"React useEffect cleanup function"` not `"hooks"`
- One topic per query — split `"routing and auth and caching"` into a separate `query-docs` call per concept, unless the question is about how they interact
- Do not include sensitive information (API keys, passwords, credentials) in queries
