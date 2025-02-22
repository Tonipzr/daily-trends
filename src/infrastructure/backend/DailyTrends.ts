import { Server } from '../api/Server.ts'

export class DailyTrendsApp {
  private server: Server

  constructor (server: Server) {
    this.server = server
  }

  async start () : Promise<void> {
    this.server.start()
  }
}
