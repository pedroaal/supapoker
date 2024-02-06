import { type JSX, createContext, type Component, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'

import { type IRoom } from '../types/room'
import { type IUser } from '../types/user'

interface IStoreValues {
  room: IRoom
  user: IUser
  hasRoom: boolean
}

interface IContext {
  roomStore: IStoreValues
  updateRoom: (newRoom: IRoom) => void
  updateUser: (newUser: IUser) => void
}

interface IProps {
  children: JSX.Element
}

export const Context = createContext<IContext>()

export const RoomProvider: Component<IProps> = (props) => {
  const [roomStore, setRoomStore] = createStore<IStoreValues>({
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
  })

  const updateRoom = (newRoom: IRoom): void => {
    setRoomStore('room', newRoom)
    setRoomStore('hasRoom', true)
  }

  const updateUser = (newUser: IUser): void => {
    setRoomStore('user', newUser)
  }

  return (
    <Context.Provider value={{ roomStore, updateRoom, updateUser }}>
      {props.children}
    </Context.Provider>
  )
}

export const useRoom = (): IContext => useContext(Context)!
