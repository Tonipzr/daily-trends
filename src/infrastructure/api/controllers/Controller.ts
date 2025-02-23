export interface Controller {
  run(params: Record<string, string> | undefined, body: any): Promise<unknown>;
}
