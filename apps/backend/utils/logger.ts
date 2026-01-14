import pino from 'pino'

export const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
}

const logger = pino(loggerConfig)

export default logger
