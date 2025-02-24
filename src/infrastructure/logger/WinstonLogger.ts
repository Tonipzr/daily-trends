import winston, { Logger as WinstonLoggerType } from 'winston'
import { Logger } from './Logger'

export class WinstonLogger implements Logger {
  private logger: WinstonLoggerType

  constructor () {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.simple()
      ),
      transports: [
        new winston.transports.Console({ level: 'debug' }),
      ],
    })
  }

  debug (message: string) : void {
    this.logger.debug(message)
  }

  warn (message: string): void {
    this.logger.warn(message)
  }

  error (message: string | Error) : void {
    this.logger.error(message)
  }

  info (message: string) : void {
    this.logger.info(message)
  }
}

global.logger = new WinstonLogger()
