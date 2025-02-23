import { Repository } from '../../../domain/shared/Repository.ts'
import { Service } from '../../shared/Service.ts'

export class FeedSaveService implements Service<void> {
  private repository: Repository

  constructor (repository: Repository) {
    this.repository = repository
  }

  async execute (params: Record<string, unknown> | undefined): Promise<void> {
    if (!params ||
        (!params.title || typeof params.title !== 'string') ||
        (!params.url || typeof params.url !== 'string') ||
        (!params.author || typeof params.author !== 'string') ||
        (!params.category || typeof params.category !== 'string') ||
        (!params.publishedAt || typeof params.publishedAt !== 'string' || isNaN(new Date(params.publishedAt).getTime()))) {
      throw new Error('Invalid params')
    }

    await this.repository.save(params)
  }
}
