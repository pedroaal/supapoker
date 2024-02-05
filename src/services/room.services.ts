import supabase from '../config/supabase'

interface ICreateRoom {
  name: string
  metric: string
}

export interface IRoom {
  id: string
  name: string
  metric: string
}

export const getRoomQuery = async (roomId: string): Promise<IRoom> => {
  const { data, error } = await supabase
    .from('rooms')
    .select()
    .eq('id', roomId)
    .single()

  if (error !== null) {
    throw error
  }

  return data
}

export const createRoomMutation = async (body: ICreateRoom): Promise<IRoom> => {
  const { data, error } = await supabase
    .from('rooms')
    .insert(body)
    .select()
    .single()

  if (error !== null) {
    throw error
  }

  return data
}
