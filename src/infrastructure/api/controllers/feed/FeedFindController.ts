import { Service } from '../../../../application/shared/Service.ts'
import { IFeed } from '../../../../domain/Feed/Feed.ts'
import { Controller } from '../Controller.ts'

export class FeedFindController implements Controller {
  private service: Service<IFeed[]>

  constructor (service: Service<IFeed[]>) {
    this.service = service
  }

  async run (params: Record<string, string> | undefined, body: any): Promise<unknown> {
    const feeds = await this.service.execute()

    return feeds
  }
}
