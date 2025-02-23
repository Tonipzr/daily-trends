import { Service } from '../../../../application/shared/Service.ts'
import { Controller } from '../Controller.ts'

export class FeedSaveController implements Controller {
  private service: Service<void>

  constructor (service: Service<void>) {
    this.service = service
  }

  async run (params: Record<string, string> | undefined, body: any): Promise<unknown> {
    try {
      await this.service.execute(body)

      return true
    } catch (error) {
      return (error as Error).message
    }
  }
}
