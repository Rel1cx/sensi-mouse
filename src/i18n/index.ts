import { proxy, useSnapshot } from 'valtio'

import { DEFAULT_LANG } from '@/constants'

import L from './i18n-node'
import { type Locales } from './i18n-types'

export const i18nConfig = proxy<{
    locale: Locales
}>({
    locale: DEFAULT_LANG
})

export const setLocale = (locale: Locales) => {
    // eslint-disable-next-line functional/immutable-data
    i18nConfig.locale = locale
}

export const useLocale = () => {
    return useSnapshot(i18nConfig).locale
}

export const useTranslation = () => {
    return L[useLocale()]
}
