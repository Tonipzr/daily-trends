import { FeedSearchService } from '../../../../src/application/feed/search/FeedSearchService.ts'
import { IFeed } from '../../../../src/domain/Feed/Feed.ts'
import { RepositoryMock } from '../../../__mocks__/RepositoryMock.ts'

describe('FeedSearchService', () => {
  let service: FeedSearchService
  let mockRepository: RepositoryMock

  beforeEach(() => {
    mockRepository = new RepositoryMock()

    service = new FeedSearchService(mockRepository)
  })

  it('should return the feed', async () => {
    const fakeFeed: IFeed = {
      title: 'Title 1',
      url: 'URL 1',
      author: 'Description 1',
      category: 'Content 1',
      publishedAt: new Date()
    }

    mockRepository.whenSearchThenReturn(fakeFeed)
    const result = await service.execute({ id: '1' })

    expect(result).toEqual(fakeFeed)
    mockRepository.assertSearchCalledWith('1')
  })

  it('should return null if no available feed', async () => {
    mockRepository.whenSearchThenReturn(null)
    const result = await service.execute({ id: '1' })

    expect(result).toEqual(null)
    mockRepository.assertSearchCalledWith('1')
  })
})
