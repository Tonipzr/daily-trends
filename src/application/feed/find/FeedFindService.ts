import { IFeed } from '../../../domain/Feed/Feed'
import { Repository } from '../../../domain/shared/Repository'
import { Service } from '../../shared/Service'

export class FeedFindService implements Service<IFeed[]> {
  private repository: Repository

  constructor (repository: Repository) {
    this.repository = repository
  }

  async execute (): Promise<IFeed[]> {
    return await this.repository.find() as IFeed[]
  }
}
