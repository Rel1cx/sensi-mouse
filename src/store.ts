import { invoke } from '@tauri-apps/api/tauri'
import { atom, createStore, useAtom } from 'jotai'
import * as autostart from 'tauri-plugin-autostart-api'

import { DEFAULT_ACC_ENABLED, DEFAULT_LANG, DEFAULT_SEN } from './constants'
import { type Locales } from './i18n/i18n-types'
import { isLocale } from './i18n/i18n-util'
import { getMouseCfg, setMouseCfg } from './lib/app'
import { on } from './lib/dom'
import { getSettings, settings } from './lib/settings'

export const store = createStore()

export const langAtom = atom(DEFAULT_LANG)

export const senAtom = atom(0, async (get, set, sen: number) => {
    set(senAtom, sen)
    invoke('set_mouse_cfg', { sen, accEnabled: get(accEnabledAtom) })
    await setMouseCfg(sen, get(accEnabledAtom))
})

export const accEnabledAtom = atom(false, async (get, set, accEnabled: boolean) => {
    set(accEnabledAtom, accEnabled)
    await setMouseCfg(get(senAtom), accEnabled)
})

export const autoLaunchAtom = atom(false)

export const setAutoLaunchAtom = atom(null, async (_, set, enabled: boolean) => {
    enabled ? await autostart.enable() : await autostart.disable()

    set(autoLaunchAtom, enabled)
})

export const useLang = () => useAtom(langAtom)

export const initI18n = async () => {
    const lang = await getSettings('locale', DEFAULT_LANG, isLocale)
    store.set(langAtom, lang)
}

export const resetState = () => {
    store.set(senAtom, DEFAULT_SEN)
    store.set(accEnabledAtom, DEFAULT_ACC_ENABLED)
}

export const fetchState = async () => {
    const ret = await getMouseCfg()
    const [sen, accEnabled] = ret.match({
        Ok: v => v,
        Error: () => [DEFAULT_SEN, DEFAULT_ACC_ENABLED]
    })

    const autoStart = await autostart.isEnabled()

    store.set(senAtom, sen)
    store.set(accEnabledAtom, accEnabled)
    store.set(autoLaunchAtom, autoStart)
}

on(window)('focus', fetchState)

settings.onKeyChange('locale', (locale: Locales | null) => {
    if (!locale || !isLocale(locale)) {
        return
    }
    if (locale === store.get(langAtom)) {
        return
    }
    store.set(langAtom, () => locale)
})
