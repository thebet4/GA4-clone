# Step 1: SDK collects events from the client

## Purpose
The SDK runs in the user’s browser or app and collects events like pageviews, clicks, and custom interactions.

## Responsibilities
- Capture user interactions
- Identify users and sessions
- Batch events for efficient sending
- Retry failed requests

## Example Event Payload
```json
{
  "event": "page_view",
  "timestamp": 1730000000,
  "user_id": "anon_123",
  "session_id": "sess_001",
  "url": "/pricing",
  "referrer": "google"
}
