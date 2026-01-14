export const QUEUES = {
  EVENTS_RAW_INGEST: 'events.raw.ingest',
  EVENTS_RAW_DLQ: 'events.raw.ingest.dlq',

  EVENTS_ENRICHED_INGEST: 'events.enriched.ingest',
  EVENTS_ENRICHED_DLQ: 'events.enriched.ingest.dlq',
} as const

export const EXCHANGES = {
  EVENT_EXCHANGE: 'event_exchange',
  EVENTS_DLQ: 'events.dlq',
} as const

export const ROUTING_KEYS = {
  EMPTY: '',
} as const
