import { Logger } from '../src/infrastructure/logger/Logger.ts'

class TestLogger implements Logger {
  private mockDebug = jest.fn()
  private mockWarn = jest.fn()
  private mockError = jest.fn()
  private mockInfo = jest.fn()

  debug (message: string): void {
    this.mockDebug(message)
  }

  warn (message: string): void {
    this.mockWarn(message)
  }

  error (message: string | Error): void {
    this.mockError(message)
  }

  info (message: string): void {
    this.mockInfo(message)
  }
}

global.logger = new TestLogger()
