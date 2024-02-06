import {
  type Component,
  createMemo,
  For,
  getOwner,
  runWithOwner,
} from 'solid-js'

import { METRICS } from '../constants/game'
import { useRoomStore } from '../context/room.context'
import { subscribeToGame, subscribeToUsers } from '../services/game.services'
import { Button } from '../components/Button'

const Vote: Component = () => {
  const { roomStore } = useRoomStore()
  const owner = getOwner()

  runWithOwner(owner, () => {
    subscribeToGame()
    subscribeToUsers()
  })

  const options = createMemo(() => {
    if (roomStore.room?.id !== '') {
      return []
    }

    console.log('🚀 ~ options ~ current:', METRICS[roomStore.room?.metric])
    return METRICS[roomStore.room?.metric] ?? []
  })

  const hasVoted = (userId: string): boolean =>
    roomStore.votes.some((vote) => vote.userId === userId)

  const vote = (value: number): void => {
    console.log('🚀 ~ vote ~ value:', value)
  }

  const clearVotes = (): void => {
    console.log('clear votes')
  }

  return (
    <div class="flex gap-4">
      <div class="w-full md:w-2/3 flex flex-col gap-4">
        <div class="flex gap-4">
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
        <ul>
          <For each={roomStore.players}>
            {(player) => (
              <li>
                {player.name} {hasVoted(player.id) && <span>(voted)</span>}
              </li>
            )}
          </For>
        </ul>
        <Button title="Clear votes" onClick={clearVotes} />
      </div>
    </div>
  )
}

export default Vote
