import { HTMLHandler } from '../../src/domain/Scraper/HTMLHandler.ts'

export class HTMLHandlerMock extends HTMLHandler {
  private mockLoad = jest.fn()
  private mockLoadElement = jest.fn()
  private mockFind = jest.fn()
  private mockFindInElement = jest.fn()
  private mockText = jest.fn()
  private mockLink = jest.fn()

  load (html: string) {
    return this.mockLoad(html)
  }

  whenLoadThenReturn (response: any): void {
    this.mockLoad.mockReturnValue(response)
  }

  loadElement (element: any) {
    return this.mockLoadElement(element)
  }

  whenLoadElementThenReturn (response: any): void {
    this.mockLoadElement.mockReturnValue(response)
  }

  find (selector: string) {
    return this.mockFind(selector)
  }

  whenFindThenReturn (response: any): void {
    this.mockFind.mockReturnValue(response)
  }

  findInElement (element: any, selector: string) {
    return this.mockFindInElement(element, selector)
  }

  whenFindInElementThenReturn (response: any): void {
    this.mockFindInElement.mockReturnValue(response)
  }

  text (element: any) {
    return this.mockText(element) || ''
  }

  whenTextThenReturn (response: any): void {
    this.mockText.mockReturnValue(response)
  }

  link (element: any): string {
    return this.mockLink(element) || ''
  }

  whenLinkThenReturn (response: any): void {
    this.mockLink.mockReturnValue(response)
  }
}
