import { type IUser } from './user'

export interface IRoom {
  id: string
  name: string
  metric: string
  users: IUser[]
}
