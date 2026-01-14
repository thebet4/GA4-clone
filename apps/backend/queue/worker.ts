import 'reflect-metadata'
import '../env.ts'
import { setupQueue, getRabbitMQConnection } from '@queue/connection.ts'
import { startRawConsumer } from '@queue/raw/consumer.ts'
import { startEnrichedConsumer } from '@queue/enriched/consumer.ts'
import logger from '@utils/logger.ts'
import { AppDataSource } from '@database/postgres/data-source.ts'

async function run() {
  try {
    logger.info('Initializing Worker...')

    // 1. Initialize Databases
    await AppDataSource.initialize()
    logger.info('Postgres Data Source initialized')

    // 2. Ensure queues and exchanges exist
    await setupQueue()
    logger.info('Queue topology established.')

    // 2. Start the consumer logic
    await startRawConsumer()
    await startEnrichedConsumer()
    logger.info('Worker is running and listening for raw and enriched events.')

    // Handle graceful shutdown
    const shutdown = async () => {
      logger.info('Shutting down worker...')
      const conn = await getRabbitMQConnection()
      await conn.close()
      process.exit(0)
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  } catch (error) {
    logger.error({ err: error }, 'Failed to start worker')
    process.exit(1)
  }
}

run()
