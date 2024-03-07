import { format } from '@formkit/tempo'

export const formatDate = (date: string): string =>
  format(new Date(date), 'short')
