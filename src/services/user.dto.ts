import { type IUser, type IUserRes } from '../types/user'

export const userDto = (data: IUserRes): IUser => ({
  id: data.id,
  name: data.name,
  owner: data.owner,
})

export const usersDto = (data: IUserRes[]): IUser[] => data.map(userDto)
