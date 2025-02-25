import express, { RequestHandler, Request, Response } from 'express'
import { Server } from './Server'
import { Route } from './routes/Routes'
import { InvalidArgumentError } from '../../domain/shared/error/InvalidArgumentError'
import { ResponseFactory } from './response/ResponseFactory'
import { ConflictError } from '../../domain/shared/error/ConflictError'

export class ExpressServer extends Server {
  private expressApp: express.Application = express()

  start (): Promise<void> {
    return new Promise((resolve) => {
      this.expressApp.use(express.json())

      this.httpServer = this.expressApp.listen(this.port, () => {
        logger.info(
            `API is running at http://localhost:${this.port}`
        )
        logger.info('  Press CTRL-C to stop\n')
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
      logger.info(`Request received: ${req.method} ${req.path} | BODY: ${JSON.stringify(req.body)} | PARAMS: ${JSON.stringify(req.params)}`)

      try {
        const values = await fn(req.params, req.body)

        logger.debug(`Response sent: ${JSON.stringify(values)}`)

        res.json(ResponseFactory.createResponse(200, values).display())
      } catch (error) {
        if (error instanceof InvalidArgumentError || (error as Error).name === 'InvalidArgumentError') {
          const err = error as InvalidArgumentError
          logger.debug(`Error: ${err.message}`)

          res.status(400).json(ResponseFactory.createResponse(400, err.message).display())
          return
        }

        if (error instanceof ConflictError || (error as Error).name === 'ConflictError') {
          const err = error as ConflictError
          logger.debug(`Error: ${err.message}`)

          res.status(409).json(ResponseFactory.createResponse(409, err.message).display())
          return
        }

        res.status(500).json(ResponseFactory.createResponse(500, (error as Error).message).display())
      }
    }
  }
}
