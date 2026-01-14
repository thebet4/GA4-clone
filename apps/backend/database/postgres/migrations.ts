import type { FastifyInstance } from 'fastify'
import fs from 'fs/promises'
import path from 'path'
import { AppDataSource } from './data-source.js'

export async function runPostgresMigrations(this: FastifyInstance) {
  try {
    this.log.info('Starting Postgres migrations...')

    const migrationsDir = path.join(process.cwd(), 'database/postgres/migrations')
    const files = await fs.readdir(migrationsDir)

    // Filter and sort SQL files
    const migrationFiles = files
      .filter((file) => file.endsWith('.sql'))
      .sort((a, b) => a.localeCompare(b))

    // Ensure schema_migrations table exists
    await AppDataSource.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version TEXT PRIMARY KEY,
        applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Get applied migrations
    const rows = await AppDataSource.query('SELECT version FROM schema_migrations')
    const appliedMigrations = new Set(rows.map((row: any) => row.version))

    for (const file of migrationFiles) {
      if (appliedMigrations.has(file)) {
        this.log.debug({ migration: file }, 'Migration already applied, skipping.')
        continue
      }

      this.log.info({ migration: file }, 'Applying migration...')

      const filePath = path.join(migrationsDir, file)
      const content = await fs.readFile(filePath, 'utf-8')

      // Run migration in a transaction
      const queryRunner = AppDataSource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      try {
        await queryRunner.query(content)
        await queryRunner.query('INSERT INTO schema_migrations (version) VALUES ($1)', [file])
        await queryRunner.commitTransaction()
      } catch (err) {
        await queryRunner.rollbackTransaction()
        throw err
      } finally {
        await queryRunner.release()
      }

      this.log.info({ migration: file }, 'Migration applied successfully.')
    }

    this.log.info('All Postgres migrations finished.')
  } catch (error) {
    this.log.error({ error }, 'Postgres migrations failed')
    throw error
  }
}
