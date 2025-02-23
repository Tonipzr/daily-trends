import { Service } from '../../../../application/shared/Service.ts'
import { IFeed } from '../../../../domain/Feed/Feed.ts'
import container from '../../../dependencyInjection/index.ts'
import { Controller } from '../Controller.ts'

export class FeedSearchController implements Controller {
  private service: Service<IFeed> = container.get('Feed.FeedSearchService')

  async run (params: Record<string, string> | undefined, body: any): Promise<unknown> {
    if (!params || !params.id) {
      return 'Invalid params'
    }

    try {
      const feed = await this.service.execute({ id: params.id })

      return feed
    } catch (error) {
      return (error as Error).message
    }
  }
}
