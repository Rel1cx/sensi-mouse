import { configManager } from '@/config'
import { DEFAULT_LOCALE } from '@/constants'
import L from '@/i18n/i18n-node'
import { isLocale } from '@/i18n/i18n-util'

export const useLocale = () => {
    const [config] = configManager.useConfig()

    return isLocale(config.locale) ? config.locale : DEFAULT_LOCALE
}

export const useTranslation = () => {
    return L[useLocale()]
}
