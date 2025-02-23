import express, { RequestHandler, Request, Response } from 'express'
import { Server } from './Server.ts'
import { Route } from './routes/Routes.ts'

export class ExpressServer extends Server {
  private expressApp: express.Application = express()

  start (): Promise<void> {
    return new Promise((resolve) => {
      this.expressApp.use(express.json())

      this.httpServer = this.expressApp.listen(this.port, () => {
        console.log(
            `API is running at http://localhost:${this.port}`
        )
        console.log('  Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  stop (): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error)
          }
          return resolve()
        })
      }

      return resolve()
    })
  }

  registerRoute (route: Route): void {
    if (!this.expressApp) {
      throw new Error('Server is not running')
    }

    switch (route.method) {
      case 'GET':
        this.expressApp.get(route.path, this.handleRequestWithFunction(route.handler as unknown as RequestHandler))
        break
      case 'POST':
        this.expressApp.post(route.path, this.handleRequestWithFunction(route.handler as unknown as RequestHandler))
        break
      case 'PUT':
        this.expressApp.put(route.path, this.handleRequestWithFunction(route.handler as unknown as RequestHandler))
        break
      case 'DELETE':
        this.expressApp.delete(route.path, this.handleRequestWithFunction(route.handler as unknown as RequestHandler))
        break
      default:
        throw new Error('Invalid HTTP method')
    }
  }

  handleRequestWithFunction (fn: Function): RequestHandler {
    return async (req: Request, res: Response) => {
      const values = await fn(req.params, req.body)

      console.log(values)

      res.json(values)
    }
  }
}
