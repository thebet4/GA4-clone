# Step 3: Workers process events asynchronously

## Purpose

Workers consume events from the queue and perform enrichment and processing tasks.

## Responsibilities

- **Raw Consumer**: Validates and saves every incoming event to ClickHouse for auditing and reprocessing.
- **Enriched Consumer**: Enriches data (geoIP, device info), stitches sessions, and computes aggregated metrics for PostgreSQL.

## Technology

- Node.js / TypeScript
- Queue client library (RabbitMQ)
