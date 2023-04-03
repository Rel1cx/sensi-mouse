import { atom, useAtomValue } from 'jotai'

import { DEFAULT_LANG } from '@/constants'
import L from '@/i18n/i18n-node'

export const transAtom = atom(L[DEFAULT_LANG])

export const useTrans = () => {
    return useAtomValue(transAtom)
}
