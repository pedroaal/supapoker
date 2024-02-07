import supabase from '../config/supabase'

import { createUser, findUsersByRoomId } from './user.services'
import { createRoom, findRoomById } from './room.services'
import { type IGame } from '../types/game'
import { useGameStore } from '../context/game.context'
import { voteDto } from './vote.dto'
import { userDto } from './user.dto'

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

export const subscribeToEvents = () => {
  const { gameStore, setGameStore } = useGameStore()

  supabase
    .channel('custom-filter-channel')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'users',
        filter: `room_id=eq.${gameStore.room?.id}`,
      },
      (payload) => {
        setGameStore('players', (prev) => [...prev, userDto(payload.new)])
      },
    )
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'votes',
        filter: `room_id=eq.${gameStore.room?.id}`,
      },
      (payload) => {
        setGameStore('votes', (prev) => [...prev, voteDto(payload.new)])
      },
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'votes',
        filter: `room_id=eq.${gameStore.room?.id}`,
      },
      (payload) => {
        setGameStore('votes', (prev) =>
          prev.filter((vote) => vote.id !== payload.old.id),
        )
      },
    )
    .subscribe()
}
