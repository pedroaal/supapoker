import supabase from '../config/supabase'

export interface IUser {
  id: string
  name: string
}

interface ICreateUser {
  name: string
}

export const createUserMutation = async (body: ICreateUser): Promise<IUser> => {
  const { data, error } = await supabase
    .from('users')
    .insert(body)
    .select()
    .single()

  if (error !== null) {
    throw error
  }

  return data
}
