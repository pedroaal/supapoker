export interface IMetric {
  id: string
  label: string
  value: number[]
}

export const METRICS: IMetric[] = [{
  id: 'scrum',
  label: 'Scrum',
  value: [1, 2, 3, 5, 8, 13]
}]