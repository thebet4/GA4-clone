# Step 2: API receives events and pushes them to a queue

## Purpose

The API is the ingestion layer that accepts events from the SDK/Client and forwards them to the RabbitMQ fan-out exchange. It is designed to be high-performance and lightweight to handle millions of events.

## Endpoints

### 1. `POST /collect/`

Receives a single event.

**Payload:**

```json
{
  "projectId": "550e8400-e29b-41d4-a716-446655440000",
  "eventName": "page_view",
  "timestamp": 1736719469000,
  "clientId": "client_123",
  "sessionId": "session_456",
  "path": "/home",
  "params": {
    "key": "value"
  }
}
```

### 2. `POST /collect/batch`

Receives an array of events (batching is recommended for high-traffic sites).

**Payload:** `Event[]`

## Data Validation (Zod)

We use `zod` for strict runtime validation. Any request that does not match the schema is automatically rejected with a `400 Bad Request`.

| Field       | Type     | Required | Description                                  |
| :---------- | :------- | :------- | :------------------------------------------- |
| `projectId` | `UUID`   | Yes      | Validates the target project.                |
| `eventName` | `String` | Yes      | e.g., `page_view`, `click`, `purchase`.      |
| `timestamp` | `Number` | Yes      | Unix timestamp (milliseconds).               |
| `clientId`  | `String` | Yes      | Anonymous user identifier.                   |
| `sessionId` | `String` | Yes      | Analytics session identifier.                |
| `params`    | `Object` | No       | Custom properties associated with the event. |

## Responsibilities

- **Ingestion**: Accept HTTP POST requests.
- **Validation**: Ensure data integrity via Zod schemas.
- **Normalization**: Convert camelCase keys to snake_case for the internal pipeline.
- **Queuing**: Publish events to the `event_exchange` (fan-out).
- **Acknowledgment**: Respond with `{ "status": "ok" }` to the client.

## Technology

- **Fastify**: High-performance Node.js framework.
- **Type Provider Zod**: For automatic JSON validation and TypeScript types.
- **Pino**: For structured, low-overhead logging.

## Error Handling

The API returns a `500 Internal Server Error` or a `{ "status": "error" }` response if the event cannot be pushed to the queue, ensuring the SDK knows the delivery failed.
