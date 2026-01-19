# @ga4-clone/sdk

Analytics SDK for GA4 Clone - A lightweight, type-safe analytics tracking library.

## Features

- 🎯 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 🚀 **Lightweight**: Minimal bundle size with tree-shaking support
- 🔒 **Privacy-First**: Uses `sendBeacon` API for reliable, non-blocking event delivery
- 📦 **Modern**: Built with ESM, supports modern browsers
- 🎨 **OOP Design**: Clean class-based architecture
- 🔑 **Auto ID Management**: Automatic client and session ID tracking

## Installation

```bash
npm install @ga4-clone/sdk
```

## Usage

### Basic Setup

```typescript
import { analytics } from "@ga4-clone/sdk";

// Initialize the SDK
analytics.init({
  endpoint: "https://your-analytics-api.com/events",
  projectId: "123e4567-e89b-12d3-a456-426614174000", // Required UUID
});

// Track events
analytics.track("page_view", {
  page: "/home",
  title: "Home Page",
});

analytics.track("button_click", {
  buttonId: "cta-signup",
  location: "hero",
});
```

### Using Multiple Instances

```typescript
import { Analytics } from "@ga4-clone/sdk";

const productionAnalytics = new Analytics();
productionAnalytics.init({
  endpoint: "https://prod-api.com/events",
  projectId: "123e4567-e89b-12d3-a456-426614174000",
});

const devAnalytics = new Analytics();
devAnalytics.init({
  endpoint: "https://dev-api.com/events",
  projectId: "987fcdeb-51a2-43f7-8dbc-123456789abc",
});
```

### Client and Session IDs

The SDK automatically manages client and session IDs:

- **Client ID**: Persistent across sessions (stored in `localStorage`)
- **Session ID**: Valid only for the current session (stored in `sessionStorage`)

```typescript
// Get the current client ID
const clientId = analytics.getClientId();

// Get the current session ID
const sessionId = analytics.getSessionId();
```

## API Reference

### `Analytics`

Main analytics class for tracking events.

#### Methods

##### `init(options: AnalyticsConfig): void`

Initialize the SDK with configuration.

**Parameters:**

- `options.endpoint` (required): API endpoint URL
- `options.projectId` (required): Project UUID

**Throws:\*\***

- Error if `endpoint` or `projectId` is not provided

##### `track(eventName: string, params?: Record<string, any>): void`

Track an analytics event.

**Parameters:**

- `eventName`: Event name/type
- `params`: Custom event parameters (optional)

**Example:**

```typescript
analytics.track("purchase", {
  productId: "123",
  price: 29.99,
  currency: "USD",
});
```

##### `isInitialized(): boolean`

Check if the SDK is initialized.

##### `getConfig(): AnalyticsConfig | null`

Get current configuration.

##### `getClientId(): string | null`

Get the current client ID (persistent user identifier).

##### `getSessionId(): string | null`

Get the current session ID (session-specific identifier).

## Event Payload Structure

Events sent to the backend match this structure:

```typescript
{
  projectId: string        // Project UUID
  eventName: string        // Event name/type
  timestamp: number        // Unix timestamp (milliseconds)
  clientId: string         // Persistent user ID
  sessionId: string        // Current session ID
  path?: string            // Current page path
  referrer?: string        // Referrer URL
  params?: object          // Custom event data
  sdkName: string          // "@ga4-clone/sdk"
  sdkVersion: string       // SDK version
}
```

## Development

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Watch mode for development
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
```

## License

MIT
