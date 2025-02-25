import { ElMundoScraper } from '../../../src/infrastructure/scraper/ElMundoScraper'
import { HTMLHandlerMock } from '../../__mocks__/HTMLHandlerMock'
import { HttpMock } from '../../__mocks__/HttpMock'

describe('ElMundoScraper', () => {
  let scraper: ElMundoScraper
  let mockHttp: HttpMock
  let mockHtmlHandler: HTMLHandlerMock

  beforeEach(() => {
    mockHttp = new HttpMock()
    mockHtmlHandler = new HTMLHandlerMock()

    scraper = new ElMundoScraper(mockHttp, mockHtmlHandler)
  })

  it('should fetch news correctly', async () => {
    const fakeHtml = ''

    mockHttp.whenGetThenReturn(fakeHtml)
    mockHtmlHandler.whenLoadThenReturn(fakeHtml)
    mockHtmlHandler.whenFindThenReturn({
      slice: () => ({
        // eslint-disable-next-line n/no-callback-literal
        each: (callback: Function) => callback(0, '<article ue-article-id="1"></article>'),
      }),
    })

    mockHtmlHandler.whenLoadElementThenReturn(fakeHtml)
    mockHtmlHandler.whenFindInElementThenReturn(fakeHtml)
    mockHtmlHandler.whenTextThenReturn('Text')
    mockHtmlHandler.whenLinkThenReturn('https://example.com')

    const news = await scraper.getNews()

    expect(news).toEqual([
      {
        title: 'Text',
        subTitle: 'Text',
        author: 'Text',
        source: 'ElMundo',
        url: 'https://example.com',
        publishedAt: expect.any(Date),
      }
    ])
  })

  it('should get the date from the url', async () => {
    const fakeHtml = ''

    mockHttp.whenGetThenReturn(fakeHtml)
    mockHtmlHandler.whenLoadThenReturn(fakeHtml)
    mockHtmlHandler.whenFindThenReturn({
      slice: () => ({
        // eslint-disable-next-line n/no-callback-literal
        each: (callback: Function) => callback(0, '<article ue-article-id="1"></article>'),
      }),
    })

    mockHtmlHandler.whenLoadElementThenReturn(fakeHtml)
    mockHtmlHandler.whenFindInElementThenReturn(fakeHtml)
    mockHtmlHandler.whenTextThenReturn('Text')
    mockHtmlHandler.whenLinkThenReturn('https://example.com/test/2021/01/01/')

    const news = await scraper.getNews()

    expect(news).toEqual([
      {
        title: 'Text',
        subTitle: 'Text',
        author: 'Text',
        source: 'ElMundo',
        url: 'https://example.com/test/2021/01/01/',
        publishedAt: expect.any(Date),
      }
    ])
  })
})
