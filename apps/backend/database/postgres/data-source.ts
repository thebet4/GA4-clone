import 'reflect-metadata'
import { DataSource } from 'typeorm'
import path from 'path'
import { DailyMetric } from './entities/DailyMetric.js'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'ga4',
  password: process.env.POSTGRES_PASSWORD || 'ga4',
  database: process.env.POSTGRES_DB || 'ga4',
  synchronize: false, // Use migrations instead
  logging: process.env.NODE_ENV === 'development',
  entities: [DailyMetric],
  migrations: [path.join(process.cwd(), 'database/postgres/migrations/*.ts')],
  subscribers: [],
})
