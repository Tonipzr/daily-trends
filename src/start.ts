import { ExpressServer } from './infrastructure/api/ExpressServer.ts'
import { Server } from './infrastructure/api/Server.ts'
import { DailyTrendsApp } from './infrastructure/backend/DailyTrends.ts'
import { Environment } from './infrastructure/config/Environment.ts'

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
