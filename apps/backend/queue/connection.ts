import amqp from 'amqplib'
import { QUEUES, EXCHANGES, ROUTING_KEYS } from '@queue/constants.ts'
import logger from '@utils/logger.ts'

let connection: amqp.ChannelModel | null = null
let channel: amqp.Channel | null = null

export async function getRabbitMQConnection(): Promise<amqp.ChannelModel> {
  if (connection) return connection

  const { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_USER, RABBITMQ_PASSWORD } = process.env
  const url = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`

  let retryCount = 0
  const maxRetries = 5
  const retryDelay = 5000 // 5 seconds

  while (retryCount < maxRetries) {
    try {
      const conn = await amqp.connect(url)
      connection = conn

      conn.on('error', (err) => {
        logger.error({ err }, 'RabbitMQ connection error')
        connection = null
        channel = null
      })

      conn.on('close', () => {
        logger.warn('RabbitMQ connection closed')
        connection = null
        channel = null
      })

      return conn
    } catch (err) {
      retryCount++
      logger.warn(
        `Failed to connect to RabbitMQ (attempt ${retryCount}/${maxRetries}). Retrying in ${retryDelay / 1000}s...`,
      )
      if (retryCount >= maxRetries) throw err
      await new Promise((resolve) => setTimeout(resolve, retryDelay))
    }
  }

  throw new Error('Failed to connect to RabbitMQ after multiple attempts')
}

export async function getRabbitMQChannel(): Promise<amqp.Channel> {
  if (channel) return channel

  const conn = await getRabbitMQConnection()
  const ch = await conn.createChannel()
  channel = ch

  return ch
}

/**
 * Helper to setup a main queue with its corresponding DLQ and bindings.
 */
async function assertQueueWithDLQ(
  ch: amqp.Channel,
  config: {
    queue: string
    dlq: string
    dlqRoutingKey: string
  },
) {
  // 1. Setup DLQ (Queue + Binding to DLQ Exchange)
  await ch.assertQueue(config.dlq, { durable: true })
  await ch.bindQueue(config.dlq, EXCHANGES.EVENTS_DLQ, config.dlqRoutingKey)

  // 2. Setup Main Queue with DLQ reference
  await ch.assertQueue(config.queue, {
    durable: true,
    deadLetterExchange: EXCHANGES.EVENTS_DLQ,
    deadLetterRoutingKey: config.dlqRoutingKey,
  })

  // 3. Bind Main Queue to the fanout exchange
  await ch.bindQueue(config.queue, EXCHANGES.EVENT_EXCHANGE, ROUTING_KEYS.EMPTY)
}

export async function setupQueue() {
  const ch = await getRabbitMQChannel()

  // --- EXCHANGES ---
  await Promise.all([
    ch.assertExchange(EXCHANGES.EVENT_EXCHANGE, 'fanout', { durable: true }),
    ch.assertExchange(EXCHANGES.EVENTS_DLQ, 'direct', { durable: true }),
  ])

  // --- QUEUES ---
  // 1. Raw Events Pipeline
  await assertQueueWithDLQ(ch, {
    queue: QUEUES.EVENTS_RAW_INGEST,
    dlq: QUEUES.EVENTS_RAW_DLQ,
    dlqRoutingKey: 'raw',
  })

  // 2. Enriched Events Pipeline
  await assertQueueWithDLQ(ch, {
    queue: QUEUES.EVENTS_ENRICHED_INGEST,
    dlq: QUEUES.EVENTS_ENRICHED_DLQ,
    dlqRoutingKey: 'enriched',
  })
}
