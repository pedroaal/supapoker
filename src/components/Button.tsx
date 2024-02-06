import { type Component } from 'solid-js'

interface IButtonProps {
  title: string
  onClick: () => void
}

export const Button: Component<IButtonProps> = (props) => (
  <button
    class="btn btn-primary"
    onClick={() => {
      props.onClick()
    }}
  >
    {props.title}
  </button>
)
