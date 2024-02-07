import { type Component, createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import { getId } from '../utils/strings'
import { useCoreStore } from '../context/core.context'
import { useGameStore } from '../context/game.context'
import { METRICS_OPTIONS } from '../constants/game'
import { joinGame, startGame } from '../services/game.services'

import Input from '../components/Input'
import Select from '../components/Select'
import { ROUTES } from '../constants/router'
import { Button } from '../components/Button'

const Room: Component = () => {
  const navigate = useNavigate()
  const { addLoader, removeLoader, addAlert } = useCoreStore()
  const { setGameStore } = useGameStore()

  const [roomName, setRoomName] = createSignal('')
  const [metric, setMetric] = createSignal('')
  const [user, setUser] = createSignal('')
  const [roomId, setRoomId] = createSignal('')

  const createRoom = (): void => {
    const actionId = getId()
    addLoader(actionId)

    startGame({
      name: roomName(),
      metric: metric(),
      user: user(),
    })
      .then(({ room, user }) => {
        setGameStore('room', room)
        setGameStore('user', user)
        setGameStore('players', (prev) => [...prev, user])
        addAlert({ id: actionId, type: 'success', message: 'Room created' })
        navigate(ROUTES.GAME)
      })
      .catch((error) => {
        console.error(error)
        addAlert({
          id: actionId,
          type: 'error',
          message: 'Room can not be created',
        })
      })
      .finally(() => {
        removeLoader(actionId)
      })

    setRoomName('')
    setMetric('')
    setUser('')
  }

  const joinRoom = (): void => {
    const actionId = getId()
    addLoader(actionId)

    joinGame({
      name: user(),
      roomId: roomId(),
    })
      .then(({ room, user, players }) => {
        setGameStore('room', room)
        setGameStore('user', user)
        setGameStore('players', (prev) => [...prev, ...players])
        addAlert({ id: actionId, type: 'success', message: 'Joined to room' })
        navigate(ROUTES.GAME)
      })
      .catch((error) => {
        addAlert({
          id: actionId,
          type: 'error',
          message: 'Error joining to room',
        })
        console.error(error)
      })
      .finally(() => {
        removeLoader(actionId)
      })

    setUser('')
    setRoomId('')
  }

  return (
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
        <Button title="Create" onClick={createRoom} />
      </div>

      <div class="flex gap-4 items-end">
        <Input label="Room id" value={roomId} onChange={setRoomId} />
        <Button title="Join" onClick={joinRoom} />
      </div>
    </div>
  )
}

export default Room
