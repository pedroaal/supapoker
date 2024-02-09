import { Icon } from 'solid-heroicons'
import { moon, sun } from 'solid-heroicons/outline'
import { createSignal, type Component, createEffect, Show } from 'solid-js'

const ThemeToggler: Component = () => {
  const [isDark, setIsDark] = createSignal(false)

  createEffect(() => {
    setIsDark(localStorage.getItem('theme') === 'dracula')
  })

  const handleClick = (): void => {
    const theme = isDark() ? 'light' : 'dracula'
    localStorage.setItem('theme', theme)
    document.querySelector('html').setAttribute('data-theme', theme)
    setIsDark((old) => !old)
  }

  return (
    <button class="btn btn-outline btn-square" onClick={handleClick}>
      <Show when={isDark()} fallback={<Icon path={sun} class="size-5" />}>
        <Icon path={moon} class="size-5" />
      </Show>
    </button>
  )
}

export default ThemeToggler
