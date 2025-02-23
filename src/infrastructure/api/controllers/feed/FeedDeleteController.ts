import { Service } from '../../../../application/shared/Service.ts'
import { Controller } from '../Controller.ts'

export class FeedDeleteController implements Controller {
  private service: Service<boolean>

  constructor (service: Service<boolean>) {
    this.service = service
  }

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
