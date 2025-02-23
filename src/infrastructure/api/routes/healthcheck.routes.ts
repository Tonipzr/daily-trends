import { Routes } from './Routes.ts'
import container from '../../dependencyInjection/index.ts'

const healthCheckController = container.get('HealthCheck.HealthCheckController')

export const routes: Routes = [
  {
    path: '/',
    method: 'GET',
    handler: healthCheckController.run.bind(healthCheckController)
  }
]
