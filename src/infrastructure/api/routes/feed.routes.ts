import { Routes } from './Routes.ts'
import container from '../../dependencyInjection/index.ts'

const feedSearchController = container.get('Feed.FeedSearchController')
const feedFindController = container.get('Feed.FeedFindController')
const feedSaveController = container.get('Feed.FeedSaveController')
const feedDeleteController = container.get('Feed.FeedDeleteController')
const feedUpdateController = container.get('Feed.FeedUpdateController')
const feedScrapeController = container.get('Feed.FeedScrapeController')

export const routes: Routes = [
  {
    path: '/feed',
    method: 'GET',
    handler: feedFindController.run.bind(feedFindController)
  },
  {
    path: '/feed/:id',
    method: 'GET',
    handler: feedSearchController.run.bind(feedSearchController)
  },
  {
    path: '/feed',
    method: 'POST',
    handler: feedSaveController.run.bind(feedSaveController)
  },
  {
    path: '/feed/:id',
    method: 'PUT',
    handler: feedUpdateController.run.bind(feedUpdateController)
  },
  {
    path: '/feed/:id',
    method: 'DELETE',
    handler: feedDeleteController.run.bind(feedDeleteController)
  },
  {
    path: '/feed/scrape',
    method: 'POST',
    handler: feedScrapeController.run.bind(feedScrapeController)
  }
]
