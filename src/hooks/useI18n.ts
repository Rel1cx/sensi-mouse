import { useAtom } from 'jotai'

import L from '@/i18n/i18n-node'
import { localeAtom } from '@/store'

export const useTranslation = () => {
    return L[useAtom(localeAtom)[0]]
}
