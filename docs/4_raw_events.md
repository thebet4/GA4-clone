# Step 4: Raw events are stored in ClickHouse for reprocessing

## Purpose

Raw events are stored in a database for auditing, debugging, and future reprocessing. This layer ensures that we never lose the original data received from the SDKs.

## Characteristics

- **Append-only storage**: Data is never modified once written.
- **Highly granular**: Every single event is stored with all its parameters.
- **Immutable and complete**: Serves as the "Source of Truth".
- **Enables re-computation**: If aggregation logic changes, we can re-process all raw events.

## Data Model (ClickHouse)

The `raw_events` table is optimized for high-volume ingestion and fast analytical queries.

| Field         | Type                     | Description                                        |
| :------------ | :----------------------- | :------------------------------------------------- |
| `project_id`  | `UUID`                   | Unique identifier for the project/website.         |
| `event_id`    | `UUID`                   | Unique identifier for the specific event instance. |
| `event_name`  | `LowCardinality(String)` | Name of the event (e.g., `page_view`, `click`).    |
| `timestamp`   | `DateTime64(3)`          | When the event occurred on the client side.        |
| `received_at` | `DateTime64(3)`          | When the event was received by our server.         |
| `client_id`   | `String`                 | Unique identifier for the user/browser.            |
| `session_id`  | `String`                 | Unique identifier for the user session.            |
| `path`        | `String`                 | The URL path where the event occurred.             |
| `referrer`    | `String`                 | The referring URL.                                 |
| `params`      | `JSON`                   | Dynamic key-value pairs associated with the event. |
| `sdk_name`    | `LowCardinality(String)` | Name of the SDK used (e.g., `web-sdk`).            |
| `sdk_version` | `String`                 | Version of the SDK.                                |
| `ip`          | `String`                 | Client IP address (for GeoIP enrichment).          |
| `user_agent`  | `String`                 | Client User Agent (for device enrichment).         |

## Storage Engine

- **Engine**: `MergeTree`
- **Partitioning**: Monthly (`toYYYYMM(timestamp)`)
- **Ordering**: `(project_id, event_name, timestamp)`
