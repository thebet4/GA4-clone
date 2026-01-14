# GA4 Clone - Project Overview

## Workflow

```
         [SDK / Client]
                │
                ▼
       ┌-------------------┐
       │ API / Ingestion   │
       └-------------------┘
                │
                ▼
             [Queue]
                │
                ▼
           [Workers / ETL]
            ┌---------------------------┐
            │                           │
            ▼                           ▼
[ClickHouse / Raw Events]   [PostgreSQL / Aggregated Metrics]
                                      │
                                      ▼
                                  [Dashboard]

```

**Step-by-step:**

1. [Step 1: SDK collects events](1_sdk.md)
2. [Step 2: API receives events](2_api.md)
3. [Step 3: Workers process events (Fan-out Architecture)](3_workers.md)
4. [Step 4: Raw events storage](4_raw_events.md)
5. [Step 5: Aggregated metrics storage](5_aggregated_metrics.md)
6. [Step 6: Dashboard](6_dashboard.md)

---

## Raw vs Aggregated

- **Raw Events:** Every single event, immutable, stored in ClickHouse. Used for reprocessing and auditing.
- **Aggregated Metrics:** Summarized counts (DAU, pageviews, funnels), stored in PostgreSQL. Used for dashboards.

---

## Tech Stack

| Layer              | Technology           |
| ------------------ | -------------------- |
| Client SDK         | JavaScript / React   |
| API                | Node.js + Fastify    |
| Queue              | RabbitMQ             |
| Workers            | Node.js / TypeScript |
| Raw Event Storage  | ClickHouse           |
| Aggregated Metrics | PostgreSQL           |
| Dashboard          | Next.js + Recharts   |

---

## Next Steps

- Build MVP SDK to capture events
- Implement API + queue ingestion
- Store raw events and compute aggregated metrics
- Create a basic dashboard to visualize pageviews and events
