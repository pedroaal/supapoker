import { type JSX, createContext, type Component } from 'solid-js'
import { createStore } from 'solid-js/store'

import { type IRoom } from '../services/room'
import { type IUser } from '../services/user'

interface IStoreValues {
  room: IRoom
  user: IUser
  hasRoom: boolean
}

interface IStoreMethods {
  updateRoom: (newRoom: IRoom) => void
  updateUser: (newUser: IUser) => void
}

const DEFAULT_STORE: IStoreValues = {
  room: {
    id: '',
    name: '',
    metric: '',
  },
  user: {
    id: '',
    name: '',
  },
  hasRoom: false,
}

const DEFAULT_METHODS: IStoreMethods = {
  updateRoom: () => null,
  updateUser: () => null,
}

export const RoomContext = createContext<[IStoreValues, IStoreMethods]>([
  DEFAULT_STORE,
  DEFAULT_METHODS,
])

interface IProps {
  children: JSX.Element
}

export const RoomProvider: Component<IProps> = (props) => {
  const [store, setStore] = createStore<IStoreValues>(DEFAULT_STORE)

  const methods: IStoreMethods = {
    updateRoom: (newRoom: IRoom) => {
      setStore('room', newRoom)
      setStore('hasRoom', true)
    },
    updateUser: (newUser: IUser) => {
      setStore('user', newUser)
    },
  }

  return (
    <RoomContext.Provider value={[store, methods]}>
      {props.children}
    </RoomContext.Provider>
  )
}
