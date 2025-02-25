import { IFeed } from '../../domain/Feed/Feed'
import { HTMLHandler } from '../../domain/Scraper/HTMLHandler'
import { Http } from '../../domain/Scraper/http'
import { Scraper } from '../../domain/Scraper/Scraper'

export class ElMundoScraper extends Scraper {
  private selectors = {
    title: { selector: 'h2[class="ue-c-cover-content__headline"]', typeOf: 'string' },
    subTitle: { selector: 'p[class*="c_d"]', typeOf: 'string' },
    author: { selector: 'span.ue-c-cover-content__byline-name a', secondarySelector: 'span.ue-c-cover-content__byline-name', typeOf: 'string' },
    url: { selector: 'header.ue-c-cover-content__headline-group a', typeOf: 'link' }
  }

  constructor (http: Http, htmlHandler: HTMLHandler) {
    super(http, htmlHandler, 'https://www.elmundo.es/')
  }

  async getNews (): Promise<IFeed[]> {
    const text = await this.http.get(this.url, { decode: 'ISO-8859-15' })
    this.htmlHandler.load(text)

    const selectorEntries = Object.entries(this.selectors)

    let articles = this.htmlHandler.find('article[ue-article-id]')

    articles = articles.slice(0, 5)

    const foundArticles: Record<string, string>[] = []
    articles.each((index: number, value: any) => {
      const element = this.htmlHandler.loadElement(value)
      const notice: Record<string, string> = {}
      selectorEntries.forEach(([key, value]) => {
        let elm = this.htmlHandler.findInElement(element, value.selector)

        if (this.htmlHandler.text(elm) === '' && 'secondarySelector' in value && value.secondarySelector) {
          elm = this.htmlHandler.findInElement(element, value.secondarySelector)
        }

        if (value.typeOf === 'link') {
          notice[key] = this.htmlHandler.link(elm)
        } else {
          notice[key] = this.htmlHandler.text(elm).replace('Redacción: \n', '')
        }
      })

      foundArticles.push(notice)
    })

    return this.cleanArticles(foundArticles)
  }

  private cleanArticles (articles: Record<string, string>[]): IFeed[] {
    return articles.map((article: Record<string, string>) => {
      const dateSplit = article.url.split('/')
      let dateFromUrl: string | undefined
      if (dateSplit.length > 0 && !isNaN(parseInt(dateSplit[4], 10)) && !isNaN(parseInt(dateSplit[5], 10)) && !isNaN(parseInt(dateSplit[6], 10))) {
        dateFromUrl = `${dateSplit[4]}-${dateSplit[5]}-${dateSplit[6]}`
      }

      return {
        title: article.title,
        subTitle: article.subTitle,
        url: article.url,
        author: article.author.split('|')[0].trim() || 'unknown',
        source: 'ElMundo',
        publishedAt: dateFromUrl && !isNaN(new Date(dateFromUrl).getTime()) ? new Date(dateFromUrl) : new Date()
      }
    })
  }
}
