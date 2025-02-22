describe('Environment', () => {
  beforeEach(() => {
    process.env.API_PORT = '5000'
    process.env.MONGO_URL = 'mongodb://test:27018'

    jest.resetModules()
  })

  afterEach(() => {
    delete process.env.API_PORT
    delete process.env.MONGO_URL
    jest.resetModules()
  })

  it('should have a default API_PORT of 4000', async () => {
    delete process.env.API_PORT
    const { Environment } = await import('../../../src/infrastructure/config/Environment.ts')
    expect(Environment.API_PORT).toBe(4000)
  })

  it('should have a default MONGO_URL of mongodb://localhost:27017', async () => {
    delete process.env.MONGO_URL
    const { Environment } = await import('../../../src/infrastructure/config/Environment.ts')
    expect(Environment.MONGO_URL).toBe('mongodb://localhost:27017')
  })

  it('should take API_PORT from the environment', async () => {
    const { Environment } = await import('../../../src/infrastructure/config/Environment.ts')
    expect(Environment.API_PORT).toBe(5000)
  })

  it('should take MONGO_URL from the environment', async () => {
    const { Environment } = await import('../../../src/infrastructure/config/Environment.ts')
    expect(Environment.MONGO_URL).toBe('mongodb://test:27018')
  })
})
