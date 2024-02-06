import { type Component, Show, createSignal } from 'solid-js'

import { METRICS_OPTIONS } from '../constants/game'
import { useRoom } from '../context/room.context'
import { joinGame, startGame } from '../services/game.services'

import Input from '../components/Input'
import Select from '../components/Select'

const Room: Component = () => {
  const { roomStore, updateRoom, updateUser } = useRoom()

  const [roomName, setRoomName] = createSignal('')
  const [metric, setMetric] = createSignal('')
  const [user, setUser] = createSignal('')
  const [roomId, setRoomId] = createSignal('')

  const createRoom = (): void => {
    startGame({
      name: roomName(),
      metric: metric(),
      user: user(),
    })
      .then(({ room, user }) => {
        updateRoom(room)
        updateUser(user)
      })
      .catch((error) => {
        console.error(error)
      })
    setRoomName('')
    setMetric('')
    setUser('')
  }

  const joinRoom = (): void => {
    joinGame({
      name: user(),
      roomId: roomId(),
    })
      .then(({ room, user }) => {
        updateRoom(room)
        updateUser(user)
      })
      .catch((error) => {
        console.error(error)
      })
    setUser('')
    setRoomId('')
  }

  return (
    <Show when={!roomStore.hasRoom}>
      <div class="flex flex-col gap-4">
        <Input label="User" value={user} onChange={setUser} />

        <div class="flex gap-4 items-end">
          <Select
            label="Metric"
            value={metric}
            onChange={setMetric}
            options={METRICS_OPTIONS}
          />
          <Input label="Room name" value={roomName} onChange={setRoomName} />
          <button onClick={createRoom} class="btn btn-primary">
            Create
          </button>
        </div>

        <div class="flex gap-4 items-end">
          <Input label="Room id" value={roomId} onChange={setRoomId} />
          <button onClick={joinRoom} class="btn btn-primary">
            Join
          </button>
        </div>
      </div>
    </Show>
  )
}

export default Room
