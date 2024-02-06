import supabase from '../config/supabase'

import { createUser, findUsersByRoomId } from './user.services'
import { createRoom, findRoomById } from './room.services'
import { type IGame } from '../types/game'
import { useRoomStore } from '../context/room.context'

export const startGame = async (body: {
  name: string
  metric: string
  user: string
}): Promise<IGame> => {
  const room = await createRoom({
    name: body.name,
    metric: body.metric,
  })
  const user = await createUser({
    name: body.user,
    room_id: room?.id,
    owner: true,
  })
  return { room, user }
}

export const joinGame = async (body: {
  name: string
  roomId: string
}): Promise<IGame> => {
  const room = await findRoomById(body.roomId)
  const user = await createUser({
    name: body.name,
    room_id: body.roomId,
  })
  const players = await findUsersByRoomId(body.roomId)
  return { room, user, players }
}

export const subscribeToUsers = () => {
  const { roomStore, setRoomStore } = useRoomStore()

  supabase
    .channel('custom-filter-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'users',
        filter: `room_id=eq.${roomStore.room?.id}`,
      },
      (payload) => {
        setRoomStore('players', (prev) => [
          ...prev,
          { id: payload.new.id, name: payload.new.name, owner: false },
        ])
      },
    )
    .subscribe()
}

export const subscribeToGame = () => {
  const { roomStore, setRoomStore } = useRoomStore()

  supabase
    .channel('custom-filter-channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'votes',
        filter: `room_id=eq.${roomStore.room?.id}`,
      },
      (payload) => {
        setRoomStore('votes', (prev) => [
          ...prev,
          { userId: payload.new.user_id, vote: payload.new.vote },
        ])
      },
    )
    .subscribe()
}
