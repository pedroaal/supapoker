import { type Component, For, Show } from 'solid-js'
import { Icon } from 'solid-heroicons'
import {
  checkCircle,
  exclamationCircle,
  exclamationTriangle,
  informationCircle,
} from 'solid-heroicons/outline'

import { useCoreStore } from '../context/core.context'
import { type IIcon } from '../types/core'

interface IConfig {
  color: string
  icon: IIcon
}

const Alerts: Component = () => {
  const { alerts } = useCoreStore()

  const getConfig = (type: string): IConfig => {
    switch (type) {
      case 'success':
        return { color: 'alert-success', icon: checkCircle }
      case 'error':
        return { color: 'alert-error', icon: exclamationCircle }
      case 'warning':
        return { color: 'alert-warning', icon: exclamationTriangle }
      default:
        return { color: 'alert-info', icon: informationCircle }
    }
  }

  return (
    <Show when={alerts().length > 0}>
      <div class="w-full md:w-1/2 h-screen fixed top-0 right-0 overflow-y-auto z-50">
        <div class="flex flex-col gap-4 p-4">
          <For each={alerts()}>
            {(alert) => {
              const { color, icon } = getConfig(alert.type)

              return (
                <div class={`alert ${color}`} role="alert">
                  <Icon path={icon} class={`w-5 h-5`} />
                  <div class="flex flex-col gap-2">
                    <span>{alert.message}</span>
                    <Show when={alert.description}>
                      <span>{alert.description}</span>
                    </Show>
                  </div>
                </div>
              )
            }}
          </For>
        </div>
      </div>
    </Show>
  )
}

export default Alerts
