import { IFeed } from '../../domain/Feed/Feed'
import { HTMLHandler } from '../../domain/Scraper/HTMLHandler'
import { Http } from '../../domain/Scraper/http'
import { Scraper } from '../../domain/Scraper/Scraper'

export class ElPaisScraper extends Scraper {
  private selectors = {
    title: { selector: 'h2[class*="c_t"]', typeOf: 'string', children: [{ url: { selector: 'a', typeOf: 'link' } }] },
    subTitle: { selector: 'p[class*="c_d"]', typeOf: 'string', children: [] },
    author: { selector: 'div[class*="c_a"]', typeOf: 'string', children: [] }
  }

  constructor (http: Http, htmlHandler: HTMLHandler) {
    super(http, htmlHandler, 'https://elpais.com/')
  }

  async getNews (): Promise<IFeed[]> {
    const text = await this.http.get(this.url)
    this.htmlHandler.load(text)

    const selectorEntries = Object.entries(this.selectors)

    let articles = this.htmlHandler.find('article[class*="c"]')

    articles = articles.slice(0, 5)

    const foundArticles: Record<string, string>[] = []
    articles.each((index: number, value: any) => {
      const element = this.htmlHandler.loadElement(value)
      const notice: Record<string, string> = {}
      selectorEntries.forEach(([key, value]) => {
        const elm = this.htmlHandler.findInElement(element, value.selector)

        notice[key] = this.htmlHandler.text(elm)

        if (value.children.length > 0) {
          value.children.forEach((child: any) => {
            const childElement = this.htmlHandler.findInElement(elm, child.url.selector)

            notice['url'] = this.htmlHandler.link(childElement)
          })
        }
      })

      foundArticles.push(notice)
    })

    return this.cleanArticles(foundArticles)
  }

  private cleanArticles (articles: Record<string, string>[]): IFeed[] {
    return articles.map((article: Record<string, string>) => {
      const dateFromUrl = article.url.split('/')[4]
      return {
        title: article.title,
        subTitle: article.subTitle,
        url: article.url,
        author: article.author.split('|')[0].trim() || 'unknown',
        source: 'ElPais',
        publishedAt: dateFromUrl && !isNaN(new Date(dateFromUrl).getTime()) ? new Date(dateFromUrl) : new Date()
      }
    })
  }
}
