import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import container from '../../dependencyInjection/index.ts'
import { Route } from './Routes.ts'
import { Server } from '../Server.ts'

export function registerRoutes () : void {
  const routes = glob.sync(path.join(path.dirname(fileURLToPath(import.meta.url)), '/**/*.routes.*'), { allowWindowsEscape: false })
  routes.map((route) => register(route))
}

async function register (routePath: string) : Promise<void> {
  const route = await import(`file:\\\\${routePath}`) // FIXME: This is a workaround to make the import work in windows

  const server: Server = container.get('Shared.Server')

  if (route && route.routes && Array.isArray(route.routes)) {
    route.routes.forEach((r: Route) => {
      server.registerRoute(r)
    })
  }
}
