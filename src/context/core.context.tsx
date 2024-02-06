import {
  type Accessor,
  type Component,
  createContext,
  createSignal,
  type JSXElement,
  useContext,
} from 'solid-js'
import { ALERT_TIMEOUT } from '../config/core'

interface IAlert {
  id: string
  message: string
  description?: string
  type: string
}

interface IContext {
  alerts: Accessor<IAlert[]>
  addAlert: (alert: IAlert) => void
  removeAlert: (id: string) => void

  loader: Accessor<string[]>
  addLoader: (id: string) => void
  removeLoader: (id: string) => void
}

interface IProps {
  children: JSXElement
}

const Context = createContext<IContext>()

export const CoreProvider: Component<IProps> = (props) => {
  const [alerts, setAlerts] = createSignal<IAlert[]>([])
  const [loader, setLoader] = createSignal<string[]>([])

  const addAlert = (alert: IAlert): void => {
    setAlerts((old) => [...old, alert])

    setTimeout(() => {
      removeAlert(alert.id)
    }, ALERT_TIMEOUT)
  }

  const removeAlert = (id: string): void => {
    setAlerts((old) => old.filter((alert) => alert.id !== id))
  }

  const addLoader = (id: string): void => {
    setLoader((old) => [...old, id])
  }

  const removeLoader = (id: string): void => {
    setLoader((old) => old.filter((loader) => loader !== id))
  }

  return (
    <Context.Provider
      value={{ alerts, addAlert, removeAlert, loader, addLoader, removeLoader }}
    >
      {props.children}
    </Context.Provider>
  )
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useCoreStore = (): IContext => useContext(Context)!
