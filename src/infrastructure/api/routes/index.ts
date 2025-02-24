import path from 'node:path'
import { glob } from 'glob'
import container from '../../dependencyInjection/index'
import { Route } from './Routes'
import { Server } from '../Server'

export async function registerRoutes () : Promise<void> {
  const routes = glob.sync(path.join(__dirname, '/**/*.routes.*'), { allowWindowsEscape: false })
  await Promise.all(
    routes.map(async (route) => register(route))
  )
}

async function register (routePath: string) : Promise<void> {
  const route = require(routePath) // FIXME: This is a workaround to make the import work in windows

  const server: Server = container.get('Shared.Server')

  if (route && route.routes && Array.isArray(route.routes)) {
    route.routes.forEach((r: Route) => {
      server.registerRoute(r)
    })
  }
}
