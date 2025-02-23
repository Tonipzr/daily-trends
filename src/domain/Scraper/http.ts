export abstract class Http {
  abstract get (url: string): Promise<string>
}
