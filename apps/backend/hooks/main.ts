import type { FastifyInstance } from 'fastify'
import { runClickhouseMigrations } from '@database/clickhouse/migrations.ts'
import { runPostgresMigrations } from '@database/postgres/migrations.ts'

export async function registerHooks(app: FastifyInstance) {
  app.addHook('onReady', runClickhouseMigrations)
  app.addHook('onReady', runPostgresMigrations)
}
