import supabase from '../config/supabase'
import { type IUserRes, type ICreateUser, type IUser } from '../types/user'
import { userDto, usersDto } from './user.dto'

export const findUsersByRoomId = async (roomId: string): Promise<IUser[]> => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('room_id', roomId)

  if (error !== null) {
    throw error
  }

  return usersDto(data as IUserRes[])
}

export const createUser = async (body: ICreateUser): Promise<IUser> => {
  const { data, error } = await supabase
    .from('users')
    .insert(body)
    .select()
    .single()

  if (error !== null) {
    throw error
  }

  return userDto(data as IUserRes)
}
