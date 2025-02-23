import mongoose, { Schema } from 'mongoose'
import { Repository } from '../../../../domain/shared/Repository.ts'
import { MongoRepository } from '../MongoRepository.ts'
import { IFeed, sourcesValues } from '../../../../domain/Feed/Feed.ts'

export class FeedMongoRepository extends MongoRepository implements Repository {
  constructor (client: Promise<mongoose.Connection>) {
    super(client)

    const feedSchema = new Schema<IFeed>({
      title: String,
      subTitle: String,
      url: {
        type: String,
        unique: true
      },
      author: String,
      source: {
        type: String,
        enum: sourcesValues
      },
      publishedAt: Date
    }, { timestamps: true })

    client.then(client => {
      this.model = client.model('Feed', feedSchema)
    })
  }

  async save (feed: IFeed): Promise<void> {
    const feedDocument = new (this.model as mongoose.Model<IFeed>)(feed)

    await feedDocument.save()
  }

  async search (id: string): Promise<unknown> {
    return await (this.model as mongoose.Model<IFeed>).findById(id)
  }

  async find (): Promise<unknown[]> {
    return await (this.model as mongoose.Model<IFeed>).find()
  }

  async delete (id: string): Promise<boolean> {
    const result = await (this.model as mongoose.Model<IFeed>).deleteOne({ _id: id })

    return result.deletedCount === 1
  }

  async update (id: string, feed: IFeed): Promise<void> {
    await (this.model as mongoose.Model<IFeed>).updateOne({ _id: id }, feed)
  }
}
