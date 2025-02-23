import { IFeed } from '../../../domain/Feed/Feed.ts'
import { Repository } from '../../../domain/shared/Repository.ts'
import { Service } from '../../shared/Service.ts'

export class FeedFindService implements Service<IFeed[]> {
  private repository: Repository

  constructor (repository: Repository) {
    this.repository = repository
  }

  async execute (): Promise<IFeed[]> {
    return await this.repository.find() as IFeed[]
  }
}
