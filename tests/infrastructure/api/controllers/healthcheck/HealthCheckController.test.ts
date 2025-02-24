import { HealthCheckController } from '../../../../../src/infrastructure/api/controllers/healthcheck/HealthCheckController'

describe('HealthCheckController', () => {
  let controller: HealthCheckController

  beforeEach(() => {
    controller = new HealthCheckController()
  })

  it('should return the server health', async () => {
    const result = await controller.run(undefined, {})

    expect(result).toHaveProperty('status')
    expect(result).toHaveProperty('uptime')
    expect(result).toHaveProperty('memoryUsage')
    expect(result).toHaveProperty('pid')
    expect(result).toHaveProperty('nodeVersion')
    expect(result).toHaveProperty('platform')
    expect(result).toHaveProperty('arch')
  })

  it('should return error message', async () => {
    const errorMessage = 'Error message'
    jest.spyOn(process, 'memoryUsage').mockImplementation(() => {
      throw new Error(errorMessage)
    })

    const result = await controller.run(undefined, {})

    expect(result).toEqual(errorMessage)
  })
})
