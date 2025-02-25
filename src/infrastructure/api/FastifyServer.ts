import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { Server } from './Server'
import { Route } from './routes/Routes'
import { InvalidArgumentError } from '../../domain/shared/error/InvalidArgumentError'
import { ResponseFactory } from './response/ResponseFactory'
import { ConflictError } from '../../domain/shared/error/ConflictError'

export class FastifyServer extends Server {
  private fastifyApp: FastifyInstance = Fastify()

  start (): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.fastifyApp.server

      this.fastifyApp.listen({ port: this.port }, () => {
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
    if (!this.fastifyApp) {
      throw new Error('Server is not running')
    }

    switch (route.method) {
      case 'GET':
        this.fastifyApp.get(route.path, this.handleRequestWithFunction(route.handler))
        break
      case 'POST':
        this.fastifyApp.post(route.path, this.handleRequestWithFunction(route.handler))
        break
      case 'PUT':
        this.fastifyApp.put(route.path, this.handleRequestWithFunction(route.handler))
        break
      case 'DELETE':
        this.fastifyApp.delete(route.path, this.handleRequestWithFunction(route.handler))
        break
      default:
        throw new Error('Invalid HTTP method')
    }
  }

  handleRequestWithFunction (fn: Function): (req: FastifyRequest, res: FastifyReply) => void {
    return async (req: FastifyRequest, res: FastifyReply) => {
      logger.info(`Request received: ${req.method} ${req.url} | BODY: ${JSON.stringify(req.body)} | PARAMS: ${JSON.stringify(req.params)}`)

      try {
        const values = await fn(req.params, req.body)

        logger.debug(`Response sent: ${JSON.stringify(values)}`)

        res.send(ResponseFactory.createResponse(200, values).display())
      } catch (error) {
        if (error instanceof InvalidArgumentError || (error as Error).name === 'InvalidArgumentError') {
          const err = error as InvalidArgumentError
          logger.debug(`Error: ${err.message}`)

          res.status(400).send(ResponseFactory.createResponse(400, err.message).display())
          return
        }

        if (error instanceof ConflictError || (error as Error).name === 'ConflictError') {
          const err = error as ConflictError
          logger.debug(`Error: ${err.message}`)

          res.status(409).send(ResponseFactory.createResponse(409, err.message).display())
          return
        }

        res.status(500).send(ResponseFactory.createResponse(500, (error as Error).message).display())
      }
    }
  }
}
