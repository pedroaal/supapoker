import { type Component, createMemo, For, Show, useContext } from 'solid-js'

import { METRICS } from '../constants/game'
import { RoomContext } from '../contexts/RoomContext'

const Vote: Component = () => {
  const [store, _] = useContext(RoomContext)

  const options = createMemo(() => {
    if (!store.room?.id) {
      return []
    }

    const current = METRICS[store.room?.metric] ?? []
    return current.map((value) => ({ id: value, label: value }))
  })

  const votes = []

  const hasVoted = (userId: string) =>
    // Return votes.some((vote) => vote.userId === userId);
    false

  const players = createMemo(() => {
    if (!store.room?.users) {
      return []
    }

    const users = store.room.users.map((user: IUser) => ({
      ...user,
      hasVoted: hasVoted(user.id),
    }))
    console.log('🚀 ~ players ~ users:', users)
    return users
  })

  const vote = (value: number) => {}

  const clearVotes = () => {}

  return (
    <Show when={store.hasRoom}>
      <div class="flex gap-4">
        <div class="w-full md:w-2/3 flex flex-col gap-4">
          <div class="flex gap-4">
            <For each={votes}>
              {(vote) => (
                <div class="card h-24 w-16 flex justify-center items-center border">
                  <span>{vote.content}</span>
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
                    vote(option.id)
                  }}
                  disabled={hasVoted(store.userId)}
                >
                  {option.label}
                </button>
              )}
            </For>
          </div>
        </div>
        <div class="w-full md:w-1/3 flex flex-col gap-4">
          <ul>
            <For each={players()}>
              {(player) => (
                <li>
                  {player.name} {player.hasVoted && <span>(voted)</span>}
                </li>
              )}
            </For>
          </ul>
          <button class="btn btn-primary" onClick={clearVotes}>
            Clear votes
          </button>
        </div>
      </div>
    </Show>
  )
}

export default Vote
