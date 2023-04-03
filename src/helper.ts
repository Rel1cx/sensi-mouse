import { DEFAULT_LANG } from './constants'
import { i18nConfig, setLocale } from './i18n'
import { type Locales } from './i18n/i18n-types'
import { isLocale } from './i18n/i18n-util'
import { getSettings, settings } from './lib/settings'

export const initI18n = async () => {
    const locale = await getSettings('locale', DEFAULT_LANG, isLocale)

    setLocale(locale)

    return settings.onKeyChange('locale', (locale: Locales | null) => {
        if (!locale || !isLocale(locale)) {
            return
        }
        if (locale === i18nConfig.locale) {
            return
        }
        setLocale(locale)
    })
}
