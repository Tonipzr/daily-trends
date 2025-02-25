export abstract class Response {
  private _code: number
  private _body: unknown

  constructor (code : number, body : unknown) {
    this._code = code
    this._body = body
  }

  get code (): number {
    return this._code
  }

  get body (): unknown {
    return this._body
  }

  abstract display (): Record<string, unknown>
}
