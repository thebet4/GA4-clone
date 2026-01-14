import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { produceEvent } from '@queue/producer.ts'
import { eventSchema } from '@schemas/event.ts'
import { keysToSnakeCase } from '@utils/case.ts'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

async function collectRoutes(instance: FastifyInstance, _options: FastifyPluginOptions) {
  const fastify = instance.withTypeProvider<ZodTypeProvider>()

  const responseSchema = z.object({
    status: z.string(),
  })

  fastify.post(
    '/',
    {
      schema: {
        body: eventSchema,
        response: {
          200: responseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        request.log.info({ eventName: request.body.eventName }, '[API] Received single event')
        const event = keysToSnakeCase(request.body)
        await produceEvent(event)
        reply.send({ status: 'ok' })
      } catch (error) {
        request.log.error(
          { eventName: request.body.eventName },
          '[API] Failed to receive single event',
        )
        reply.send({ status: 'error' })
      }
    },
  )

  fastify.post(
    '/batch',
    {
      schema: {
        body: z.array(eventSchema),
        response: {
          200: responseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        request.log.info({ batchSize: request.body.length }, '[API] Received batch events')
        const events = request.body.map((e) => keysToSnakeCase(e))
        for (const event of events) {
          await produceEvent(event)
        }
        reply.send({ status: 'ok' })
      } catch (error) {
        request.log.error(
          { batchSize: request.body.length },
          '[API] Failed to receive batch events',
        )
        reply.send({ status: 'error' })
      }
    },
  )
}

export default collectRoutes
