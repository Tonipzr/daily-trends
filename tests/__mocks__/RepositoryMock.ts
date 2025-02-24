import { Repository } from '../../src/domain/shared/Repository'

export class RepositoryMock implements Repository {
  private mockSearch = jest.fn()
  private mockFind = jest.fn()
  private mockSave = jest.fn()
  private mockDelete = jest.fn()
  private mockUpdate = jest.fn()

  search (id: string): Promise<unknown> {
    return this.mockSearch(id)
  }

  whenSearchThenReturn (document: unknown): void {
    this.mockSearch.mockResolvedValue(document)
  }

  assertSearchCalledWith (id: string): void {
    expect(this.mockSearch).toHaveBeenCalledWith(id)
  }

  find (): Promise<unknown[]> {
    return this.mockFind()
  }

  whenFindThenReturn (documents: unknown[]): void {
    this.mockFind.mockResolvedValue(documents)
  }

  assertFindCalled (): void {
    expect(this.mockFind).toHaveBeenCalledTimes(1)
  }

  save (document: unknown): Promise<void> {
    this.mockSave(document)

    return Promise.resolve()
  }

  assertSaveCalledWith (document: unknown): void {
    expect(this.mockSave).toHaveBeenCalledWith(document)
  }

  delete (id: string): Promise<boolean> {
    return this.mockDelete(id)
  }

  whenDeleteThenReturn (result: boolean): void {
    this.mockDelete.mockResolvedValue(result)
  }

  assertDeleteCalledWith (id: string): void {
    expect(this.mockDelete).toHaveBeenCalledWith(id)
  }

  update (id: string, document: unknown): Promise<void> {
    this.mockUpdate(id, document)

    return Promise.resolve()
  }

  assertUpdateCalledWith (id: string, document: unknown): void {
    expect(this.mockUpdate).toHaveBeenCalledWith(id, document)
  }
}
