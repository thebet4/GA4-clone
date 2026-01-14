import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { client } from '@database/clickhouse/client.ts'
import type { ClickHouseClient } from '@clickhouse/client'

declare module 'fastify' {
  interface FastifyInstance {
    clickhouse: ClickHouseClient
  }
}

async function clickhousePlugin(app: FastifyInstance, _options: FastifyPluginOptions) {
  app.decorate('clickhouse', client)

  app.addHook('onClose', async () => {
    app.log.info('Closing ClickHouse client...')
    await client.close()
  })
}

export default fp(clickhousePlugin)
