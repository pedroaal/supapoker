import supabase from '../config/supabase'

import { createUserMutation } from './user.services'
import { createRoomMutation, getRoomQuery } from './room.services'
import { type IGame } from '../types/game'

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
  return { room, user }
}
