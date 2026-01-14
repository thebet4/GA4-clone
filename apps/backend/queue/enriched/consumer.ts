import { getRabbitMQChannel } from '@queue/connection.ts'
import { QUEUES } from '@queue/constants.ts'
import { MetricsService } from '@services/metrics.service.ts'
import logger from '@utils/logger.ts'

export async function startEnrichedConsumer() {
  const channel = await getRabbitMQChannel()
  await channel.prefetch(100)

  logger.info('Starting Enriched Events consumer...')

  channel.consume(QUEUES.EVENTS_ENRICHED_INGEST, async (msg) => {
    if (!msg) return

    try {
      const event = JSON.parse(msg.content.toString())
      logger.info(
        { eventName: event.event_name, projectId: event.project_id },
        '[Enriched Consumer] Received raw event for enrichment',
      )

      // 1. TODO: Enrichment logic (GeoIP, User Agent, etc.)
      const enrichedEvent = {
        ...event,
        processed_at: new Date().toISOString(),
        // Add more enrichment here later
      }

      // 2. Save to Aggregated Metrics (PostgreSQL)
      await MetricsService.updateAggregates(enrichedEvent)

      logger.info(
        { eventName: event.event_name },
        '[Enriched Consumer] Successfully enriched and processed event',
      )
      channel.ack(msg)
    } catch (err) {
      logger.error({ err }, '[Enriched Consumer] Error processing enriched message')
      channel.nack(msg, false, false)
    }
  })
}
