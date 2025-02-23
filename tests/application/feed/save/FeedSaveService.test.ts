import { FeedSaveService } from '../../../../src/application/feed/save/FeedSaveService.ts'
import { RepositoryMock } from '../../../__mocks__/RepositoryMock.ts'

describe('FeedSaveService', () => {
  let service: FeedSaveService
  let mockRepository: RepositoryMock

  beforeEach(() => {
    mockRepository = new RepositoryMock()

    service = new FeedSaveService(mockRepository)
  })

  it('should call save when valid params', async () => {
    const params: Record<string, unknown> = {
      title: 'Title 1',
      url: 'URL 1',
      author: 'Description 1',
      category: 'Content 1',
      publishedAt: new Date().toISOString()
    }

    await service.execute(params)

    mockRepository.assertSaveCalledWith(params)
  })

  it('should throw an error when invalid params', async () => {
    const params: Record<string, unknown> = {
      title: 'invalid',
    }

    await expect(service.execute(params)).rejects.toThrow('Invalid params')
  })
})
