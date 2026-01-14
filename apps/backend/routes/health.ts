import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { z } from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

const healthSchema = {
  response: {
    200: z.object({
      status: z.string(),
    }),
  },
}

async function healthRoutes(instance: FastifyInstance, _options: FastifyPluginOptions) {
  const fastify = instance.withTypeProvider<ZodTypeProvider>()

  fastify.get('/', { schema: healthSchema }, async () => {
    return { status: 'ok' }
  })
}

export default healthRoutes
