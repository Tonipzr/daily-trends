import { ResponseNotOK } from './ResponseNotOK'
import { ResponseOK } from './ResponseOK'
import { Response } from './Response'

export class ResponseFactory {
  static createResponse (code: number, body: unknown): Response {
    if (code >= 200 && code < 300) {
      return new ResponseOK(code, body)
    } else {
      return new ResponseNotOK(code, body)
    }
  }
}
