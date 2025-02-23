import mongoose from 'mongoose'

export abstract class MongoRepository {
  private _client: Promise<mongoose.Connection>
  protected model: unknown

  constructor (client : Promise<mongoose.Connection>) {
    this._client = client
  }

  protected client (): Promise<mongoose.Connection> {
    return this._client
  }
}
