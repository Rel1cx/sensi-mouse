import { useConfig } from '@/config'
import L from '@/i18n/i18n-node'

export const useLocale = () => {
    const [config] = useConfig()

    return config.locale
}

export const useTranslation = () => {
    return L[useLocale()]
}
