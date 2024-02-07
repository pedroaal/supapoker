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
import { useNavigate } from '@solidjs/router'
import { check, clipboard } from 'solid-heroicons/outline'

import { METRICS } from '../constants/game'
import { ROUTES } from '../constants/router'
import { useGameStore } from '../context/game.context'
import { createVote, deleteVotes } from '../services/vote.services'
import { subscribeToEvents } from '../services/game.services'

import Input from '../components/Input'
import { Button } from '../components/Button'

const Vote: Component = () => {
  const navigate = useNavigate()

  const { gameStore } = useGameStore()
  const owner = getOwner()

  createEffect(() => {
    if (gameStore.room?.id === '') {
      navigate(ROUTES.HOME)
    }
  })

  runWithOwner(owner, () => {
    subscribeToEvents()
  })

  const options = createMemo(() => METRICS[gameStore.room?.metric] ?? [])

  const hasVoted = (userId: string): boolean =>
    gameStore.votes.some((vote) => vote.userId === userId)

  const vote = (value: string): void => {
    createVote({
      room_id: gameStore.room.id,
      user_id: gameStore.user.id,
      vote: value,
    }).catch((error) => {
      console.error('Error creating vote', error)
    })
  }

  const clearVotes = (): void => {
    deleteVotes(gameStore.room.id).catch((error) => {
      console.error('Error deleting votes', error)
    })
  }

  const copyToClipboard = async (): Promise<void> => {
    const value = gameStore.room.id
    await navigator.clipboard.writeText(value.trim())
  }

  return (
    <div class="flex gap-4">
      <div class="w-full md:w-2/3 flex flex-col gap-4">
        <div class="text-center">
          <h3>{gameStore.room.name}</h3>
        </div>
        <div class="flex gap-4 border p-4 h-32 rounded-lg">
          <For each={gameStore.votes}>
            {(vote) => (
              <div class="h-24 w-16 flex justify-center items-center border border-accent rounded-lg">
                <Show
                  when={gameStore.votes.length === gameStore.players.length}
                  fallback={<div class="size-full rounded-lg bg-accent" />}
                >
                  <span class="text-accent">{vote.vote}</span>
                </Show>
              </div>
            )}
          </For>
        </div>
        <div class="flex gap-4">
          <For each={options()}>
            {(option) => (
              <button
                class="size-10 btn btn-outline btn-secondary"
                onClick={() => {
                  vote(option.value)
                }}
                disabled={hasVoted(gameStore.user.id)}
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
          <For each={gameStore.players}>
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
        <Show when={gameStore.user.owner}>
          <div class="join">
            <Input
              value={() => gameStore.room.id}
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
