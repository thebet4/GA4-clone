import { client } from '@database/clickhouse/client.ts'
import logger from '@utils/logger.ts'

export class EventsService {
  /**
   * Saves a raw event to ClickHouse.
   * Encapsulates table names and formatting logic.
   */
  static async saveRawEvent(event: any) {
    try {
      logger.info({ event }, '[Events Service] Saving raw event to ClickHouse')
      await client.insert({
        table: 'raw_events',
        values: [event],
        format: 'JSONEachRow',
      })
      logger.info({ event }, '[Events Service] Raw event saved to ClickHouse')
    } catch (err) {
      logger.error({ err, event }, '[Events Service] Failed to save event to ClickHouse')
      throw err
    }
  }

  /**
   * Saves a batch of raw events to ClickHouse.
   * Optimized for bulk inserts.
   */
  static async saveRawEventsBatch(events: any[]) {
    try {
      logger.info(
        { count: events.length },
        '[Events Service] Saving batch of raw events to ClickHouse',
      )
      await client.insert({
        table: 'raw_events',
        values: events,
        format: 'JSONEachRow',
      })
      logger.info(
        { count: events.length },
        '[Events Service] Batch of raw events saved to ClickHouse',
      )
    } catch (err) {
      logger.error(
        { err, count: events.length },
        '[Events Service] Failed to save batch of events to ClickHouse',
      )
      throw err
    }
  }
}
