jest.mock('../../../../src/infrastructure/dependencyInjection/index.ts', () => {
  return {
    __esModule: true,
    default: { get: jest.fn() },
  }
})
// eslint-disable-next-line import-x/first
import container from '../../../../src/infrastructure/dependencyInjection/index.ts'

const mockFeedFindController = { run: jest.fn() }
const mockFeedSearchController = { run: jest.fn() }
const mockFeedSaveController = { run: jest.fn() }
const mockFeedUpdateController = { run: jest.fn() }
const mockFeedDeleteController = { run: jest.fn() };

(container.get as jest.Mock).mockImplementation((key: string) => {
  const mocks: Record<string, any> = {
    'Feed.FeedFindController': mockFeedFindController,
    'Feed.FeedSearchController': mockFeedSearchController,
    'Feed.FeedSaveController': mockFeedSaveController,
    'Feed.FeedUpdateController': mockFeedUpdateController,
    'Feed.FeedDeleteController': mockFeedDeleteController,
  }
  return mocks[key] || { run: jest.fn() }
})

// eslint-disable-next-line import-x/first
import { routes } from '../../../../src/infrastructure/api/routes/feed.routes.ts'

describe('FeedRoutesConfiguration', () => {
  it('should define the correct routes', () => {
    routes.forEach((route) => {
      expect(route).toHaveProperty('path')
      expect(route).toHaveProperty('method')
      expect(route).toHaveProperty('handler')

      expect(route.method).toMatch(/GET|POST|PUT|DELETE/)
      expect(route.handler).toEqual(expect.any(Function))
    })
  })

  it('should bind handler methods correctly', () => {
    routes.forEach((route) => {
      expect(route.handler).toEqual(expect.any(Function))
    })
  })
})
