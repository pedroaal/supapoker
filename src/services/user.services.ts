import supabase from '../config/supabase'
import { type IUserRes, type ICreateUser, type IUser } from '../types/user'
import { userDto } from './user.dto'

export const createUserMutation = async (body: ICreateUser): Promise<IUser> => {
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
