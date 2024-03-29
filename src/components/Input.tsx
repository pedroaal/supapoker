import { type Accessor, type Setter, Show, type Component } from 'solid-js'

interface IInputProps {
  label?: string
  onChange: Setter<string>
  value: Accessor<string>
  disabled?: boolean
  placeholder?: string
}

const Input: Component<IInputProps> = (props) => (
  <label class="form-control w-full max-w-xs join-item">
    <Show when={props.label}>
      <div class="label">
        <span class="label-text">{props.label}</span>
      </div>
    </Show>
    <input
      value={props.value()}
      onChange={(e) => props.onChange(e.currentTarget.value)}
      class="input input-bordered w-full max-w-xs"
      disabled={props.disabled}
      placeholder={props.placeholder}
    />
  </label>
)

export default Input
