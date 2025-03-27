import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { app } from 'electron'
// import { join } from 'path'
import database from '../../../resources/database.sqlite?asset&asarUnpack'

// const database = join(app.getPath('userData'), 'database', 'database.sqlite')

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: database,
  synchronize: !app.isPackaged,
  logging: !app.isPackaged ? 'all' : false,
  entities: [User],
  migrations: [],
  subscribers: []
})
