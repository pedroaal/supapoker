import { Show, type Component } from 'solid-js'

import { useCoreStore } from '../context/core.context'

const Loader: Component = () => {
  const { loader } = useCoreStore()

  return (
    <Show when={loader().length > 0}>
      <div class="w-screen h-screen fixed top-0 left-0 z-50 bg-base-content/25 backdrop-blur-sm">
        <div class="w-full h-full flex justify-center items-center">
          <span class="loading loading-spinner loading-lg text-primary" />
        </div>
      </div>
    </Show>
  )
}

export default Loader
