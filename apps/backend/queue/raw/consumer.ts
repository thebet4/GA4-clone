import { getRabbitMQChannel } from '@queue/connection.ts'
import { QUEUES } from '@queue/constants.ts'
import logger from '@utils/logger.ts'
import { EventsService } from '@services/events.service.ts'

export async function startRawConsumer() {
  const channel = await getRabbitMQChannel()
  await channel.prefetch(100)

  logger.info('Starting Raw Events consumer...')

  channel.consume(QUEUES.EVENTS_RAW_INGEST, async (msg) => {
    if (!msg) return

    try {
      const event = JSON.parse(msg.content.toString())
      logger.info(
        { eventName: event.event_name, projectId: event.project_id },
        '[Raw Consumer] Received event',
      )

      // Save to Raw Storage (ClickHouse)
      await EventsService.saveRawEvent(event)

      logger.info(
        { eventName: event.event_name },
        '[Raw Consumer] Successfully saved event to ClickHouse',
      )
      channel.ack(msg)
    } catch (err) {
      logger.error({ err }, '[Raw Consumer] Error processing message')
      channel.nack(msg, false, false)
    }
  })
}
