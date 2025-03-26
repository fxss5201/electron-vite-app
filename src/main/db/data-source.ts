import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { is } from '@electron-toolkit/utils'
import { User } from './entity/User'
import database from '../../../resources/database.sqlite?asset&asarUnpack'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: database,
  synchronize: is.dev,
  logging: is.dev ? 'all' : false,
  entities: [User],
  migrations: [],
  subscribers: []
})
