import { IFeed } from '../../../domain/Feed/Feed.ts'
import { InvalidArgumentError } from '../../../domain/shared/error/InvalidArgumentError.ts'
import { Repository } from '../../../domain/shared/Repository.ts'
import { Service } from '../../shared/Service.ts'

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
