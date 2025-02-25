import { IFeed } from '../../../domain/Feed/Feed'
import { InvalidArgumentError } from '../../../domain/shared/error/InvalidArgumentError'
import { Repository } from '../../../domain/shared/Repository'
import { Service } from '../../shared/Service'

export class FeedSearchService implements Service<IFeed> {
  private repository: Repository

  constructor (repository: Repository) {
    this.repository = repository
  }

  async execute (params: Record<string, unknown> | undefined): Promise<IFeed> {
    if (!params || !params.id || typeof params.id !== 'string') {
      throw new InvalidArgumentError('Invalid params')
    }

    return await this.repository.search(params.id) as IFeed
  }
}
