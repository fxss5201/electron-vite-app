import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import database from '../../../resources/database.sqlite?asset&asarUnpack'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: database,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: []
})
