export abstract class HTMLHandler {
  abstract load (html: string): any
  abstract loadElement (element: any): any
  abstract find (selector: string): any
  abstract findInElement (element: any, selector: string): any
  abstract text (element: any): string
  abstract link (element: any): string
}
