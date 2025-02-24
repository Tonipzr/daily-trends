import { Service } from '../../../../application/shared/Service'
import { Sources, sourcesValues } from '../../../../domain/Feed/Feed'
import { InvalidArgumentError } from '../../../../domain/shared/error/InvalidArgumentError'
import { Controller } from '../Controller'

export class FeedUpdateController implements Controller {
  private service: Service<void>

  constructor (service: Service<void>) {
    this.service = service
  }

  async run (params: Record<string, string> | undefined, body: any): Promise<unknown> {
    if (!params ||
            (!params.id || typeof params.id !== 'string') ||
            (!body.title || typeof body.title !== 'string') ||
            (!body.subTitle || typeof body.subTitle !== 'string') ||
            (!body.url || typeof body.url !== 'string') ||
            (!body.author || typeof body.author !== 'string') ||
            (!body.source || typeof body.source !== 'string' || !sourcesValues.includes(body.source as Sources)) ||
            (!body.publishedAt || typeof body.publishedAt !== 'string' || isNaN(new Date(body.publishedAt).getTime()))) {
      throw new InvalidArgumentError('Invalid params')
    }

    const parameters: Record<string, unknown> = {
      id: params?.id || '',
      title: body.title || '',
      subTitle: body.subTitle || '',
      url: body.url || '',
      author: body.author || '',
      source: body.source || '',
      publishedAt: body.publishedAt || ''
    }
    await this.service.execute(parameters)

    return true
  }
}
