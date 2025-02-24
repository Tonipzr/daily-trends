import { ExpressServer } from './infrastructure/api/ExpressServer.ts'
import { FastifyServer } from './infrastructure/api/FastifyServer.ts'
import { registerRoutes } from './infrastructure/api/routes/index.ts'
import { Server } from './infrastructure/api/Server.ts'
import { DailyTrendsApp } from './infrastructure/backend/DailyTrends.ts'
import { Environment } from './infrastructure/config/Environment.ts'
import container from './infrastructure/dependencyInjection/index.ts'
import './infrastructure/logger/WinstonLogger.ts'

if (process.argv && process.argv.length > 0) {
  const args = process.argv.slice(2)

  if (args.length > 0) {
    switch (args[0]) {
      case 'express':
        logger.info('Express server selected')
        container.register('Shared.Server', ExpressServer).addArgument(Environment.API_PORT)
        Environment.SERVER_TYPE = 'express'
        break
      case 'fastify':
        logger.info('Fastify server selected')
        container.register('Shared.Server', FastifyServer).addArgument(Environment.API_PORT)
        Environment.SERVER_TYPE = 'fastify'
        break
      default:
        throw new Error('Invalid server type')
    }
  }
}

if (!container.has('Shared.Server')) {
  logger.warn('No server selected, defaulting to Express')
  container.register('Shared.Server', ExpressServer).addArgument(Environment.API_PORT)
}

const server: Server = container.get('Shared.Server')

await registerRoutes()

new DailyTrendsApp(server).start().catch(
  (error) => {
    logger.error(error)
  }
)
