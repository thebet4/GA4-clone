CREATE TABLE IF NOT EXISTS schema_migrations (
  version String,
  applied_at DateTime DEFAULT now()
)
ENGINE = MergeTree
ORDER BY version;
