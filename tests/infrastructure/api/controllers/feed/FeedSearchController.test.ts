import { Service } from '../../../../../src/application/shared/Service.ts'
import { IFeed } from '../../../../../src/domain/Feed/Feed.ts'
import { FeedSearchController } from '../../../../../src/infrastructure/api/controllers/feed/FeedSearchController.ts'

describe('FeedSearchController', () => {
  let controller: FeedSearchController
  let mockService: jest.Mocked<Service<IFeed>>

  beforeEach(() => {
    mockService = {
      execute: jest.fn()
    }

    controller = new FeedSearchController(mockService)
  })

  it('should return the feed when valid params', async () => {
    const fakeFeed: IFeed = {
      title: 'Title 1',
      subTitle: 'SubTitle 1',
      url: 'URL 1',
      author: 'Description 1',
      source: 'Custom',
      publishedAt: new Date()
    }

    mockService.execute.mockResolvedValue(fakeFeed)
    const result = await controller.run({ id: '1' }, {})

    expect(result).toEqual(fakeFeed)
    expect(mockService.execute).toHaveBeenCalledTimes(1)
  })

  it('should return error message when invalid params', async () => {
    const result = await controller.run({}, {})

    expect(result).toEqual('Invalid params')
    expect(mockService.execute).not.toHaveBeenCalled()
  })

  it('should return error message', async () => {
    const errorMessage = 'Error message'

    mockService.execute.mockRejectedValue(new Error(errorMessage))
    const result = await controller.run({ id: '1' }, {})

    expect(result).toEqual(errorMessage)
    expect(mockService.execute).toHaveBeenCalledTimes(1)
  })
})
