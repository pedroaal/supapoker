import { type IVote, type IVoteRes } from '../types/vote'

export const voteDto = (data: IVoteRes): IVote => ({
  id: data.id,
  roomId: data.room_id,
  userId: data.user_id,
  vote: data.vote,
})

export const votesDto = (data: IVoteRes[]): IVote[] => data.map(voteDto)
