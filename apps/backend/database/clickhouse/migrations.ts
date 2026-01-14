import type { FastifyInstance } from 'fastify'

import fs from 'fs/promises'
import path from 'path'

export async function runClickhouseMigrations(this: FastifyInstance) {
  try {
    this.log.info('Starting ClickHouse migrations...')

    const migrationsDir = path.join(process.cwd(), 'database/clickhouse/migrations')
    const files = await fs.readdir(migrationsDir)

    // Filter and sort SQL files
    const migrationFiles = files
      .filter((file) => file.endsWith('.sql'))
      .sort((a, b) => a.localeCompare(b))

    // Get applied migrations
    const appliedMigrations = new Set<string>()
    try {
      const result = await this.clickhouse.query({
        query: 'SELECT version FROM schema_migrations',
        format: 'JSONEachRow',
      })
      const rows = await result.json<{ version: string }>()
      rows.forEach((row) => appliedMigrations.add(row.version))
    } catch {
      // Assume table doesn't exist if query fails
      this.log.warn('Could not fetch applied migrations, assuming first run.')
    }

    for (const file of migrationFiles) {
      if (appliedMigrations.has(file)) {
        this.log.debug({ migration: file }, 'Migration already applied, skipping.')
        continue
      }

      this.log.info({ migration: file }, 'Applying migration...')

      const filePath = path.join(migrationsDir, file)
      const content = await fs.readFile(filePath, 'utf-8')

      // Split queries by semicolon and remove empty ones
      const queries = content
        .split(';')
        .map((q) => q.trim())
        .filter((q) => q.length > 0)

      for (const query of queries) {
        await this.clickhouse.exec({ query })
      }

      // Record migration
      await this.clickhouse.exec({
        query: `INSERT INTO schema_migrations (version) VALUES ('${file}')`,
      })

      this.log.info({ migration: file }, 'Migration applied successfully.')
    }

    this.log.info('All ClickHouse migrations finished.')
  } catch (error) {
    this.log.error({ error }, 'ClickHouse migrations failed')
    throw error
  }
}
