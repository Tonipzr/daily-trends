import { Service } from '../../../../../src/application/shared/Service.ts'
import { IFeed, Sources } from '../../../../../src/domain/Feed/Feed.ts'
import { FeedScrapeController } from '../../../../../src/infrastructure/api/controllers/feed/FeedScrapeController.ts'

describe('FeedScrapeController', () => {
  let mockService: jest.Mocked<Service<IFeed[]>>
  let mockFeedSaveService: jest.Mocked<Service<void>>
  let controller: FeedScrapeController

  beforeEach(() => {
    mockService = {
      execute: jest.fn()
    }

    mockFeedSaveService = {
      execute: jest.fn()
    }

    controller = new FeedScrapeController(mockService, mockFeedSaveService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return result from service when no body is provided', async () => {
    const mockResult = [{
      title: 'title',
      subTitle: 'subTitle',
      url: 'url',
      author: 'author',
      source: 'Custom' as Sources,
      publishedAt: new Date()
    }]
    mockService.execute.mockResolvedValue(mockResult)

    const result = await controller.run(undefined, undefined)

    expect(result).toEqual(mockResult)
    expect(mockService.execute).toHaveBeenCalled()
    expect(mockFeedSaveService.execute).not.toHaveBeenCalled()
  })

  it('should return result from service when no body is provided', async () => {
    const mockResult = [{
      title: 'title',
      subTitle: 'subTitle',
      url: 'url',
      author: 'author',
      source: 'Custom' as Sources,
      publishedAt: new Date()
    }]
    mockService.execute.mockResolvedValue(mockResult)

    const result = await controller.run(undefined, { save: false })

    expect(result).toEqual(mockResult)
    expect(mockService.execute).toHaveBeenCalled()
    expect(mockFeedSaveService.execute).not.toHaveBeenCalled()
  })

  it('should call feedSaveService for each feed when body.save is true', async () => {
    const mockResult = [{
      title: 'title',
      subTitle: 'subTitle',
      url: 'url',
      author: 'author',
      source: 'Custom' as Sources,
      publishedAt: new Date()
    }]

    mockService.execute.mockResolvedValue(mockResult)

    await controller.run(undefined, { save: true })

    expect(mockService.execute).toHaveBeenCalled()
    expect(mockFeedSaveService.execute).toHaveBeenCalledTimes(1)
    expect(mockFeedSaveService.execute).toHaveBeenCalledWith({
      title: 'title',
      subTitle: 'subTitle',
      url: 'url',
      author: 'author',
      source: 'Custom',
      publishedAt: expect.any(String)
    })
  })

  it('should return error message when service throws an error', async () => {
    const mockError = new Error('error message')
    mockService.execute.mockRejectedValue(mockError)

    const result = await controller.run(undefined, { save: true })

    expect(result).toBe(mockError.message)
    expect(mockService.execute).toHaveBeenCalled()
    expect(mockFeedSaveService.execute).not.toHaveBeenCalled()
  })
})
