import { createResource } from 'solid-js'
import supabase from '../config/supabase'

const getRoom = createResource(
  async () => {
    const { data } = await supabase.from('countries').select()
    return data
  }
)
