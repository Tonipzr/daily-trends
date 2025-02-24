import { Logger } from './infrastructure/logger/Logger'

declare global {
  // eslint-disable-next-line no-var
  var logger: Logger
}

export {}
