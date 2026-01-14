# Step 5: Aggregated metrics are stored in PostgreSQL

## Purpose

Precomputed metrics are stored to enable **fast dashboard queries**. Instead of scanning millions of rows in ClickHouse for every page load, the dashboard reads summarized data from PostgreSQL.

## Characteristics

- **Summarized**: Data is aggregated by project, date, and metric type.
- **Optimized for read**: Small table size compared to raw events.
- **Real-time updates**: Updated incrementally by the Enriched Consumer as events arrive.

## Data Model (PostgreSQL)

We use **TypeORM** to manage the `daily_metrics` table. This table stores various counters and metrics pre-calculated for each day.

| Field          | Type          | Description                                                                    |
| :------------- | :------------ | :----------------------------------------------------------------------------- |
| `id`           | `SERIAL`      | Primary key.                                                                   |
| `project_id`   | `UUID`        | The project this metric belongs to.                                            |
| `date`         | `DATE`        | The day the metric represents.                                                 |
| `metric_name`  | `TEXT`        | The name of the metric (e.g., `page_view`, `total_pageviews`, `unique_users`). |
| `metric_value` | `BIGINT`      | The current value of the counter.                                              |
| `created_at`   | `TIMESTAMPTZ` | Record creation timestamp.                                                     |
| `updated_at`   | `TIMESTAMPTZ` | Last update timestamp.                                                         |

## Constraints & Indexes

- **Unique Constraint**: `(project_id, date, metric_name)` - Ensures we have only one row per metric per day.
- **Index**: `idx_daily_metrics_project_date` - Optimized for dashboard queries filtering by project and date range.

## Technology Stack

- **Database**: PostgreSQL 16
- **ORM**: TypeORM (with `reflect-metadata`)
- **Pattern**: Repository Pattern for data access.
