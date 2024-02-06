import { type IRoom } from './room'
import { type IUser } from './user'

export interface IVote {
  action: string
  name?: string
  metric?: string
  userName?: string
  userId?: string
  roomId?: string
  content?: string
}

export interface IGame {
  room: IRoom
  user: IUser
}
