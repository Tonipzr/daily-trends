import { ContainerBuilder, JsonFileLoader } from 'node-dependency-injection'
import path from 'node:path'

const container = new ContainerBuilder()
const loader = new JsonFileLoader(container)

loader.load(path.join(__dirname, 'application.json'))

export default container
