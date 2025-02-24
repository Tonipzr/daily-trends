import { Controller } from '../Controller'

export class HealthCheckController implements Controller {
  async run (params: Record<string, string> | undefined, body: any): Promise<unknown> {
    try {
      const healthStatus = {
        status: 'ok',
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        pid: process.pid,
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch
      }

      return healthStatus
    } catch (error) {
      return (error as Error).message
    }
  }
}
