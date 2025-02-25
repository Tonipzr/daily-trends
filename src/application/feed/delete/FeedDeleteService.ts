import { InvalidArgumentError } from '../../../domain/shared/error/InvalidArgumentError'
import { Repository } from '../../../domain/shared/Repository'
import { Service } from '../../shared/Service'

export class FeedDeleteService implements Service<boolean> {
  private repository: Repository

  constructor (repository: Repository) {
    this.repository = repository
  }

  async execute (params: Record<string, unknown> | undefined): Promise<boolean> {
    if (!params || !params.id || typeof params.id !== 'string') {
      throw new InvalidArgumentError('Invalid params')
    }

    return await this.repository.delete(params.id)
  }
}
