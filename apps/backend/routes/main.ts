import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import healthRoutes from '@routes/health.ts'
import collectRoutes from '@routes/colllect.ts'

async function appRoutes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  fastify.register(healthRoutes, { prefix: '/health' })
  fastify.register(collectRoutes, { prefix: '/collect' })
}

export default appRoutes
