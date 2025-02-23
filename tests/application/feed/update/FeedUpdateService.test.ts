import { FeedUpdateService } from '../../../../src/application/feed/update/FeedUpdateService.ts'
import { RepositoryMock } from '../../../__mocks__/RepositoryMock.ts'

describe('FeedUpdateService', () => {
  let service: FeedUpdateService
  let mockRepository: RepositoryMock

  beforeEach(() => {
    mockRepository = new RepositoryMock()

    service = new FeedUpdateService(mockRepository)
  })

  it('should call update when valid params', async () => {
    const params: Record<string, unknown> = {
      id: '1',
      title: 'Title 1',
      url: 'URL 1',
      author: 'Description 1',
      category: 'Content 1',
      publishedAt: new Date().toISOString()
    }

    await service.execute(params)

    mockRepository.assertUpdateCalledWith(params.id as string, {
      title: params.title,
      url: params.url,
      author: params.author,
      category: params.category,
      publishedAt: new Date(params.publishedAt as string)
    })
  })

  it('should throw an error when invalid params', async () => {
    const params: Record<string, unknown> = {
      title: 'invalid',
    }

    await expect(service.execute(params)).rejects.toThrow('Invalid params')
  })
})
