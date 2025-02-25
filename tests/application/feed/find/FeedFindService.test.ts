import { FeedFindService } from '../../../../src/application/feed/find/FeedFindService'
import { IFeed } from '../../../../src/domain/Feed/Feed'
import { RepositoryMock } from '../../../__mocks__/RepositoryMock'

describe('FeedFindService', () => {
  let service: FeedFindService
  let mockRepository: RepositoryMock

  beforeEach(() => {
    mockRepository = new RepositoryMock()

    service = new FeedFindService(mockRepository)
  })

  it('should return feeds', async () => {
    const fakeFeeds: IFeed[] = [
      {
        title: 'Title 1',
        subTitle: 'SubTitle 1',
        url: 'URL 1',
        author: 'Description 1',
        source: 'Custom',
        publishedAt: new Date()
      }
    ]

    mockRepository.whenFindThenReturn(fakeFeeds)
    const result = await service.execute()

    expect(result).toEqual(fakeFeeds)
    mockRepository.assertFindCalled()
  })

  it('should return an empty array if there are no feeds', async () => {
    mockRepository.whenFindThenReturn([])
    const result = await service.execute()

    expect(result).toEqual([])
    mockRepository.assertFindCalled()
  })
})
