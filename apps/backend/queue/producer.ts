import { getRabbitMQChannel } from '@queue/connection.ts'
import { EXCHANGES, ROUTING_KEYS } from '@queue/constants.ts'
import logger from '@utils/logger.ts'

export async function produceEvent(event: any) {
  const channel = await getRabbitMQChannel()

  logger.info(
    { eventName: event.event_name, projectId: event.project_id },
    '[Event Producer] Publishing event to fanout exchange',
  )

  return channel.publish(
    EXCHANGES.EVENT_EXCHANGE,
    ROUTING_KEYS.EMPTY,
    Buffer.from(JSON.stringify(event)),
    {
      persistent: true,
    },
  )
}
