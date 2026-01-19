import 'reflect-metadata'
import './env.ts'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import appRoutes from '@routes/main.ts'
import { registerHooks } from '@hooks/main.ts'
import { setupQueue } from '@queue/connection.ts'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import errorHandler from '@plugins/errorHandler.ts'
import clickhouse from '@plugins/clickhouse.ts'
import typeorm from '@plugins/typeorm.ts'
import { loggerConfig } from '@utils/logger.ts'

const app = Fastify({
  logger: loggerConfig,
  pluginTimeout: 30000,
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Enable CORS for the demo app
app.register(cors, {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
})

// register plugins
app.register(clickhouse)
app.register(typeorm)

// register hooks (Run migrations)
registerHooks(app)

// register error handler
app.register(errorHandler)

// register routes
app.register(appRoutes)

const start = async () => {
  try {
    await setupQueue()
    app.log.info('RabbitMQ topology initialized')

    await app.listen({
      port: Number(process.env.SERVER_PORT) || 3000,
      host: process.env.SERVER_HOST || '0.0.0.0',
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
