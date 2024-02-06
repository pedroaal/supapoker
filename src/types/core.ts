import { type JSX } from 'solid-js'

export interface IOption {
  label: string
  value: string
}

export interface IIcon {
  path: JSX.Element
  outline: boolean
  mini: boolean
}
