import { MongoMemoryServer } from 'mongodb-memory-server'

describe('MongoClientFactory', () => {
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    process.env.MONGO_URL = mongoServer.getUri()
  })

  afterAll(async () => {
    await mongoServer.stop()
  })

  it('should create a client', async () => {
    const { MongoClientFactory } = await import('../../../../src/infrastructure/database/mongo/MongoClientFactory.ts')
    const client = await MongoClientFactory.createClient('test')
    expect(client).toBeDefined()

    await client.close()
  })

  it('should return the same client for the same context', async () => {
    const { MongoClientFactory } = await import('../../../../src/infrastructure/database/mongo/MongoClientFactory.ts')
    const client1 = await MongoClientFactory.createClient('test')
    const client2 = await MongoClientFactory.createClient('test')
    expect(client1).toBe(client2)

    await client1.close()
  })

  it('should return different clients for different contexts', async () => {
    const { MongoClientFactory } = await import('../../../../src/infrastructure/database/mongo/MongoClientFactory.ts')
    const client1 = await MongoClientFactory.createClient('test1')
    const client2 = await MongoClientFactory.createClient('test2')
    expect(client1).not.toBe(client2)

    await client1.close()
    await client2.close()
  })
})
