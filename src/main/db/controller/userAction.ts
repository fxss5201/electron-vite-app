import { AppDataSource } from './../index'
import { User } from './../entity/User'
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export const addUserAction = async (user: QueryDeepPartialEntity<User>) => {
  const res = await AppDataSource.manager.insert(User, user)
  return res
}

export interface QueryType {
  name: string
  page: number
  pageSize: number
}
export const getUsersAction = async (query: QueryType) => {
  const { name, page, pageSize } = query
  const total = await AppDataSource.getRepository(User)
    .createQueryBuilder('user')
    .where('user.name LIKE :name', { name: name ? `%${name}%` : '%' })
    .getCount()
  const list = await AppDataSource.getRepository(User)
    .createQueryBuilder('user')
    .where('user.name LIKE :name', { name: name ? `%${name}%` : '%' })
    .orderBy('user.id', 'DESC')
    .skip((page - 1) * pageSize)
    .take(pageSize)
    .getMany()
  return {
    list,
    total
  }
}

export const getUserByIdAction = async (query: { id: number }) => {
  const { id } = query
  const res = await AppDataSource.manager.findOne(User, {
    where: {
      id
    }
  })
  return res
}

export interface PutType {
  id: number
  name: string
  age: number
}
export const updateUserAction = async (putData: PutType) => {
  const { id, name, age } = putData
  const res = await AppDataSource.manager.update(User, { id }, { name, age })
  return res
}

export const deleteUserAction = async (query: { id: number }) => {
  const { id } = query
  const res = await AppDataSource.manager.delete(User, { id })
  return res
}
