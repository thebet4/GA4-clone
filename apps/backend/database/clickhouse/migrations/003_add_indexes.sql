ALTER TABLE raw_events
ADD INDEX IF NOT EXISTS idx_event_id event_id
TYPE bloom_filter
GRANULARITY 4;

ALTER TABLE raw_events
ADD INDEX IF NOT EXISTS idx_session_id session_id
TYPE bloom_filter
GRANULARITY 4;
