import { Controller } from '../controllers/Controller'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type Route = {
  path: string,
  method: HttpMethod,
  handler: Controller['run']
}

export type Routes = Array<Route>
