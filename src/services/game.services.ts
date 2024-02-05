import { useContext } from 'solid-js'

import supabase from '../config/supabase'
import { RoomContext } from '../contexts/RoomContext'

import { type IUser, createUserMutation } from './user'
import { type IRoom, createRoomMutation, getRoomQuery } from './room'

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

const [_, { updateRoom, updateUser }] = useContext(RoomContext)

export const startGame = async (body: {
  name: string
  metric: string
  user: string
}): Promise<IGame> => {
  const room = await createRoomMutation({
    name: body.name,
    metric: body.metric,
  })
  const user = await createUserMutation({ name: body.user })
  await supabase
    .from('room_user')
    .insert({ room_id: room?.id, user_id: user?.id })
  updateRoom(room)
  updateUser(user)
  return { room, user }
}

export const joinGame = async (body: {
  name: string
  roomId: string
}): Promise<IGame> => {
  const user = await createUserMutation({ name: body.name })
  const room = await getRoomQuery(body.roomId)
  await supabase
    .from('room_user')
    .insert({ room_id: body.roomId, user_id: user?.id })
  updateRoom(room)
  updateUser(user)
  return { room, user }
}
