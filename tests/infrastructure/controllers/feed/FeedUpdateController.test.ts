import { Service } from '../../../../src/application/shared/Service.ts'
import { FeedUpdateController } from '../../../../src/infrastructure/api/controllers/feed/FeedUpdateController.ts'

describe('FeedSaveController', () => {
  let controller: FeedUpdateController
  let mockService: jest.Mocked<Service<void>>

  beforeEach(() => {
    mockService = {
      execute: jest.fn()
    }

    controller = new FeedUpdateController(mockService)
  })

  it('should send the params to the service when valid body', async () => {
    const feedParams = { id: '1' }

    const feedBody = {
      title: 'string',
      url: 'string',
      author: 'string',
      category: 'string',
      publishedAt: new Date().toISOString()
    }

    await controller.run(feedParams, feedBody)

    expect(mockService.execute).toHaveBeenCalledWith({ ...feedParams, ...feedBody })
    expect(mockService.execute).toHaveBeenCalledTimes(1)
  })
})
