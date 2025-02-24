import { Service } from '../../../../application/shared/Service.ts'
import { IFeed } from '../../../../domain/Feed/Feed.ts'
import { InvalidArgumentError } from '../../../../domain/shared/error/InvalidArgumentError.ts'
import { Controller } from '../Controller.ts'

export class FeedSearchController implements Controller {
  private service: Service<IFeed>

  constructor (service: Service<IFeed>) {
    this.service = service
  }

  async run (params: Record<string, string> | undefined, body: any): Promise<unknown> {
    if (!params || !params.id) {
      throw new InvalidArgumentError('Invalid params')
    }

    const feed = await this.service.execute({ id: params.id })

    return feed
  }
}
