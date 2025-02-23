import supertest from 'supertest'
import { ExpressServer } from '../../../src/infrastructure/api/ExpressServer.ts'
import { HttpMethod, Route } from '../../../src/infrastructure/api/routes/Routes.ts'
import express from 'express'

describe('ExpressServer', () => {
  let server: ExpressServer

  beforeAll(() => {
    server = new ExpressServer(3000)
  })

  afterAll(async () => {
    await server.stop()
  })

  it('should start and listen on the specified port', async () => {
    const response = await supertest(server['expressApp']).get('/')

    // Force 404 because no routes are registered
    expect(response.status).toBe(404)
  })

  it('should register a GET route and return expected response', async () => {
    const mockHandler = jest.fn().mockResolvedValue({ message: 'Hello World' })

    const route: Route = { method: 'GET', path: '/hello', handler: mockHandler }
    server.registerRoute(route)
    await server.start()

    const response = await supertest(server['expressApp']).get('/hello')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Hello World' })
    expect(mockHandler).toHaveBeenCalledTimes(1)

    await server.stop()
  })

  it('should register a POST route and return expected response', async () => {
    const mockHandler = jest.fn().mockResolvedValue({ message: 'Hello World' })

    const route: Route = { method: 'POST', path: '/hello', handler: mockHandler }
    server.registerRoute(route)
    await server.start()

    const response = await supertest(server['expressApp']).post('/hello')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Hello World' })
    expect(mockHandler).toHaveBeenCalledTimes(1)

    await server.stop()
  })

  it('should register a PUT route and return expected response', async () => {
    const mockHandler = jest.fn().mockResolvedValue({ message: 'Hello World' })

    const route: Route = { method: 'PUT', path: '/hello', handler: mockHandler }
    server.registerRoute(route)
    await server.start()

    const response = await supertest(server['expressApp']).put('/hello')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Hello World' })
    expect(mockHandler).toHaveBeenCalledTimes(1)

    await server.stop()
  })

  it('should register a DELETE route and return expected response', async () => {
    const mockHandler = jest.fn().mockResolvedValue({ message: 'Hello World' })

    const route: Route = { method: 'DELETE', path: '/hello', handler: mockHandler }
    server.registerRoute(route)
    await server.start()

    const response = await supertest(server['expressApp']).delete('/hello')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Hello World' })
    expect(mockHandler).toHaveBeenCalledTimes(1)

    await server.stop()
  })

  it('should throw an error when trying to register a route with an invalid method', async () => {
    const route: Route = { method: 'INVALID' as HttpMethod, path: '/hello', handler: jest.fn() }

    expect(() => server.registerRoute(route)).toThrow('Invalid HTTP method')

    await server.stop()
  })

  it('should throw an error when trying to register a route without starting the server', async () => {
    const route: Route = { method: 'GET', path: '/hello', handler: jest.fn() }

    server['expressApp'] = undefined as unknown as express.Application

    expect(() => server.registerRoute(route)).toThrow('Server is not running')

    server = new ExpressServer(3000)
    await server.stop()
  })

  it('should stop the server', async () => {
    await server.stop()

    const response = await supertest(server['expressApp']).get('/')
    expect(response.status).toBe(404)
  })
})
