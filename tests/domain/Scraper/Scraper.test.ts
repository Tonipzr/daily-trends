import { HTMLHandlerMock } from '../../__mocks__/HTMLHandlerMock.ts'
import { HttpMock } from '../../__mocks__/HttpMock.ts'
import { ScraperMock } from '../../__mocks__/ScraperMock.ts'

describe('Scraper', () => {
  let scraper: ScraperMock
  let mockHttp: HttpMock
  let mockHTMLHandler: HTMLHandlerMock

  beforeEach(() => {
    mockHttp = new HttpMock()
    mockHTMLHandler = new HTMLHandlerMock()
    scraper = new ScraperMock(mockHttp, mockHTMLHandler, 'https://example.com')
  })

  it('should return http instance', async () => {
    expect(scraper.http).toBe(mockHttp)
  })

  it('should return httpHandler instance', async () => {
    expect(scraper.htmlHandler).toBe(mockHTMLHandler)
  })

  it('should return url', async () => {
    expect(scraper.url).toBe('https://example.com')
  })
})
