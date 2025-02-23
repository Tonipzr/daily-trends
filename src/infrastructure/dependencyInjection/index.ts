import { ContainerBuilder, JsonFileLoader } from 'node-dependency-injection'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const container = new ContainerBuilder()
const loader = new JsonFileLoader(container)

loader.load(path.join(path.dirname(fileURLToPath(import.meta.url)), 'application.json'))

export default container
