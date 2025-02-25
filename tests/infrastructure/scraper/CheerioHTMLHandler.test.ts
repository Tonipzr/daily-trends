import { CheerioHTMLHandler } from '../../../src/infrastructure/scraper/CheerioHTMLHandler'

describe('CheerioHTMLHandler', () => {
  let handler: CheerioHTMLHandler
  let htmlSample: string

  beforeEach(() => {
    handler = new CheerioHTMLHandler()
    htmlSample = `
      <html>
        <body>
          <h1>Title</h1>
          <a href="https://example.com">Click Here</a>
          <div class="content">Text</div>
        </body>
      </html>
    `
  })

  it('should load HTML correctly', () => {
    const $ = handler.load(htmlSample)
    expect($('h1').text()).toBe('Title')
  })

  it('should load an element correctly', () => {
    handler.load(htmlSample)
    const element = handler.loadElement('h1')
    expect(element.text()).toBe('Title')
  })

  it('should find an element in the DOM', () => {
    handler.load(htmlSample)
    const element = handler.find('h1')
    expect(element.text()).toBe('Title')
  })

  it('should find an element inside another element', () => {
    handler.load(htmlSample)
    const parentElement = handler.find('body')
    const childElement = handler.findInElement(parentElement, 'h1')
    expect(childElement.text()).toBe('Title')
  })

  it('should get text content from an element', () => {
    handler.load(htmlSample)
    const element = handler.find('.content')
    expect(handler.text(element)).toBe('Text')
  })

  it('should get link from an element', () => {
    handler.load(htmlSample)
    const element = handler.find('a')
    expect(handler.link(element)).toBe('https://example.com')
  })
})
