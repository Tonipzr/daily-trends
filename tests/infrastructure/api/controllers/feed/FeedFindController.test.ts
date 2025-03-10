import { Service } from '../../../../../src/application/shared/Service'
import { IFeed } from '../../../../../src/domain/Feed/Feed'
import { FeedFindController } from '../../../../../src/infrastructure/api/controllers/feed/FeedFindController'

describe('FeedFindController', () => {
  let controller: FeedFindController
  let mockService: jest.Mocked<Service<IFeed[]>>

  beforeEach(() => {
    mockService = {
      execute: jest.fn()
    }

    controller = new FeedFindController(mockService)
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

    mockService.execute.mockResolvedValue(fakeFeeds)
    const result = await controller.run(undefined, {})

    expect(result).toEqual(fakeFeeds)
    expect(mockService.execute).toHaveBeenCalledTimes(1)
  })

  it('should return error message', async () => {
    const errorMessage = 'Error message'

    mockService.execute.mockRejectedValue(new Error(errorMessage))

    expect(controller.run(undefined, {})).rejects.toThrow(errorMessage)
    expect(mockService.execute).toHaveBeenCalledTimes(1)
  })
})
