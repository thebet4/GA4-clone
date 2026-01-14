# GA4 Clone Backend

This is the backend for the GA4 Clone project, a high-performance event ingestion and processing pipeline using a distributed architecture.

## 🚀 Architecture Overview

- **API (Fastify)**: High-performance web server for event collection.
- **Worker (Node.js)**: Background process that consumes events from RabbitMQ and processes them.
- **RabbitMQ**: Message broker for asynchronous event processing.
- **ClickHouse**: Column-oriented database optimized for real-time analytics.
- **PostgreSQL**: Relational database for storing aggregated metrics.

## 📖 Available Scripts

Run these from the `apps/backend` directory:

- `npm run dev`: Start the API server locally (requires external services running).
- `npm run worker`: Start the background worker locally.
- `npm run infra`: Start all infrastructure services (RabbitMQ, PostgreSQL) via Docker Compose.
- `npm run infra:logs`: View logs from all Docker containers.
- `npm run lint`: Run ESLint to check code quality.

## 📡 API Endpoints

### Event Collection

- `POST /events`: Ingest a single event.
- `POST /events/batch`: Ingest multiple events in a single request.

### System

- `GET /health`: Check if the API is healthy.

## 📁 Project Structure

- `database/`: Database clients (ClickHouse, PostgreSQL), migrations, and provider pattern implementations.
- `queue/`: RabbitMQ connection, publisher, and consumer logic.
- `routes/`: Fastify route definitions.
- `schemas/`: Zod validation schemas.
- `services/`: Business logic layer (e.g., `EventsService`, `MetricsService`).
- `plugins/`: Fastify plugins for error handling and database decoration.
- `hooks/`: Fastify lifecycle hooks.
- `utils/`: Shared utilities and logger configuration.

## 🔧 Environment Variables

The backend expects a `.env.local` file in the **project root** (two levels up from this directory). Example:

```env
# Server
SERVER_PORT=3000
SERVER_HOST=0.0.0.0

# ClickHouse
CLICKHOUSE_HOST=http://localhost:8123
CLICKHOUSE_USER=default
CLICKHOUSE_PASSWORD=your_password

# RabbitMQ
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=ga4
POSTGRES_USER=ga4
POSTGRES_PASSWORD=ga4
```
