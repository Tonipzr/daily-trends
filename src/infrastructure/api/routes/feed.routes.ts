import { FeedSearchController } from '../controllers/feed/FeedSearchController.ts'
import { FeedFindController } from '../controllers/feed/FeedFindController.ts'
import { FeedSaveController } from '../controllers/feed/FeedSaveController.ts'
import { Routes } from './Routes.ts'
import { FeedDeleteController } from '../controllers/feed/FeedDeleteController.ts'
import { FeedUpdateController } from '../controllers/feed/FeedUpdateController.ts'

const feedSearchController = new FeedSearchController()
const feedFindController = new FeedFindController()
const feedSaveController = new FeedSaveController()
const feedDeleteController = new FeedDeleteController()
const feedUpdateController = new FeedUpdateController()

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
  }
]
