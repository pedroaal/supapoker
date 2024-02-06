import supabase from '../config/supabase'
import { type IVoteRes, type ICreateVote, type IVote } from '../types/vote'
import { voteDto } from './vote.dto'

export const createVote = async (body: ICreateVote): Promise<IVote> => {
  const { data, error } = await supabase
    .from('votes')
    .insert(body)
    .select()
    .single()

  if (error !== null) {
    throw error
  }

  return voteDto(data as IVoteRes)
}

export const deleteVotes = async (roomId: string): Promise<void> => {
  const { error } = await supabase.from('votes').delete().eq('room_id', roomId)

  if (error !== null) {
    throw error
  }
}
