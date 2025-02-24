import { Http } from '../../domain/Scraper/http.ts'
import iconv from 'iconv-lite'

export class FetchHttp extends Http {
  async get (url: string, options?: { decode?: string }): Promise<string> {
    const response = await fetch(url)

    if (options && options.decode) {
      return iconv.decode(Buffer.from(await response.arrayBuffer()), options.decode)
    }

    return response.text()
  }
}
