import { Service } from '../../../../application/shared/Service'
import { Sources, sourcesValues } from '../../../../domain/Feed/Feed'
import { InvalidArgumentError } from '../../../../domain/shared/error/InvalidArgumentError'
import { Controller } from '../Controller'

export class FeedSaveController implements Controller {
  private service: Service<void>

  constructor (service: Service<void>) {
    this.service = service
  }

  async run (params: Record<string, string> | undefined, body: any): Promise<unknown> {
    if (!body ||
            (!body.title || typeof body.title !== 'string') ||
            (!body.subTitle || typeof body.subTitle !== 'string') ||
            (!body.url || typeof body.url !== 'string') ||
            (!body.author || typeof body.author !== 'string') ||
            (!body.source || typeof body.source !== 'string' || !sourcesValues.includes(body.source as Sources)) ||
            (!body.publishedAt || typeof body.publishedAt !== 'string' || isNaN(new Date(body.publishedAt).getTime()))) {
      throw new InvalidArgumentError('Invalid params')
    }

    await this.service.execute(body)

    return true
  }
}
