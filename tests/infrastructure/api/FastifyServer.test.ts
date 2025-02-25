import supertest from 'supertest'
import { FastifyServer } from '../../../src/infrastructure/api/FastifyServer'
import { HttpMethod, Route } from '../../../src/infrastructure/api/routes/Routes'
import { ResponseFactory } from '../../../src/infrastructure/api/response/ResponseFactory'
import { InvalidArgumentError } from '../../../src/domain/shared/error/InvalidArgumentError'

describe('FastifyServer', () => {
  let server: FastifyServer

  beforeEach(async () => {
    server = new FastifyServer(3000)
  })

  afterEach(async () => {
    await server.stop()
  })

  it('should start the server without errors', async () => {
    await server.start()
    expect(server.httpServer).toBeDefined()
    await server.stop()
  })

  it('should register and handle a GET route', async () => {
    const mockHandler = jest.fn().mockResolvedValue({ message: 'Hello, world!' })
    const route: Route = { method: 'GET', path: '/hello', handler: mockHandler }
    server.registerRoute(route)

    await server.start()

    const response = await supertest(server['fastifyApp'].server).get('/hello')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(ResponseFactory.createResponse(200, { message: 'Hello, world!' }).display())
    expect(mockHandler).toHaveBeenCalled()

    await server.stop()
  })

  it('should register a GET route and return expected response not ok', async () => {
    const mockHandler = jest.fn().mockRejectedValue(new InvalidArgumentError('Error'))

    const route: Route = { method: 'GET', path: '/hello2', handler: mockHandler }
    server.registerRoute(route)
    await server.start()

    const response = await supertest(server['fastifyApp'].server).get('/hello2')

    expect(response.status).toBe(400)
    expect(response.body).toEqual(ResponseFactory.createResponse(400, 'Error').display())
    expect(mockHandler).toHaveBeenCalledTimes(1)

    await server.stop()
  })

  it('should register a POST route and return expected response', async () => {
    const mockHandler = jest.fn().mockResolvedValue({ message: 'Hello World' })

    const route: Route = { method: 'POST', path: '/hello', handler: mockHandler }
    server.registerRoute(route)
    await server.start()

    const response = await supertest(server['fastifyApp'].server).post('/hello')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(ResponseFactory.createResponse(200, { message: 'Hello World' }).display())
    expect(mockHandler).toHaveBeenCalledTimes(1)

    await server.stop()
  })

  it('should register a PUT route and return expected response', async () => {
    const mockHandler = jest.fn().mockResolvedValue({ message: 'Hello World' })

    const route: Route = { method: 'PUT', path: '/hello', handler: mockHandler }
    server.registerRoute(route)
    await server.start()

    const response = await supertest(server['fastifyApp'].server).put('/hello')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(ResponseFactory.createResponse(200, { message: 'Hello World' }).display())
    expect(mockHandler).toHaveBeenCalledTimes(1)

    await server.stop()
  })

  it('should register a DELETE route and return expected response', async () => {
    const mockHandler = jest.fn().mockResolvedValue({ message: 'Hello World' })

    const route: Route = { method: 'DELETE', path: '/hello', handler: mockHandler }
    server.registerRoute(route)
    await server.start()

    const response = await supertest(server['fastifyApp'].server).delete('/hello')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(ResponseFactory.createResponse(200, { message: 'Hello World' }).display())
    expect(mockHandler).toHaveBeenCalledTimes(1)

    await server.stop()
  })

  it('should throw an error when trying to register a route with an invalid method', async () => {
    const route: Route = { method: 'INVALID' as HttpMethod, path: '/hello', handler: jest.fn() }

    expect(() => server.registerRoute(route)).toThrow('Invalid HTTP method')

    await server.stop()
  })
})
