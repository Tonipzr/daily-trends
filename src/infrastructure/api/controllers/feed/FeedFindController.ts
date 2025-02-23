import { Service } from '../../../../application/shared/Service.ts'
import { IFeed } from '../../../../domain/Feed/Feed.ts'
import container from '../../../dependencyInjection/index.ts'
import { Controller } from '../Controller.ts'

export class FeedFindController implements Controller {
  private service: Service<IFeed[]> = container.get('Feed.FeedFindService')

  async run (params: Record<string, string> | undefined, body: any): Promise<unknown> {
    try {
      const feeds = await this.service.execute()

      return feeds
    } catch (error) {
      return (error as Error).message
    }
  }
}
