import type { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'
import { ZodError } from 'zod'
import fp from 'fastify-plugin'

async function errorHandlerPlugin(app: FastifyInstance, _options: FastifyPluginOptions) {
  app.setErrorHandler((error: FastifyError, _request, reply) => {
    if (error instanceof ZodError) {
      const zodError = error as ZodError
      return reply.status(400).send({
        error: 'Validation Failed',
        message: 'The request body contains invalid data',
        details: zodError.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      })
    }

    if (error.validation) {
      return reply.status(400).send({
        error: 'Validation Failed',
        message: 'The request body contains invalid data',
        details: error.validation.map((err: any) => ({
          field: err.instancePath.replace(/\//g, '.') || err.params.missingProperty || 'unknown',
          message: err.message,
        })),
      })
    }

    // Default error handling
    app.log.error(error)
    reply.send(error)
  })
}

export default fp(errorHandlerPlugin)
