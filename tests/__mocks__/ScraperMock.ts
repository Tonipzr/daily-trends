import { IFeed } from '../../src/domain/Feed/Feed.ts'
import { Scraper } from '../../src/domain/Scraper/Scraper.ts'

export class ScraperMock extends Scraper {
  private mockGetNews = jest.fn()

  async getNews (): Promise<IFeed[]> {
    return this.mockGetNews()
  }

  whenGetNewsThenReturn (response: IFeed[]): void {
    this.mockGetNews.mockResolvedValue(response)
  }

  assertGetNewsCalled (times = 1): void {
    expect(this.mockGetNews).toHaveBeenCalledTimes(times)
  }
}
