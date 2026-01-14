import { AppDataSource } from '@database/postgres/data-source.ts'
import { DailyMetric } from '@database/postgres/entities/DailyMetric.ts'
import logger from '@utils/logger.ts'

export class MetricsService {
  /**
   * Updates aggregated metrics in PostgreSQL based on an enriched event.
   */
  static async updateAggregates(event: any) {
    const { project_id, event_name, timestamp } = event
    const date = new Date(timestamp).toISOString().split('T')[0]

    try {
      logger.info({ project_id, event_name, date }, '[Metrics Service] Updating aggregated metrics')

      const repository = AppDataSource.getRepository(DailyMetric)

      // Update specific event count
      await this.incrementMetric(repository, project_id, date, event_name)

      // Update total pageviews if applicable
      if (event_name === 'page_view') {
        await this.incrementMetric(repository, project_id, date, 'total_pageviews')
      }

      logger.info({ project_id, event_name, date }, '[Metrics Service] Aggregated metrics updated')
    } catch (err) {
      logger.error(
        { err, project_id, event_name },
        '[Metrics Service] Failed to update aggregated metrics',
      )
      throw err
    }
  }

  private static async incrementMetric(
    repository: any,
    projectId: string,
    date: string,
    metricName: string,
  ) {
    // TypeORM doesn't have a built-in "upsert increment" that works perfectly across all DBs
    // for complex unique constraints, so we use a raw query through the manager for performance
    // but keep it within the TypeORM context.
    await repository.query(
      `
      INSERT INTO daily_metrics (project_id, date, metric_name, metric_value)
      VALUES ($1, $2, $3, 1)
      ON CONFLICT (project_id, date, metric_name)
      DO UPDATE SET 
        metric_value = daily_metrics.metric_value + 1,
        updated_at = CURRENT_TIMESTAMP
    `,
      [projectId, date, metricName],
    )
  }
}
