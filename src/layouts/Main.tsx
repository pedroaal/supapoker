import { type JSX, type Component } from 'solid-js'

import ThemeToggler from '../components/ThemeToggler'

interface IProps {
  children?: JSX.Element
}

const MainLayout: Component<IProps> = (props) => (
  <div class="w-full">
    <header class="p-2 flex justify-between items-center">
      <h3>Main Layout</h3>
      <ThemeToggler />
    </header>
    <div class="container mx-auto p-6 md:p-4">{props.children}</div>
  </div>
)

export default MainLayout
