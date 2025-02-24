import * as cheerio from 'cheerio'
import { HTMLHandler } from '../../domain/Scraper/HTMLHandler.ts'

export class CheerioHTMLHandler extends HTMLHandler {
  private html: any

  load (html: string) {
    this.html = cheerio.load(html)

    return this.html
  }

  loadElement (element: any) {
    return this.html(element)
  }

  find (selector: string) {
    return this.html(selector)
  }

  findInElement (element: any, selector: string) {
    return element.find(selector)
  }

  text (element: any) {
    return element.text()
  }

  link (element: any): string {
    return element.attr('href')
  }
}
