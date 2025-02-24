import { Response } from './Response.ts'

export class ResponseOK extends Response {
  constructor (code: number, message: unknown = 'OK') {
    super(code, message)
  }

  display (): Record<string, unknown> {
    return {
      status: 'success',
      data: {
        items: this.body
      },
    }
  }
}
