import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { AppDataSource } from '@database/postgres/data-source.js'
import { DataSource } from 'typeorm'

declare module 'fastify' {
  interface FastifyInstance {
    db: DataSource
  }
}

async function typeormPlugin(app: FastifyInstance) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
    app.log.info('Postgres Data Source initialized via plugin')
  }

  app.decorate('db', AppDataSource)

  app.addHook('onClose', async (instance) => {
    if (instance.db.isInitialized) {
      app.log.info('Closing Postgres Data Source...')
      await instance.db.destroy()
    }
  })
}

export default fp(typeormPlugin)
