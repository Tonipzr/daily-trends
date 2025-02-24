import { ResponseNotOK } from './ResponseNotOK.ts'
import { ResponseOK } from './ResponseOK.ts'
import { Response } from './Response.ts'

export class ResponseFactory {
  static createResponse (code: number, body: unknown): Response {
    if (code >= 200 && code < 300) {
      return new ResponseOK(code, body)
    } else {
      return new ResponseNotOK(code, body)
    }
  }
}
