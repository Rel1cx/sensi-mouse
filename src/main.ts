import 'ress/ress.css'
import '@/styles/global.scss'
import '@/styles/overrides.scss'
import '@total-typescript/ts-reset'

import * as autostart from 'tauri-plugin-autostart-api'

import { i18nConfig, setLocale } from '@/i18n'
import { type Locales } from '@/i18n/i18n-types'
import { isLocale } from '@/i18n/i18n-util'

import { accEnabledAtom, autoLaunchAtom, senAtom, store } from './atoms'
import { setMouseCfg } from './lib/cmd'
import { renderApp } from './root'
import { loadSettings, resetSettings, type Settings, settings } from './settings'
import { defaultSettings } from './settings'

const main = async () => {
    const loadResult = await loadSettings()

    // eslint-disable-next-line no-console
    const settings: Settings = await loadResult.tap(console.log).match({
        Ok: settings => {
            setMouseCfg(settings.sen, settings.accEnabled)
            return Promise.resolve(settings)
        },
        Error: async () => {
            await resetSettings()
            return defaultSettings
        }
    })

    const autoStart = await autostart.isEnabled()

    setLocale(settings.locale)

    store.set(senAtom, settings.sen)
    store.set(accEnabledAtom, settings.accEnabled)
    store.set(autoLaunchAtom, autoStart)

    renderApp().match({
        Ok: _ => {},
        Error: error => {
            document.write(error.message)
        }
    })
}

settings.onKeyChange('locale', (locale: Locales | null) => {
    if (!locale || !isLocale(locale)) {
        return
    }
    if (locale === i18nConfig.locale) {
        return
    }
    setLocale(locale)
})

main()
