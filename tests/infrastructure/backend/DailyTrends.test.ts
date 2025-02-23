import { Server } from '../../../src/infrastructure/api/Server.ts'
import { DailyTrendsApp } from '../../../src/infrastructure/backend/DailyTrends.ts'

describe('DailyTrendsApp', () => {
  it('should instantiate with server param', () => {
    const server = {
      start: jest.fn()
    } as unknown as Server
    const app = new DailyTrendsApp(server)
    expect(app).toBeInstanceOf(DailyTrendsApp)
  })

  it('should start the server', async () => {
    const server = {
      start: jest.fn()
    } as unknown as Server
    const app = new DailyTrendsApp(server)
    await app.start()
    expect(server.start).toHaveBeenCalledTimes(1)
  })
})
