import * as http from 'node:http'
import { Route } from './routes/Routes.ts'

export abstract class Server {
  private readonly _port: number
  private _httpServer?: http.Server

  constructor (port: number) {
    this._port = port
  }

  get port (): number {
    return this._port
  }

  get httpServer (): http.Server | undefined {
    return this._httpServer
  }

  set httpServer (value: http.Server) {
    this._httpServer = value
  }

  abstract start (): void
  abstract stop (): void
  abstract registerRoute (route: Route): void
}
