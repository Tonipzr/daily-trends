import { Service } from '../../../../application/shared/Service.ts'
import { IFeed } from '../../../../domain/Feed/Feed.ts'
import { Controller } from '../Controller.ts'

export class FeedScrapeController implements Controller {
  private service: Service<IFeed[]>
  private feedSaveService: Service<void>

  constructor (service: Service<IFeed[]>, feedSaveService: Service<void>) {
    this.service = service
    this.feedSaveService = feedSaveService
  }

  async run (params: Record<string, string> | undefined, body: any): Promise<unknown> {
    try {
      const result = await this.service.execute()

      if (body && body.save && Array.isArray(result)) {
        Promise.allSettled(
          result.map(async feed => {
            await this.feedSaveService.execute({
              title: feed.title,
              subTitle: feed.subTitle,
              url: feed.url,
              author: feed.author,
              source: feed.source,
              publishedAt: feed.publishedAt.toISOString()
            })
          })
        )
      }

      return result
    } catch (error) {
      return (error as Error).message
    }
  }
}
