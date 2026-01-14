CREATE TABLE IF NOT EXISTS daily_metrics (
    id SERIAL PRIMARY KEY,
    project_id UUID NOT NULL,
    date DATE NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value BIGINT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, date, metric_name)
);

CREATE INDEX IF NOT EXISTS idx_daily_metrics_project_date ON daily_metrics(project_id, date);
