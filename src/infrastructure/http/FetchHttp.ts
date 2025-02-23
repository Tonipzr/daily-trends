import { Http } from '../../domain/Scraper/http.ts'

export class FetchHttp extends Http {
  async get (url: string) {
    const response = await fetch(url)
    return response.text()
  }
}
