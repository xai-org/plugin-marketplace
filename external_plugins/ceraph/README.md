# Ceraph for Grok Build

[Ceraph](https://ceraph.dev) drives and tests your React Native and Expo apps end-to-end on iOS and Android, on real devices, simulators, and emulators. Grok can read structured screen snapshots, tap, type, swipe, scroll, open deep links, take screenshots, reload the app, start Metro, build for iOS and Android, and read runtime errors and console logs.

## What this plugin installs

One local MCP server, started over stdio:

```
npx -y @ceraph/react-native-mcp@latest
```

The server is the published npm package [`@ceraph/react-native-mcp`](https://www.npmjs.com/package/@ceraph/react-native-mcp), maintained by Ike Studios LLC. This plugin ships no hooks, skills or scripts.

## Requirements

- A React Native or Expo project. Run `npx @ceraph/react-native-mcp@latest init` in the project once to set it up.
- iOS: macOS with Xcode and an iOS Simulator or device. Android: the Android SDK with an emulator or device (macOS, Windows or Linux).
- Node.js `^20.19.0`, `^22.12.0` or `>=24.0.0`.

## Network endpoints and credentials

- The server drives devices on your machine through Metro, WebDriverAgent (iOS) and UIAutomator2 (Android), all local.
- It contacts `ceraph.dev` for account sign-in, plan and catalog checks, and installation analytics.
- Installation analytics are minimal and on by default. Turn them off with `ceraph analytics off` or `CERAPH_TELEMETRY=0`. See the [Privacy Policy](https://ceraph.dev/privacy).
- No API key is needed to start. Pro features use a Ceraph account sign-in.

## License

Proprietary. See the [Ceraph Software License Agreement](https://ceraph.dev/license.txt).

## Docs and support

- Setup: https://ceraph.dev/docs/get-started
- Support: support@ceraph.dev
