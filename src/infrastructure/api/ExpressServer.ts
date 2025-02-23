import express from 'express'
import { Server } from './Server.ts'

export class ExpressServer extends Server {
  start (): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = express().listen(this.port, () => {
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
}
