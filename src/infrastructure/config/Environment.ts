class EnvironmentConfig {
  API_PORT = process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 4000
  MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
}

export const Environment = new EnvironmentConfig()
