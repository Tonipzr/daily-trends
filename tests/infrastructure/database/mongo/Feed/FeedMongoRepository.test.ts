import mongoose, { Model } from 'mongoose'
import { IFeed } from '../../../../../src/domain/Feed/Feed'
import { FeedMongoRepository } from '../../../../../src/infrastructure/database/mongo/Feed/FeedMongoRepository'

jest.mock('mongoose', () => {
  const mockModel = {
    find: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
  }

  const mockConnection = {
    model: jest.fn().mockReturnValue(mockModel),
  }

  return {
    ...jest.requireActual('mongoose'),
    connect: jest.fn(),
    model: jest.fn().mockReturnValue(mockModel),
    connection: mockConnection,
  }
})

describe('FeedMongoRepository', () => {
  let feedRepo: FeedMongoRepository
  let mockClient: Promise<mongoose.Connection>
  let mockModel: mongoose.Model<IFeed>

  beforeEach(() => {
    mockClient = Promise.resolve(mongoose.connection)

    feedRepo = new FeedMongoRepository(mockClient)
    mockModel = mongoose.model('Feed') as Model<IFeed>
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should search a feed by id', async () => {
    const mockFeed: IFeed = {
      title: 'Test Feed',
      subTitle: 'Test SubTitle',
      url: 'http://example.com',
      author: 'Test Author',
      source: 'Custom',
      publishedAt: new Date(),
    }
    const mockFindById = jest.fn().mockResolvedValue(mockFeed)
    mockModel.findById = mockFindById

    const result = await feedRepo.search('123')

    expect(mockFindById).toHaveBeenCalledWith('123')
    expect(result).toEqual(mockFeed)
  })

  it('should find all feeds', async () => {
    const mockFeeds: IFeed[] = [
      {
        title: 'Test Feed 1',
        subTitle: 'Test SubTitle 1',
        url: 'http://example.com',
        author: 'Test Author 1',
        source: 'Custom',
        publishedAt: new Date(),
      },
      {
        title: 'Test Feed 2',
        subTitle: 'Test SubTitle 2',
        url: 'http://example.com',
        author: 'Test Author 2',
        source: 'Custom',
        publishedAt: new Date(),
      },
    ]

    const mockFind = jest.fn().mockResolvedValue(mockFeeds)
    mockModel.find = mockFind

    const result = await feedRepo.find()

    expect(mockFind).toHaveBeenCalled()
    expect(result).toEqual(mockFeeds)
  })

  it('should delete a feed by id', async () => {
    const mockDeleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 })
    mockModel.deleteOne = mockDeleteOne

    const result = await feedRepo.delete('123')

    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: '123' })
    expect(result).toBe(true)
  })

  it('should update a feed by id', async () => {
    const feedData: IFeed = {
      title: 'Updated Test Feed',
      subTitle: 'Updated SubTitle',
      url: 'http://example.com',
      author: 'Updated Author',
      source: 'Custom',
      publishedAt: new Date(),
    }

    const mockUpdateOne = jest.fn().mockResolvedValue(undefined)
    mockModel.updateOne = mockUpdateOne

    await feedRepo.update('123', feedData)

    expect(mockUpdateOne).toHaveBeenCalledWith({ _id: '123' }, feedData)
  })
})
