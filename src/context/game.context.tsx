import { type JSX, createContext, type Component, useContext } from 'solid-js'
import { type SetStoreFunction, createStore } from 'solid-js/store'

import { type IRoom } from '../types/room'
import { type IUser } from '../types/user'
import { type IVote } from '../types/vote'

interface IStore {
  room: IRoom
  user: IUser
  players: IUser[]
  votes: IVote[]
}

interface IContext {
  gameStore: IStore
  setGameStore: SetStoreFunction<IStore>
}

interface IProps {
  children: JSX.Element
}

export const Context = createContext<IContext>()

export const GameProvider: Component<IProps> = (props) => {
  const [gameStore, setGameStore] = createStore<IStore>({
    room: {
      id: '',
      name: '',
      metric: '',
    },
    user: {
      id: '',
      name: '',
      owner: false,
    },
    players: [],
    votes: [],
  })

  return (
    <Context.Provider value={{ gameStore, setGameStore }}>
      {props.children}
    </Context.Provider>
  )
}

export const useGameStore = (): IContext => useContext(Context)!
