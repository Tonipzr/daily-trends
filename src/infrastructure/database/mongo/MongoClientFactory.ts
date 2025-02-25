import mongoose from 'mongoose'
import MongoConfig from './MongoConfig'
import { Environment } from '../../config/Environment'

export class MongoClientFactory {
  private static clients: { [key: string]: mongoose.Connection } = {}

  static async createClient (contextName: string): Promise<mongoose.Connection> {
    let client = MongoClientFactory.getClient(contextName)

    const config : MongoConfig = {
      url: Environment.MONGO_URL
    }

    if (!client) {
      client = await MongoClientFactory.createAndConnectClient(config)

      MongoClientFactory.registerClient(client, contextName)
    }

    return client
  }

  private static getClient (contextName: string): mongoose.Connection | null {
    return MongoClientFactory.clients[contextName]
  }

  private static async createAndConnectClient (config: MongoConfig): Promise<mongoose.Connection> {
    const client = mongoose.createConnection(config.url)

    return client
  }

  private static registerClient (client: mongoose.Connection, contextName: string): void {
    MongoClientFactory.clients[contextName] = client
  }
}
