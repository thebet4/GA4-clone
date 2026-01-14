CREATE TABLE IF NOT EXISTS raw_events (
  project_id UUID,
  event_id UUID,

  event_name LowCardinality(String),

  timestamp DateTime64(3),
  received_at DateTime64(3) DEFAULT now64(),

  client_id String,
  session_id String,

  path String,
  referrer String,

  params JSON,

  sdk_name LowCardinality(String),
  sdk_version String,

  ip String,
  user_agent String
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(timestamp)
ORDER BY (project_id, event_name, timestamp);
