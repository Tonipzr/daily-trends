export class ConflictError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ConflictError'
    Object.setPrototypeOf(this, ConflictError.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConflictError)
    }
  }
}
