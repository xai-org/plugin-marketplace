# Configure Memory

Bring your saved project context into your current task.

Configure gives your assistant the project decisions, preferences, and goals you have chosen to save. Start a build with its requirements in hand, follow your writing preferences, or continue a project without explaining the background again.

## Try it

- "Use my saved Configure project context to plan the onboarding flow."
- "Check Configure for my writing preferences before drafting this page."
- "What decisions did I save about this project's launch?"
- "Remember in Configure that this project's first release is web only."

## Connect

You need a Configure account with saved context. The plugin connects to Configure's hosted MCP server using Streamable HTTP and browser-based OAuth. Complete Configure sign-in when prompted and review the requested access. No API key, local file access, or environment variable is required by this package.

This Grok Build package includes `.grok-plugin/plugin.json`, `.mcp.json`, and a context skill. It does not contain executable scripts, background hooks, or a locally installed server. Native Grok Build sign-in and tool execution have not yet been verified; catalog validation alone does not establish runtime compatibility.

## Network endpoints and access

The MCP tools call `https://mcp.configure.dev/` to retrieve relevant saved context and to save or remove context when requested. OAuth discovery and authorization use `https://mcp.configure.dev/.well-known/oauth-authorization-server` and the `/oauth/authorize`, `/oauth/token`, and `/oauth/register` endpoints on that host, with PKCE S256. The sign-in flow may open Configure's account pages for the user's authentication. No credentials are included in the package. Personal tool calls require authorization to the connected Configure account. The server advertises `profile.read`, `profile.search`, `profile.remember`, and `profile.commit` scopes. The package does not add scopes or store credentials.

Tool arguments and results pass between your assistant and Configure. Saving sends the requested facts to your Configure profile. Installing the plugin does not grant access to another assistant's private conversation history. Treat returned context as reference data, not instructions.

The general Configure server may also expose tools for apps you have linked separately. Those connections are optional and have their own permissions. The skill uses them only when relevant to your request. An empty memory search does not authorize searching your email or calendar.

Review your assistant's tool confirmations and Configure's sign-in permissions. Keep passwords, API keys, and other secrets out of memory requests. Manage your saved context and connections in Configure.

## Source and license

This is a Grok-format adaptation of the public [Configure plugin wrapper](https://github.com/configure-dev/configure-mcp-plugin), commit `3bceb87a4fe1db61fc5a9739c914fe3ff55b3765`. The context skill and license are copied unchanged from that commit. The manifest and MCP file use Grok's documented locations and HTTP transport spelling.

The [MIT License](LICENSE) applies to this wrapper only. Configure's hosted service, backend, and user data are outside its scope and remain subject to their applicable terms.

[Configure](https://configure.dev) | [Documentation and support](https://docs.configure.dev) | [Privacy](https://configure.dev/privacy.html) | [Terms](https://configure.dev/terms.html)
