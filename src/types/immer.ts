import type { Draft } from 'immer'

export type Mutator<T> = (state: Draft<T>) => void
