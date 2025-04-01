import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { app } from 'electron'
import { join } from 'path'

const database = join(app.getPath('userData'), 'database', 'database.sqlite')
console.log('database', database)
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: database,
  // database: './src/main/db/database.sqlite',
  synchronize: !app.isPackaged,
  logging: false,
  entities: [User],
  // migrations: ['./src/main/db/migration/*.ts'],
  migrations: [],
  subscribers: []
})
