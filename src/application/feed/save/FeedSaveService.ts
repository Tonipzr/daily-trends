import { Sources, sourcesValues } from '../../../domain/Feed/Feed'
import { InvalidArgumentError } from '../../../domain/shared/error/InvalidArgumentError'
import { Repository } from '../../../domain/shared/Repository'
import { Service } from '../../shared/Service'

export class FeedSaveService implements Service<void> {
  private repository: Repository

  constructor (repository: Repository) {
    this.repository = repository
  }

  async execute (params: Record<string, unknown> | undefined): Promise<void> {
    if (!params ||
        (!params.title || typeof params.title !== 'string') ||
        (!params.subTitle || typeof params.subTitle !== 'string') ||
        (!params.url || typeof params.url !== 'string') ||
        (!params.author || typeof params.author !== 'string') ||
        (!params.source || typeof params.source !== 'string' || !sourcesValues.includes(params.source as Sources)) ||
        (!params.publishedAt || typeof params.publishedAt !== 'string' || isNaN(new Date(params.publishedAt).getTime()))) {
      throw new InvalidArgumentError('Invalid params')
    }

    await this.repository.save(params)
  }
}
