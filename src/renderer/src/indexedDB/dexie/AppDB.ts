import Dexie, { type EntityTable } from 'dexie'
import type { User } from './User'

export default class AppDB extends Dexie {
  users!: EntityTable<User, 'id'>

  constructor() {
    super('appDB')
    this.version(1).stores({
      users: '++id, name, age'
    })
    this.users = this.table('users')
  }
}
