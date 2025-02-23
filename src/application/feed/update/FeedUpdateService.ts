import { IFeed } from '../../../domain/Feed/Feed.ts'
import { Repository } from '../../../domain/shared/Repository.ts'
import { Service } from '../../shared/Service.ts'

export class FeedUpdateService implements Service<void> {
  private repository: Repository

  constructor (repository: Repository) {
    this.repository = repository
  }

  async execute (params: Record<string, unknown> | undefined): Promise<void> {
    if (!params ||
        (!params.id || typeof params.id !== 'string') ||
        (!params.title || typeof params.title !== 'string') ||
        (!params.url || typeof params.url !== 'string') ||
        (!params.author || typeof params.author !== 'string') ||
        (!params.category || typeof params.category !== 'string') ||
        (!params.publishedAt || typeof params.publishedAt !== 'string' || isNaN(new Date(params.publishedAt).getTime()))) {
      throw new Error('Invalid params')
    }

    const feed: IFeed = {
      title: params.title,
      url: params.url,
      author: params.author,
      category: params.category,
      publishedAt: params.published as Date
    }

    await this.repository.update(params.id, feed)
  }
}
