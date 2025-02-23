class EnvironmentConfig {
  API_PORT = process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 4000
}

export const Environment = new EnvironmentConfig()
