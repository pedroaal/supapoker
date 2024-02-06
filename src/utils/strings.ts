const RADIX = 36
const START = 2
export const getId = (): string =>
  Math.random().toString(RADIX).substring(START)
