import { Server } from '../api/Server.js'
import { MongoClientFactory } from '../database/mongo/MongoClientFactory.js'

export class DailyTrendsApp {
  private server: Server

  constructor (server: Server) {
    this.server = server
  }

  async start () : Promise<void> {
    this.server.start()

    await MongoClientFactory.createClient('daily-trends')
  }
}
