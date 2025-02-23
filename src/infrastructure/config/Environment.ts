class EnvironmentConfig {
  API_PORT = process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 4000
  MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
  SERVER_TYPE: 'express' | 'fastify' = validateServerType(process.env.SERVER_TYPE)
}

function validateServerType (serverType: string | undefined) {
  if (!serverType || (serverType !== 'express' && serverType !== 'fastify')) {
    return 'express'
  }

  return serverType
}

export const Environment = new EnvironmentConfig()
