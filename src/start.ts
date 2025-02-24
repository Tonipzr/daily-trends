import { ExpressServer } from './infrastructure/api/ExpressServer'
import { FastifyServer } from './infrastructure/api/FastifyServer'
import { registerRoutes } from './infrastructure/api/routes/index'
import { Server } from './infrastructure/api/Server'
import { DailyTrendsApp } from './infrastructure/backend/DailyTrends'
import { Environment } from './infrastructure/config/Environment'
import container from './infrastructure/dependencyInjection/index'
import './infrastructure/logger/WinstonLogger'

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

registerRoutes()
  .then(() => {
    new DailyTrendsApp(server).start().catch(
      (error) => {
        logger.error(error)
      }
    )
  })
