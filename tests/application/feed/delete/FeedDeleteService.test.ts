import { FeedDeleteService } from '../../../../src/application/feed/delete/FeedDeleteService'
import { RepositoryMock } from '../../../__mocks__/RepositoryMock'

describe('FeedDeleteService', () => {
  let service: FeedDeleteService
  let mockRepository: RepositoryMock

  beforeEach(() => {
    mockRepository = new RepositoryMock()

    service = new FeedDeleteService(mockRepository)
  })

  it('should delete the feed when valid id', async () => {
    const params = { id: '1' }

    mockRepository.whenDeleteThenReturn(true)
    const result = await service.execute(params)

    expect(result).toEqual(true)
    mockRepository.assertDeleteCalledWith(params.id)
  })

  it('should throw an error when invalid id', async () => {
    const params = { id: 1 }

    await expect(service.execute(params)).rejects.toThrow('Invalid params')
  })
})
