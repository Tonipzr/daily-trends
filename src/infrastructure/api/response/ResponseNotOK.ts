import { Response } from './Response.ts'

export class ResponseNotOK extends Response {
  constructor (code: number, message: unknown = 'Error') {
    super(code, message)
  }

  display (): Record<string, unknown> {
    return {
      status: 'error',
      errors: this.body
    }
  }
}
