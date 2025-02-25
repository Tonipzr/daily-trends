import { IFeed } from '../Feed/Feed'
import { HTMLHandler } from './HTMLHandler'
import { Http } from './http'

export abstract class Scraper {
  private _http: Http
  private _htmlHandler: HTMLHandler
  private _url: string

  constructor (http: Http, htmlHandler: HTMLHandler, url: string) {
    this._http = http
    this._htmlHandler = htmlHandler
    this._url = url
  }

  get http (): Http {
    return this._http
  }

  get htmlHandler (): HTMLHandler {
    return this._htmlHandler
  }

  get url (): string {
    return this._url
  }

  abstract getNews (): Promise<IFeed[]>
}
