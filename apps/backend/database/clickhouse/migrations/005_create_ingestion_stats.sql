CREATE TABLE IF NOT EXISTS ingestion_stats (
  project_id UUID,
  date Date,
  events_received UInt64
)
ENGINE = SummingMergeTree
PARTITION BY toYYYYMM(date)
ORDER BY (project_id, date);
