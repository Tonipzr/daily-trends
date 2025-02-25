import winston from 'winston'
import { WinstonLogger } from '../../../src/infrastructure/logger/WinstonLogger'

jest.mock('winston', () => ({
  createLogger: jest.fn().mockReturnValue({
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  }),
  transports: {
    Console: jest.fn(),
  },
  format: {
    combine: jest.fn(),
    prettyPrint: jest.fn(),
    errors: jest.fn(),
    splat: jest.fn(),
    colorize: jest.fn(),
    simple: jest.fn(),
  },
}))

describe('WinstonLogger', () => {
  let logger: WinstonLogger

  beforeEach(() => {
    logger = new WinstonLogger()
  })

  it('should call logger.debug with the correct message', () => {
    const message = 'Debug message'
    logger.debug(message)

    expect(winston.createLogger().debug).toHaveBeenCalledWith(message)
  })

  it('should call logger.warn with the correct message', () => {
    const message = 'Warn message'
    logger.warn(message)

    expect(winston.createLogger().warn).toHaveBeenCalledWith(message)
  })

  it('should call logger.error with the correct message', () => {
    const message = 'Error message'
    logger.error(message)

    expect(winston.createLogger().error).toHaveBeenCalledWith(message)
  })

  it('should call logger.info with the correct message', () => {
    const message = 'Info message'
    logger.info(message)

    expect(winston.createLogger().info).toHaveBeenCalledWith(message)
  })
})
