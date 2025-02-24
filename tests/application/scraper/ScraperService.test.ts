import { ScraperService } from '../../../src/application/scraper/ScraperService.ts'
import { HTMLHandlerMock } from '../../__mocks__/HTMLHandlerMock.ts'
import { HttpMock } from '../../__mocks__/HttpMock.ts'
import { ScraperMock } from '../../__mocks__/ScraperMock.ts'

describe('ScraperService', () => {
  let service: ScraperService
  let mockScraper: ScraperMock
  let mockHttp: HttpMock
  let mockHTMLHandler: HTMLHandlerMock

  beforeEach(() => {
    mockHttp = new HttpMock()
    mockHTMLHandler = new HTMLHandlerMock()
    mockScraper = new ScraperMock(mockHttp, mockHTMLHandler, 'https://example.com')

    service = new ScraperService([mockScraper])
  })

  it('should call getNews when at least one scraper available', async () => {
    mockScraper.whenGetNewsThenReturn([])
    await service.execute()

    mockScraper.assertGetNewsCalled()
  })

  it('should not call getNews when no scraper available', async () => {
    service = new ScraperService([])
    await service.execute()

    mockScraper.assertGetNewsCalled(0)
  })
})
