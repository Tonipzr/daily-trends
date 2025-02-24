export abstract class Http {
  abstract get (url: string, options?: { decode?: string }): Promise<string>
}
