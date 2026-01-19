# GA4 Clone

## Purpose

This project is a simplified clone of Google Analytics 4 (GA4).  
Its goal is to **track user events**, store them safely, and **compute aggregated metrics** for fast dashboard visualization.  
Focus is on core analytics functionality: pageviews, custom events, user/session tracking, and basic reporting.

## Project Structure

This is a monorepo containing:

- `apps/backend`: The core Fastify API, RabbitMQ worker, and database migrations.

## Getting Started

### Requirements

- **Node.js**: v18 or later.
- **Docker & Docker Compose**: To run PostgreSQL and RabbitMQ.

### How to run the Backend

1. Install dependencies from the root:
   ```bash
   npm install
   ```
2. Start the infrastructure and the API:
   ```bash
   npm run dev:backend
   ```
   _This command triggers the `docker compose` setup and starts the Fastify server in watch mode._

### Testing with Bruno

We use [Bruno](https://www.usebruno.com/) as our API client. It's a fast and Git-friendly open-source alternative to Postman.

- **Download**: [Official Site](https://www.usebruno.com/downloads)
- **Usage**: Open the Bruno application and click "Open Collection". Navigate to the `./Bruno` directory in this project root and select it. You will find all available API endpoints pre-configured.

## Current Project Status

- [x] **API**: Fastify-based backend with event tracking and metrics aggregation.
- [x] **SDK**: Typescript package to be embedded in client websites.
- [ ] **Dashboard**: React-based UI for visualizing analytics.

## Documentation

For full documentation, diagrams, and detailed workflows, see: [Main Documentation](docs/main.md).
