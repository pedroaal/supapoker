import {
  type Component,
  createMemo,
  For,
  getOwner,
  runWithOwner,
  Show,
  createEffect,
} from 'solid-js'
import { Icon } from 'solid-heroicons'
import { check, clipboard } from 'solid-heroicons/outline'

import { METRICS } from '../constants/game'
import { useRoomStore } from '../context/room.context'
import { createVote, deleteVotes } from '../services/vote.services'
import { subscribeToGame, subscribeToUsers } from '../services/game.services'

import Input from '../components/Input'
import { Button } from '../components/Button'
import { useNavigate } from '@solidjs/router'
import { ROUTES } from '../constants/router'

const Vote: Component = () => {
  const navigate = useNavigate()

  const { roomStore, setRoomStore } = useRoomStore()
  const owner = getOwner()

  createEffect(() => {
    if (roomStore.room?.id === '') {
      navigate(ROUTES.HOME)

      runWithOwner(owner, () => {
        subscribeToUsers()
        subscribeToGame()
      })
    }
  })

  const options = createMemo(() => {
    if (roomStore.room?.id === '') {
      return []
    }

    return METRICS[roomStore.room?.metric] ?? []
  })

  const hasVoted = (userId: string): boolean =>
    roomStore.votes.some((vote) => vote.userId === userId)

  const vote = async (value: string): Promise<void> => {
    createVote({
      room_id: roomStore.room.id,
      user_id: roomStore.user.id,
      vote: value,
    }).catch((error) => {
      console.error('Error creating vote', error)
    })
  }

  const clearVotes = (): void => {
    setRoomStore('votes', () => [])
    deleteVotes(roomStore.room.id)
  }

  const copyToClipboard = async (): Promise<void> => {
    const value = roomStore.room.id
    await navigator.clipboard.writeText(value.trim())
  }

  return (
    <div class="flex gap-4">
      <div class="w-full md:w-2/3 flex flex-col gap-4">
        <div class="text-center">
          <h3>{roomStore.room.name}</h3>
        </div>
        <div class="flex gap-4 border p-4 card h-32">
          <For each={roomStore.votes}>
            {(vote) => (
              <div class="card h-24 w-16 flex justify-center items-center border">
                <span>{vote.vote}</span>
              </div>
            )}
          </For>
        </div>
        <div class="flex gap-4">
          <For each={options()}>
            {(option) => (
              <button
                class="card size-10 flex justify-center items-center border"
                onClick={() => {
                  vote(option.value)
                }}
                disabled={hasVoted(roomStore.user.id)}
              >
                {option.label}
              </button>
            )}
          </For>
        </div>
      </div>
      <div class="w-full md:w-1/3 flex flex-col gap-4">
        Players
        <ul>
          <For each={roomStore.players}>
            {(player) => (
              <li class="flex gap-2">
                {hasVoted(player.id) && (
                  <>
                    <Icon class="w-5 h-5 text-success" path={check} />
                  </>
                )}
                <span>{player.name}</span>
                {Boolean(player.owner) && <span>(moderator)</span>}
              </li>
            )}
          </For>
        </ul>
        <Show when={roomStore.user.owner}>
          <div class="flex">
            <Input
              value={() => roomStore.room.id}
              onChange={() => null}
              disabled
            />
            <Button title="" onClick={copyToClipboard} icon={clipboard} />
          </div>
          <Button title="Clear votes" onClick={clearVotes} />
        </Show>
      </div>
    </div>
  )
}

export default Vote
