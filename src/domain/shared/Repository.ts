export interface Repository {
  search(id: string): Promise<unknown>;
  find(): Promise<unknown[]>;
  save(document: unknown): Promise<void>;
  delete(id: string): Promise<boolean>;
  update(id: string, document: unknown): Promise<void>;
}
