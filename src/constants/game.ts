import { type IOption } from '../types/core'

export const METRICS_OPTIONS: IOption[] = [
  {
    value: 'scrum',
    label: 'Scrum',
  },
]

export const METRICS = {
  scrum: [
    { label: '0', value: '0' },
    { label: '1/2', value: '1/2' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '5', value: '5' },
    { label: '8', value: '8' },
    { label: '13', value: '13' },
  ],
}
