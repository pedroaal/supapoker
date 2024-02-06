export interface IVote {
  id: number
  roomId: string
  userId: string
  vote: string
}

export interface ICreateVote {
  roomId: string
  userId: string
  vote: string
}

export interface IVoteRes {
  id: number
  room_id: string
  user_id: string
  vote: string
}
