import { Http } from '../../src/domain/Scraper/http'

export class HttpMock extends Http {
  private mockGet = jest.fn()

  async get (url: string, options?: { decode?: string }): Promise<string> {
    return this.mockGet(url, options)
  }

  whenGetThenReturn (response: string): void {
    this.mockGet.mockResolvedValue(response)
  }
}
