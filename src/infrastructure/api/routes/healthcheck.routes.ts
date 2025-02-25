import { Routes } from './Routes'
import container from '../../dependencyInjection/index'

const healthCheckController = container.get('HealthCheck.HealthCheckController')

export const routes: Routes = [
  {
    path: '/',
    method: 'GET',
    handler: healthCheckController.run.bind(healthCheckController)
  }
]
