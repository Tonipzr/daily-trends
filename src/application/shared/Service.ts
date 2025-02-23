export interface Service<T> {
  execute: (params?: Record<string, unknown> | undefined) => Promise<T>
}
