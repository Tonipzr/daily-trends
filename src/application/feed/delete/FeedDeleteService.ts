import { Repository } from '../../../domain/shared/Repository.ts'
import { Service } from '../../shared/Service.ts'

export class FeedDeleteService implements Service<boolean> {
  private repository: Repository

  constructor (repository: Repository) {
    this.repository = repository
  }

  async execute (params: Record<string, unknown> | undefined): Promise<boolean> {
    if (!params || !params.id || typeof params.id !== 'string') {
      throw new Error('Invalid params')
    }

    return await this.repository.delete(params.id)
  }
}
