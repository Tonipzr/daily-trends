import { Service } from '../../../../../src/application/shared/Service.ts'
import { FeedDeleteController } from '../../../../../src/infrastructure/api/controllers/feed/FeedDeleteController.ts'

describe('FeedDeleteController', () => {
  let controller: FeedDeleteController
  let mockService: jest.Mocked<Service<boolean>>

  beforeEach(() => {
    mockService = {
      execute: jest.fn()
    }

    controller = new FeedDeleteController(mockService)
  })

  it('should delete the feed when valid params', async () => {
    mockService.execute.mockResolvedValue(true)
    const result = await controller.run({ id: '1' }, {})

    expect(result).toEqual(true)
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
