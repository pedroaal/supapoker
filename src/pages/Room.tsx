import { type Component, Show, createSignal, useContext } from 'solid-js'

import { METRICS_OPTIONS } from '../constants/game'
import { RoomContext } from '../contexts/RoomContext'
import { joinGame, startGame } from '../services/game'

import Input from '../components/Input'
import Select from '../components/Select'

const Room: Component = () => {
  const [store, _] = useContext(RoomContext)

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
    setRoomName('')
    setMetric('')
    setUser('')
  }

  const joinRoom = (): void => {
    joinGame({
      name: user(),
      roomId: roomId(),
    })
    setUser('')
    setRoomId('')
  }

  return (
    <Show when={!store.hasRoom}>
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
