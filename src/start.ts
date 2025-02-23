import { ExpressServer } from './infrastructure/api/ExpressServer.js'
import { Server } from './infrastructure/api/Server.js'
import { DailyTrendsApp } from './infrastructure/backend/DailyTrends.js'
import { Environment } from './infrastructure/config/Environment.js'

let server: Server | undefined

if (process.argv && process.argv.length > 0) {
  const args = process.argv.slice(2)

  if (args.length > 0) {
    switch (args[0]) {
      case 'express':
        server = new ExpressServer(Environment.API_PORT)
        break
      default:
        throw new Error('Invalid server type')
    }
  }
}

if (!server) {
  console.warn('No server selected, defaulting to Express')
  server = new ExpressServer(Environment.API_PORT)
}

new DailyTrendsApp(server).start().catch(
  (error) => {
    console.error(error)
  }
)
