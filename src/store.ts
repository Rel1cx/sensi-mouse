import { atom, getDefaultStore } from 'jotai'
import * as autostart from 'tauri-plugin-autostart-api'

import { type Locales } from '@/i18n/i18n-types'

import { configManager, defaultConfig } from './config'
import { isLocale } from './i18n/i18n-util'
import { setMouseCfg } from './lib/cmd'
import { type Theme } from './types'

const store = getDefaultStore()

export const senAtom = atom(defaultConfig.sen)

export const accEnabledAtom = atom(defaultConfig.accEnabled)

export const setSenAtom = atom(null, async (get, set, sen: number) => {
    set(senAtom, sen)
    await setMouseCfg(sen, get(accEnabledAtom))
    await configManager.setConfig('sen', sen)
})

export const setAccEnabledAtom = atom(null, async (get, set, accEnabled: boolean) => {
    set(accEnabledAtom, accEnabled)
    await setMouseCfg(get(senAtom), accEnabled)
    await configManager.setConfig('accEnabled', accEnabled)
})

export const localeAtom = atom(defaultConfig.locale, (get, set, locale: Locales) => {
    set(localeAtom, locale)
    void configManager.setConfig('locale', locale)
})

export const themeAtom = atom(defaultConfig.theme, (get, set, theme: Theme) => {
    set(themeAtom, theme)
    void configManager.setConfig('theme', theme)
})

export const launchAtLoginAtom = atom(false)

export const setLaunchAtLoginAtom = atom(null, async (get, set, launchAtLogin: boolean) => {
    await (launchAtLogin ? autostart.enable : autostart.disable)()
    set(launchAtLoginAtom, launchAtLogin)
})

export const loadConfigAtom = async () => {
    const config = await configManager.loadConfig()
    const launchAtLogin = await autostart.isEnabled()
    if (config.isOk()) {
        const { accEnabled, locale, sen, theme } = config.value
        store.set(senAtom, sen)
        store.set(accEnabledAtom, accEnabled)
        store.set(localeAtom, isLocale(locale) ? locale : defaultConfig.locale)
        store.set(themeAtom, theme)
        store.set(launchAtLoginAtom, launchAtLogin)
        await setMouseCfg(sen, accEnabled)
    }
}

export const resetConfigAtom = async () => {
    await configManager.resetConfig()
    store.set(senAtom, defaultConfig.sen)
    store.set(accEnabledAtom, defaultConfig.accEnabled)
    store.set(localeAtom, defaultConfig.locale)
    store.set(themeAtom, defaultConfig.theme)
    store.set(launchAtLoginAtom, false)
    await setMouseCfg(defaultConfig.sen, defaultConfig.accEnabled)
}
