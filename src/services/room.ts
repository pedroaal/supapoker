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


export const getRoomQuery =
  async (roomId: string) => {
    const { data } = await supabase.from('rooms').select().eq('id', roomId)
    return data ? data[0] : undefined
  }

export const createRoomMutation =
  async (body: ICreateRoom) => {
    const { data } = await supabase.from('rooms').insert(body).select()
    return data ? data[0] : undefined
  }
