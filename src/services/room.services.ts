import supabase from '../config/supabase'
import { type IRoomRes, type ICreateRoom, type IRoom } from '../types/room'
import { roomDto } from './room.dto'

export const getRoomQuery = async (roomId: string): Promise<IRoom> => {
  const { data, error } = await supabase
    .from('rooms')
    .select()
    .eq('id', roomId)
    .single()

  if (error !== null) {
    console.error('🚀 ~ getRoomQuery ~ error:', error)
    throw error
  }

  return roomDto(data as IRoomRes)
}

export const createRoomMutation = async (body: ICreateRoom): Promise<IRoom> => {
  const { data, error } = await supabase
    .from('rooms')
    .insert(body)
    .select()
    .single()

  if (error !== null) {
    console.error('🚀 ~ createRoomMutation ~ error:', error)
    throw error
  }

  return roomDto(data as IRoomRes)
}
