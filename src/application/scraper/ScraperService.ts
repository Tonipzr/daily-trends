import { IFeed } from '../../domain/Feed/Feed.ts'
import { Scraper } from '../../domain/Scraper/Scraper.ts'
import { Service } from '../shared/Service.ts'

export class ScraperService implements Service<IFeed[]> {
  private scrapers: Scraper[]

  constructor (scrapers: Scraper[]) {
    this.scrapers = scrapers
  }

  async execute (): Promise<IFeed[]> {
    const feeds: IFeed[] = []

    for (const scraper of this.scrapers) {
      const news = await scraper.getNews()

      feeds.push(...news)
    }

    return feeds
  }
}
