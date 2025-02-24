import { Service } from '../../../../../src/application/shared/Service.ts'
import { FeedSaveController } from '../../../../../src/infrastructure/api/controllers/feed/FeedSaveController.ts'

describe('FeedSaveController', () => {
  let controller: FeedSaveController
  let mockService: jest.Mocked<Service<void>>

  beforeEach(() => {
    mockService = {
      execute: jest.fn()
    }

    controller = new FeedSaveController(mockService)
  })

  it('should send the params to the service', async () => {
    const feedBody = {
      title: 'string',
      subTitle: 'string',
      url: 'string',
      author: 'string',
      source: 'Custom',
      publishedAt: new Date().toISOString()
    }

    await controller.run(undefined, feedBody)

    expect(mockService.execute).toHaveBeenCalledWith(feedBody)
    expect(mockService.execute).toHaveBeenCalledTimes(1)
  })
})
