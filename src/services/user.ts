import supabase from '../config/supabase'

export interface IUser {
  id: string
  name: string
}

interface ICreateUser {
  name: string
}

export const createUserMutation =
  async (body: ICreateUser) => {
    const { data } = await supabase.from('users').insert(body).select()
    return data ? data[0] : undefined
  }

