import { AppDataSource } from './data-source'
export * from './data-source'
import { DataSource } from 'typeorm'
import log from 'electron-log/main'
import * as userAction from './controller/userAction'
import chalk from 'chalk'

export async function connectToDatabase(): Promise<DataSource> {
  try {
    return await AppDataSource.initialize()
  } catch (error) {
    log.error('TypeORM connection error: ', error)
    console.log(chalk.red('TypeORM connection error: '), error)
    throw error
  }
}

export const destroyDatabase = async () => {
  await AppDataSource.destroy()
}

export const controllerMap = {
  ...userAction
}
