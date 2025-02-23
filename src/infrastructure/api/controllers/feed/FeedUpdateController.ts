import { Service } from '../../../../application/shared/Service.ts'
import { Controller } from '../Controller.ts'

export class FeedUpdateController implements Controller {
  private service: Service<void>

  constructor (service: Service<void>) {
    this.service = service
  }

  async run (params: Record<string, string> | undefined, body: any): Promise<unknown> {
    try {
      const parameters: Record<string, unknown> = {
        id: params?.id || '',
        title: body.title || '',
        url: body.url || '',
        author: body.author || '',
        category: body.category || '',
        publishedAt: body.publishedAt || ''
      }
      await this.service.execute(parameters)

      return true
    } catch (error) {
      return (error as Error).message
    }
  }
}
