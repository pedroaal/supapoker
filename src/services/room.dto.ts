import { type IRoom, type IRoomRes } from '../types/room'

export const roomDto = (data: IRoomRes): IRoom => ({
  id: data.id,
  name: data.name,
  metric: data.metric,
})
