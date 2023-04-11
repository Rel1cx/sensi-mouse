import { configManager } from '@/config'
import L from '@/i18n/i18n-node'

export const useLocale = () => {
    const [config] = configManager.useConfig()

    return config.locale
}

export const useTranslation = () => {
    return L[useLocale()]
}
