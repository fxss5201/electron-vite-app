import { db } from './db'
import type { User } from './User'

export async function dbGetUsers({
  name = '',
  page = 1,
  pageSize = 10
}: {
  name?: string
  page?: number
  pageSize?: number
}) {
  const total = await db.users.count()
  const list = await db.users
    .filter((user) => user.name.includes(name))
    .reverse()
    .offset((page - 1) * pageSize)
    .limit(pageSize)
    .toArray()
    .then((users) => {
      return users.map((user) => {
        user.age = new Date().getFullYear() - user.birthYear!
        delete user.birthYear
        return user
      })
    })

  return { list, total }
}

export async function dbGetUser(id: number) {
  const user = await db.users.get(id)
  if (user) {
    user.age = new Date().getFullYear() - user.birthYear!
    delete user.birthYear
  }
  return user
}

export async function dbAddUser(user: User) {
  user.birthYear = new Date().getFullYear() - user.age!
  delete user.age
  const id = await db.users.add(user)
  return id
}

export async function dbUpdateUser(user: User) {
  user.birthYear = new Date().getFullYear() - user.age!
  delete user.age
  const id = await db.users.update(user.id!, user)
  return id
}

export async function dbDeleteUser(id: number) {
  return await db.users.delete(id)
}
